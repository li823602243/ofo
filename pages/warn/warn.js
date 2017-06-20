// pages/login/login.js
var tempFilePaths;
Page({
  data:{
    source:[]
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
  choosePhoto:function(){
    console.log("11111");
     var that = this;
  wx.chooseImage({
  count: 9, // 默认9
  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  success: function (res) {
    tempFilePaths = res.tempFilePaths;
    console.log(JSON.stringify(res.tempFilePaths))
  // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
   that.setData({
                  source: res.tempFilePaths
              })
  }
  })
  },
  checkPhoto:function(e){
     wx.previewImage({
      current: e.target.dataset.src,
      urls: this.data.source // 需要预览的图片http链接列表
    })
   
  },
  formSubmit: function(e) {
    console.log('checkbox发生change事件，携带value值为：',      e.detail.value)
    console.log(tempFilePaths)
    wx.uploadFile({
    url: 'https://www.easy-mock.com/mock/5912cc77acb959185b0d0e60/ofo/api/message/verify', //仅为示例，非真实的接口地址
    filePath: tempFilePaths[0],
    name: 'file',
    formData:e.detail.value,
    success: function(res){
     console.log("222222");
      //do something
    },
    fail:function(){//暂时测试，图片上传网址出问题，所以暂时写在这里
       console.log("11111");
        wx.showToast({
          title: '提交成功',
          duration: 1000
        })
         wx.navigateBack({ //提交成功之后返回上一个页面
            delta: 1
          })
    }
    })
  }
  

})