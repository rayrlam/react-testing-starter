import { describe, it, expect, vi  } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductDetailPage from '../../src/pages/ProductDetailPage';
import { useParams } from 'react-router-dom';
import useProduct from '../../src/hooks/useProduct';

// Mock the modules
vi.mock('react-router-dom', () => ({
    useParams: vi.fn(),
}));

// Mock useProduct hook
vi.mock('../../src/hooks/useProduct', () => ({
    default: vi.fn(),
}));

describe('ProductDetailPage', () => {
    it('displays loading state', () => {
        (useParams as any).mockReturnValue({ id: '1' });
        (useProduct as any).mockReturnValue({
            data: undefined,
            isLoading: true,
            error: null,
        });
  
        render(<ProductDetailPage />);
        expect(screen.getByText('Loading...')).toBeDefined();
    });
  
    it('displays error message', () => {
        (useParams as any).mockReturnValue({ id: '1' });
        (useProduct as any).mockReturnValue({
            data: undefined,
            isLoading: false,
            error: new Error('Test error'),
        });

        render(<ProductDetailPage />);
        expect(screen.getByText('Error: Test error')).toBeDefined();
    });
  
    it('displays not found message when product is null', () => {
        (useParams as any).mockReturnValue({ id: '1' });
        (useProduct as any).mockReturnValue({
            data: null,
            isLoading: false,
            error: null,
        });
  
        render(<ProductDetailPage />);
        expect(screen.getByText('The given product was not found.')).toBeDefined();
    });
  
    it('displays product details', () => {
        (useParams as any).mockReturnValue({ id: '1' });
        (useProduct as any).mockReturnValue({
            data: { id: 1, name: 'Test Product', price: 9.99 },
            isLoading: false,
            error: null,
        });

        render(<ProductDetailPage />);
        expect(screen.getByText('Test Product')).toBeDefined();
        expect(screen.getByText('$9.99')).toBeDefined();
    });
});