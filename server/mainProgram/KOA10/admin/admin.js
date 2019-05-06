const mysqlConnect = require("../../../mysqlConnect/mysqlConnect")
const sql = require("./sql")
async function tableSelect(data) {
    return await mysqlConnect(sql.TABLE_SELECT(data.accountId, data.type), "select");
}
async function accountChange(data) {
    return await mysqlConnect(sql.ACCOUNT_UPDATE(data.accountId, data.accountType), "update");
}
async function accountMsg(data) {
    let res = await mysqlConnect(sql.USER_MSG_SELECT(data.accountId), "select");
    res.resData = res.resData[0]
    return res;
}
async function accountMsgChange(data) {
    return await mysqlConnect(sql.ACCOUNT_CHANGE_UPDATE(data.accountId, data.userMsg), "update");
}
async function passwordChange(data) {
    return await mysqlConnect(sql.PASSWORD_UPDATE(data.passWord, data.accountId), "update");
}
module.exports = {
    tableSelect,
    accountChange,
    accountMsg,
    accountMsgChange,
    passwordChange
}