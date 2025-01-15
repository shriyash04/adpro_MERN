let mysql = require('mysql');

class DBClass{
    constructor(){
        this.db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'adpro'
        });
    }

    query = (sql)=>{
        return new Promise((resolve, reject)=>{
            this.db.query(sql, (err, result)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(result);
                }
            });
        });
    }
}
module.exports = DBClass;