const NEW_SEARCH_ERROR = 'NEW_SEARCH_ERROR';

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

  clearErrors({ LocalState }) {
    return LocalState.set(NEW_SEARCH_ERROR, null);
  },
};
