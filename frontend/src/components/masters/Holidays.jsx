import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Swal from "sweetalert2";


const Holidays = () => {
  let apiUrl = process.env.REACT_APP_BASE_URL;

  let [data, setData] = useState({
    id:0,
    hdate:"",
    everyyear:"",
    reason:"",
   
  });

  let [dataError, setDataError] = useState({
    hdate:"",
    everyyear:"",
    reason:"", 
  });

  let [result, setResult] = useState([]);

  let load = ()=>{
    setData({
      id:0,
      hdate:"",
      everyyear:"",
      reason:"", 
    });

    setDataError({
      hdate:"",
      everyyear:"",
      reason:"",
    });

    axios.get(apiUrl + "holidays").then((res)=>{
      setResult(res.data.data);
    }).catch((ex)=>{
      console.log(ex);
    })
  }

  let handleChange = (e)=>{
    setData({...data, [e.target.id]:e.target.value});
  }

  let edit = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to edit this record?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, edit it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get(apiUrl + "holidays/" + id)
          .then((res) => {
            if (res.data.status == "success") {
              setData(res.data.data); // Populate the form with the record data
            }
          })
          .catch((ex) => {
            console.log(ex);
          });
      }
    });
  };
  

  let save = (e) => {
    e.preventDefault();
    let validated = true;
    let dataErrors = { hdate: "", everyyear: "", reason: "" };
    if (data.hdate.trim() == "") {
      dataErrors.hdate = "Please enter a holiday date";
      validated = false;
    }
    if (data.everyyear.trim() == "") {
      dataErrors.everyyear = "Please enter if it is every year";
      validated = false;
    }
    if (data.reason.trim() == "") {
      dataErrors.reason = "Please enter the reason";
      validated = false;
    }
    setDataError({ ...dataErrors });
    if (validated) {
      if (data.id == 0) {
        axios
          .post(apiUrl + "holidays/", data)
          .then((res) => {
            if (res.data.status == "success") {
              load();
              Swal.fire("Record Added!", "Your new holiday has been saved.", "success");
            } else {
              alert(res.data.data.sqlMessage);
            }
          })
          .catch((ex) => {
            console.log(ex);
          });
      } else {
        axios
          .put(apiUrl + "holidays/" + data.id, data)
          .then((res) => {
            if (res.data.status == "success") {
              load();
              Swal.fire("Changes Saved!", "The holiday record has been updated.", "success");
            } else {
              alert(res.data.data.sqlMessage);
            }
          })
          .catch((ex) => {
            console.log(ex);
          });
      }
    }
  };
  

  let deleteRecord = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(apiUrl + "holidays/" + id)
          .then((res) => {
            if (res.data.status == "success") {
              load();
              Swal.fire("Deleted!", "The holiday record has been deleted.", "success");
            } else {
              alert(res.data.data.sqlMessage);
            }
          })
          .catch((ex) => {
            console.log(ex);
          });
      }
    });
  };
  

  useEffect(()=>{
    load();
  }, []);
  return (
    <div>
        <>
              <div class="pagetitle">
                <h1>Holidays</h1>
                <nav>
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to={"/user"}>User</Link></li>
                    <li class="breadcrumb-item">Master</li>
                    <li class="breadcrumb-item active">Holidays</li>
                  </ol>
                </nav>
              </div>
        
              <section class="section">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="card">
                      <div class="card-body">
                        <div class="row g-3 p-3">
                          <div class="col-lg-4">
                            <label class="form-label">H Date*<span class="small text-danger">{dataError.name}</span></label>
                            <input type="date" class="form-control" id="hdate" value={data.hdate} onChange={(e)=>{ handleChange(e); }} />
                          </div>
                          <div class="col-lg-8">
                            <label class="form-label">Every-Year*<span class="small text-danger">{dataError.address}</span></label>
                            <input type="date" class="form-control" id="everyyear" value={data.everyyear} onChange={(e)=>{ handleChange(e); }}/>
                          </div>
                          <div class="col-lg-4">
                            <label class="form-label">Reason*<span class="small text-danger">{dataError.mobileno}</span></label>
                            <input type="text" class="form-control" id="reason" value={data.reason} onChange={(e)=>{ handleChange(e); }}/>
                          </div>
                       
                          <div class="col-lg-12">
                            <button class="btn btn-primary" onClick={(e)=>{ save(e) }}>Save</button>
                            <button class="btn btn-danger ms-2" onClick={(e)=>{ load(); }}>Cancel</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-lg-12">
                    <div class="card">
                      <div class="card-body">
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">No</th>
                              <th scope="col">hadate</th>
                              <th scope="col">everyyear</th>
                              <th scope="col">reason</th>
                              
                            </tr>
                          </thead>
                          <tbody>
                            {
                              result.map((row, i)=>{
                                return <tr key={"row" + i}>
                                <td>
                                  <button className='btn btn-sm btn-primary' onClick={(e)=>{ edit(e, row.id); }}>Edit</button>
                                  <button className='btn btn-sm btn-danger ms-1' onClick={(e)=>{ deleteRecord(e, row.id); }}>Delete</button>
                                </td>
                                <td>{ i + 1 }</td>
                                <td>{ row.hdate }</td>
                                <td>{ row.everyyear }</td>
                                <td>{ row.reason }</td>
                               
                              </tr>
                              })
                            }
                            
                          </tbody>
                        </table>
        
                      </div>
                    </div>
        
                  </div>
                </div>
              </section>
        
            </>

    </div>

  )
}

export default Holidays