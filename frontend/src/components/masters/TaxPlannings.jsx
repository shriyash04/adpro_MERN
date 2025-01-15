import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Swal from "sweetalert2";

const TaxPlannings = () => {
  let apiUrl = process.env.REACT_APP_BASE_URL;

  let [data, setData] = useState({
    id:0,
    name:"",
    hsncode:"",
    cgst:"",
    sgst:"",
    igst:"" 
  });

  let [dataError, setDataError] = useState({
    name:"",
    hsncode:"",
    cgst:"",
    sgst:"",
    igst:"" 
  });

  let [result, setResult] = useState([]);

  let load = ()=>{
    setData({
      id:0,
      name:"",
      hsncode:"",
      cgst:"",
      sgst:"",
      igst:"" 
    });

    setDataError({
      name:"",
      hsncode:"",
      cgst:"",
      sgst:"",
      igst:"" 
    });

    axios.get(apiUrl + "gsts").then((res)=>{
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
          .get(apiUrl + "gsts/" + id)
          .then((res) => {
            if (res.data.status === "success") {
              setData(res.data.data);
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
    let dataErrors = { name: "", hsncode: "", cgst: "", sgst: "", igst: "" };
    if (data.name.trim() === "") {
      dataErrors.name = "Please enter name";
      validated = false;
    }
    if (data.hsncode.trim() === "") {
      dataErrors.hsncode = "Please enter HSN code";
      validated = false;
    }
    if (data.cgst.trim() === "") {
      dataErrors.cgst = "Please enter CGST";
      validated = false;
    }
    if (data.sgst.trim() === "") {
      dataErrors.sgst = "Please enter SGST";
      validated = false;
    }
    if (data.igst.trim() === "") {
      dataErrors.igst = "Please enter IGST";
      validated = false;
    }
    setDataError({ ...dataErrors });
    if (validated) {
      if (data.id === 0) {
        axios
          .post(apiUrl + "gsts", data)
          .then((res) => {
            if (res.data.status === "success") {
              load();
              Swal.fire("Tax planning saved successfully!", "", "success");
            } else {
              alert(res.data.data.sqlMessage);
            }
          })
          .catch((ex) => {
            console.log(ex);
          });
      } else {
        axios
          .put(apiUrl + "gsts/" + data.id, data)
          .then((res) => {
            if (res.data.status === "success") {
              load();
              Swal.fire("Changes saved successfully!", "", "success");
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
          .delete(apiUrl + "gsts/" + id)
          .then((res) => {
            if (res.data.status === "success") {
              load();
              Swal.fire("Deleted!", "The tax planning has been deleted.", "success");
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
     <>
          <div class="pagetitle">
            <h1>Tax_Planings</h1>
            <nav>
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to={"/user"}>User</Link></li>
                <li class="breadcrumb-item">Master</li>
                <li class="breadcrumb-item active">tax_planings</li>
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
                        <label class="form-label">Name*<span class="small text-danger">{dataError.name}</span></label>
                        <input type="text" class="form-control" id="name" value={data.name} onChange={(e)=>{ handleChange(e); }} />
                      </div>
                      <div class="col-lg-8">
                        <label class="form-label">HSN Code*<span class="small text-danger">{dataError.hsncode}</span></label>
                        <input type="text" class="form-control" id="hsncode" value={data.hsncode} onChange={(e)=>{ handleChange(e); }}/>
                      </div>
                      <div class="col-lg-4">
                        <label class="form-label">CGST*<span class="small text-danger">{dataError.cgst}</span></label>
                        <input type="text" class="form-control" id="cgst" value={data.cgst} onChange={(e)=>{ handleChange(e); }}/>
                      </div>
                      <div class="col-lg-4">
                        <label class="form-label">SGST*<span class="small text-danger">{dataError.sgst}</span></label>
                        <input type="text" class="form-control" id="sgst" value={data.sgst} onChange={(e)=>{ handleChange(e); }}/>
                      </div>
                      <div class="col-lg-4">
                        <label class="form-label">IGST*<span class="small text-danger">{dataError.igst}</span></label>
                        <input type="text" class="form-control" id="igst" value={data.igst} onChange={(e)=>{ handleChange(e); }}/>
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
                          <th scope="col">Name</th>
                          <th scope="col">HSN Code</th>
                          <th scope="col">CGST</th>
                          <th scope="col">SGST</th>
                          <th scope="col">IGST</th>
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
                            <td>{ row.name }</td>
                            <td>{ row.hsncode }</td>
                            <td>{ row.cgst }</td>
                            <td>{ row.sgst }</td>
                            <td>{ row.igst }</td>
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
  )
}

export default TaxPlannings