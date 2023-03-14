import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DetailHistory from './Component/DetailHistory';
import MainHistory from './Component/MainHistory';

function History() {
	return (
		<Routes>
			<Route exact path='/' element={<MainHistory />} />
			<Route path='/:id' element={<DetailHistory />} />
		</Routes>
	);
}

export default History;
