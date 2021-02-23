import React from 'react'
import './home.scss'
import { useSelector } from 'react-redux';
import Slide from '../Slide/Slide'
import CardItem from './CardItem'

const Home = () => {
  const products = useSelector(store => store.productReducer)

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
