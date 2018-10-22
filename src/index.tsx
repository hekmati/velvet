import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { VelvetApp } from './App';
import './index.css';
import { store } from './store';
import history from './store/history';

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <LocaleProvider locale={enUS}>
          <VelvetApp />
        </LocaleProvider>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  );

// We first render the application
render();

// if (process.env.NODE_ENV !== 'production') {
//   // If webpacks HMR detects a change in the VelvetApp, we reload it
//   const moduleAsAny = module as any;
//   if (moduleAsAny.hot) {
//     moduleAsAny.hot.accept('./App', () => {
//       render();
//     });
//   }
// }
