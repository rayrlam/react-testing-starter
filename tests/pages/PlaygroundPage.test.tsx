import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Onboarding from '../../src/components/Onboarding';
 
// isolation: By mocking the Radix UI Button component
vi.mock('@radix-ui/themes', () => ({
    Button: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
        <button onClick={onClick}>{children}</button>
    ),
}));

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn()
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Onboarding', () => {
    beforeEach(() => {
        localStorageMock.getItem.mockClear();
        localStorageMock.setItem.mockClear();
        localStorageMock.clear();
    });

    it('renders the welcome message and button when tutorial is not completed', () => {
        localStorageMock.getItem.mockReturnValue(null);
        render(<Onboarding />);

        expect(screen.getByText('Welcome to our app!')).toBeInTheDocument();
        expect(screen.getByText('Complete the tutorial to get started.')).toBeInTheDocument();
        expect(screen.getByText('Mark Tutorial as Completed')).toBeInTheDocument();
    });

    it('renders the welcome back message when tutorial is completed', () => {
        localStorageMock.getItem.mockReturnValue('true');
        render(<Onboarding />);

        expect(screen.getByText('Welcome back!')).toBeInTheDocument();
        expect(screen.getByText("You've already completed the tutorial.")).toBeInTheDocument();
    });

    it('marks the tutorial as completed when button is clicked', () => {
        localStorageMock.getItem.mockReturnValue(null);
        render(<Onboarding />);

        const button = screen.getByText('Mark Tutorial as Completed');
        fireEvent.click(button);

        expect(localStorageMock.setItem).toHaveBeenCalledWith('tutorialCompleted', 'true');
        expect(screen.getByText('Welcome back!')).toBeInTheDocument();
    });
});
