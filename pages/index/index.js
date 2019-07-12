// pages/4_1/4_1.js
var app = getApp;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '欢迎进入easymath\n\n从此轻松学数学~~',
    scrollTop: 100,
    telephone: '',
    phone: '1234567',
    userInfo: {},
    openid: '',
    code: '',
    id: '',
    hasUserInfo: false,
    informations: []
  },



  onShareAppMessage: function () {
    return {
      path: "/pages/practice/practice",
      success: function () {
        wx.showToast({
          title: '分享成功',
          icon: "success",
          duration: 2000

        })
      }

    }
  },


 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: function (res) {
        console.log(res.code)
        that.setData({
          code: res.code
        });
        wx.request({
          url: "https://www.easymath.top/api/v1/login/",//请求地址
          data: {//发送给后台的数据
            code: that.data.code,
          },

          method: "POST",//get为默认方法/POST
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res) {

            console.log(res.data);
            that.setData({
              openid: res.data
            })
            wx.request({
              url: "https://www.easymath.top/api/v1/saveuser/",//请求地址
              data: {//发送给后台的数据
                openid: that.data.openid,
              },

              method: "POST",//get为默认方法/POST
              headers: {
                'Content-Type': 'application/json'
              },
              success: function (res) {
                console.log(res.data[0].telephone);

                that.setData({
                  telephone: res.data[0].telephone
                })
              },
              fail: function (err) { },//请求失败
              complete: function () { }//请求完成后执行的函数
            })
            that.getdata();
          },
          fail: function (err) { },//请求失败
          complete: function () { }//请求完成后执行的函数
        })

      }
    })

  },

  getdata: function () {//定义函数名称
    var that = this;
    // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了 
    wx.request({
      url: "https://www.easymath.top/pinpinpin/v1/myinfo/",//请求地址
      data: {//发送给后台的数据
        openid: that.data.openid
      },
      method: "POST",//get为默认方法/POST
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {

        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        console.log(res.data.length); //
        //console.log(Object.keys(res).length); //一个item中有几个元素
        let now_informations = [];
        for (let i = 0; i < res.data.length; i++) {
          now_informations.push({ "openid": res.data[i].openid, "gotime": res.data[i].gotime, "departure": res.data[i].departure, "destination": res.data[i].destination, "goal": res.data[i].goal, "telephone": res.data[i].telephone, "id": res.data[i].id });
        }
        that.setData({
          informations: now_informations
        })

      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad();
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function (e) {
  //   var t = e.target.dataset.id;
  //   console.log(t);
  //   return {
  //     title: this.data.informations[t].gotime + ' ' + this.data.informations[t].goal + ' ' + this.data.informations[t].departure + '→' + this.data.informations[t].destination,
  //     path: 'pages/2_1/2_1',
  //     imageUrl: '/img/pic1.png'
  //   }
  // },

})