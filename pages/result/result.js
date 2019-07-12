// pages/result/result.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wrong: 0,
    wrongList: [],
    
    openid: "",
    accuracy:0,
    mytrue:0,
    qcount:0,
    answerArrays1:[],
    answerArrays2:[],
    answerArrays3:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
 
    //  console.log(options.wrongList);
    //  console.log(options.qlist);
    wx.setNavigationBarTitle({
      title: "测试结果"
    })
    that.setData({
      wrong: options.wrong - 0,
      wrongList: options.wrongList,
      qcount: options.qcount,
     
      openid: options.openid


    })
    that.setData({
      mytrue: that.data.qcount - that.data.wrong,
    })
    that.setData({
      accuracy: 100 * that.data.mytrue / that.data.qcount,
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
  reset: function(){
    wx.switchTab({
  

      url: '../index/index',

    });  

  },
  wrongAnswer:function(){
 

    wx.redirectTo({
      url: '../wrongAnswertmp/wrongAnswertmp?wrongList=' + this.data.wrongList 
    })
  }

})