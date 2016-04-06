import React, { PropTypes } from 'react';
import NewSearch from '../containers/newsearch';

const SearchItem = ({ _id, searching, query, totalCount, items = [] }) => (
  <tr>
    <td>
      <a href={`/search/${_id}`}>{query}</a>
      {searching ? (<div>Searching...</div>) : null}
    </td>
    <td>
      {items.length && totalCount ?
        (<div>
          {items.length}/{totalCount}
        </div>) : null}
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
          <th>Results / Total Count</th>
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
