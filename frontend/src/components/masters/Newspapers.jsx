import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Newspapers = () => {
  let apiUrl = process.env.REACT_APP_BASE_URL;

  let [data, setData] = useState({
    id: 0,
    name: "",
    address: "",
    contact: "",
    gstcode: ""
  });

  let [dataError, setDataError] = useState({
    name: "",
    address: "",
    contact: "",
    gstcode: ""
  });

  let [result, setResult] = useState([]);

  let load = () => {
    setData({
      id: 0,
      name: "",
      address: "",
      contact: "",
      gstcode: ""
    });

    setDataError({
      name: "",
      address: "",
      contact: "",
      gstcode: ""
    });

    axios
      .get(apiUrl + "newspapers")
      .then((res) => {
        setResult(res.data.data);
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  let handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

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
          .get(apiUrl + "newspapers/" + id)
          .then((res) => {
            if (res.data.status == "success") {
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
    let dataErrors = { name: "", address: "", contact: "", gstcode: "" };
    if (data.name.trim() == "") {
      dataErrors.name = "Please enter name";
      validated = false;
    }
    if (data.address.trim() == "") {
      dataErrors.address = "Please enter address";
      validated = false;
    }
    if (data.contact.trim() == "") {
      dataErrors.contact = "Please enter contact";
      validated = false;
    }
    if (data.gstcode.trim() == "") {
      dataErrors.gstcode = "Please enter GST code";
      validated = false;
    }
  
    setDataError({ ...dataErrors });
    if (validated) {
      if (data.id == 0) {
        axios
          .post(apiUrl + "newspapers", data)
          .then((res) => {
            if (res.data.status == "success") {
              load();
              Swal.fire("Newspaper saved successfully!", "", "success");
            } else {
              alert(res.data.data.sqlMessage);
            }
          })
          .catch((ex) => {
            console.log(ex);
          });
      } else {
        axios
          .put(apiUrl + "newspapers/" + data.id, data)
          .then((res) => {
            if (res.data.status == "success") {
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
          .delete(apiUrl + "newspapers/" + id)
          .then((res) => {
            if (res.data.status == "success") {
              load();
              Swal.fire("Deleted!", "The newspaper record has been deleted.", "success");
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
  

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <div class="pagetitle">
        <h1>Newspapers</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <Link to={"/user"}>User</Link>
            </li>
            <li class="breadcrumb-item">Master</li>
            <li class="breadcrumb-item active">New_Papers</li>
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
                    <label class="form-label">
                      Name*
                      <span class="small text-danger">{dataError.name}</span>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      value={data.name}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div class="col-lg-8">
                    <label class="form-label">
                      Address*
                      <span class="small text-danger">{dataError.address}</span>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="address"
                      value={data.address}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div class="col-lg-4">
                    <label class="form-label">
                      Mobile No*
                      <span class="small text-danger">
                        {dataError.contact}
                      </span>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="contact"
                      value={data.contact}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div class="col-lg-4">
                    <label class="form-label">
                      GST Code
                      <span class="small text-danger">
                        {dataError.gstcode}
                      </span>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="gstcode"
                      value={data.gstcode}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>

                  <div class="col-lg-12">
                    <button
                      class="btn btn-primary"
                      onClick={(e) => {
                        save(e);
                      }}
                    >
                      Save
                    </button>
                    <button
                      class="btn btn-danger ms-2"
                      onClick={(e) => {
                        load();
                      }}
                    >
                      Cancel
                    </button>
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
                      <th scope="col">Address</th>
                      <th scope="col">Mobile No</th>
                      <th scope="col">GST Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.map((row, i) => {
                      return (
                        <tr key={"row" + i}>
                          <td>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={(e) => {
                                edit(e, row.id);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-danger ms-1"
                              onClick={(e) => {
                                deleteRecord(e, row.id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                          <td>{i + 1}</td>
                          <td>{row.name}</td>
                          <td>{row.address}</td>
                          <td>{row.contact}</td>
                          <td>{row.gstcode}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Newspapers;
