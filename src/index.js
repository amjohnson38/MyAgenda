import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
//Provider component from react-redux passes down its store to the entire application
import { Provider } from 'react-redux';
//Store creation
import {createStore} from 'redux';
//reducer takes the state and action and returns a new state.  Never mutate the state directly
import reducer from './reducers';
import './index.css';
import WebFont from 'webfontloader';


WebFont.load({
  google: {
    families: ['Pacifico', 'cursive']
  }
});

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
     document.getElementById('root')
)

