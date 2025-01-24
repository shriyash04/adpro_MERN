import React, { useState, useEffect } from "react";
import axios from "axios";

const InvoiceForm = () => {
  let apiUrl = process.env.REACT_APP_BASE_URL;
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: "",
    invoiceDate: "",
    client: "",
    noOfItems: "",
    amount: "",
    discountAmount: "",
    taxableAmount: "",
    gstTaxType: "",
    cgstPercent: "",
    cgstAmount: "",
    sgstPercent: "",
    sgstAmount: "",
    igstPercent: "",
    igstAmount: "",
    billAmount: "",
    advance: "",
  });

  const [items, setItems] = useState([]); // State for item list
  const [gstTypes, setGstTypes] = useState([]);
  const [popup, setPopup] = useState({
    show: false,
    position: { top: 0, left: 0 },
    value: "",
  });

  // Add GST types array
  // const gstTypes = [
  //   { value: "IGST", label: "IGST (Integrated GST)" },
  //   { value: "CGST_SGST", label: "CGST + SGST (Central & State GST)" },
  //   { value: "EXEMPT", label: "GST Exempt" },
  //   { value: "ZERO", label: "Zero Rated GST" }
  // ];

  useEffect(() => {
    axios
      .get(apiUrl + "gsts")
      .then((res) => {
        console.log("GST Types:", res.data.data);

        setGstTypes(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching GST types:", err);
      });
  }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setInvoiceData({ ...invoiceData, [name]: value });
  const gstRates = {
    1: 0, // 0% GST
    2: 18, // 18% GST Design Printing
    3: 18, // 18% GST Digital Marketing
    4: 18, // 18% GST E-Media
    5: 5, // 5% GST News Paper Media
    6: 18, // 18% IGST Design Printing
    7: 18, // 18% IGST E-Media
    8: 5, // 5% IGST News Paper Media
    9: 12, // 12% GST Printing
    0: 0, // Exempted GST
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...invoiceData, [name]: value };
  
    // Recalculate taxable amount if amount or discount changes
    if (name === "amount" || name === "discountAmount") {
      const amount = parseFloat(updatedData.amount) || 0;
      const discount = parseFloat(updatedData.discountAmount) || 0;
      updatedData.taxableAmount = amount - discount;
    }
  
    // Calculate GST values when GST type is selected
    if (name === "gstTaxType") {
      const taxableAmount = parseFloat(updatedData.taxableAmount) || 0;
      const gstPercentage = gstRates[value] || 0;
  
      if (value === "6" || value === "7" || value === "8") {
        // IGST Calculation (single tax)
        updatedData.igstPercent = gstPercentage;
        updatedData.igstAmount = (taxableAmount * gstPercentage) / 100;
        updatedData.cgstPercent = 0;
        updatedData.cgstAmount = 0;
        updatedData.sgstPercent = 0;
        updatedData.sgstAmount = 0;
      } else {
        // CGST + SGST Calculation (divided tax)
        updatedData.cgstPercent = gstPercentage / 2;
        updatedData.cgstAmount = (taxableAmount * (gstPercentage / 2)) / 100;
        updatedData.sgstPercent = gstPercentage / 2;
        updatedData.sgstAmount = (taxableAmount * (gstPercentage / 2)) / 100;
        updatedData.igstPercent = 0;
        updatedData.igstAmount = 0;
      }
  
      // Calculate Bill Amount (Taxable Amount + GST Amounts)
      updatedData.billAmount = taxableAmount + updatedData.cgstAmount + updatedData.sgstAmount + updatedData.igstAmount;
    }
  
    setInvoiceData(updatedData);
  
    // Automatically show items table when noOfItems changes
    if (name === "noOfItems" && value > 0) {
      const itemCount = parseInt(value, 10);
      const newItems = Array.from({ length: itemCount }, () => ({
        particular: "",
        quantity: "",
        amount: "",
      }));
      setItems(newItems);
    } else if (name === "noOfItems" && (!value || value <= 0)) {
      setItems([]);
    }
  };
  

  const handleItemChange = (index, field, value, e) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);

    // Calculate total amount from item amounts
    const totalAmount = updatedItems.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );
    setInvoiceData({ ...invoiceData, amount: totalAmount });

    // Show popup for quantity or amount field
    if (field === "quantity" || (field === "amount" && e)) {
      const element = e.target.getBoundingClientRect();
      setPopup({
        show: true,
        position: { top: element.top - 30, left: element.left },
        value: `Updated ${field}: ${value}`,
      });
      setTimeout(
        () => setPopup({ show: false, position: {}, value: "" }),
        2000
      );
    }
  };

  const handleSave = () => {
    console.log("Invoice Data:", invoiceData);
    console.log("Item Details:", items);
  };

  const handlePrint = () => {
    console.log("Printing Invoice");
  };

  const handleCancel = () => {
    setInvoiceData({
      invoiceNo: "",
      invoiceDate: "",
      client: "",
      noOfItems: "",
      amount: "",
      discountAmount: "",
      taxableAmount: "",
      gstTaxType: "",
      cgstPercent: "",
      cgstAmount: "",
      sgstPercent: "",
      sgstAmount: "",
      igstPercent: "",
      igstAmount: "",
      billAmount: "",
      advance: "",
    });
    setItems([]);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Invoice Form</h3>

      {/* First Section */}
      <div className="row mb-5 align-items-center">
        <div className="col-md-3">
          <label className="form-label">Invoice No</label>
          <input
            type="text"
            className="form-control"
            name="invoiceNo"
            value={invoiceData.invoiceNo}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Invoice Date</label>
          <input
            type="date"
            className="form-control"
            name="invoiceDate"
            value={invoiceData.invoiceDate}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Client</label>
          <select
            className="form-select"
            name="client"
            value={invoiceData.client}
            onChange={handleChange}
          >
            <option value="">Select</option>
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">No Of Items</label>
          <input
            type="number"
            className="form-control"
            name="noOfItems"
            value={invoiceData.noOfItems}
            onChange={handleChange}
            min="0"
          />
        </div>
      </div>

      {/* Item Details Section */}
      {items.length > 0 && (
        <div className="mb-5">
          <h5>Item Details</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Particular</th>
                <th>Quantity</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={item.particular}
                      onChange={(e) =>
                        handleItemChange(index, "particular", e.target.value, e)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value, e)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={item.amount}
                      onChange={(e) =>
                        handleItemChange(index, "amount", e.target.value, e)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Popup Section */}
      {popup.show && (
        <div
          className="popup"
          style={{
            position: "absolute",
            top: popup.position.top,
            left: popup.position.left,
            background: "#fff",
            border: "1px solid #000",
            padding: "5px",
            borderRadius: "3px",
          }}
        >
          {popup.value}
        </div>
      )}

      {/* Second Section */}
      <div className="row mb-3 ">
        <div className="col-md-4 mt-2">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            value={invoiceData.amount}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mt-2">
          <label className="form-label">Discount Amount</label>
          <input
            type="number"
            className="form-control"
            name="discountAmount"
            value={invoiceData.discountAmount}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mt-2">
          <label className="form-label">Taxable Amount</label>
          <input
            type="number"
            className="form-control"
            name="taxableAmount"
            value={invoiceData.taxableAmount}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row mb-3 mt-3">
        <div className="col-md-4 mt-2">
          <label className="form-label">GST Tax Type</label>
          <select
            className="form-select"
            name="gstTaxType"
            value={invoiceData.gstTaxType}
            onChange={handleChange}
          >
            <option value="">Select GST Type</option>
            {/* {gstTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))} */}
            <option value="1">0% GST</option>
            <option value="2">18% GST Design Printing </option>
            <option value="3">18% GST Digital Marketing </option>
            <option value="4">18% GST E-Media </option>
            <option value="5">5% GST News Peper Media</option>
            <option value="6">18% IGST Design Printing </option>
            <option value="7">18% IGST E-Media </option>
            <option value="8">5% IGST News Peper Media</option>
            <option value="9">12% GST Printing </option>
            <option value="0">
              Toy Balloons Made Of Natural Rubber Latex{" "}
            </option>
          </select>
        </div>
        <div className="col-md-2 mt-2">
          <label className="form-label">CGST %</label>
          <input
            type="number"
            className="form-control"
            name="cgstPercent"
            value={invoiceData.cgstPercent}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2 mt-2 ">
          <label className="form-label">CGST Amount</label>
          <input
            type="number"
            className="form-control"
            name="cgstAmount"
            value={invoiceData.cgstAmount}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2 mt-2">
          <label className="form-label">SGST %</label>
          <input
            type="number"
            className="form-control"
            name="sgstPercent"
            value={invoiceData.sgstPercent}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2 mt-2">
          <label className="form-label">SGST Amount</label>
          <input
            type="number"
            className="form-control"
            name="sgstAmount"
            value={invoiceData.sgstAmount}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-2 mt-2">
          <label className="form-label">IGST %</label>
          <input
            type="number"
            className="form-control"
            name="igstPercent"
            value={invoiceData.igstPercent}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2 mt-2">
          <label className="form-label">IGST Amount</label>
          <input
            type="number"
            className="form-control"
            name="igstAmount"
            value={invoiceData.igstAmount}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mt-2">
          <label className="form-label">Bill Amount</label>
          <input
            type="number"
            className="form-control"
            name="billAmount"
            value={invoiceData.billAmount}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mt-2">
          <label className="form-label">Advance</label>
          <input
            type="number"
            className="form-control"
            name="advance"
            value={invoiceData.advance}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex mt-3 justify-content-end">
          <button className="btn btn-success me-2 mt-2" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-primary me-2 mt-2" onClick={handlePrint}>
            Print Invoice
          </button>
          <button className="btn btn-danger mt-2" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
