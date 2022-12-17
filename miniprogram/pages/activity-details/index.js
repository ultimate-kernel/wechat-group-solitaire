const app = getApp() // 全局APP
let that = null // 页面this指针
Page({
  data: {
    peopleLimit: 20,
    date: '',
    time: '',
    position: {
      latitude: 23.100116,
      longitude: 113.324592,
      address: ''
    },
    carLocationGroup: ['莲花北'],
    carLocationInput: '',
    showDialog: false,
    dialogButtons: [
      {
        type: 'primary',
        className: '',
        text: '确定',
        value: 1
      }
    ],
    slidevButtons:[
      {
        type: 'warn',
        className: '',
        text: '删除',
        value: 1
      }
    ]
  },
  onLoad (query) {
    that = this
    that.id = query.id
  },
  onPullDownRefresh () {
    that.init()
  },
  init: function () {},
  openDialog: function () {
    this.setData({
      carLocationInput:'',
      showDialog: true
    })
  },
  addCarLocationTap(e) {
      this.data.carLocationGroup.push(this.data.carLocationInput)
      this.setData({
        carLocationGroup: this.data.carLocationGroup
      })
      this.setData({
        showDialog: false
      })
  },
  chooseLocation(e) {
    const {
      info
    } = e.currentTarget.dataset
    wx.chooseLocation({
      ...info,
      scale: 13,
      complete:function(res){
        that.setData(
          {
            position:{
              address:res.address
            }
          }
        )
      }
    })
  },
  onShareAppMessage () {
    return {
      title: '活动报名｜',
      path: `pages/index/index?id=${that.id||'INIT'}`,
      imageUrl: ''
    }
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  // 创建活动
  bindCreateTap: function(e) {
    const formData = {...this.data}
    delete formData.dialogButtons
    delete formData.slidevButtons
    delete formData.carLocationInput
    delete formData.showDialog
    console.log(formData)
  },
  // 删除上车地点
  bindSlideviewTap: function(e) {
    const {
      index
    } = e.currentTarget.dataset
    this.data.carLocationGroup.splice(index,1)
    this.setData({
      carLocationGroup: this.data.carLocationGroup
    })
  }
})
