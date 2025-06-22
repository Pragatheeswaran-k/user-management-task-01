import { useState } from 'react';
import { authService } from '../services/auth.service';
import RegisteredUserList from '../components/List';

/**
 * Page component to display the header and user list.
 */
export const UserListPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

  /**
   * Logs out the current user and updates authentication state.
   */
  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">👥 User Management System</h1>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-sm font-medium text-red-600 border border-red-500 px-4 py-2 rounded-md hover:bg-red-50 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <RegisteredUserList />
      </main>
    </div>
  );
};
