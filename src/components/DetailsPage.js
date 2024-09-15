import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import { CardContent, Avatar } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

const Details = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); 

  // Fetch user data
  const getData = async () => {
    try {
      const response = await fetch(`/getuser/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUserData(data);
      console.log('Data retrieved successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
        'Are you sure you want to delete this user?'
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/deleteuser/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      console.log('User deleted successfully');
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getData(); 
  }, [id]); 

  if (!userData) {
    return <div>Loading...</div>; 
  }

  // Extract user data properties with default fallbacks
  const { _id, name = 'N/A', age = 'N/A', email = 'N/A', work = 'N/A', mobile = 'N/A', add = 'N/A', desc = 'N/A' } = userData;

  return (
    <div className="container mt-3">
      <h1 className="welcome-text">Welcome, {name}</h1>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className="action-buttons">
            <NavLink to={`/edit/${_id}`}>
              <button className="btn btn-primary mx-2" aria-label="Edit User">
                <EditIcon />
              </button>
            </NavLink>
            <button onClick={() => deleteUser(_id)} className="btn btn-danger" aria-label="Delete User">
              <DeleteOutlineIcon />
            </button>
          </div>

          <div className="row">
            <div className="left-view col-lg-6 col-md-6 col-12">
              <Avatar alt="profile" src="/profile.webp" />

              <h3 className="mt-3">
                Name: <span>{name}</span>
              </h3>
              <h3 className="mt-3">
                Age: <span>{age}</span>
              </h3>
              <p className="mt-3">
                <MailOutlineIcon /> Email: <span>{email}</span>
              </p>
              <p className="mt-3">
                <WorkOutlineIcon /> Occupation: <span>{work}</span>
              </p>
            </div>
            <div className="right-view col-lg-6 col-md-6 col-12">
              <p className="mt-5">
                <PhoneIphoneOutlinedIcon /> Mobile: <span>{mobile}</span>
              </p>
              <p className="mt-3">
                <PlaceOutlinedIcon /> Location: <span>{add}</span>
              </p>
              <p className="mt-3">
                Description: <span>{desc}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
