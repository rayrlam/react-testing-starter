import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Greet from '../../src/components/Greet';
import '@testing-library/jest-dom/vitest';

describe('Greet', () => {
    it('should render Hellow with the name when name is provided', () => {
        render(<Greet name="Ray" />);

        const heading = screen.getByRole('heading');
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(/ray/i);
    })

    it('should render login button when name is not provided', () => {
        render(<Greet name="" />);

        const heading = screen.getByRole('button');
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(/login/i);
    })
})