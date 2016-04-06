import React, { PropTypes } from 'react';
import NewSearch from '../containers/newsearch';

const SearchItem = ({ _id, searching, query, totalCount = 0, items = [] }) => (
  <tr>
    <td>
      <a href={`/search/${_id}`}>{query}</a>
      {searching ? (<div>Searching...</div>) : null}
    </td>
    <td>
      {items.length}
    </td>
    <td>
      {totalCount}
    </td>
  </tr>
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
    <table>
      <thead>
        <tr>
          <th>Query</th>
          <th>Results</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {searchs.map(search => (
          <SearchItem key={search._id} {...search} />
        ))}
      </tbody>
    </table>
  </div>
);

SearchList.propTypes = {
  searchs: PropTypes.array.isRequired,
};

export default SearchList;
