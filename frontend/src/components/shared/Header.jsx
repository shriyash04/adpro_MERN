// import React from "react";
// import { useNavigate } from "react-router";

// function Header() {
//   let name = localStorage.getItem("name");
//   let navigate = useNavigate();

//   let handleLogout = (e) => {
//     localStorage.clear();
//     navigate("/");
//   };

//   return (
//     <>
//       <header id="header" class="header fixed-top d-flex align-items-center">
//         <div class="d-flex align-items-center justify-content-between">
//           <a href="index.html" class="logo d-flex align-items-center">
//             <img src="assets/img/logo.png" alt="" />
//             <span class="d-none d-lg-block">NiceAdmin</span>
//           </a>
//           <i class="bi bi-list toggle-sidebar-btn"></i>
//         </div>

//         <div class="search-bar">
//           <form
//             class="search-form d-flex align-items-center"
//             method="POST"
//             action="#"
//           >
//             <input
//               type="text"
//               name="query"
//               placeholder="Search"
//               title="Enter search keyword"
//             />
//             <button type="submit" title="Search">
//               <i class="bi bi-search"></i>
//             </button>
//           </form>
//         </div>

//         <nav class="header-nav ms-auto">
//           <ul class="d-flex align-items-center">
//             <li class="nav-item dropdown pe-3">
//               <a
//                 class="nav-link nav-profile d-flex align-items-center pe-0"
//                 href="#"
//                 data-bs-toggle="dropdown"
//               >
//                 <img
//                   src="assets/img/profile-img.jpg"
//                   alt="Profile"
//                   class="rounded-circle"
//                 />
//                 <span class="d-none d-md-block dropdown-toggle ps-2">
//                   {userName}}
//                 </span>
//               </a>

//               <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
//                 <li>
//                   <a
//                     class="dropdown-item d-flex align-items-center"
//                     href="users-profile.html"
//                   >
//                     <i class="bi bi-person"></i>
//                     <span>My Profile</span>
//                   </a>
//                 </li>

//                 <li>
//                   <a
//                    style={{cursor: "pointer"}}
//                     class="dropdown-item d-flex align-items-center"
//                     onClick={(e) => {
//                       handleLogout(e);
//                     }}
//                   >
//                     <i class="bi bi-box-arrow-right"></i>
//                     <span>Sign Out</span>
//                   </a>
//                 </li>
//               </ul>
//             </li>
//           </ul>
//         </nav>
//       </header>
//     </>
//   );
// }

// export default Header;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function Header() {
  let [name, setName] = useState(""); 
  let navigate = useNavigate();


  
  
  useEffect(() => {
    // Get the name from localStorage when the component mounts
    setName(localStorage.getItem("name"));
  }, []);

  


  let handleLogout = (e) => {
    localStorage.clear(); 
    navigate("/"); 
  };

  return (
    <>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center">
            <img src="assets/img/logo.png" alt="" />
            <span className="d-none d-lg-block">NiceAdmin</span>
          </a>
          <i className="bi bi-list toggle-sidebar-btn"></i>
        </div>

        <div className="search-bar">
          <form className="search-form d-flex align-items-center" method="POST" action="#">
            <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            />
            <button type="submit" title="Search">
              <i className="bi bi-search"></i>
            </button>
          </form>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown pe-3">
              <a className="nav-link nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown">
                <img
                  src="assets/img/profile-img.jpg"
                  alt="Profile"
                  className="rounded-circle"
                />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {name ? name : "User"} {/* Display user name or "User" if no name */}
                </span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li>
                  <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                    <i className="bi bi-person"></i>
                    <span>My Profile</span>
                  </a>
                </li>

                <li>
                  <a
                    style={{ cursor: "pointer" }}
                    className="dropdown-item d-flex align-items-center"
                    onClick={(e) => handleLogout(e)}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
