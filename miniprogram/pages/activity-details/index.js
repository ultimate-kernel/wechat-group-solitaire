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
      this.isSignUp = false
      if( formData.signupList &&  formData.signupList.some(item=>item.openId === app.OPENID)){
        this.isSignUp = true
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
        isSignUp: this.isSignUp
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
      this.setData({
        showDialog:true
      })
  },
  async confirmRegistrationTap(){
    this.setData({
      showDialog:false
    })
    await app.call({ name: 'add_activity_user', data: {id: that.id,nickName:that.nickName,selectedCarLocation:that.selectedCarLocation}})
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
    this.selectedCarLocation = value
  },
  goUserList(){
    wx.navigateTo({
      url:'../activity-user/index?id='+that.id
    })
  }
})
