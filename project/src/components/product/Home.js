import React, { useEffect } from 'react'
import './home.scss'
import { useDispatch, useSelector } from 'react-redux';
import Slide from '../Slide/Slide'
import GroupProduct from './groupProduct/index';
import UserApi from '../../api/userApi'
import {getUser as getUserAction} from '../../redux/actions/userAction'

const Home = () => {
  const products = useSelector(store => store.productReducer)
  const dispatch = useDispatch()
  const fetchUserById = async () => {
    const baseId =  localStorage.getItem('userID')
    const id = atob(baseId)
    const response = await UserApi.getUserById(id)
    dispatch(getUserAction(response))

    console.log(response);
  }

  useEffect(() => {
    fetchUserById()
  }, [])
  return (
    <div className="product">
      <div className="row">
        <div className="col-12">
          <Slide />
        </div>
          <GroupProduct title="rau xanh" loai="rau" products={products}/>
          <GroupProduct title="củ" loai="cu" products={products}/>
          <GroupProduct title="quả" loai="qua" products={products}/>
          <GroupProduct title="nấm" loai="nam" products={products}/>
          <GroupProduct title="đồ khô" species="kho" products={products}/>
          <GroupProduct title="đồ tươi" species="tuoi" products={products}/>
        </div>
    </div>
  )
}

export default Home
