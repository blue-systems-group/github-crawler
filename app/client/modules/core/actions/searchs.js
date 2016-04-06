const NEW_SEARCH_ERROR = 'NEW_SEARCH_ERROR';
const DEL_SEARCH_ERROR = 'DEL_SEARCH_ERROR';

export default {
  create({ Meteor, LocalState }, query) {
    if (!query) {
      return LocalState.set(NEW_SEARCH_ERROR, 'Query is required!');
    }

    const id = Meteor.uuid();
    Meteor.call('searchs.create', id, query, (err) => {
      if (err) {
        LocalState.set(NEW_SEARCH_ERROR, err.message);
      }
    });

    return LocalState.set(NEW_SEARCH_ERROR, null);
  },

  delSearch({ Meteor, FlowRouter, LocalState }, id) {
    Meteor.call('searchs.delete', id, (err) => {
      if (err) {
        LocalState.set(DEL_SEARCH_ERROR, err.message);
      } else {
        FlowRouter.go('/');
      }
    });
  },

  clearErrors({ LocalState }) {
    LocalState.set(NEW_SEARCH_ERROR, null);
    LocalState.set(DEL_SEARCH_ERROR, null);
  },
};
