// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    avatar:''
  },
  takePhoto(){
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality:'high',
      success:(res)=>{
        this.setData({
          avatar:res.tempImagePath
        })
      }
    })
  }
})
