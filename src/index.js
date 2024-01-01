// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import './styles/main.scss';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import './styles/main.scss';
import './helpers/axios.interceptor';
import MainRoutes from './routes/mainRoutes';
import { store, persistor } from './store/store';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <MainRoutes />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
