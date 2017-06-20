// pages/login/login.js
var inputContent = {}//存储输入框的值值，提交到后台
Page({
  data:{
     inputContent: {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  bindChange: function(e){//绑定事件，获取输入框的值，然后提交到后台
    inputContent[e.currentTarget.id] = e.detail.value
  },
  tapName: function(event) {
    wx.showLoading({
    title: '加载中',
    })

    setTimeout(function(){
    wx.hideLoading()
    },2000)
    console.log(event)
    wx.request({
  url: 'https://www.easy-mock.com/mock/5912cc77acb959185b0d0e60/ofo/api/message/verify', //仅为示例，并非真实的接口地址
  data: {
     phoneNumber:this.phoneNumber
  },
  header: {
      'content-type': 'application/json'
  },
  success: function(res) {
  wx.showToast({
    title: '获取密码成功',
    duration: 1000
  })
  }
})
  }

})