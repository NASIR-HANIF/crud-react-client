import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';

const Home = () => {

    const [getUserData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user data
    const getdata = async () => {
        try {
            setLoading(true);
            const res = await fetch('/getdata', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {

                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }

            const data = await res.json();
            setUserData(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Delete user data
    const deleteuser = async (id) => {
        try {
            const confirmDelete = window.confirm(
                'Are you sure you want to delete this user?'
            );
            if (!confirmDelete) return;

            const res2 = await fetch(`/deleteuser/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res2.ok) {
                throw new Error(`Error: ${res2.status} ${res2.statusText}`);
            }

            const data2 = await res2.json();
            console.log('User deleted:', data2.message);
            getdata();
        } catch (err) {
            setError(err.message);
        }
    };


    useEffect(() => {
        getdata();
    }, []);

    return (
        <>
            <div className=" mt-5">
                <div className="container" >
                    <div className="add_btn mt-2 mb-2">
                        <Link className="btn btn-primary" to="/register">
                            <AddIcon /> Add data
                        </Link>
                    </div>

                    {loading ? (
                        <div>Loading Data...</div>
                    ) : error ? (
                        <div className="alert alert-danger">{error}</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr className="table-dark">
                                        <th scope="col">ID</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Job</th>
                                        <th scope="col">Number</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getUserData.length > 0 ? (
                                        getUserData.map((item, index) => (
                                            <tr key={item._id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.work}</td>
                                                <td>{item.mobile}</td>
                                                <td className="d-flex justify-content-between">
                                                    <NavLink to={`view/${item._id}`}>
                                                        <button className="btn btn-success">
                                                            <RemoveRedEyeIcon />
                                                        </button>
                                                    </NavLink>
                                                    <NavLink to={`edit/${item._id}`}>
                                                        <button className="btn btn-primary">
                                                            <EditIcon />
                                                        </button>
                                                    </NavLink>
                                                    <button
                                                        onClick={() => deleteuser(item._id)}
                                                        className="btn btn-danger"
                                                    >
                                                        <DeleteOutlineIcon />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                No data available.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;



// style={{
//     maxWidth: window.innerWidth < 768 ? '100%' : '1140px !importent',
//     padding: window.innerWidth < 768 ? '0' : '15px',
// }}