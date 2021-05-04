import React from 'react';
import './style.scss';
import CardItem from '../CardItem';
import Slider from "react-slick";
import { Link } from 'react-router-dom'

const settings = {
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  speed: 1000,
  autoplaySpeed: 2000,
};

const GroupProduct = ({title, products, loai, species}) => {

  const seeMoreProduct = () => {

  }
  return (
    <div className="group-product">
      {
        products && (
          <>
            <div className="group-product__title">
              <p>{title}</p>
            </div>
            <div className="group-product__product">
              <Slider {...settings}>
                {
                    products.map((item, index) => {
                      if(item.typeID === loai || item.species === species) {
                        return (
                          <div className="item"  key={index}>
                            <CardItem item={item}/>
                          </div>
                        )
                      }
                      return 0;
                    })
                  }
              </Slider>
            </div>
            <div className="group-product__seeMore" onClick={seeMoreProduct}>
              <Link to="/vegetable">xem thêm <i className="fad fa-chevron-double-right"></i></Link>
            </div>
          </>
        )
      }
    </div>
  )
}

export default GroupProduct;
