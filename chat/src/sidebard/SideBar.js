import React from "react";
import "./Sidebar.css"
import Chatwindow from "../Chat.js/Chatwindow";


function SideBar() {
  return (
    <div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-auto bg-light sticky-top" id="bg-side">
            <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
             
              <ul class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                <li class="nav-item">
                  <a
                    href="#"
                    class="nav-link py-3 px-2"
                    title=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Home"
                  >
                    <i class="bi-house fs-3"></i>
                  </a>
                </li>
                
                
                
                <li>
                  <a
                    href="#"
                    class="nav-link py-3 px-2"
                    title=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Customers"
                  >
                    <i class="bi-people fs-3"></i>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    class="nav-link py-2 px-2"
                    title=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Customers"
                  >
                    <i class="bi bi-chat-left-text fs-3"></i>
                  </a>
                </li>

              </ul>
              <div class="dropdown">
                <a
                  href="#"
                  class="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
                  id="dropdownUser3"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="bi-person-circle h2"></i>
                </a>
                <ul
                  class="dropdown-menu text-small shadow"
                  aria-labelledby="dropdownUser3"
                >
                  <li>
                    <a class="dropdown-item" href="#">
                      New project...
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-sm p-3 min-vh-100">
             <Chatwindow/>
             
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
