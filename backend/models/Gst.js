const DBClass = require("./DBClass");

class Gsts {
  constructor() {
    this.id = 0;
    this.name = "";
    this.hsncode = "";
    this.cgst = 0;
    this.sgst = 0;
    this.igst = 0;
    this.db = new DBClass();
  }

  list = () => {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM gsts ORDER BY name";
      this.db
        .query(sql)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.error("Error in list method:", err);
          reject(err);
        });
    });
  };

  get = () => {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM gsts WHERE id = " + this.id;
      this.db
        .query(sql)
        .then((result) => {
          resolve(result[0]); // Return the first (and only) result
        })
        .catch((err) => {
          console.error("Error in get method:", err);
          reject(err);
        });
    });
  };

  save = () => {
    return new Promise((resolve, reject) => {
      let sql = this.id === 0
        ? `INSERT INTO gsts (name, hsncode, cgst, sgst, igst) VALUES ('${this.name.replace("'", "''")}', '${this.hsncode}', ${this.cgst}, ${this.sgst}, ${this.igst})`
        : `UPDATE gsts SET name='${this.name.replace("'", "''")}', hsncode='${this.hsncode}', cgst=${this.cgst}, sgst=${this.sgst}, igst=${this.igst} WHERE id=${this.id}`;
      console.log("Executing SQL:", sql); // Log the SQL query
      this.db
        .query(sql)
        .then((result) => {
          if (this.id === 0) {
            this.id = result.insertId;
          }
          return this.get();
        })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.error("Error in save method:", err);
          reject(err);
        });
    });
  };

  delete = () => {
    return new Promise((resolve, reject) => {
      let sql = "DELETE FROM gsts WHERE id = " + this.id;
      this.db
        .query(sql)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.error("Error in delete method:", err);
          reject(err);
        });
    });
  };
}

module.exports = Gsts;

