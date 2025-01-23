import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InvoicesList = () => {
  const [client, setClient] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [search, setSearch] = useState("");

  const navigator = useNavigate();
  const handleReset = () => {
    setClient("");
    setFromDate("");
    setToDate("");
    setSearch("");
    console.log("Reset filters");
  };

  const handleAddInvoice = () => {
    navigator("/user/InvoicesList/InvoiceForm");
    console.log("Navigate to Add New Invoice");
  };

  return (
    <div className="container py-3 bg-light rounded">
      <div className="row align-items-center ">
        <div className="col-lg-3">
          <label className="form-label">Client</label>
          <select
            className="form-select"
            value={client}
            onChange={(e) => setClient(e.target.value)}
          >
            <option value="">Select Client</option>
            <option value="client1">Client 1</option>
            <option value="client2">Client 2</option>
          </select>
        </div>

        <div className="col-lg-2">
          <label className="form-label">From Date</label>
          <input
            type="date"
            className="form-control"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="col-lg-2">
          <label className="form-label">To Date</label>
          <input
            type="date"
            className="form-control"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <div className="col-lg-3">
          <label className="form-label">Search</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-lg-2 d-flex align-items-center float-lg-end gap-3 mt-4">
          <button className="btn btn-primary ">Show</button>
          <button className="btn btn-danger " onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      <div className="row col-lg-12">
        <div className="mt-3">
          <button
            className="btn btn-success float-end "
            onClick={handleAddInvoice}
          >
            Add New Invoice
          </button>
        </div>
      </div>

      <div className="row mt-1 ">
        <div className="col">
          <p className="fw-bold">
            Total records: <span className="text-primary"></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoicesList;
