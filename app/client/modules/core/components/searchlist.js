import React, { PropTypes } from 'react';
import NewSearch from '../containers/newsearch';

const SearchItem = ({ _id, searching, query, totalCount, items = [] }) => (
  <div>
    <a href={`/search/${_id}`}>{query}</a>
    {searching ? (<div>Searching...</div>) : null}
    {items.length && totalCount ?
      (<div>
        {items.length}/{totalCount}
      </div>) : null}
  </div>
);

SearchItem.propTypes = {
  _id: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  searching: PropTypes.bool.isRequired,
  totalCount: PropTypes.number,
  items: PropTypes.array,
};

const SearchList = ({ searchs }) => (
  <div className="searchlist">
    <NewSearch />
    {searchs.map(search => (
      <SearchItem key={search._id} {...search} />
    ))}
  </div>
);

SearchList.propTypes = {
  searchs: PropTypes.array.isRequired,
};

export default SearchList;
