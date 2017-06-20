//index.js
Page({
  data: {
    scale: 18, // 缩放级别，默认18，数值在0~18之间
    latitude: 0, // 给个默认值
    longitude: 0 // 给个默认值
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.timer=options.timer
    //获取系统的当前地理位置
    wx.getLocation({
    type: 'gcj02',
    success: (res)=> {
      console.log(JSON.stringify(res))
      this.setData({  // 获取本地的地址，并且在界面中显示
          longitude: res.longitude,
          latitude: res.latitude
        })
    }
    });
    wx.getSystemInfo({
    success: (res)=> {
    this.setData({  // 获取本地的地址，并且在界面中显示
    controls: [{
      id: 1,
      iconPath: '/images/location.png',
      position: {
        left: 43,
        top: res.windowHeight-86,
        width: 43,
        height: 43
      },
      clickable: true
    },
    {
      id: 2,
      iconPath: '/images/use.png',
      position: {
        left: res.windowWidth/2-50,
        top: res.windowHeight-115,
        width: 100,
        height: 100
      },
      clickable: true
    },
    {
      id: 3,
      iconPath: '/images/warn.png',
      position: {
        left: res.windowWidth-86,
        top: res.windowHeight-86,
        width: 43,
        height: 43
      },
      clickable: true
    },
    {
      id: 4,
      iconPath: '/images/avatar.png',
      position: {
        left: res.windowWidth-86,
        top: res.windowHeight-150,
        width: 43,
        height: 43
      },
      clickable: true
    },
    {
      id: 5,
      iconPath: '/images/marker.png',
      position: {
        left: res.windowWidth/2-26,
        top: res.windowHeight/2-50,
         height: 38,
         width:26
      },
      clickable: true
    }
    ]
      })
        }
      })
//获取共享单车的位置
  wx.request({
    url: 'https://www.easy-mock.com/mock/5912cc77acb959185b0d0e60/ofo/api/biyclePosition',
    data: {},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: (res) => {
    console.log(JSON.stringify(res))
    this.setData({
    markers: res.data.data
    })
    }
  })
 
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
     // 1.创建地图上下文，移动当前位置到地图中心
    this.mapCtx = wx.createMapContext("map"); // 地图组件的id
    this.movetoPosition()
    
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  movetoPosition: function(){
   this.mapCtx.moveToLocation()
  },
  bindcontroltap:function(e){
  console.log(e);
   switch (e.controlId)
    {
    case 1:
     console.log(1);
     this.movetoPosition();
      break;
    case 2:
     console.log(2);
      if(this.timer === "" || this.timer === undefined){
        // 没有在计费就扫码
          wx.scanCode({
            success: (res) => {
              // 正在获取密码通知
              wx.showLoading({
                title: '正在获取密码',
                mask: true
              })
              // 请求服务器获取密码和车号
              wx.request({
                url: 'https://www.easy-mock.com/mock/5912cc77acb959185b0d0e60/ofo/api/scan',
                data: {},
                method: 'GET', 
                success: function(res){
                  // 请求密码成功隐藏等待框
                  wx.hideLoading();
                  // 携带密码和车号跳转到密码页
                  wx.redirectTo({
                    url: '../billing/billing?password='+res.data.password+"&number="+res.data.number,
                    success: function(res){
                      wx.showToast({
                        title: '获取密码成功',
                        duration: 1000
                      })
                    }
                  })           
                }
              })
            }
          })
      }else{
        wx.navigateBack({
            delta: 1
          })
      }
      break;
    case 3:
     console.log(3);
     wx.navigateTo({
        url: '../warn/warn'
      })
      break;
    case 4:
     console.log(4);
      wx.navigateTo({
        url: '../login/login'
      })
      break;
    case 5:
     console.log(5);
      break;
    }
  },
  bindmarkertap:function(e){
    console.log(JSON.stringify(this.data))
    let _markers = this.data.markers; // 拿到标记数组
    let markerId = e.markerId; // 获取点击的标记id
    let currMaker = _markers[markerId]; 
     console.log(JSON.stringify(e));
      this.setData({
      polyline: [{
        points: [{
        longitude: this.data.longitude,
        latitude: this.data.latitude
        }, {
        longitude:currMaker.longitude,
        latitude: currMaker.latitude
        }],
        color:"#FF0000DD",
        width: 2,
        dottedLine: true
      }]
       })
  },
  bindregionchange: function(e){
   if(e.type == "begin"){
wx.request({
    url: 'https://www.easy-mock.com/mock/5912cc77acb959185b0d0e60/ofo/api/biyclePosition',
    data: {},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: (res) => {
    console.log(JSON.stringify(res))
    this.setData({
    _markers: res.data.data
    })
    }
   })
   }else{
     this.setData({
          markers: this.data._markers
        })
    }
  }
})