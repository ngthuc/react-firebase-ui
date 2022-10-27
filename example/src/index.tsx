import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import ReactGA from 'react-ga';

ReactGA.initialize('G-DT98KPH3DN');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App/>);