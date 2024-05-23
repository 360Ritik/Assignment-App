import React, { useEffect, useState } from 'react';
import './UserList.css';


// Import the API functions
import { getUsers, deleteUser, updateUser } from '../../services/UserService'; // Adjust the path if necessary

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null); // Store the user being edited
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    DateOfBirth: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; 
  };

  const handleDelete = async (user) => {
    try {
      if (!user.ID) {
        console.error("User object passed to handleDelete is missing ID property");
        return;
      }
      await deleteUser(user.ID);
      const updatedUsers = users.filter(u => u.ID !== user.ID);
      setUsers(updatedUsers);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!editingUser || !editingUser.ID) {
        console.error("Editing user object is missing ID property");
        return;
      }
      const updatedUser = await updateUser(editingUser.ID, formData);
      const updatedUsers = users.map(user =>
        user.ID === updatedUser.ID ? updatedUser : user
      );
      setUsers(updatedUsers);
      setEditingUser(null);
      setFormData({ Name: '', Email: '', DateOfBirth: '' }); // Reset form data after update
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      Name: user.Name,
      Email: user.Email,
      DateOfBirth: formatDate(user.DateOfBirth)
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <table className="user-list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.ID || index}>
              <td>{user.Name}</td>
              <td>{user.Email}</td>
              <td>{formatDate(user.DateOfBirth)}</td>
              <td>
                <button className="update-button" onClick={() => handleEdit(user)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(user)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Render UpdateForm only when editingUser is not null */}
      {editingUser && (
        <div className="update-form">
          <h3>Edit User</h3>
          <input type="text" name="Name" value={formData.Name} onChange={handleChange} />
          <input type="email" name="Email" value={formData.Email} onChange={handleChange} />
          <input type="date" name="DateOfBirth" value={formData.DateOfBirth} onChange={handleChange} />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
};

export default UserList;
