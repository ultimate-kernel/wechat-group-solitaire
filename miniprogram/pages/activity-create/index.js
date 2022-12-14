const defaultavatar = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const app = getApp() // 全局APP
let that = null // 页面this指针
Page({
  data: {
    project: {},
    input: {},
    form: {
      peopleNum:20,
      date:'',
      time:'',
      position: {
        latitude: 23.100116, // 地图定位标准纬度
        longitude: 113.324592, // 地图定位标准经度
        address: '' // 地图展示的地理名字
      },
      carLocationGroup:[
        {name: '莲花北', value: '莲花北', checked: true},
        {name: '罗湖体育馆', value: '罗湖体育馆'}] // 上车地点
    },
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
    that = this // 页面this指向指针变量
    that.id = options.id
  },
  onPullDownRefresh () {
  },
  open: function () {
    this.setData({
      showDialog: true
    })
  },
  buttontap(e) {
      console.log(e.detail)
  },
  openLocation (e) {
    const {
      info
    } = e.currentTarget.dataset
    wx.chooseLocation({
      ...info,
      scale: 13,
      complete:function(res){
        that.setData(
          {
           form:{
              position:{
                address:res.address
              }
           }
          }
        )
      }
    })
  },
  onShareAppMessage () {
    return {
      title: '活动报名｜' + that.data.project.title,
      path: `pages/index/index?id=${that.id||'INIT'}`,
      imageUrl: that.data.project.topimg
    }
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
})
