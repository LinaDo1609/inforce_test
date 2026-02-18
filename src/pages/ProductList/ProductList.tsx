import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { addProduct } from "../../store/productsSlice"
import s from './ProductList.module.scss'
import { Loader } from "../../components/Loader/Loader"
import { ProductCard } from "../../components/ProductCard"
import type { Product } from "../../types/Product"
import { AddModal } from "../../components/AddModal"


type SortOption = 'name' | 'count'

export const ProductList = () =>{
    const dispatch = useAppDispatch()
    const { items, loading } = useAppSelector(state => state.products)
    const [sortBy, setSortBy] = useState<SortOption>('name')
    const [isModalOpen, setIsModalOpen] = useState(false)

    console.log(items)

    const sortedProducts = [...items].sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name)
        } else if (sortBy === 'count') {
            return a.count - b.count
        }
        return 0
    })

    const handleAddProduct = (product: Omit<Product, 'id'>) => {
        dispatch(addProduct(product))
    }

    if (loading) return <div> <Loader/></div>
    
    return(
        <div className={s["product-list"]}>
            <h1 className={s['product-list__title']}>Product catalogue</h1>
            
            <div className={s["product-list__controls"]}>
                <div className={s["product-list__sort"]}>
                    <label htmlFor="sort">Sort by: </label>
                    <select id="sort" value={sortBy} onChange={e => setSortBy(e.target.value as SortOption)}>
                        <option value="name">Alphabetically</option>
                        <option value="count">Count</option>
                    </select>
                </div>

                <button 
                    className={s["product-list__add"]}
                    onClick={() => setIsModalOpen(true)}
                >
                    Add new item
                </button>
            </div>

            <AddModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddProduct}
            />
            
            <ul className={s["product-list__container"]}>
                {sortedProducts.map(product => {
                    return(
                        <ProductCard product = {product} key ={product.id}/>
                    )
                })}
            </ul>
        </div>
    )
}