import React, { useEffect, useState } from 'react'
import SearchProduct from './../../product/search/SearchProduct'
import Sort from './../../product/sort/Sort'
import './../../product/products.scss'
import CardItem from './../../product/CardItem'
import { useSelector } from 'react-redux'

const SearchProductsByName = ({type}) => {
  const newArr = useSelector(store => store.searchProduct)
  console.log(newArr);
  const [products, setProducts] = useState(newArr)
  const [listSort, setListSort] = useState(newArr)
  useEffect(() => {
    setListSort(newArr)
    setProducts(newArr)
  },[newArr])

  const searchByPrice1 = value => {
    if (value.item.price1 === "") {
      const newArr = products.filter(item => item.price < value.item.price2)
      setListSort(newArr)
    } else if (value.item.price2 === "") {
      const newArr = products.filter(item => item.price > value.item.price1)
      setListSort(newArr)
    } else {
      const newArr = products.filter(item => (item.price > value.item.price1) && (item.price < value.item.price2) )
      setListSort(newArr)
    }
  }

  const sortProduct1 = key => {
    if (key === "1") {
      const newArr = [...listSort]
      newArr.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        } else {
          return 0
        }
      })
      setListSort(newArr)
    }
    if (key === '2') {
      const newArr = [...listSort]
      newArr.sort((a,b) => {
        if (a.price > b.price) {
          return -1;
        } else {
          return 0
        }
      })
      setListSort(newArr)
    }
    if (key === '3') {
      const newArr = [...listSort]
      newArr.sort((a,b) => {
        if (a.name < b.name) {
          return -1;
        } else {
          return 0
        }
      })
      setListSort(newArr)
    }
    if (key === '4') {
      const newArr = [...listSort]
      newArr.sort((a,b) => {
        if (a.name > b.name) {
          return -1;
        } else {
          return 0
        }
      })
      setListSort(newArr)
    }
  }

  return (
    <div className="products">
      <div className="col-12"><h2>link</h2></div>
      <div className="row">
        <div className="col-lg-3">
          <SearchProduct
            searchByPrice={searchByPrice1}
          />
        </div>
        <div className="col-lg-9">
          <div className="col-12 sort">
            <Sort sortProduct={sortProduct1}/>
          </div>
          <div className="row">
            {
              listSort.map((item, index) => {
                return (
                  <div className="col-sm-12 col-lg-4 item"  key={index}>
                    <CardItem item={item} />
                  </div>
                  )
                })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchProductsByName
