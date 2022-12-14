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
    signupList: [],
    dialogButtons: [
      {
        type: 'primary',
        className: '',
        text: '确定',
        value: 1
      }
    ],
    nickName:'',
    selectedCarLocation: '',
    isSignUp: false
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
      this.data.isSignUp = false
      if( formData.signupList &&  formData.signupList.some(item=>item.openId === app.OPENID)){
        this.data.isSignUp = true
      }
      this.setData({
        activityTitle:formData.activityTitle,
        activityDesc:formData.activityDesc || '',
        peopleLimit: formData.peopleLimit ,
        date: formData.date,
        time: formData.time,
        position: {
          latitude: formData.position.latitude,
          longitude: formData.position.longitude,
          address:  formData.position.address
        },
        carLocationGroup: formData.carLocationGroup,
        signupList: formData.signupList || [],
        isSignUp: this.data.isSignUp
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
      title: `活动报名｜${this.data.activityTitle}`,
      path: `pages/activity-details/index?id=${that.id||'INIT'}`,
      imageUrl: 'https://636c-cloud1-6gtmbwrn371ad3f5-1315825146.tcb.qcloud.la/WechatIMG1767.jpeg?sign=9bb237a246b587fea71b098350e6f63e&t=1671451370'
    }
  },
  addRegistrationTap(){
      this.setData({
        showDialog:true
      })
  },
  async confirmRegistrationTap(){
    this.setData({
      showDialog:false
    })
    await app.call({ name: 'add_activity_user', data: {id: that.id,nickName:that.data.nickName,selectedCarLocation:that.data.selectedCarLocation}})
    wx.showToast({
      title: '报名成功',
      icon: 'success',
      duration: 2000,
      success: function() {
        that.init()
      }
    })

  },
  async cancelRegistrationTap(){
    await app.call({ name: 'delete_activity_user', data: {id: that.id}})
    wx.showToast({
      title: '取消成功',
      icon: 'success',
      duration: 2000,
      success: function() {
        that.init()
      }
    })
  },
  bindRadioChange(e){
    const value = e.detail.value
    this.data.selectedCarLocation = value
  },
  goUserList(){
    wx.navigateTo({
      url:'../activity-user/index?id='+that.id
    })
  }
})
