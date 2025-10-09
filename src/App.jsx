import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from './components/Sidebar';

export default function App() {
	return (
		<>
			<Sidebar />

			<main>
				<Outlet />
			</main>
		</>
	);
}
