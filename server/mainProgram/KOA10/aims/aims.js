const mysqlConnect = require("../../../mysqlConnect/mysqlConnect")
const sql = require("./sql")
const aimsInsert = async function(data) {
    return await mysqlConnect(sql.INSERT_AIMS(data.accountId, data.aimsMsg, data.aimsDate), "insert");
}
const aimsSelect = async function(data) {
     return await mysqlConnect(sql.SELECT_AIMS(data.accountId), "select");;
}
const aimsDelete = async function(data) {
     return await mysqlConnect(sql.DELETE_AIMS(data.accountId, data.aimsId), "update");
}
const aimsUpData = async function(data) {
     return await mysqlConnect(sql.UPDATA_AIMS(data.accountId, data.aimsId, data.aimsMsg, data.aimsDate), "update");
}
const aimsSelectAll = async function(data) {
     return await mysqlConnect(sql.SELECT_ALL_AIMS(data.accountId, data.aimsId, data.aimsMsg, data.aimsDate), "select");
}
module.exports = {
    aimsInsert,
    aimsSelect,
    aimsDelete,
    aimsUpData,
    aimsSelectAll
}