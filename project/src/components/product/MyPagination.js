import React, { useState } from 'react';
import JwPagination from 'jw-react-pagination';
import CardItem from './CardItem';

const MyPagination = ({ listSort }) => {
  const [pageOfItems, setPageOfItems] = useState([]);

  const onChangePage = (data) => {
    setPageOfItems(data);
  };

  return (
    <>
      <div className="col-12">
      <JwPagination items={listSort} onChangePage={onChangePage} pageSize={3} maxPages={5} />
      </div>

      {pageOfItems.map((item, index) => (
        <div className="col-4 item" key={index}>
          <CardItem item={item} />
        </div>
      ))}
      <hr />
    </>
  );
};

export default MyPagination;
