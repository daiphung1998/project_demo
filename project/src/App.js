import React from 'react'
import 'antd/dist/antd.css'
import Header from './components/header/Header'
import './App.scss'
import Menu from './components/menu/index'
import { Row, Col} from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import router from './router'
import { Provider } from 'react-redux'
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
     <Router>
      <Header/>
      <Row>
        <Col span={24} className="menu">
          <Menu/>
        </Col>
        <div className="content">
          <Col span={24}>
            <Switch>
              {
                router.map((item, index) => {
                  const {Component} = item
                  return (
                    <Route path={item.path} exact={item.exact} key={index}>
                      <Component type={item.type}/>
                    </Route>
                  )
                })
              }
            </Switch>
          </Col>
        </div>
      </Row>
     </Router>
    </Provider>
  );
}

export default App;
