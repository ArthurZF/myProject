var mysql = require('mysql');
var pool = mysql.createPool({
    host: '10.60.13.30',
    user: 'root',
    password: 'sumMer@t1me',
    database: 'plan',
    useConnectionPooling: true,
    timezone: "08:00"
});
async function mysqlConnect(sql, sqlType) {
    try {
        return await connect(sql, sqlType)
    } catch (error) {
        return {
            resCode: 409,
            resMsg: error,
            resData: [
                []
            ]
        }
    }
}
async function connect(sql, sqlType) {
    return new Promise((resolve, reject) => {
         pool.getConnection(function (err, connection) {
             if (err) {
                 reject(String(err));
                 return;
             }
             connection.query(sql, function (error, results, fields) {
                 //将链接返回到连接池中，准备由其他人重复使用
                 connection.release();
                 if (error) {
                     reject(error.sqlMessage);
                 }
                 if (sqlType == "insert") {
                     resolve({
                         resCode: 200,
                         resMsg: "插入成功",
                     })
                 } else if (sqlType == "select") {
                     resolve({
                         resData: results,
                         resCode: 200,
                         resMsg: "查询成功"
                     })
                 } else if (sqlType == "update") {
                     if (results.affectedRows == 1) {
                         resolve({
                             resData: true,
                             resCode: 200,
                             resMsg: "更新成功"
                         })
                     } else {
                         resolve({
                             resData: false,
                             resCode: 200,
                             resMsg: "更新失败"
                         })
                     }
                 }
             });
         });
    })
}
module.exports = mysqlConnect