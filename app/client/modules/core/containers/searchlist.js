import SearchList from '../components/searchlist';
import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections: { Searchs } } = context();
  if (Meteor.subscribe('searchs.list').ready()) {
    const searchs = Searchs.find().fetch();
    onData(null, { searchs });
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(SearchList);
