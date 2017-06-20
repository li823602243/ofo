// pages/scanresult/scanresult.js
Page({
  data:{
    time:0,
    scanresult:"正在计费"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
     this.setData({
     number: options.number
    })
           var  interval;
           var reg = /^\d$/;
           var sleep = 10;
           var sum = 0;
            if (!interval) {
                     this.timer = setInterval(()=> {
                        sum++;
                        var d = new Date("1111/1/1,0:0:0");
                        d.setSeconds(sum);
                        var h = d.getHours();
                        h = reg.test(h) ? "0" + h + ":" : h + ":"
                        var m = d.getMinutes();
                        m = reg.test(m) ? "0" + m + ":" : m + ":"
                        var s = d.getSeconds();
                        s = reg.test(s) ? "0" + s : s;
                        var oT = h + m + s;
                         this.setData({
                          time: oT
                          })
                    }, sleep);
                    this.innerHTML = "停止计时";
                } else {
                    clearInterval(interval);
                    interval = null;
                    this.innerHTML = "开始计时";
                }

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
  endRide:function(){
    clearInterval(this.timer);
    this.timer = "";
    this.setData({
      scanresult: "本次骑行耗时",
      disabled:true
    })
  },
   moveMap: function(){
    // 如果定时器为空
    console.log(this.timer);
    if(this.timer == ""){
      // 关闭计费页跳到地图
      wx.redirectTo({
        url: '../index/index'
      })
    // 保留计费页跳到地图
    }else{
      wx.navigateTo({
        url: '../index/index?timer=' + this.timer
      })
    }
   }
})