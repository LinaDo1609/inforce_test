import { NavLink } from 'react-router-dom';
import type { Product } from '../../types/Product'
import s from './ProductCard.module.scss'
import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { deleteProduct } from '../../store/productsSlice';
import { ConfirmModal } from '../ConfirmModal';



type Props = {
    product: Product;
}

export const ProductCard : React.FC <Props> = ({product}) => {
    const dispatch = useAppDispatch()
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)

    const handleDelete = () => {
        dispatch(deleteProduct(product.id))
        setIsConfirmOpen(false)
    }

    return (
        <div className={s['product-card']}>
            <div className={s['product-card__img-container']}>
                <NavLink to ={`/product/${product.id}`}>
                 <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className={s['product-card__img']}
                />
                </NavLink>
            </div>
            
            <NavLink to ={`/product/${product.id}`} className={s['product-card__title-link']} >
                <h3 className={s['product-card__title']}>{product.name}</h3>
            </NavLink>

            <div className={s['product-card__info']}>
                <p className={s['product-card__info-desc']}>Count : {product.count}</p>
                <p className={s['product-card__info-desc']}>Size: {product.size.height} X {product.size.width}</p>
                <p className={s['product-card__info-desc']}>Weight : {product.weight}</p>
            </div>
            
            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleDelete}
                message={`Are you sure you want to delete "${product.name}"?`}
            />
            <button className={s['product-card__button']} onClick={() => setIsConfirmOpen(true)}>Delete</button>
        </div>
    )
}