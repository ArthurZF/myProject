var oracledb = require('oracledb');
oracledb.autoCommit = true;
var config = {
    user: 'oyys',
    password: 'baosaas',
    connectString: "10.60.13.30:1521/itmanage"
};
async function ordbConnect(sql, sqlType) {
    try {
        return await connect(sql, sqlType)
    } catch (error) {
        return {
            resCode: 409,
            resMsg: error,
            resData:[[]]
        }
    }
}
async function connect(sql,sqlType) {
    return new Promise((resolve, reject) => {
        oracledb.getConnection(config,  function (err, connection) {
            if (err) {
                reject(err.message);
                return;
            }
            connection.execute(sql,function (err, result) {
                    if (err) {
                        reject(err.message);
                        doRelease(connection);
                        return;
                    }
                    //打印返回的表结构
                    // console.log(result.metaData);
                    // //打印返回的行数据
                    // console.log(result.rows);
                    if (sqlType == "insert") {
                        resolve({
                            resCode: 200,
                            resMsg: "插入成功",
                        })
                    } else if (sqlType == "select") {
                        resolve({
                            resData:computeData(result),
                            resCode: 200,
                            resMsg: "查询成功"
                        })
                    } else if (sqlType == "update") {
                        if (result.rowsAffected == 1) {
                            resolve({
                                resData: true,
                                resCode: 200,
                                resMsg: "更新成功"
                            })
                        }else{
                            resolve({
                                resData: false,
                                resCode: 200,
                                resMsg: "更新失败"
                            })
                        }
                    }
                    doRelease(connection);
                });
        });
    })
}
module.exports = ordbConnect

function doRelease(connection) {
    connection.close(
        function (err) {
            if (err) {
                console.error(err.message);
            }
        });
}

function computeData(data) {
    return data.rows.map((v) => {
        return data.metaData.reduce((p, key, i) => {
            p[key.name] = v[i];
            return p;
        }, {})
    })
}