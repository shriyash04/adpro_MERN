const DBClass = require("./DBClass");

class Client {
  constructor() {
    this.id = 0;
    this.name = "";
    this.address = "";
    this.mobileno = "";
    this.gstcode= "";
    this.db = new DBClass();
  }

  list = () => {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM clients ORDER BY name";
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
      let sql = "SELECT * FROM clients WHERE id = " + this.id;
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
        ? `INSERT INTO clients (name, address, mobileno, gstcode) VALUES ('${this.name.replace("'", "''")}', '${this.address}', '${this.mobileno}', '${this.gstcode}')`
        : `UPDATE clients SET name='${this.name.replace("'", "''")}', address='${this.address.replace("'", "''")}', mobileno='${this.mobileno}', gstcode='${this.gstcode}' WHERE id=${this.id}`;
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
      let sql = "DELETE FROM clients WHERE id = " + this.id;
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

module.exports = Client;
