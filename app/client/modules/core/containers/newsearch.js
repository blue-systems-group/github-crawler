import NewSearch from '../components/newsearch';
import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

export const composer = ({ context, clearErrors, create }, onData) => {
  const { LocalState } = context();
  const error = LocalState.get('NEW_SEARCH_ERROR');
  onData(null, { error, create });

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  create: actions.searchs.create,
  clearErrors: actions.searchs.clearErrors,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NewSearch);
