import React from 'react';
import JwPagination from 'jw-react-pagination';

class MyPagination extends React.Component {
    constructor(props) {
        super(props);
        var exampleItems = Array.from(Array(150).keys()).map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));
        this.state = {
            exampleItems: exampleItems,
            pageOfItems: []
        };
        this.onChangePage = this.onChangePage.bind(this);
    }
    onChangePage(pageOfItems) {
      this.setState({ pageOfItems: pageOfItems });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="text-center">
                        <h1>React Pagination Component Demo</h1>
                        <JwPagination items={this.state.exampleItems} onChangePage={this.onChangePage} pageSize={2} maxPages={5}/>
                        {this.state.pageOfItems.map(item =>
                            <div key={item.id}>{item.name}</div>
                        )}
                    </div>
                </div>
                <hr />
            </div>
        );
    }


}
MyPagination.defaultProps = {
  listSort: Array,
}

export default MyPagination;
