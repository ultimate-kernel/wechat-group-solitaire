const defaultavatar = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp() // 全局APP
let that = null // 页面this指针
Page({
  data: {
    peopleLimit:20,
    date:'',
    time:'',
    position: {
      latitude: 23.100116, // 地图定位标准纬度
      longitude: 113.324592, // 地图定位标准经度
      address: '' // 地图展示的地理名字
    },
    carLocationGroup:[{name:'莲花北',value:'莲花北'}],
    showDialog: false,
    buttons: [
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
  onLoad (options) {
    that = this
    that.id = options.id
  },
  openDialog: function () {
    this.setData({
      showDialog: true
    })
  },
  bindCarLocationTap(e) {
      console.log(e.detail)
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
  bindCreateTap: function(e) {
    console.log(this.data)
  },
  // 删除上车地点
  bindSlideviewTap: function(e) {

  }
})
