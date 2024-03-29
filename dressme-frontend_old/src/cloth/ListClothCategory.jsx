import React from 'react'
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function ListClothCategory() {
   
    //const navigate=useNavigate();
    const [records, setRecords] = useState([]);
    const navigate=useNavigate();
    async function fetchProductData() {
     
      let response = await fetch('http://localhost:8080/clothCategories',{method:'GET'});
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
        navigate("/clothcategory/edit/" + id);
    }
    const Removefunction = (id) => {
      if (window.confirm('Do you want to remove?')) {
          fetch("http://localhost:8080/clothCategories/" + id, {
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
                    <h2>Cloth Category Listing</h2>
                </div> <div className="card-body">
                    <div className="divbtn">
                        <Link to="/clothcategory/create" className="btn btn-success ">Add New (+)</Link>
                    </div>&nbsp;
                    <div className="d-flex w-60 vh-50 justify-content-center aligns-item-center">
                <table className="table table-hover  caption-top table-sm " >
                  <caption>Cloth Category Listing</caption>
          <thead class="table-light" >
    <tr >
      <th scope="col" class="w-25">ID</th>
      <th scope="col" class="w-25">Category Name</th>
      <th scope="col" class="w-25">Action</th>
    </tr>
  </thead>
  <tbody>
  {records && records.map(item => (
              
                 <tr >
      <td scope="row">{item.id}</td>
      <td>{item.name}</td>
      <td><a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a>&nbsp;
          <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</a>
      </td>
    </tr>
                
            ))}
   
   
  </tbody>
</table></div></div>
            </div>


    </div>
  )
  
}

export default ListClothCategory