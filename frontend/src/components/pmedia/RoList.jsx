import React from "react";
import { useNavigate } from "react-router-dom";


const RoList = () => {

    const navigator = useNavigate();

    
    const handleAddRo = () => {
        navigator("/user/P-media/ro-list/ro-form");
        console.log("Navigate to Add New RoList");
      };
    return (
        <div className="container mt-4">
            <h4 className="text-primary mb-3">PRESS–MEDIA RO LIST</h4>
            <div className="card p-4">
                <form>
                    <div className="row mb-3">
                        {/* Status Dropdown */}
                        <div className="col-lg-3">
                            <label className="form-label">STATUS</label>
                            <select className="form-select">
                                <option>All</option>
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>

                        {/* Paper Dropdown */}
                        <div className="col-lg-3">
                            <label className="form-label">PAPER</label>
                            <select className="form-select">
                                <option>Select</option>
                                <option>Paper 1</option>
                                <option>Paper 2</option>
                            </select>
                        </div>

                        {/* Client Dropdown */}
                        <div className="col-lg-3">
                            <label className="form-label">CLIENT</label>
                            <select className="form-select">
                                <option>Select</option>
                                <option>Client 1</option>
                                <option>Client 2</option>
                            </select>
                        </div>

                        {/* Pay Status Dropdown */}
                        <div className="col-lg-3">
                            <label className="form-label">PAY STATUS</label>
                            <select className="form-select">
                                <option>All</option>
                                <option>Paid</option>
                                <option>Unpaid</option>
                            </select>
                        </div>

                        {/* From Date */}
                        <div className="row mt-3    ">
                            <div className="col-lg-3">
                                <label className="form-label">FROM DATE</label>
                                <input type="date" className="form-control" />
                            </div>

                            {/* To Date */}
                            <div className="col-lg-3">
                                <label className="form-label">TO DATE</label>
                                <input type="date" className="form-control" />
                            </div>
                            <div className=" col-lg-3">
                                {/* Search Input */}

                                <label className="form-label">SEARCH RO/INVOICE No</label>
                                <input type="text" className="form-control" placeholder="Enter RO/Invoice No" />

                            </div>
                            <div className="col-lg-3">
                                <div className=" mt-4 d-flex align-items-center">
                                    <button type="button" className="btn btn-primary me-2">SHOW</button>
                                    <button type="reset" className="btn btn-danger me-2">RESET</button>
                                    <button onClick={handleAddRo} type="button" className="btn btn-success">ADD RO</button>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="row">
                        {/* Buttons */}

                    </div>
                </form>

                {/* <div className="mt-3 text-danger">
          Total records: <b>2820</b>
        </div> */}
            </div>
        </div>
    );
};

export default RoList;
