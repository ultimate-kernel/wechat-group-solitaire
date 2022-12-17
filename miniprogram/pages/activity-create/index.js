const defaultavatar = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
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
    carLocationGroup: [], // 上车地点列表
    carLocationInput: '', // 上车地点添加
    showDialog: false,
    dialogButtons: [
      {
        type: 'primary',
        className: '',
        text: '确定',
        value: 1
      }
    ],
    slidevButtons: [
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
        console.log(res)
        that.setData(
          {
            position: {
              name: res.name,
              latitude: res.latitude,
              longitude: res.longitude,
              address: res.address
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
  bindCreateTap: async function(e) {
    const formData = {...this.data}
    delete formData.dialogButtons
    delete formData.slidevButtons
    delete formData.carLocationInput
    delete formData.showDialog
    console.log(formData)
    const submitres = await app.call({ name: 'add_activity', data: { formData } })
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
