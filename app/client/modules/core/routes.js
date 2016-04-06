import React from 'react';
import { mount } from 'react-mounter';

import MainLayout from './components/main_layout';
import SearchList from './containers/searchlist';
import Search from './containers/search';
// import Post from './containers/post';
// import NewPost from './containers/newpost';

export default function (injectDeps, { FlowRouter }) {
  const MainLayoutCtx = injectDeps(MainLayout);

  FlowRouter.route('/', {
    name: 'search.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => <SearchList />,
      });
    },
  });

  FlowRouter.route('/search/:searchId', {
    name: 'searchs.single',
    action({ searchId }) {
      mount(MainLayoutCtx, {
        content: () => (<Search {...{ searchId }} />),
      });
    },
  });
  //
  // FlowRouter.route('/new-post', {
  //   name: 'newpost',
  //   action() {
  //     mount(MainLayoutCtx, {
  //       content: () => (<NewPost />)
  //     });
  //   }
  // });
}
