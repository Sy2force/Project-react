import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthGuard from '../../src/components/AuthGuard.jsx';
import { AuthProvider } from '../../src/contexts/AuthProvider.jsx';

// Mock useAuth hook
const mockUseAuth = vi.fn();
vi.mock('../../src/hooks/useAuth.jsx', () => ({
  useAuth: () => mockUseAuth()
}));

// Mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

const TestComponent = () => <div>Protected Content</div>;

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('AuthGuard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading spinner when auth is loading', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: true,
      error: null
    });

    renderWithRouter(
      <AuthGuard>
        <TestComponent />
      </AuthGuard>
    );

    expect(screen.getByTestId('auth-loading')).toBeInTheDocument();
  });

  it('redirects to login when user is not authenticated', async () => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: false,
      error: null
    });

    renderWithRouter(
      <AuthGuard>
        <TestComponent />
      </AuthGuard>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
    });
  });

  it('renders children when user is authenticated and has required role', () => {
    mockUseAuth.mockReturnValue({
      user: { id: 1, email: 'test@test.com', role: 'user' },
      loading: false,
      error: null
    });

    renderWithRouter(
      <AuthGuard allowedRoles={['user']}>
        <TestComponent />
      </AuthGuard>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects when user does not have required role', async () => {
    mockUseAuth.mockReturnValue({
      user: { id: 1, email: 'test@test.com', role: 'user' },
      loading: false,
      error: null
    });

    renderWithRouter(
      <AuthGuard allowedRoles={['admin']}>
        <TestComponent />
      </AuthGuard>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
    });
  });

  it('allows admin access to all roles', () => {
    mockUseAuth.mockReturnValue({
      user: { id: 1, email: 'admin@test.com', role: 'admin' },
      loading: false,
      error: null
    });

    renderWithRouter(
      <AuthGuard allowedRoles={['business']}>
        <TestComponent />
      </AuthGuard>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
});
