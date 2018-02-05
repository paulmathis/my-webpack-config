import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './Components/App';

// TODO: replace any type
const render = (Component: any) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  // Skip reloading index
  module.hot.decline('./index.tsx');
  module.hot.accept('./Components/App', () => {
    const NextApp = require('./Components/App').default;
    render(NextApp);
  });
}
