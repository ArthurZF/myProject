const userProgram = require("./userProgram/userProgram")
const admin = require("./admin/admin")
const aims = require("./aims/aims")
async function KOA10(sendCode, data) {
    if (sendCode == "registeredMsg") {
        return await userProgram.registeredMsg(data)
    } else if (sendCode=="isHasAccount") {
        return await userProgram.isHasAccount(data)
    } else if (sendCode == "userLogin") {
        return await userProgram.userLogin(data)
    } else if (sendCode == "userName") {
        return await userProgram.userName(data)
    } else if (sendCode == "tableSelect") {
        return await admin.tableSelect(data)
    } else if (sendCode == "accountChange") {
        return await admin.accountChange(data)
    } else if (sendCode == "accountMsg") {
        return await admin.accountMsg(data)
    } else if (sendCode == "accountMsgChange") {
        return await admin.accountMsgChange(data)
    } else if (sendCode == "passwordChange") {
        return await admin.passwordChange(data)
    } else if (sendCode == "aimsInsert") {
        return await aims.aimsInsert(data)
    } else if (sendCode == "aimsSelect") {
        return await aims.aimsSelect(data)
    } else if (sendCode == "aimsDelete") {
        return await aims.aimsDelete(data)
    } else if (sendCode == "aimsUpData") {
        return await aims.aimsUpData(data)
    } else if (sendCode == "aimsSelectAll") {
        return await aims.aimsSelectAll(data)
    } else {
        return {
            resCode: 500,
            resMsg: "请求不在授权范围内",
        }
    }
}
module.exports=KOA10