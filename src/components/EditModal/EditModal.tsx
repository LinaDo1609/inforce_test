import { useState, useEffect } from 'react'
import type { Product } from '../../types/Product'
import s from './EditModal.module.scss'

type Props = {
  product: Product
  isOpen: boolean
  onClose: () => void
  onSave: (updated: Product) => void
}

export const EditModal: React.FC <Props> = ({ product, isOpen, onClose, onSave }) => {
    const [editedProduct, setEditedProduct] = useState<Product>(product)

    useEffect(() => {
        if (isOpen) setEditedProduct({ ...product })
    }, [product, isOpen])

    if (!isOpen) return null

    const handleChange = (field: keyof Product, value: any) => {
        if(field === "count" && !Number(value)){
            alert('Please fill the count field with number')
        }

        setEditedProduct({ ...editedProduct, [field]: value })
    }

    const handleSizeChange = (field: keyof Product['size'], value: number) => {
        setEditedProduct({
        ...editedProduct,
        size: { ...editedProduct.size, [field]: value }
        })
    }

    const handleSave = () => {
        onSave(editedProduct)
    }

    const handleCancel = () =>{
        setEditedProduct(product)
        onClose()
    }

  return (
    <div className={s['edit-modal']}>
      <div className={s.modal}>
        
        <form
          className={s['edit-modal__container']}
          onClick={e => e.stopPropagation()}
          onSubmit={e => {
            e.preventDefault()
            handleSave()
          }}
        >
            <h2>Edit Product</h2>

            <label htmlFor='name'>Name:</label>
            <input
                type="text"
                id='name'
                value={editedProduct.name}
                onChange={e => handleChange('name', e.target.value)}
                placeholder="Name"
            />

            <label htmlFor='image'>Image URL:</label>
            <input
                type="text"
                id='image'
                value={editedProduct.imageUrl}
                onChange={e => handleChange('imageUrl', e.target.value)}
                placeholder="Image URL"
            />

            <label htmlFor='count'>Count:</label>
            <input
                type="number"
                id='count'
                value={editedProduct.count}
                onChange={e => handleChange('count', Number(e.target.value))}
                placeholder="Count"
            />

            <label htmlFor='width'>Width:</label>
            <input
                type="width"
                value={editedProduct.size.width}
                onChange={e => handleSizeChange('width', Number(e.target.value))}
                placeholder="Width"
            />

            <label htmlFor='height'>Height:</label>
            <input
                type="number"
                id='height'
                value={editedProduct.size.height}
                onChange={e => handleSizeChange('height', Number(e.target.value))}
                placeholder="Height"
            />

            <label htmlFor='height'>Weight:</label>
            <input
                type="text"
                id='weight'
                value={editedProduct.weight}
                onChange={e => handleChange('weight', e.target.value)}
                placeholder="Weight"
            />

            <div className={s.modalButtons}>
                <button type='submit'>Save</button>
                <button type='button' onClick={()=> handleCancel()}>Cancel</button>
            </div>
        </form>
        
      </div>
    </div>
  )
}