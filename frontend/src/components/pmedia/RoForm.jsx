import React from "react";


const  RoForm = () => {
  return (
    <div className="container mt-4">
      <h4 className="text-primary mb-3">PRESS–MEDIA RO MASTER</h4>
      <div className="card p-4">
        <form>
          {/* First Row */}
          <div className="row mb-3">
            <div className="col-md-2">
              <label className="form-label">R. O. No</label>
              <input type="text" className="form-control" placeholder="05062" />
            </div>
            <div className="col-md-2">
              <label className="form-label">R. O. Date</label>
              <input type="date" className="form-control" defaultValue="2025-01-16" />
            </div>
            <div className="col-md-2">
              <label className="form-label">Media Bill No</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-2">
              <label className="form-label">Media Bill Amount</label>
              <input type="text" className="form-control" />
            </div>
          </div>

          {/* Second Row */}
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">Client</label>
              <select className="form-select">
                <option>Select</option>
                <option>Client 1</option>
                <option>Client 2</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Newspaper</label>
              <select className="form-select">
                <option>Select</option>
                <option>Newspaper 1</option>
                <option>Newspaper 2</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Editions</label>
              <input type="text" className="form-control" />
            </div>
          </div>

          {/* Third Row */}
          <div className="row mb-3">
            <div className="col-md-2">
              <label className="form-label">No of Paid Days</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-2">
              <label className="form-label">No of Free Days</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-2">
              <label className="form-label">CC Is Available</label>
              <select className="form-select">
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">CC Percentage</label>
              <input type="text" className="form-control" />
            </div>
          </div>

          {/* Fourth Row */}
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">GST Tax Type</label>
              <select className="form-select">
                <option>Select</option>
                <option>GST Type 1</option>
                <option>GST Type 2</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">CGST%</label>
              <input type="text" className="form-control" defaultValue="0.00" />
            </div>
            <div className="col-md-2">
              <label className="form-label">SGST%</label>
              <input type="text" className="form-control" defaultValue="0.00" />
            </div>
            <div className="col-md-2">
              <label className="form-label">IGST%</label>
              <input type="text" className="form-control" defaultValue="0.00" />
            </div>
          </div>

          {/* Show Details Button */}
          <div className="row mb-3">
            <div className="col-md-2">
              <button type="button" className="btn btn-primary w-100">Show Details Form</button>
            </div>
          </div>

          {/* Total Section */}
          <div className="row mb-3">
            <div className="col-md-2">
              <label className="form-label">RO Total</label>
              <input type="text" className="form-control" disabled />
            </div>
            <div className="col-md-2">
              <label className="form-label">Commission Total</label>
              <input type="text" className="form-control" disabled />
            </div>
            <div className="col-md-2">
              <label className="form-label">CGST Total</label>
              <input type="text" className="form-control" disabled />
            </div>
            <div className="col-md-2">
              <label className="form-label">SGST Total</label>
              <input type="text" className="form-control" disabled />
            </div>
            <div className="col-md-2">
              <label className="form-label">IGST Total</label>
              <input type="text" className="form-control" disabled />
            </div>
          </div>

          {/* Final Section */}
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">C & C Amount</label>
              <input type="text" className="form-control" disabled />
            </div>
            <div className="col-md-3">
              <label className="form-label">RO Bill Amount</label>
              <input type="text" className="form-control" disabled />
            </div>
            <div className="col-md-3">
              <label className="form-label">Bank Name</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-3">
              <label className="form-label">Instructions</label>
              <input type="text" className="form-control" />
            </div>
          </div>

          {/* Save and Cancel Buttons */}
          <div className="row">
            <div className="col-md-3">
              <button type="submit" className="btn btn-success w-100">SAVE</button>
            </div>
            <div className="col-md-3">
              <button type="button" className="btn btn-danger w-100">CANCEL</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoForm;
