import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ToastDemo from '../../src/components/ToastDemo';
import toast from 'react-hot-toast';

// Mock the react-hot-toast library
vi.mock('react-hot-toast', () => ({
    default: {
        success: vi.fn(),
    },
}));

describe('ToastDemo', () => {
    it('should show a success toast when the button is clicked', () => {
        render(<ToastDemo />);

        const button = screen.getByRole('button', { name: /toast/i });

        fireEvent.click(button);

        expect(toast.success).toHaveBeenCalledWith('Success');
    });
});