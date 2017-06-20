// pages/billing/billing.js
Page({
  data:{
    time:9
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
     password: options.password
    })
     let time = 9;
     this.timer = setInterval(() => {
      this.setData({
        time: --time
      });
      if(time==0){
        console.log("111")
        clearInterval(this.timer)
        wx.redirectTo({
          url: '../scanresult/scanresult?number=' + options.number
        })
      }
     },1000)
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
  }
})