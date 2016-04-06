import React, { PropTypes, Component } from 'react';
import Item from './item';

class Search extends Component {
  constructor(props) {
    super(props);
    this.del = this.del.bind(this);
  }

  del() {
    const { search: { _id }, delSearch } = this.props;
    delSearch(_id);
  }

  render() {
    if (!this.props.search) {
      return (<div>Not found!</div>);
    }
    const { query, searching, createdAt, items = [], totalCount = 0} = this.props.search;
    return (
      <div className="searchitem">
        <div>
          {query}
        </div>
        {searching ? (<div>Searching...</div>) : null}
        <div>
          {items.length}/{totalCount}
        </div>
        <button onClick={this.del}>Delete</button>
        <div>
          {items.map((item, index) =>
            <Item key={item.html_url + index}
              {...item}
              index={index}
            />
          )}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  search: PropTypes.object.isRequired,
  delSearch: PropTypes.func.isRequired,
};

export default Search;
