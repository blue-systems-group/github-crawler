import { Searchs } from '../../lib/collections';

const gitHubSearch = ({ _id, query, searching }) => {
  // Meteor._sleepForMs(1000);
  Searchs.update(_id, { query: `${query}-finish`, searching });
};

export { gitHubSearch };
