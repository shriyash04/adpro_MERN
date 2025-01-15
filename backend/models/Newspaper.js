const DBClass = require("./DBClass");

class Newspaper {
  constructor() {
    this.id = 0;
    this.name = "";
    this.address = "";
    this.contact = "";
    this.gstcode = "";
    this.db = new DBClass();
  }

  list = () => {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM newspapers ORDER BY name";
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
      let sql = "SELECT * FROM newspapers WHERE id = " + this.id;
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
        ? `INSERT INTO newspapers (name, address, contact, gstcode) VALUES ('${this.name.replace("'", "''")}', '${this.address.replace("'", "''")}', '${this.contact}', '${this.gstcode}')`
        : `UPDATE newspapers SET name='${this.name.replace("'", "''")}', address='${this.address.replace("'", "''")}', contact='${this.contact}', gstcode='${this.gstcode}' WHERE id=${this.id}`;
      // console.log("Executing SQL:", sql); // Log the SQL query
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
      let sql = "DELETE FROM newspapers WHERE id = " + this.id;
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

module.exports = Newspaper;
