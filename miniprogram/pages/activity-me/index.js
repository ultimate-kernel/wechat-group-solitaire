const app = getApp()
let that = null
Page({
  data: {
    activityList: []
  },
  onLoad (query) {
    that = this
    that.id = query.id
    that.init()
  },
  onPullDownRefresh () {
    that.init()
  },
  init: async function () {
    wx.showLoading()
    const res = await app.call({ name: 'get_activity_list', data: {} }) || {}
    if(res.code === 0) {
      this.activityList = res.data || []
      this.setData({
        activityList: this.activityList
      })
    }
    wx.hideLoading()
  },
  goActivityDetail: function(e){
    const {item} = e.currentTarget.dataset
    wx.navigateTo({
      url: '../activity-details/index?id='+item._id
    })
  }
})
