import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import QuantitySelector from '../../src/components/QuantitySelector';
import { useCart } from "../../src/hooks/useCart";
import { Product } from '../../src/entities';

vi.mock('../../src/hooks/useCart', () => ({
  useCart: vi.fn(),
}));

describe('QuantitySelector', () => {
  const mockProduct: Product = { 
    id: 1, 
    name: 'Test Product', 
    price: 10,
    categoryId: 1
  };

  it('renders "Add to Cart" button when item is not in cart', () => {
    const mockCartContext = {
      getItem: vi.fn().mockReturnValue(null),
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
    };

    (useCart as ReturnType<typeof vi.fn>).mockReturnValue(mockCartContext);

    render(<QuantitySelector product={mockProduct} />);

    const addButton = screen.getByText('Add to Cart');
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);
    expect(mockCartContext.addToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('renders quantity selector when item is in cart', () => {
    const mockCartContext = {
      getItem: vi.fn().mockReturnValue({ quantity: 2 }),
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
    };

    (useCart as ReturnType<typeof vi.fn>).mockReturnValue(mockCartContext);

    render(<QuantitySelector product={mockProduct} />);

    const quantityText = screen.getByText('2');
    expect(quantityText).toBeInTheDocument();

    const decreaseButton = screen.getByText('-');
    const increaseButton = screen.getByText('+');

    fireEvent.click(decreaseButton);
    expect(mockCartContext.removeFromCart).toHaveBeenCalledWith(mockProduct);

    fireEvent.click(increaseButton);
    expect(mockCartContext.addToCart).toHaveBeenCalledWith(mockProduct);
  });
});