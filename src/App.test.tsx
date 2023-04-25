import React from 'react';
import { render, screen } from '@testing-library/react';
import Scene from './Scene';

test('renders learn react link', () => {
	render(<Scene />);
	const linkElement = screen.getByText(/learn react/i);
	expect(linkElement).toBeInTheDocument();
});
