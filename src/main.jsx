import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element={<div>Home</div>} />
					<Route path="about" element={<div>About</div>} />
					<Route path="projects" element={<div>Projects</div>} />
					<Route path="contact" element={<div>Contact</div>} />
					<Route path="*" element={<div>404 Not Found</div>} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
