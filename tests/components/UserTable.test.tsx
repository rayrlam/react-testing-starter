import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserTable from '../../src/components/UserTable';
import { User } from '../../src/entities';

describe('UserTable', () => {
    it('display "No users available" when users array is empty', () => {
        render(<UserTable users={[]} />);
        expect(screen.getByText('No users available.')).toBeDefined();
    });

    it('renders table with correct headers when users are provided', () => {
        const users: User[] = [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Peter Pan' },
        ];

        render(<UserTable users={users} />);

        expect(screen.getByRole('table')).toBeDefined();
        expect(screen.getByText('ID')).toBeDefined();
        expect(screen.getByText('Name')).toBeDefined();
    });

    it('renders correct number of rows for provided users', () => {
        const users: User[] = [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Peter Pan' },
        ];

        render(<UserTable users={users} />);

        const rows = screen.getAllByRole('row');
        // +1 for the header row
        expect(rows.length).toBe(users.length + 1);
    });

    it('renders correct user data in each row', () => {
        const users: User[] = [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Peter Pan' },
        ];

        render(<UserTable users={users} />);

        users.forEach(user => {
            expect(screen.getByText(user.id.toString())).toBeDefined();
            expect(screen.getByText(user.name)).toBeDefined();
        });
    });

    it('renders edit link for each user', () => {
        const users: User[] = [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Peter Pan' },
        ];

        render(<UserTable users={users} />);

        const editLinks = screen.getAllByText('Edit');
        expect(editLinks.length).toBe(users.length);

        editLinks.forEach((link, index) => {
            expect(link.getAttribute('href')).toBe(`/users/${users[index].id}`);
        });
    });
});