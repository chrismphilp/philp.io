import React from 'react';
import ReactDOM from 'react-dom';
import Index from '../pages';
import { Provider } from 'react-redux';
import configureStore from '../src/redux';

test('renders without crashing', () => {
  const div = document.createElement('div');
  const store = configureStore();
  ReactDOM.render(<Provider store={store}><Index/></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
