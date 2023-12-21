import React, { useEffect ,useState} from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import { CardContent, Avatar } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { NavLink, useParams,useNavigate } from 'react-router-dom';



const Details = () => {
const {id} = useParams("")
const navigate = useNavigate()
const [getUserData, setUserData] = useState([])

  const getdata = async () => {
    const res = await fetch(`/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json();
    if(res.status === 404 || res.status === 422 || !data){
      console.log("error")
    }else{
        setUserData(data)
      console.log("get data")
      
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
    console.log(data2)
    
    if (res2.status === 404 || res2.status === 422 || !data2) {
        console.log("error")
    } else {
        console.log("user delete")
        navigate("/")
    }
}


useEffect(()=>{
  getdata()
},[])

  return (
    <div className='container mt-3'>
      <h1 style={{ fontWeight: 400 }}>WELCOME NASIR HANIF</h1>

      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
        <div className='add_btn'>  
        <NavLink to={`/edit/${getUserData._id}`}> <button className='btn btn-primary mx-2'><EditIcon /></button></NavLink>
                <button onClick={()=>deleteuser(getUserData._id)}  className='btn btn-danger'>
                  <DeleteOutlineIcon />
                </button>
              </div>
          <div className="row">
            <div className="left_view  col-lg-6 col-md-6 col-12">
              <Avatar alt="profile" src="/profile.webp" />

              <h3 className='mt-3'>Name : <span >{getUserData.name}</span></h3>
              <h3 className='mt-3'>Age : <span >{getUserData.age}</span></h3>
              <p className='mt-3'> <MailOutlineIcon /> Email : <span>{getUserData.email}</span></p>
              <p className='mt-3'> <WorkOutlineIcon /> Occupation : <span>{getUserData.work}</span></p>
            </div>
            <div className="right_view col-lg-6 col-md-6 col-12">
             
              <p className='mt-5'> <PhoneIphoneOutlinedIcon /> Mobile : <span>{getUserData.mobile}</span></p>
              <p className='mt-3'> <PlaceOutlinedIcon /> Location : <span>{getUserData.add}</span></p>
              <p className='mt-3'>Description: <span>{getUserData.desc}</span></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Details