import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addUser, updateUser } from '../../services/UserService';
import { useNavigate, useLocation } from 'react-router-dom';
import '../UserForm/UserForm.css';

const UserForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state ? location.state.user : null;

  const formik = useFormik({
    initialValues: {
      Name: user ? user.Name : '',
      Email: user ? user.Email : '',
      DateOfBirth: user ? user.DateOfBirth : '',
    },
    validationSchema: Yup.object({
      Name: Yup.string().required('Name is required'),
      Email: Yup.string().email('Invalid email address').required('Email is required'),
      DateOfBirth: Yup.date().required('Date of Birth is required'),
    }),
    onSubmit: async (values) => {
      if (user) {
        await updateUser(user.ID, values);
      } else {
        await addUser(values);
      }
      navigate('/welcome');
    },
  });

  return (
    <div className="container">
      <h2 className="title">User Registration</h2>
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="field">
          <label className="label">Name</label>
          <input
            type="text"
            name="Name"
            onChange={formik.handleChange}
            value={formik.values.Name}
            className="input"
          />
          {formik.touched.Name && formik.errors.Name && (
            <div className="error">{formik.errors.Name}</div>
          )}
        </div>
        <div className="field">
          <label className="label">Email</label>
          <input
            type="email"
            name="Email"
            onChange={formik.handleChange}
            value={formik.values.Email}
            className="input"
          />
          {formik.touched.Email && formik.errors.Email && (
            <div className="error">{formik.errors.Email}</div>
          )}
        </div>
        <div className="field">
          <label className="label">Date of Birth</label>
          <input
            type="date"
            name="DateOfBirth"
            onChange={formik.handleChange}
            value={formik.values.DateOfBirth}
            className="input"
          />
          {formik.touched.DateOfBirth && formik.errors.DateOfBirth && (
            <div className="error">{formik.errors.DateOfBirth}</div>
          )}
        </div>
        <button type="submit" className="button">
          Save
        </button>
      </form>
    </div>
  );
};

export default UserForm;
