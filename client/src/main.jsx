import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import StudentProvider from './context/studentContext.jsx'
import { persistor, store } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'


ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
<StudentProvider>
<App/>
</StudentProvider>
</PersistGate>
</Provider>
)