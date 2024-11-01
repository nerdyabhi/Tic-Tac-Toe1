import { describe, it, expect } from 'vitest';
import Board from './Board';

describe('Board Component', () => {
	it('renders correctly', () => {
		const board = shallow(<Board />);
		expect(board).toBeTruthy();
	});

	it('has the correct initial state', () => {
		const board = shallow(<Board />);
		expect(board.state().someState).toBe(initialValue);
	});
});