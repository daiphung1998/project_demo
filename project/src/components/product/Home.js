import React from 'react'
import './home.scss'
import { useSelector } from 'react-redux';
import Slide from '../Slide/Slide'
import GroupProduct from './groupProduct/index';

const Home = () => {
  const products = useSelector(store => store.productReducer)

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
