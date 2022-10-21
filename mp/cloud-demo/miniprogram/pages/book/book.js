// pages/book/book.js
const db = wx.cloud.database()

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	},
	scanCode() {
		wx.scanCode({
		  complete(res){
			wx.cloud.callFunction({
				name:'book',
				data:{
					isbn:res.result
				},
				success(res){
					const { bookInfo } = res.result
					// 数据库操作
					db.collection('book').add({
						data: bookInfo,
						success(ret){
							wx.showModal({
							  title:'添加新书信息',
							  content:`${bookInfo.title}添加成功`
							})
						}
					})
				}
			})
		  }
		})
	},
	toList(){
		wx.navigateTo({
		  url: '/pages/books/books',
		})
	}
})