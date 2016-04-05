import React, { PropTypes } from 'react';
import Navigation from './navigation';

const Layout = ({ content = () => null }) => (
  <div>
    <header>
      <h1>Mantra Voice</h1>
      <Navigation />
    </header>
    <div>
      {content()}
    </div>
  </div>
);

Layout.propTypes = {
  content: PropTypes.func.isRequired,
};

export default Layout;
