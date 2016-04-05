import React from 'react';
import { mount } from 'react-mounter';

import MainLayout from './components/main_layout';
import SearchList from './containers/searchlist';
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

  // FlowRouter.route('/post/:postId', {
  //   name: 'posts.single',
  //   action({ postId }) {
  //     mount(MainLayoutCtx, {
  //       content: () => (<Post postId={postId} />)
  //     });
  //   }
  // });
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
