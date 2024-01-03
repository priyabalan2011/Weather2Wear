import React from 'react';
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function ListCloths() {
    const [records, setRecords] = useState([]);
    const navigate=useNavigate();
    async function fetchProductData() {
     
      let response = await fetch('http://localhost:8080/cloths',{method:'GET'});
      let data = await response.json();
      // do stuff with data
      console.log(data);
      if(data) { setRecords(data) }
      }
      //fetchProductData();
  
      useEffect(() => {
        fetchProductData();
      }, []);

      const LoadEdit = (id) => {
        navigate("/cloths/edit/" + id);
    }
    const Removefunction = (id) => {
      if (window.confirm('Do you want to remove?')) {
          fetch("http://localhost:8080/cloths/" + id, {
              method: "DELETE"
          }).then((res) => {
              alert('Removed successfully.')
              window.location.reload();
          }).catch((err) => {
              console.log(err.message)
          })
      }
  }



  return (
   
<div className="container">
<div className="card">
<div className="card-title">
                    <h2>Cloths Listing</h2>
                </div> <div className="card-body">
                    <div className="divbtn">
                        <Link to="/cloths/create" className="btn btn-success ">Add New (+)</Link>
                    </div>&nbsp;
                    <div className="d-flex w-60 vh-50 justify-content-center aligns-item-center">
                <table className="table table-hover  caption-top " >
                  <caption>Cloths Listing</caption>
          <thead class="table-light" >
    <tr >
      <th scope="col" class="w-25">ID</th>
      <th scope="col" class="w-25"> Name</th>
      <th scope="col" class="w-25"> clothCategory</th>
      <th scope="col" class="w-25"> imageUrl</th>
      <th scope="col" class="w-25"> gender</th>
      <th scope="col" class="w-25"> weatherTag</th> 
      <th scope="col" class="w-25">Edit</th>
      <th scope="col" class="w-25">Delete</th>
    </tr>
  </thead>
  <tbody>
  {records && records.map(item => (
              
                 <tr >
      <td >{item.id}</td> 
      <td>{item.name}</td>
      <td>{item.clothCategory.name}</td>
      <td><img src={item.imageUrl} alt="img" width="50px" height="50px"></img></td>
      <td>{item.gender}</td>
      <td>{item.weatherTag}</td>
      <td><a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a></td>
       <td>   <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</a>
      </td>
    </tr>
                
            ))}
   
   
  </tbody>
</table></div></div>
            </div>


    </div>
  )
  

}

export default ListCloths;