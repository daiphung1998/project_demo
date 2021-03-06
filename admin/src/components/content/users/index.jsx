import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Select, Input } from 'antd';
import { fetchUser } from '../../../redux/Reducer/userSlice';
import './style.scss';
import MyTable from './table'

const { Option } = Select;

const Content = () => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.users.listUser)
  const [dataTable, setDataTable] = useState([])
  const [inputSearch, setInputSearch] = useState('')

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])
  useEffect(() => {
    setDataTable(user)
  },[user])

  const searchUser = () => {
    const arrSearch = user.filter(item => (item.name.toLowerCase().indexOf(inputSearch) !== -1 || item.email.toLowerCase().indexOf(inputSearch) !== -1 || item.address.toLowerCase().indexOf(inputSearch) !== -1 || item.userName.toLowerCase().indexOf(inputSearch) !== -1))
    setDataTable(arrSearch)
  }

  const changeInputSearch = (e) => {
    setInputSearch(e.target.value)
    const valueInput = e.target.value
    const arrSearch = user.filter(item => (item.name.toLowerCase().indexOf(valueInput) !== -1 || item.email.toLowerCase().indexOf(valueInput) !== -1 || item.address.toLowerCase().indexOf(valueInput) !== -1 || item.userName.toLowerCase().indexOf(valueInput) !== -1))
    setDataTable(arrSearch)
  }

  return (
    <>
      <div className="tableUser">
        <div className="tableUser__action">
          <div className="tableUser__action--search">
            <Input type="text" name="search" placeholder="Tim kiếm...." onChange={changeInputSearch} value={inputSearch}/>
            <i className="fas fa-search" onClick={searchUser}></i>
          </div>
          <div className="tableUser__action--addUser">
            <Button type="primary" >Add User</Button>
          </div>
        </div>
        <div>
          <MyTable dataTable={dataTable}/>
        </div>
      </div>
    </>
  )
}

export default Content;
