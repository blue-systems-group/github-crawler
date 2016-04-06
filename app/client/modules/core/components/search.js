import React, { PropTypes } from 'react';
import Item from './item';

const Search = ({ search }) => {
  const {
    _id, query, searching, createdAt,
    items = [], totalCount = 0
  } = search;
  return (
    <div className="searchitem">
      <div>
        {query}
      </div>
      {searching ? (<div>Searching...</div>) : null}
      <div>
        {items.length}/{totalCount}
      </div>
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
};

Search.propTypes = {
  search: PropTypes.object.isRequired,
};

export default Search;
