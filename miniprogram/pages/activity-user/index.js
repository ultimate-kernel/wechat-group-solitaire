const app = getApp()
let that = null
Page({
  data: {
    signupList:[]
  },
  onLoad (query) {
    that = this
    that.id = query.id
    that.init()
  },
  async init() {
    wx.showLoading()
    const res = await app.call({ name: 'get_activity', data: {id:that.id} })
    if(res.code === 0) {
      const formData = res.data
      this.setData({
        signupList: formData.signupList || [],
      })
    }
    wx.hideLoading()
  }
})
