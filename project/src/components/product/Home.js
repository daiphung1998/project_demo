import React, {useEffect, useState} from 'react'
import './home.scss'
import ProductApi from '../../api/productApi'
import UserApi from '../../api/userApi'
import { useDispatch, useSelector } from 'react-redux';
import {getProduct as getProductAction} from '../../redux/actions/products'
import {getUser as getUserAction} from '../../redux/actions/userAction'
import Slide from '../Slide/Slide'
import CardItem from './CardItem'

const Home = () => {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try {
      const listProduct = await ProductApi.getAll()
      const user = await UserApi.getUser('')
      dispatch(getProductAction(listProduct))
      dispatch(getUserAction(user))
      setProducts(listProduct)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])
  const user = useSelector(store => store)
  console.log(user);
  return (
    <div className="product">
       <div className="row">
          <div className="col-12">
            <Slide />
          </div>
        {
          products.map((item, index) => {
            return (
              <div className="col-12 col-sm-6 col-lg-3 item"  key={index}>
                <CardItem item={item}/>
              </div>
            )
          })
        }
        </div>
    </div>
  )
}

export default Home
