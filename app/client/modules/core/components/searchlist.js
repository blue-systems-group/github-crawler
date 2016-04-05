import React, { PropTypes } from 'react';
import NewSearch from '../containers/newsearch';

const SearchList = ({ searchs }) => (
  <div className="searchlist">
    <NewSearch />
    <ul>
      {searchs.map(search => (
        <li key={search._id}>
          <a href={`/search/${search._id}`}>{search.query}</a>
        </li>
      ))}
    </ul>
  </div>
);

SearchList.propTypes = {
  searchs: PropTypes.array.isRequired,
};

export default SearchList;
