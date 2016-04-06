import Search from '../components/search';
import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

export const composer = ({ context, searchId, clearErrors, delSearch }, onData) => {
  const { Subs, LocalState, Collections: { Searchs } } = context();
  const error = LocalState.get('DEL_SEARCH_ERROR');

  if (Subs.subscribe('searchs.single', searchId).ready()) {
    const search = Searchs.findOne(searchId);
    if (search) {
      onData(null, { search, error, delSearch });
    } else {
      onData(null, { error });
    }
  }

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  delSearch: actions.searchs.delSearch,
  clearErrors: actions.searchs.clearErrors,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Search);
