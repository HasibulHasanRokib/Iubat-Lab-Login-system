import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import StudentProvider from './context/studentContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
<StudentProvider>
<App/>
</StudentProvider>
)