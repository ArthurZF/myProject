const mysqlConnect = require("../../../mysqlConnect/mysqlConnect")
const sql = require("./sql")
async function registeredMsg(data) {
    return await mysqlConnect(sql.INSERT_REGISTERED(data.account, data.passWord, data.userFirstName, data.userLastName, data.sex, data.phone), "insert");
}
async function userLogin(data) {
    let res = await mysqlConnect(sql.USER_SELECT(data.account, data.passWord), "select");
    res.resData = res.resData[0] == undefined ? {
        accountId: ''
    } : res.resData[0]
    return res;
}
async function userName(data) {
    let res = await mysqlConnect(sql.USER_NAME_SELECT(data.accountId), "select");
    res.resData = res.resData[0] == undefined ? {
        userName: ''
    } : res.resData[0][0];
    return res;
}
async function isHasAccount(data) {
    let res = await mysqlConnect(sql.ACCOUNT_SELECT(data.account), "select");
    res.resData = res.resData[0]
    return res;
}
module.exports = {
    registeredMsg,
    userLogin,
    userName,
    isHasAccount
}