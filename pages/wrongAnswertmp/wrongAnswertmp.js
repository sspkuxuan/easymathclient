var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wrongList: [],
    qlist: [],
    indexs: 0,
    answerArrays1: ["A", "B", "C"],               //三个选项题目乱序前的数组
    answerArrays2: ["A", "B", "C", "D"],           //四个选项题目乱序前的数组
    answerArrays3: ["A", "B", "C", "D", "E", "F"],  //六个选项题目乱序前的数组
    myoption: ["A", "B", "C", "D", "E", "F"],
    trueoption: []
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  console.log(JSON.parse(options.wrongList));
    //  console.log(JSON.parse(options.qlist));
    //设置标题
    var that=this;
    wx.setNavigationBarTitle({
      title: "错题回顾"
    })
    that.setData({
      wrongList: JSON.parse(options.wrongList),
     // qlist: options.qlist,
      qlist: app.ques
      
    })
    
    that.setData({
      wrongquestionImage: that.data.qlist[that.data.wrongList[that.data.indexs].order].url,
      wrongquestionDetail: that.data.qlist[that.data.wrongList[that.data.indexs].order].question,
      wrongoptionnumber: that.data.qlist[that.data.wrongList[that.data.indexs].order].number,
      wrongoptions: that.data.qlist[that.data.wrongList[that.data.indexs].order].option
    })
    // this.TrueOptionFunction();
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
  next: function () {
    if (this.data.indexs < this.data.wrongList.length - 1) {
      this.setData({
        indexs: this.data.indexs + 1
      })
      this.setData({
        wrongquestionImage: this.data.qlist[this.data.wrongList[this.data.indexs].order].url,
        wrongquestionDetail: this.data.qlist[this.data.wrongList[this.data.indexs].order].question,
        wrongoptionnumber: this.data.qlist[this.data.wrongList[this.data.indexs].order].number,
        wrongoptions: this.data.qlist[this.data.wrongList[this.data.indexs].order].option

      })
    }
  },
  goFirst: function () {
    wx.switchTab({

      url: '../index/index',

    });  
  }
})