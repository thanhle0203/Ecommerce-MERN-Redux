import React from 'react'

export const Product = ({name, price, description, rating }) => {
  return (
    <div className='card mb-3'>
      <div className='card-body'>
        <h5 className='card-title'>{name}</h5>
        <h6 className='card-subtitle mb-2 text-muted'>Price: ${price}</h6>
        <p>{description}</p>
        <div>Rating: {'*'.repeat(rating)}</div>
      </div>
    </div>
  )
}
