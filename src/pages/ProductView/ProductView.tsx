import { NavLink, useParams } from 'react-router-dom'
import s from './ProductView.module.scss'
import { useAppDispatch } from '../../store/hooks'
import { addComment, deleteComment } from '../../store/commentsSlice'
import { useEffect, useState } from 'react'
import { api } from '../../api'
import type { Product } from '../../types/Product'
import type { Comment } from '../../types/Comment'
import { EditModal } from '../../components/EditModal'



export const ProductView = () => {
    const { productId } = useParams()
    const dispatch = useAppDispatch()
    const [product, setProduct] = useState<Product>()
    const [comments, setComments] = useState<Comment[]>([])
    const [text, setText] = useState('')
    const [isEditOpen, setIsEditOpen] = useState(false)
    
    
    const handleDeleteComment = async (commentId: number) => {
  
        const action = await dispatch(deleteComment(commentId))

 
        if (deleteComment.fulfilled.match(action)) {
            setComments(prev => prev.filter(c => c.id !== commentId))
        }
    }

    const handleAddComment = async(e: React.FormEvent) => {
        e.preventDefault()
        if (!text.trim()) return

  
        const action = await dispatch(addComment({
            productId: Number(productId),
            description: text,
            date: new Date().toLocaleString()
        }))

  
        if (addComment.fulfilled.match(action)) {
            setComments(prev => [...prev, action.payload])
        }

        setText('') 
    }

    const handleSave = async (updated: Product) => {
    try {
      const saved = await api.updateProduct(updated.id, updated)
      setProduct(saved)
      setIsEditOpen(false)
    } catch (err) {
      console.error(err)
      alert('Failed to update product')
    }
  }

    useEffect(()=>{
        if (!productId) return
        api.getProductById(Number(productId))
            .then(res => setProduct(res));

        api.getCommentsByProductId(Number(productId)) 
            .then(res => setComments(res))
    }, [])

     if (!product) return <p>Loading...</p>

    return (
        <div className={s['product-view']}>
            <div className={s['product-view__left']}>
                <NavLink to='/'>Back</NavLink>

                <h1 className={s['product-view__title']}>{product?.name}</h1>

                <img src={product?.imageUrl} alt={product?.name} className={s['product-view__img']}/>

                 <button onClick={() => setIsEditOpen(true)}>Edit Product</button>
            </div>

            <div className={s['product-view__right']}>
                <div className={s['product-view__desc']}>
                    <h3>Characteristics:</h3>
                    <p className={s['product-card__info-desc']}>Count : {product?.count}</p>
                    <p className={s['product-card__info-desc']}>Size: {product?.size.height} X {product?.size.width}</p>
                    <p className={s['product-card__info-desc']}>Weight : {product?.weight}</p>
                </div>

                <div className={s['product-view__comments']}>
                    <h3 className={s['product-view__comments']}>Comments</h3>
                    <div className="">
                        <form className={s.form} onSubmit={handleAddComment}>
                            <input
                                type="text"
                                placeholder="Write new comment"
                                value={text}
                                onChange={e => setText(e.target.value)}
                                className={s.input}
                            />

                            <button type="submit">Add comment</button>
                        </form>
                    </div>
                
                    {comments.map(comment => {
                        return (
                            <div className={s['product-view__comment-box']} key={comment.id}>
                                <p className={s['product-view__comment-text']}>{comment.description}</p>
                                <button onClick={()=> handleDeleteComment(comment.id)} className={s['product-view__delete-btn']}>X</button>
                            </div>
                            
                        )
                    })}
                </div>
            </div>
            
            <EditModal
                product={product}
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                onSave={handleSave}
            />  
        </div>
    )
}

