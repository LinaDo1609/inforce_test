import { Route, Routes } from 'react-router-dom';
import { ProductList } from './pages/ProductList';
import { ProductView } from './pages/ProductView';
import s from './App.module.scss'
import { useEffect } from 'react';
import { fetchProducts } from './store/productsSlice';
import { useAppDispatch } from './store/hooks';
import { fetchComments } from './store/commentsSlice';


function App() {
  const dispatch = useAppDispatch()

 useEffect(() => {
  dispatch(fetchProducts())
  dispatch(fetchComments())
}, [dispatch])

  return (
    <div className={s.app}>
      <main className={s.app__main}>
        <Routes>
          <Route path='/' element ={<ProductList/>}/>
          <Route path='/product/:productId' element={<ProductView/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
