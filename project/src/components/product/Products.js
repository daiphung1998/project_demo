import React, { useEffect, useState } from 'react'
import { Pagination } from 'antd'
import SearchProduct from './search/SearchProduct'
import productApi from '../../api/productApi'
import Sort from './sort/Sort'
import './products.scss'
import CardItem from './CardItem'
import { Link } from 'react-router-dom'


const Products = ({typeID}) => {
  const [products, setProducts] = useState([])
  const [listSort, setListSort] = useState([])
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [listProductPage, setListProductPage] = useState([])


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

  // useEffect(() => {
  //   for (let i = 0; i < current * pageSize; i++) {
  //     listProductPage.push(listSort[i])
  //   }
  //   console.log(listSort);
  //   console.log(listProductPage);
  // }, [current])

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

  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize)
    setCurrent(1)
  }
  const onShowCurrentChange = (current) => {
    setCurrent(current)
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
            <div className="col-12">
              <Pagination
                // showSizeChanger
                onShowSizeChange={onShowSizeChange}
                onChange = {onShowCurrentChange}
                defaultPageSize={pageSize}
                defaultCurrent={current}
                total={listSort.length}
              />
            </div>
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

export default Products
