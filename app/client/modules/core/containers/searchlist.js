import SearchList from '../components/searchlist';
import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

export const composer = ({ context }, onData) => {
  const { Subs, Collections: { Searchs } } = context();
  if (Subs.subscribe('searchs.list').ready()) {
    const searchs = Searchs.find(
      {},
      { sort: { createdAt: -1 } }
     ).fetch();
    onData(null, { searchs });
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(SearchList);
