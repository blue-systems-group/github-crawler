import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Navigation from '../navigation';

storiesOf('core.Navigation', module)
  .add('default view', () => (<Navigation />)
);
