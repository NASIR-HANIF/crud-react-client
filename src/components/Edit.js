import React, { useState ,useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';




const Edit = () => {
  const { id } = useParams("");
 
  const navegate =   useNavigate()


  const [inpval, setINP] = useState({
    name: "",
    age: "",
    work: "",
    mobile: "",
    email: "",
    add: "",
    desc: ""
  })
  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value
      }
    })
  }


  const getdata = async () => {

    const res = await fetch(`/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json();
    if (res.status === 404 || res.status === 422 || !data) {
      console.log("error")
    } else {
      setINP(data)
    }
  }

  useEffect(() => {
    getdata();
  }, [])

  const updateuser = async (e) => {
    e.preventDefault();

    const { name, age, work, mobile, email, add, desc } = inpval
    
    const res2 = await fetch(`/updateuser/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, age, work, mobile, email, add, desc
      })

    })
    const data2 = await res2.json();
    console.log(data2)

    if(res2.status === 422 || res2.status === 403 || res2.status === 404 || !data2){
      
      console.log("error")
      alert("error")
    }else{
     
      console.log("data added")
      navegate("/")
    }
  }

  return (
    <div className='container'>
      <NavLink className=" mt-5" to="/">Home</NavLink>
      <span className='mx-5 mt-5'>User Edit Page</span>
      <form className='mt-4'>
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" onChange={setdata} value={inpval.name} className="form-control" id="name" name='name' />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="age" className="form-label">Age</label>
            <input type="text" onChange={setdata} value={inpval.age} className="form-control" id="age" name='age' />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="work" className="form-label">Work</label>
            <input type="text" onChange={setdata} value={inpval.work} className="form-control" id="work" name='work' />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" onChange={setdata} value={inpval.email} className="form-control" id="email" name='email' />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="mobile" className="form-label">Mobile</label>
            <input type="number" onChange={setdata} value={inpval.mobile} className="form-control" id="mobile" name='mobile' />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" onChange={setdata} value={inpval.add} className="form-control" id="address" name='add' />
          </div>
          <div className="mb-3 col-lg-12 col-md-12 col-12">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea value={inpval.desc} onChange={setdata} className="form-control" name="desc" id="description" cols="30" rows="5"></textarea>
          </div>
        </div>
        <button type='submit' onClick={updateuser} className='btn btn-primary w-100'>Submit</button>
      </form>
    </div>
  )
}

export default Edit