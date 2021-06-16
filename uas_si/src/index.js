import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducer/globalReducer'
import App from './App';
import { BrowserRouter } from 'react-router-dom';

//Store
const reduxStore = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
      {/* <Main /> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
