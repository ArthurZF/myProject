const INSERT_REGISTERED = (account, passWord, userFirstName, userLastName, sex, phone) => {
    return `INSERT INTO l_user VALUES(REPLACE(UUID(),"-",""),(select substring(MD5(RAND()),1,20)),'${account}','${passWord}',2,'${userFirstName}','${userLastName}',${sex},${phone},0,now(),(SELECT versionnum FROM l_version ORDER BY versiondate DESC LIMIT 1))`
}

const USER_SELECT = (account, passWord) => {
    return `SELECT ACCOUNTID "accountId",ACCOUNTTYPE "accountType"  FROM l_user WHERE ACCOUNT = '${account}' AND PASSWORD = '${passWord}'`
}
const USER_NAME_SELECT = (accountId) => {
    return `CALL get_version('${accountId}',@userName,@versiontext,@sex,@isManage);`
}

const ACCOUNT_SELECT = (account) => {
    return `SELECT CASE WHEN COUNT(ACCOUNT)>0 THEN 'false' ELSE 'true' END "IsHasAccount" FROM l_user WHERE ACCOUNT = '${account}'`
}

module.exports = {
    INSERT_REGISTERED,
    USER_SELECT,
    USER_NAME_SELECT,
    ACCOUNT_SELECT
}