import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, editUser, deleteUser } from '../services/user.service';

interface User {
  id: number;
  username: string;
  email: string;
}

/**
 * Displays a list of users with options to add, edit, and delete (with modal).
 */
const RegisteredUserList: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [editUserId, setEditUserId] = useState<number | null>(null);
const [editForm, setEditForm] = useState({ username: '', email: '' });

/**
 * Opens the edit modal with selected user data.
 * @param id - ID of the user to edit
 */
const handleEdit = (id: number) => {
  const user = users.find((u) => u.id === id);
  if (user) {
    setEditUserId(id);
    setEditForm({ username: user.username, email: user.email });
  }
};

/**
 * Handles form field changes inside edit modal.
 */
const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setEditForm((prev) => ({ ...prev, [name]: value }));
};

/**
 * Submits updated user info to backend and updates local state.
 */
const handleEditSubmit = async () => {
  if (!editForm.username.trim() || !editForm.email.trim()) return;
  try {
    const updated = await editUser(editUserId!, editForm);
    setUsers(users.map((u) => (u.id === editUserId ? { ...u, ...updated } : u)));
    setEditUserId(null);
  } catch (err) {
    alert('Failed to update user');
    console.error(err);
  }
};

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  /**
   * Navigates to the registration page.
   */
  const handleCreate = () => navigate('/register');

  /**
   * Confirms user deletion after modal approval.
   */
  const confirmDelete = () => {
    if (deleteUserId !== null) {
      console.log(`Delete user with id: ${deleteUserId}`);
      handleDelete(deleteUserId)
      // Call API to delete here
      setDeleteUserId(null);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      alert('Failed to delete user');
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border">
      <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">Users</h2>
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md shadow transition"
        >
          + Add User
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading users...</div>
      ) : users.length > 0 ? (
        <ul className="divide-y divide-gray-100">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
            >
              <div>
                <p className="text-base font-medium text-gray-900">{user.username}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEdit(user.id)}
                  className="px-4 py-1.5 border border-blue-500 text-blue-500 text-sm font-medium rounded hover:bg-blue-500 hover:text-white transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteUserId(user.id)}
                  className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium rounded transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-10 text-gray-500 text-sm">
          No users found. Click "Add User" to get started.
        </div>
      )}

      {/* Modal */}
      {deleteUserId !== null && (
        <div className="fixed inset-0 z-10 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Confirm Deletion</h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteUserId(null)}
                className="px-4 py-2 rounded-md text-sm border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-md text-sm bg-red-600 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editUserId !== null && (
  <div className="fixed inset-0 z-20 bg-black/30 flex items-center justify-center">
    <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Edit User</h2>
      <div className="space-y-2">
        <input
          type="text"
          name="username"
          value={editForm.username}
          onChange={handleEditChange}
          placeholder="Username"
          className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="email"
          name="email"
          value={editForm.email}
          onChange={handleEditChange}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={() => setEditUserId(null)}
          className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleEditSubmit}
          className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default RegisteredUserList;
