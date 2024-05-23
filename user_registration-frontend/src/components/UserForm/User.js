import React from 'react';

const User = ({ user, onDelete, onEdit }) => {
  return (
    <li>
      <span>{user.name}</span>
      <span>{user.email}</span>
      <span>{user.dob}</span>
      <button style={{ backgroundColor: 'blue', color: 'white' }} onClick={() => onEdit(user)}>Edit</button>
      <button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => onDelete(user.id)}>Delete</button>
    </li>
  );
};

export default User;
