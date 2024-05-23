

const UpdateForm = ({ formData, handleChange, handleUpdate }) => {
  return (
    <div className="update-form">
      <h3>Edit User</h3>
      <input type="text" name="Name" value={formData.Name} onChange={handleChange} />
      <input type="email" name="Email" value={formData.Email} onChange={handleChange} />
      <input type="date" name="DateOfBirth" value={formData.DateOfBirth} onChange={handleChange} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateForm;
