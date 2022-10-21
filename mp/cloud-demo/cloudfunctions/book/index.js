// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')
const doubanbook = require('doubanbook')
let reg = /window\.__DATA__ = "(.*)"/;

cloud.init()
async function getDoubanBook(isbn){
	let url = `https://search.douban.com/book/subject_search?search_text=${isbn}&cat=1001`
	const res = await axios.get(url)

	if(reg.test(res.data)){
		let searchData = doubanbook(RegExp.$1)[0]
		return searchData
	}
}
// getDoubanBook('9787121139512')
// 云函数入口函数
exports.main = async (event, context) => {
	// const wxContext = cloud.getWXContext()
	let { isbn } = event
	let bookInfo = await getDoubanBook(isbn)
	return {
		bookInfo,
		// event,
		// openid: wxContext.OPENID,
		// appid: wxContext.APPID,
		// unionid: wxContext.UNIONID,
	}
}