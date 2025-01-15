const DBClass = require("./DBClass");

class User {
    constructor() {
        this.id = 0;
        this.fname = "";
        this.lname = "";
        this.email = "";
        this.password = "";
        this.db = new DBClass();
    }

    list = () => {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM users ORDER BY fname";
            this.db.query(sql)
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
            let sql = "SELECT * FROM users WHERE id = " + this.id;
            this.db.query(sql)
                .then((result) => {
                    resolve(result[0]);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

    save = () => {
        return new Promise((resolve, reject) => {
            let sql = this.id === 0
                ? `INSERT INTO users (fname, lname, email, password) VALUES ('${this.fname}', '${this.lname}', '${this.email}', '${this.password}')`
                : `UPDATE users SET fname='${this.fname}', lname='${this.lname}', email='${this.email}', password='${this.password}' WHERE id=${this.id}`;
            this.db.query(sql)
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
                    reject(err);
                });
        });
    };
}

module.exports = User;