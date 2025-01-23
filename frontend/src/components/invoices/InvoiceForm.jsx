import React, { useState } from "react";

const InvoiceForm = () => {
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
  const [popup, setPopup] = useState({
    show: false,
    position: { top: 0, left: 0 },
    value: "",
  });

  // Add GST types array
  const gstTypes = [
    { value: "IGST", label: "IGST (Integrated GST)" },
    { value: "CGST_SGST", label: "CGST + SGST (Central & State GST)" },
    { value: "EXEMPT", label: "GST Exempt" },
    { value: "ZERO", label: "Zero Rated GST" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
    
    // Automatically show items table when noOfItems changes
    if (name === 'noOfItems' && value > 0) {
      const itemCount = parseInt(value, 10);
      const newItems = Array.from({ length: itemCount }, () => ({
        particular: "",
        quantity: "",
        amount: "",
      }));
      setItems(newItems);
    } else if (name === 'noOfItems' && (!value || value <= 0)) {
      setItems([]);
    }
  };

  const handleItemChange = (index, field, value, e) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);

    // Show popup for quantity or amount field
    if (field === "quantity" || field === "amount" && e) {
      const element = e.target.getBoundingClientRect();
      setPopup({
        show: true,
        position: { top: element.top - 30, left: element.left },
        value: `Updated ${field}: ${value}`,
      });
      setTimeout(() => setPopup({ show: false, position: {}, value: "" }), 2000);
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
                  <td>
                    {index + 1}
                  </td>
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
          style={{ position: "absolute", top: popup.position.top, left: popup.position.left, background: "#fff", border: "1px solid #000", padding: "5px", borderRadius: "3px" }}
        >
          {popup.value}
        </div>
      )}

      {/* Second Section */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            value={invoiceData.amount}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Discount Amount</label>
          <input
            type="number"
            className="form-control"
            name="discountAmount"
            value={invoiceData.discountAmount}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
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

      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">GST Tax Type</label>
          <select
            className="form-select"
            name="gstTaxType"
            value={invoiceData.gstTaxType}
            onChange={handleChange}
          >
            <option value="">Select GST Type</option>
            {gstTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <label className="form-label">CGST %</label>
          <input
            type="number"
            className="form-control"
            name="cgstPercent"
            value={invoiceData.cgstPercent}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">CGST Amount</label>
          <input
            type="number"
            className="form-control"
            name="cgstAmount"
            value={invoiceData.cgstAmount}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">SGST %</label>
          <input
            type="number"
            className="form-control"
            name="sgstPercent"
            value={invoiceData.sgstPercent}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
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
        <div className="col-md-2">
          <label className="form-label">IGST %</label>
          <input
            type="number"
            className="form-control"
            name="igstPercent"
            value={invoiceData.igstPercent}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">IGST Amount</label>
          <input
            type="number"
            className="form-control"
            name="igstAmount"
            value={invoiceData.igstAmount}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Bill Amount</label>
          <input
            type="number"
            className="form-control"
            name="billAmount"
            value={invoiceData.billAmount}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
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
          <button className="btn btn-success me-2" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-primary me-2" onClick={handlePrint}>
            Print Invoice
          </button>
          <button className="btn btn-danger" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
