const DBClass = require("./DBClass");
const jwt = require('jsonwebtoken');


const SECRET_KEY = "Shriyash@123"; // Replace with a secure key or use process.env.SECRET_KEY

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

  login = () => {
    return new Promise((resolve, reject) => {
      let sql = "SELECT * FROM employees WHERE username = '" + this.username + "' AND password = '" + this.password + "'";
      this.db
        .query(sql)
        .then((result) => {
            if(result.length > 0)
                resolve(result[0]);
            else
            reject("Invalid username or password");
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}
  module.exports = Employee;

//   login = () => {
//     return new Promise((resolve, reject) => {
//         let sql = "SELECT * FROM employees WHERE username = '" + this.username + "' AND password = '" + this.password + "'";
//         this.db
//             .query(sql)
//             .then((result) => {
//                 if (result.length > 0) {
//                     const user = result[0];

//                     // Generate a JWT token
//                     const token = jwt.sign(
//                         { id: user.id, username: user.username }, // Payload with user data
//                         SECRET_KEY, // Secret key
//                         { expiresIn: '1h' } // Token expires in 1 hour
//                     );

//                     // Resolve with the token and user data
//                     resolve({
//                         user: user,
//                         token: token
//                     });
//                 } else {
//                     reject("Invalid username or password");
//                 }
//             })
//             .catch((err) => {
//                 reject(err);
//             });
//     });
// };



// }

// module.exports = Employee;



