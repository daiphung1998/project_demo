import React from 'react'
import './style.scss'

const SearchProduct = (props) => {
  const countrys = ['canada', 'Hoa kỳ', 'Việt Nam', 'Úc']

  const prices = [
    {
      price1: '',
      price2: 100000
    },
    {
      price1: 100000,
      price2: 200000
    },
    {
      price1: 200000,
      price2: 300000
    },
    {
      price1: 300000,
      price2: 500000
    },
    {
      price1: 500000,
      price2: 1000000
    },
    {
      price1: 1000000,
      price2: ''
    }
  ]
  const searchByPrice = (item) => {
    props.searchByPrice(item)
  }
  return (
    <div className="search">
      <div className= "box" >
        <div className="search__title">
          <p>GIÁ SẢN PHẨM</p>
        </div>
        <div className="search__content">
          <ul>
            {
              prices.map((item, index) => {
                if(index === 0) {
                  return (
                    <li key={index} onClick={() => searchByPrice({item})}>
                      <p>Dưới {item.price2}</p>
                    </li>
                  )
                }
                if(index === prices.length - 1) {
                  return (
                    <li key={index} onClick={()=>searchByPrice({item})}>
                      <p>Trên {item.price1}</p>
                    </li>
                  )
                }
                return (
                  <li key={index} onClick={()=>searchByPrice({item})}>
                    <p>{item.price1}{' -> '}{item.price2}</p>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
      <div className= "box" >
        <div className="search__title">
          <p>quốc gia</p>
        </div>
        <div className="search__content">
          <ul>
            {
              countrys.map((item, index) => {
                return (
                  <li key={index}>
                    {item}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SearchProduct
