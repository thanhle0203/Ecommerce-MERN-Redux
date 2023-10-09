import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Product } from './Product'
import { setProducts } from '../actions/productActions'

export const ProductPage = () => {
  const dispatch = useDispatch();
  //const products = useSelector((state) => state.products);
  const { products } = useSelector((state) => state.products);


  useEffect(() => {
    // Example API call to get products
    fetch('http://localhost:8000/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        dispatch(setProducts(data.products)); // dispatch action to set products
        console.log('Product data: ', data.products);
        console.log('Products: ', products);
      })
      .catch((error) => {
        console.error('Fetch error: ', error.message)
      })
  }, [dispatch]);

  // useEffect to log updated products whenever they change
    useEffect(() => {
      console.log('Updated products:', products);
    })

  return (
    <div className='container mt-4'>
      <h1>Products</h1>
      {Array.isArray(products) && products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  )
}
