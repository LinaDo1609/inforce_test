import { useState } from 'react'
import type { Product } from '../../types/Product' 
import s from './AddModal.module.scss'

type Props = {
  isOpen: boolean
  onClose: () => void
  onAdd: (product: Omit<Product, 'id'>) => void
}

export const AddModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    count: 0,
    imageUrl: '',
    size: { width: 0, height: 0 },
    weight: ''
  })

  const handleChange = (field: keyof Omit<Product, 'id'>, value: any) => {
    if(field === "count" && !Number(value)){
      alert('Please fill the count field with number')
    }

    setNewProduct(prev => ({ ...prev, [field]: value }))
  }

  const handleSizeChange = (field: 'width' | 'height', value: any) => {
    
    if (Number(value)){
      setNewProduct(prev => ({ ...prev, size: { ...prev.size, [field]: value } }))
    } else{
      setNewProduct(prev => ({ ...prev, size: { ...prev.size, [field]: 0 } }))
       alert('Please fill the field with number')
      return
    }
    
  }

  const handleCancel = () =>{
    setNewProduct({
      name: '',
      count: 0,
      imageUrl: '',
      size: { width: 0, height: 0 },
      weight: ''
    })
    
    onClose()
  }

  const handleSubmit = () => {

    if (!newProduct.name || newProduct.count <= 0) {
      alert('Please fill in required fields')
      return
    }

    onAdd(newProduct)
    
    setNewProduct({
      name: '',
      count: 0,
      imageUrl: '',
      size: { width: 0, height: 0 },
      weight: ''
    })
    
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={s['add-modal']}>
      <div className={s['add-modal__overlay']} onClick={onClose}>
        <form
          className={s['add-modal__container']}
          onClick={e => e.stopPropagation()}
          onSubmit={e => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <h2 className={s['add-modal__title']} >Add New Product</h2>
        
          <label htmlFor='name'>Name:</label>
          <input
            type="text"
            id='name'
            placeholder="Name"
            value={newProduct.name}
            onChange={e => handleChange('name', e.target.value)}
          />

          <label htmlFor='image'>Image URL:</label>
          <input
            type="text"
            id='image'
            placeholder="Image URL"
            value={newProduct.imageUrl}
            onChange={e => handleChange('imageUrl', e.target.value)}
          />

          <label htmlFor='count'>Count:</label>
          <input
            type="text"
            id='count'
            placeholder="Count"
            value={newProduct.count}
            onChange={e => handleChange('count', e.target.value)}
          />


          <label htmlFor='width'>Width:</label>
          <input
            type="text"
            id='width'
            placeholder="Width"
            value={newProduct.size.width}
            onChange={e => handleSizeChange('width', e.target.value)}
          />

          <label htmlFor='height'>Height:</label>
          <input
            type="text"
            id='heidth'
            placeholder="Height"
            value={newProduct.size.height}
            onChange={e => handleSizeChange('height', e.target.value)}
          />

          <label htmlFor='height'>Weight:</label>
          <input
            type="text"
            placeholder="Weight"
            value={newProduct.weight}
            onChange={e => handleChange('weight', e.target.value)}
          />

          <div className={s['add-modal__btns']}>
            <button type="submit">Add</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form> 
      </div>
    </div>
    
  )
}


