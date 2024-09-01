import { render, screen } from '@testing-library/react';
import ExpandableText from '../../src/components/ExpandableText';

describe('ExpandableText', () => {
    it('should render the full text if less than 255 characters', () => {
        const text = 'Some Short Text';

        render(<ExpandableText text={text} />);    

        expect(screen.getByText(text)).toBeInTheDocument();
    })
})