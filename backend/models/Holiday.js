const DBClass = require("./DBClass");

class Holiday {
  constructor() {
    this.id = 0;
    this.hdate = "";
    this.everyyear = "";
    this.reason = "";
    this.db = new DBClass();
  }

  list = () => {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM holidays";
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
      let sql = "SELECT * FROM holidays WHERE id = " + this.id;
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
        ? `INSERT INTO holidays (hdate, everyyear, reason) VALUES ('${this.hdate}', '${this.everyyear}', '${this.reason.replace("'", "''")}')`
        : `UPDATE holidays SET hdate='${this.hdate}', everyyear='${this.everyyear}', reason='${this.reason.replace("'", "''")}' WHERE id=${this.id}`;
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
      let sql = "DELETE FROM holidays WHERE id = " + this.id;
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

module.exports = Holiday;

