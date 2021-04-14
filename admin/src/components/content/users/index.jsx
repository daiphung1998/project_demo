import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tag, Space } from 'antd';
import { fetchUser } from '../../../redux/Reducer/userSlice';

const Content = () => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.users)
  const [dataTable, setDataTable] = useState(user)
  console.log(user);
  useEffect(() => {
    dispatch(fetchUser())
  },[])
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'UserName',
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: 'password',
      key: 'password',
      dataIndex: 'password',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
          <div>
            <button>{record.id}</button>
            <button>delete</button>
          </div>
      ),
    },
  ];

  const data = [
    {
    "id": "1",
    "name": "Phạm Ngọc Thảo",
    "password": "ngocthao98",
    "cart": [],
    "oder": [],
    "userName": "phamthao",
    "gender": "nu",
    "email": "phamthao.hd@gmail.com",
    "address": "kinh môn hải dương",
    "phone": "0867585510"
    },
    {
    "id": "2",
    "name": "Phùng Thế Đại",
    "password": "daiphung1998",
    "cart": [],
    "oder": [],
    "userName": "daiphung",
    "gender": "nam",
    "email": "daiphung.hd@gmail.com",
    "address": "18T1 theGolden An khánh, Hoài đức, Hà Nội",
    "phone": "0963310336"
    }
    ]
  return (
    <>
      <div>
        {/* {
          dataTable && (
            <Table columns={columns} dataSource={dataTable} />
          )
        } */}
        user
      </div>
    </>
  )
}

export default Content;
