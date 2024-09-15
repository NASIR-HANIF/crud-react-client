import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [inpval, setINP] = useState({
    name: '',
    age: '',
    work: '',
    mobile: '',
    email: '',
    add: '',
    desc: '',
  });

  // Improved error state handling
  const [error, setError] = useState(null);

  // Improved success message handling
  const [success, setSuccess] = useState(null);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setINP((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Destructuring input values
    const { name, age, work, mobile, email, add, desc } = inpval;

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          age,
          work,
          mobile,
          email,
          add,
          desc,
        }),
      });

      const data = await response.json();

      // Enhanced error handling
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      setSuccess('Data added successfully!');
      setError(null);

      // Redirect after success
      navigate('/');
    } catch (error) {
      setError(error.message);
      setSuccess(null);
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <NavLink className="mt-5" to="/">
        Home
      </NavLink>

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="row">
         
          {[
            { label: 'Name', type: 'text', name: 'name', value: inpval.name },
            { label: 'Age', type: 'number', name: 'age', value: inpval.age },
            { label: 'Work', type: 'text', name: 'work', value: inpval.work },
            { label: 'Email', type: 'email', name: 'email', value: inpval.email },
            { label: 'Mobile', type: 'number', name: 'mobile', value: inpval.mobile },
            { label: 'Address', type: 'text', name: 'add', value: inpval.add },
          ].map((field, index) => (
            <div className="mb-3 col-lg-6 col-md-6 col-12" key={index}>
              <label htmlFor={field.name} className="form-label">
                {field.label}
              </label>
              <input
                type={field.type}
                onChange={handleInputChange}
                value={field.value}
                className="form-control"
                id={field.name}
                name={field.name}
              />
            </div>
          ))}
          <div className="mb-3 col-lg-12 col-md-12 col-12">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              value={inpval.desc}
              onChange={handleInputChange}
              className="form-control"
              name="desc"
              id="description"
              cols="30"
              rows="5"
            ></textarea>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>

      {/* Error message display */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {/* Success message display */}
      {success && <div className="alert alert-success mt-3">{success}</div>}
    </div>
  );
};

export default Register;
