import { render, screen } from '@testing-library/react';
import ExpandableText from '../../src/components/ExpandableText';

describe('ExpandableText', () => {
    const limit = 255;
    const shortText = 'Some Short Text';
    const longText = 'a'.repeat(limit + 1);
    const truncatedText = longText.substring(0, limit) + '...';

    it('should render the full text if less than 255 characters', () => {
        render(<ExpandableText text={shortText} />);    
        expect(screen.getByText(shortText)).toBeInTheDocument();
    })

    it('should truncate text if longer than 255 characters', () => {
        render(<ExpandableText text={longText} />);    
        expect(screen.getByText(truncatedText)).toBeInTheDocument();

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent(/more/i);
    })
})