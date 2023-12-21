import React, { useEffect, useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';





const Home = () => {

    const [getUserData, setUserData] = useState([])

    const getdata = async () => {
        const res = await fetch("/getdata", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json();

        if (res.status === 404 || res.status === 422 || !data) {
            console.log("error")
        } else {
            setUserData(data)
        }
    }

    const deleteuser = async (id) => {
        const res2 = await fetch(`/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data2 = await res2.json();

        if (res2.status === 404 || res2.status === 422 || !data2) {
            console.log("error")
        } else {
            console.log("user delete")
            getdata()
        }
    }



    useEffect(() => {
        getdata()
    }, [getdata])

    return (
        <>
            <div className='mt-5'>
                <div className="container">
                    <div className="add_btn mt-2 mb-2">

                        <Link className='btn btn-primary' to="/register"> <AddIcon /> Add data</Link>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr className="table-dark">
                                    <th scope="col">id</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Job</th>
                                    <th scope="col">Number</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    getUserData.map((item, id) => {
                                        return (
                                            <>
                                                <tr >
                                                    <th scope="row">{id + 1}</th>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.work}</td>
                                                    <td>{item.mobile}</td>
                                                    <td className='d-flex justify-content-between'>
                                                        <NavLink to={`view/${item._id}`}><button className='btn btn-success'><RemoveRedEyeIcon /></button> </NavLink>
                                                        <NavLink to={`edit/${item._id}`}> <button className='btn btn-primary'><EditIcon /></button></NavLink>
                                                        <button onClick={() => deleteuser(item._id)} className='btn btn-danger'><DeleteOutlineIcon /></button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home