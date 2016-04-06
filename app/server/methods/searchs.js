import { Meteor } from 'meteor/meteor';
import { Searchs } from '../../lib/collections';
import { gitHubSearch } from '../lib';
import { check } from 'meteor/check';

export default function () {
  Meteor.methods({
    'searchs.create'(_id, query) {
      check(_id, String);
      check(query, String);

      // // Demo the latency compensations (Delete this in production)
      // Meteor._sleepForMs(500);

      const createdAt = new Date();
      const searching = true;
      const search = { _id, query, createdAt, searching };
      Searchs.insert(search);
      gitHubSearch(search);
    },

    'searchs.delete'(_id) {
      check(_id, String);
      if (!Searchs.findOne({ _id })) {
        throw new Meteor.Error(404, `id ${_id} not found!`);
      }
      return Searchs.remove({ _id });
    },
  });
}
