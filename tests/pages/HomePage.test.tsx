
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../../src/pages/HomePage';

// Mock the Label component
vi.mock('../../src/components/Label', () => ({
    default: ({ labelId }: { labelId: string }) => (
        <div data-testid="mock-label">{labelId}</div>
    ),
}));

describe('HomePage', () => {
    it('renders the home page title', () => {
        render(<HomePage />);
        const titleElement = screen.getByText(/Home Page/i);
        expect(titleElement).toBeDefined();
    });

    it('renders the Label component with correct labelId', () => {
        render(<HomePage />);
        const labelElement = screen.getByTestId('mock-label');
        expect(labelElement).toBeDefined();
        expect(labelElement.textContent).toBe('welcome');
    });
});