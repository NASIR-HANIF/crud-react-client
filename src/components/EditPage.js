import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Define state for form input values
    const [inpval, setINP] = useState({
        name: '',
        age: '',
        work: '',
        mobile: '',
        email: '',
        add: '',
        desc: '',
    });

    // Define state for loading and error handling
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle input change
    const setdata = (e) => {
        const { name, value } = e.target;
        setINP((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Fetch user data
    const getdata = async () => {
        setLoading(true); 
        try {
            const res = await fetch(`/getuser/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }

            const data = await res.json();
            setINP(data);
            setLoading(false); 
        } catch (err) {
            setError(err.message); 
            setLoading(false); 
            console.error('Fetch error:', err);
        }
    };

    useEffect(() => {
        getdata()
       
    }, [id]);

    // Update user data
    const updateuser = async (e) => {
        e.preventDefault();
        setLoading(true); 

        const { name, age, work, mobile, email, add, desc } = inpval;

        try {
            const res2 = await fetch(`/updateuser/${id}`, {
                method: 'PATCH',
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

            if (!res2.ok) {
                // Handle HTTP errors
                throw new Error(`Error: ${res2.status} ${res2.statusText}`);
            }

            const data2 = await res2.json();
            console.log('Updated data:', data2);

            setLoading(false); 
            navigate('/'); 
        } catch (err) {
            setError(err.message); 
            setLoading(false); 
            console.error('Update error:', err);
            alert('Update error: ' + err.message); 
        }
    };

    // Basic validation example
    const validateForm = () => {
        if (!inpval.name) return 'Name is required';
        if (!inpval.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inpval.email)) return 'Valid email is required';
        if (!inpval.mobile || inpval.mobile.length < 10) return 'Valid mobile number is required';
        return null;
    };

    return (
        <div className="container">
            <NavLink className="mt-5" to="/">Home</NavLink>
            <span className="mx-5 mt-5">User Edit Page</span>

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">Error: {error}</p>} 

            <form className="mt-4" onSubmit={updateuser}>
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            onChange={setdata}
                            value={inpval.name}
                            className="form-control"
                            id="name"
                            name="name"
                        />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input
                            type="number"
                            onChange={setdata}
                            value={inpval.age}
                            className="form-control"
                            id="age"
                            name="age"
                        />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="work" className="form-label">Work</label>
                        <input
                            type="text"
                            onChange={setdata}
                            value={inpval.work}
                            className="form-control"
                            id="work"
                            name="work"
                        />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            onChange={setdata}
                            value={inpval.email}
                            className="form-control"
                            id="email"
                            name="email"
                        />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="mobile" className="form-label">Mobile</label>
                        <input
                            type="number"
                            onChange={setdata}
                            value={inpval.mobile}
                            className="form-control"
                            id="mobile"
                            name="mobile"
                        />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            onChange={setdata}
                            value={inpval.add}
                            className="form-control"
                            id="address"
                            name="add"
                        />
                    </div>
                    <div className="mb-3 col-lg-12 col-md-12 col-12">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            value={inpval.desc}
                            onChange={setdata}
                            className="form-control"
                            name="desc"
                            id="description"
                            cols="30"
                            rows="5"
                        ></textarea>
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading || !!validateForm()} 
                >
                    {loading ? 'Updating...' : 'Update'}
                </button>
            </form>
        </div>
    );
};

export default Edit;
