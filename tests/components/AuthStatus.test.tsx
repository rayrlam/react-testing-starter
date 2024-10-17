import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AuthStatus from '../../src/components/AuthStatus';
import { useAuth0 } from "@auth0/auth0-react";

// Mock the useAuth0 hook
vi.mock("@auth0/auth0-react");

// Mock the log in & log out buttons
vi.mock('./LoginButton', () => ({ default: () => <button>Log In</button>}));
vi.mock('./LogoutButton', () => ({ default: () => <div>Log Out</div> }));

describe('AuthStatus', () => {
  const mockUseAuth0 = (isLoading: boolean, isAuthenticated: boolean, user: any = null) => {
    (useAuth0 as any).mockReturnValue({
      isLoading,
      isAuthenticated,
      user,
    });
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders loading state', () => {
    mockUseAuth0(true, false);
    render(<AuthStatus />);
    expect(screen.getByText('Loading...')).toBeDefined();
  });

  it('renders log in button when not authenticated', () => {
    mockUseAuth0(false, false);
    render(<AuthStatus />);
    expect(screen.getByText('Log In')).toBeDefined();
  });

  it('renders user name and log out button when authenticated', () => {
    mockUseAuth0(false, true, { name: 'Ray Lam' });
    render(<AuthStatus />);
    expect(screen.getByText('Ray Lam')).toBeDefined();
    expect(screen.getByText('Log Out')).toBeDefined();
  });
});