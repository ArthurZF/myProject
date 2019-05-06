const TABLE_SELECT = (accountId, type) => {
    return `SELECT ACCOUNT "account",CONCAT(USERFIRSTNAME,USERLASTNAME) "userName", ACCOUNTTYPE "accountType",ACCOUNTID "accountId"  FROM l_user WHERE ACCOUNTID !='${accountId}' AND ACCOUNTTYPE NOT IN(${type==1?'2,3':'0,1'})`
}
const ACCOUNT_UPDATE = (accountId, type) => {
    return `UPDATE l_user SET ACCOUNTTYPE =${type} WHERE ACCOUNTID='${accountId}'`
}
const USER_MSG_SELECT = (accountId) => {
    return `SELECT ACCOUNT "account",USERFIRSTNAME "userFirstName",USERLASTNAME "userLastName",SEX "sex",PHONE "phone" FROM l_user WHERE ACCOUNTID = '${accountId}'`
}
const ACCOUNT_CHANGE_UPDATE = (accountId, userMsg) => {
    return `UPDATE l_user SET ACCOUNT ='${userMsg.account}', USERFIRSTNAME ='${userMsg.userFirstName}',USERLASTNAME ='${userMsg.userLastName}',SEX ='${userMsg.sex}',PHONE ='${userMsg.phone}'  WHERE ACCOUNTID='${accountId}'`
}
const PASSWORD_UPDATE = (password, accountId) => {
    return `UPDATE l_user SET PASSWORD ='${password}' WHERE ACCOUNTID='${accountId}'`
}
module.exports = {
    TABLE_SELECT,
    ACCOUNT_UPDATE,
    USER_MSG_SELECT,
    ACCOUNT_CHANGE_UPDATE,
    PASSWORD_UPDATE
}