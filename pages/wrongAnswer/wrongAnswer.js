var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
    data:{
      wrongList:[],
      error:{},
      errorlist:[],
      indexs:0,
      myoption: ["A", "B", "C", "D", "E", "F"],
      trueoption:[],
      question:[],
      code:"",
      openid:""
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
              url: "https://www.easymath.top/api/v1/errorin/",//请求地址
              data: {//发送给后台的数据
                openid: res.data,
              },

              method: "POST",//get为默认方法/POST
              headers: {
                'Content-Type': 'application/json'
              },
              success: function (res) {

                console.log(res.data);
                console.log(res.data[0].questionid);
                that.setData({
                  error: res.data
                })
             
                let err_informations = [];
                for (let i = 0; i < res.data.length; i++) {//获取后台题目的值
                  err_informations.push({ "qs": res.data[i].qs, "useranswer": res.data[i].useranswer, "trueanswer": res.data[i].trueanswer });
              } //for
                that.setData({
                  errorlist: err_informations
                })
                console.log(that.data.errorlist);
              },
              fail: function (err) { },//请求失败
              complete: function () { }//请求完成后执行的函数
            })

           
          },
          fail: function (err) { },//请求失败
          complete: function () { }//请求完成后执行的函数
        })
      }
       
    
      
      
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
  onShareAppMessage: function () {

  },

  goFirst:function(){
    wx.switchTab({

      url: '../home/home',

    });  
  }
})