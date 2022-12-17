const app = getApp()
let that = null
Page({
  data: {
    activityTitle:'',
    activityDesc:'',
    peopleLimit: 0 ,
    date: '',
    time: '',
    position: {
      latitude: 0,
      longitude: 0,
      address: ''
    },
    carLocationGroup: [],
    dialogButtons: [
      {
        type: 'primary',
        className: '',
        text: '确定',
        value: 1
      }
    ],
    nickName:'',
    selectedCarLocation: ''
  },
  onLoad (query) {
    that = this
    that.id = query.id
    wx.startPullDownRefresh()
  },
  onPullDownRefresh () {
    that.init()
  },
  async init() {
    wx.showLoading()
    const res = await app.call({ name: 'get_activity', data: {id:that.id} })
    if(res.code === 0) {
      const formData = res.data
      this.setData({
        activityTitle:formData.activityTitle,
        activityDesc:formData.activityDesc,
        peopleLimit: formData.peopleLimit ,
        date: formData.date,
        time: formData.time,
        position: {
          latitude: formData.position.latitude,
          longitude: formData.position.longitude,
          address:  formData.position.address
        },
        carLocationGroup: formData.carLocationGroup,
      })
    }
    wx.hideLoading()
  },
  openLocation(e) {
    const {
      info
    } = e.currentTarget.dataset
    wx.openLocation({
      ...info,
      scale: 13
    })
  },
  onShareAppMessage () {
    return {
      title: '活动报名｜',
      path: `pages/activity-details/index?id=${that.id||'INIT'}`,
      imageUrl: ''
    }
  },
  addRegistrationTap(){
      wx.getUserInfo({
        withCredentials:false,
        lang: 'zh_CN',
        success:function(res){
          console.log(res)
          that.setData({
            nickName:res.userInfo.nickName
          })
        }
      })
      this.setData({
        showDialog:true
      })
  },
  confirmRegistrationTap(){
    this.setData({
      showDialog:false
    })
  },
})
