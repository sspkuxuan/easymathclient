// pages/1_2/1_2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telephone:  '',
    code: '',
    openid: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
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
          },
          fail: function (err) { },//请求失败
          complete: function () { }//请求完成后执行的函数
        })

      }
    })

  },
  onPullDownRefresh: function () {
    this.onLoad();

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
  getTelphone: function (e) {
    this.data.telephone = e.detail.value;

  },
  submittel: function () {

    console.log('发布', this.data.goal);
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    wx.showModal({
      //title: '开始测试',
      content: '确定修改吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: "https://www.easymath.top/api/v1/edituser/",//请求地址
            data: {//发送给后台的数据

              openid: that.data.openid, 
              telephone: that.data.telephone, peoplenum: that.data.peoplenum
            },

            method: "POST",//get为默认方法/POST
            headers: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
             
                wx.showToast({
                  title: '修改成功',
                  icon: 'succes',
                  duration: 1000,
                  mask: true
                })
             
              wx.switchTab({
                url: '/pages/index/index'
              })


              that.setData({
                telephone:''

              })



            },
            fail: function (err) { },//请求失败
            complete: function () { }//请求完成后执行的函数
          })


        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })






  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})