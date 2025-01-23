import React from 'react'
import { Link } from 'react-router'

function Sidebar() {
    return (
        <>
            <aside id="sidebar" class="sidebar">

                <ul class="sidebar-nav" id="sidebar-nav">

                    <li class="nav-item">
                        <Link to={"/user/dashboard"} class="nav-link ">
                            <i class="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>


                    <li class="nav-item">
                        <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse">
                            <i class="bi bi-menu-button-wide"></i><span>Masters</span><i class="bi bi-chevron-down ms-auto"></i>
                        </a>
                        <ul id="components-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link to={"/user/master/employees"}>
                                    <i class="bi bi-circle"></i><span>Employees</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/user/master/clients"}>
                                    <i class="bi bi-circle"></i><span>Clients</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/user/master/newspapers"}>
                                    <i class="bi bi-circle"></i><span>Newpapers</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/user/master/radios"}>
                                    <i class="bi bi-circle"></i><span>Radios</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/user/master/holidays"}>
                                    <i class="bi bi-circle"></i><span>Holidays</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/user/master/tax_plannings"}>
                                    <i class="bi bi-circle"></i><span>Tax Plannings</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <Link to={"/user/InvoicesList"} class="nav-link ">
                            <i class="bi bi-grid"></i>
                            <span>Invoices</span>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link to={"/user/P-media/ro-list"} class="nav-link ">
                            <i class="bi bi-grid"></i>
                            <span>P-Media</span>
                        </Link>
                    </li>
                </ul>

            </aside>
            {/* <Outlet/> */}
        </>
    )
}

export default Sidebar