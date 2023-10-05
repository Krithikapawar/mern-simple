import React,{useEffect, useState} from 'react';
import { useNavigate,useParams } from 'react-router-dom';

const Update = () => {
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[age,setAge]=useState(0);

const [error,setError]=useState("");
const { id } = useParams();
console.log(id);
const navigate=useNavigate();
async function getSingleUser(id){
  const response= await fetch(`http://localhost:5000/${id}`);
  const result =await response.json();
  if(response.ok){
    setName(result.name);
    setEmail(result.email);
    setAge(result.age);

    }
};

const handleUpdate=async(e)=>{
  e.preventDefault();
      const updatedUser={name,email,age}
      const response=await fetch(`http://localhost:5000/${id}`,{
      method:"PATCH",
      body : JSON.stringify(updatedUser),
      headers:{
        "content-Type":"application/json",
      },
      });
      const result = await response.json();
      if(!response.ok){
        console.log(response.error);
        setError(response.error);
      }
      if(response.ok){
        console.log(result);
        setError("");
        navigate("/all");

      }
}

useEffect(()=>{
  getSingleUser();
},[]);

  return (<div className="container my-2">
      <h1 className="text-center">Edit the data</h1>

  {error && <div class="alert alert-danger">{error}</div>}
  <form className='form'onSubmit={handleUpdate}>
  <div className="mb-3">
  <label className="form-label">Name</label>
  <input type="text" className="form-control" 
  value={name} 
  onChange={(e)=> setName(e.target.value)}/>
</div>
<div className="mb-3">
  <label className="form-label">Email address</label>
  <input type="email" className="form-control"
   value={email} 
   onChange={(e)=> setEmail(e.target.value)}/>
</div>
<div className="mb-3">
  <label className="form-label">Age</label>
  <input type="number" className="form-control"
   value={age} 
   onChange={(e)=> setAge(e.target.value)}/>
</div>
<button type="submit" className="btn btn-primary">Update</button>
</form>
</div>);
};

export default Update;