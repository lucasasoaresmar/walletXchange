import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { DB } from './DB/dataBase.js'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

DB.loadStorage()

ReactDOM.render(
	<Provider store={ store } >
		<App />
	</Provider>,
	document.getElementById('root'))
registerServiceWorker()
