import React, { useEffect, useState } from 'react'
import SearchProduct from './search/SearchProduct'
import productApi from '../../api/productApi'
import Sort from './sort/Sort'
import './products.scss'
import { Link } from 'react-router-dom'
import MyPagination from './MyPagination'

const Products = ({typeID}) => {
  const [products, setProducts] = useState([])
  const [listSort, setListSort] = useState([])


  const fetchProducts = async () => {
    const params = {
      typeID: ''
    }
    if(typeID !== '') {
      params.typeID = typeID
    }
    try {
      let response = []
      if (params.typeID === '') {
        response = await productApi.getAll()
      } else {
        response = await productApi.getAll(params)
      }
      setProducts(response)
      setListSort(response)
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const searchByPrice1 = value => {
    const newArr = products.filter(item => (item.price >= value.item.price1 && item.price <= value.item.price2))
    setListSort(newArr)
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

      <div className="col-12">
        <span>
          <Link to="/">
            trang chủ
          </Link>
          <i className="fas fa-chevron-right" />
          <Link to="/products">
            sản phẩm
          </Link>
        </span>
      </div>

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
            <MyPagination listSort={listSort}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
