import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import {Provider} from "react-redux";
// import { store } from './Feature/Store.ts';

const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(
<React.StrictMode>
             <App/>
</React.StrictMode>
)