import Search from '../components/search';
import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

export const composer = ({ context, searchId }, onData) => {
  const { Subs, Collections: { Searchs } } = context();

  if (Subs.subscribe('searchs.single', searchId).ready()) {
    const search = Searchs.findOne(searchId);
    if (search) {
      onData(null, { search });
    }
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(Search);
