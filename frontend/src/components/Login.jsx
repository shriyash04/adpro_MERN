import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Login() {
  let apiUrl = process.env.REACT_APP_BASE_URL;

  const navigate = useNavigate();
  let [errorMessage, setErrorMessage] = useState("");
  let [data, setData] = useState({username:"", password:""});
  let [dataError, setDataError] = useState({username:"", password:""});

  let handleChange = (e) => {
    setData({...data, [e.target.id]: e.target.value});
    console.log(data);
    
    setDataError({...dataError, [e.target.id]: ""});
  }

  let handleLogin = (e) => {
    e.preventDefault();
    let validated = true;
    let dataErrors = {
      username: "",
      password: "",
    };
    if (data.username.trim() === "") {
      dataErrors.username = "Please enter username";
      validated = false;
    }
    if (data.password.trim() === "") {
      dataErrors.password = "Please enter password";
      validated = false;
    }
    setDataError({ ...dataErrors });
    if(validated){
      axios
          .post(apiUrl + "authentication/login", data)
          .then((res) => {            
         
            if (res.data.status === "success") {
              console.log("User name:", res.data.data.name);
              localStorage.setItem("usertype", "admin");
              localStorage.setItem("id", res.data.data.id);
              localStorage.setItem("name", res.data.data.name);
              localStorage.setItem("token", res.data.data.token);
              navigate('/user');
            } else {
              setErrorMessage(res.data.data);
            }
          })
          .catch((ex) => {
            console.log(ex);
          });
    }
  }

  return (
    <main>
      <div class="container">

        <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                <div class="d-flex justify-content-center py-4">
                  <a href="index.html" class="logo d-flex align-items-center w-auto">
                    <img src="assets/img/logo.png" alt="" />
                    <span class="d-none d-lg-block">NiceAdmin</span>
                  </a>
                </div>
                <div class="card mb-3">
                  <div class="card-body">

                    <div class="pt-4 pb-2">
                      <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                      <p class="text-center text-danger small">{ errorMessage }</p>
                    </div>

                    <div  class="row g-3 needs-validation">

                      <div class="col-12">
                        <label class="form-label">Username*<span className="small text-danger">{dataError.username}</span></label>
                        <div class="input-group has-validation">
                          <span class="input-group-text" id="inputGroupPrepend">@</span>
                          <input type="text" class="form-control" id="username" onChange={(e)=>{ handleChange(e) }} />
                        </div>
                      </div>

                      <div class="col-12">
                        <label class="form-label">Password*<span className="small text-danger">{dataError.password}</span></label>
                        <input type="password" class="form-control" id="password"  onChange={(e)=>{ handleChange(e) }} />
                      </div>
                      <div class="col-12">
                        <button class="btn btn-primary w-100" onClick={(e)=>{ handleLogin(e) }}>Login</button>
                      </div>
                    </div>
                  </div>
                  </div>
                
                <div class="credits">
                  Designed by <a href="https://igaptechnologies.com/">iGAP Technologies</a>
                </div>

              </div>
            </div>
          </div>

        </section>

      </div>
    </main>
  )
}

export default Login