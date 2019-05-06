 const KOA10=require("./KOA10/KOA10.js")
async function mainProgram(data) {
     if (data.applicationCode == "KOA10") {
            return await KOA10(data.sendCode, data.sendData)
    }else{
        return {
            resCode: 500,
            resMsg: "请求不在授权范围内",
        }
    }
}
module.exports = mainProgram