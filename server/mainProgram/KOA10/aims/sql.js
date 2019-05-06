const INSERT_AIMS = (accountId, aimsMsg, aimsDate) => {
    return `INSERT INTO aims VALUES(REPLACE(UUID(),"-",""),'${accountId}','${aimsMsg}','${aimsDate}',1,now())`
}
const SELECT_AIMS = (accountId) => {
    return `SELECT AIMSID "aimsId", AIMSMSG "aimsMsg", AIMSDATE "aimsDate" FROM aims WHERE AIMSTYPE ='1'AND ACCOUNTID='${accountId}'`
}
const DELETE_AIMS = (accountId,aimsId) => {
    return `UPDATE aims SET AIMSTYPE=0 WHERE AIMSID ='${aimsId}' AND ACCOUNTID='${accountId}'`
}
const UPDATA_AIMS = (accountId,aimsId,aimsMsg,aimsDate) => {
    return `UPDATE aims SET AIMSMSG ='${aimsMsg}',AIMSDATE ='${aimsDate}' WHERE AIMSID ='${aimsId}' AND ACCOUNTID='${accountId}'`
}
const SELECT_ALL_AIMS = (accountId) => {
    return `SELECT AIMSID "aimsId",AIMSMSG "aimsMsg",AIMSDATE "aimsDate" ,date(AIMSCREATEDATE) "aimsCreateDate" FROM aims WHERE ACCOUNTID='${accountId}' AND AIMSTYPE ='1' AND AIMSDATE IS NOT NULL`
}

module.exports={
    INSERT_AIMS,
    SELECT_AIMS,
    DELETE_AIMS,
    UPDATA_AIMS,
    SELECT_ALL_AIMS
}