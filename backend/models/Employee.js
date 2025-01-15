const DBClass = require("./DBClass");

class Employee {
  constructor() {
    this.id = 0;
    this.name = "";
    this.address = "";
    this.mobileno = "";
    this.username = "";
    this.password = "";
    this.db = new DBClass();
  }

  list = () => {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM employees ORDER BY name";
      this.db
        .query(sql)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  get = () => {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM employees WHERE id = " + this.id;
      this.db
        .query(sql)
        .then((result) => {
            if(result.length > 0)
                resolve(result[0]);
            else
            reject({error: "Record not found"});
        })
        .catch((err) => {
          reject(err);
        });
    });
  };


  save = () => {
    return new Promise((resolve, reject) => {
        let sql  = "";
        if(this.id == 0){
        sql = "INSERT INTO employees(name, address, mobileno, username, password) ";
        sql += "VALUES('" + this.name.replace("'", "''") + "', '" + this.address.replace("'", "''") + "', '" + this.mobileno.replace("'", "''") + "', ";
        sql += "'" + this.username.replace("'", "''") + "', '" + this.password.replace("'", "''") + "')";
        }
        else{
            sql = "UPDATE employees SET name = '" + this.name.replace("'", "''") + "', ";
            sql += "address = '" + this.address.replace("'", "''") + "', "; 
            sql += "mobileno = '" + this.mobileno.replace("'", "''") + "', ";
            sql += "username = '" + this.username.replace("'", "''") + "', ";
            sql += "password = '" + this.password.replace("'", "''") + "' ";
            sql += "WHERE id = " + this.id;
        }
        this.db
        .query(sql)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  delete = () => {
    return new Promise((resolve, reject) => {
       let sql = "DELETE FROM employees WHERE id = " + this.id;
        this.db
        .query(sql)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}

module.exports = Employee;
