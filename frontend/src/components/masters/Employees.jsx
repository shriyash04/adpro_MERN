
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

function Employees() {
  let apiUrl = process.env.REACT_APP_BASE_URL;

  let [data, setData] = useState({
    id: 0,
    name: "",
    address: "",
    mobileno: "",
    username: "",
    password: "",
  });

  let [dataError, setDataError] = useState({
    name: "",
    address: "",
    mobileno: "",
    username: "",
    password: "",
  });

  let [result, setResult] = useState([]);

  let load = () => {
    setData({
      id: 0,
      name: "",
      address: "",
      mobileno: "",
      username: "",
      password: "",
    });

    setDataError({
      name: "",
      address: "",
      mobileno: "",
      username: "",
      password: "",
    });

    axios
      .get(apiUrl + "employees")
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
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get(apiUrl + "employees/" + id)
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
    let dataErrors = {
      name: "",
      address: "",
      mobileno: "",
      username: "",
      password: "",
    };
    if (data.name.trim() === "") {
      dataErrors.name = "Please enter name";
      validated = false;
    }
    if (data.address.trim() === "") {
      dataErrors.address = "Please enter address";
      validated = false;
    }
    if (data.mobileno.trim() === "") {
      dataErrors.mobileno = "Please enter mobileno";
      validated = false;
    }
    if (data.username.trim() === "") {
      dataErrors.username = "Please enter username";
      validated = false;
    }
    if (data.password.trim() === "") {
      dataErrors.password = "Please enter password";
      validated = false;
    }
    setDataError({ ...dataErrors });
    if (validated) {
      if (data.id === 0) {
        axios
          .post(apiUrl + "employees", data)
          .then((res) => {
            if (res.data.status === "success") {
              load();
              Swal.fire("Record Added!", "Your new record has been saved.", "success");
            } else {
              alert(res.data.data.sqlMessage);
            }
          })
          .catch((ex) => {
            console.log(ex);
          });
      } else {
        axios
          .put(apiUrl + "employees/" + data.id, data)
          .then((res) => {
            if (res.data.status === "success") {
              load();
              Swal.fire("Changes Saved!", "The record has been updated.", "success");
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
      title: "Do you want to delete this record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(apiUrl + "employees/" + id).then((res) => {
          if (res.data.status === "success") {
            load();
            Swal.fire("Deleted!", "The record has been deleted.", "success");
          } else {
            alert(res.data.data.sqlMessage);
          }
        });
      } else if (result.isDismissed) {
        Swal.fire("Cancelled", "The record was not deleted.", "info");
      }
    });
  };
  

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <div className="pagetitle">
        <h1>Employees</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/user"}>User</Link>
            </li>
            <li className="breadcrumb-item">Master</li>
            <li className="breadcrumb-item active">Employees</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="row g-3 p-3">
                  <div className="col-lg-4">
                    <label className="form-label">
                      Name*<span className="small text-danger">{dataError.name}</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={data.name}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="col-lg-8">
                    <label className="form-label">
                      Address*<span className="small text-danger">{dataError.address}</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      value={data.address}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="form-label">
                      Mobile No*<span className="small text-danger">{dataError.mobileno}</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mobileno"
                      value={data.mobileno}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="form-label">
                      Username*<span className="small text-danger">{dataError.username}</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={data.username}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="form-label">
                      Password*<span className="small text-danger">{dataError.password}</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="password"
                      value={data.password}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                  <div className="col-lg-12">
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        save(e);
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger ms-2"
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
        <div className="row mt-2">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Address</th>
                      <th scope="col">Mobile No</th>
                      <th scope="col">Username</th>
                      <th scope="col">Password</th>
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
                          <td>{row.mobileno}</td>
                          <td>{row.username}</td>
                          <td>{row.password}</td>
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
}

export default Employees;
