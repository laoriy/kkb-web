// 云函数入口文件
const cloud = require('wx-server-sdk')
const AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;

// 设置APPID/AK/SK
const APP_ID = "28007988";
const API_KEY = "3L2cnuek7GIZFALumbkkK2n4";
const SECRET_KEY = "ccdmuAf2aMGytTwC7PN2dPgUZDFVhxF4";
// 新建一个对象，建议只保存一个对象调用服务接口
const client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    // const wxContext = cloud.getWXContext()
    const { fileID } = event
    // 云函数里调用云存储

    let file = await cloud.downloadFile({
        fileID
    })
    file = file.fileContent.toString("base64")

    const result = await client.plantDetect(file, { baike_num: '5' })


    return {
        data: result
        // event,
        // openid: wxContext.OPENID,
        // appid: wxContext.APPID,
        // unionid: wxContext.UNIONID,
    }
}