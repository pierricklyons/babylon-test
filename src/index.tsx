import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DemoScene from './components/DemoScene'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<DemoScene/>
	</React.StrictMode>
);