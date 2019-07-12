var a = 0;

var list=0;
var grade1 = 0;
var choose1 = 0;
var questions;




var comment = require('../comment/comment.js')
Page({
  data:{
    text: "Page practice",
    array: ['第一章', '第二章', '第三章', '第四章', '第五章', '第六章', '第七章', '第八章'],
    objectArray: [
      {
        id: 0,
        name: '第一章'
      },
      {
        id: 1,
        name: '第二章'
      },
      {
        id: 2,
        name: '第三章'
      },
      {
        id: 3,
        name: '第四章'
      },
     {
        id: 4,
        name: '第五章'
      },
      {
        id: 5,
        name: '第六章'
      },
      {
        id: 6,
        name: '第七章'
      },
      {
        id: 7,
        name: '第八章'
      }
    ],
    index: 0,
    multiArray: [['小学', '初中','高中','大学'], ['一年级', '二年级', '三年级', '四年级', '五年级','六年级']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '小学'
        },
        {
          id: 1,
          name: '初中'
        },
        {
          id: 2,
        name: '高中'
        },
        {
          id: 3,
          name: '大学'
        }
      ], [
        {
          id: 0,
          name: '一年级'
        },
        {
          id: 1,
          name: '二年级'
        },
        {
          id: 2,
          name: '三年级'
        },
        {
          id: 3,
          name: '四年级'
        },
        {
          id: 4,
          name: '五年级'
        },
         {
          id: 5,
          name: '六年级'
        }
      ]
    ],
    multiIndex: [0, 0],
    questions: [
      
    ],
    choose1:1,
    grade:0,
    

  },
  onLoad: function(options) {
    // Do some initialize when page load.
    console.log("load")
  },
  onReady: function() {
    // Do something when page ready.
    
    wx.hideNavigationBarLoading()
    console.log("完成")
  },
 
  onShow: function() {
    // Do something when page show.
    
    if(a==0){
    wx.setNavigationBarTitle({
      title: '练习',
    })
    wx.showNavigationBarLoading()
    console.log("渲染")
    }
    a++;

  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
    // Do something when page close.
  },
  onPullDownRefresh: function() {
    // Do something when pull down.

  },
  onReachBottom: function() {
    // Do something when page reach bottom.
  },
  onShareAppMessage: function () {
    // return custom share data when user share.
  },
  onPageScroll: function() {
    // Do something when page scroll
  },
  onResize: function() {
    // Do something when page resize
  },
  onPullDownRefresh:function(){
//监听下拉
  },
  onReachBottom:function(){
//监听上拉触顶
  },
  //分享
  onShareAppMessage:function(){
    return{
      path:"/pages/practice/practice",
      success:function(){
        wx.showToast({
          title: '分享成功',
          icon:"success",
          duration:2000

        })
      }

    }
  },
  //button触发事件
  grade:function(){
    wx.showToast({
      title: '分享成功',
      icon: "success",
      duration: 2000

    })
  },
  
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    grade1 = e.detail.value[0] * 6 + e.detail.value[1];
    //console.log('picker发送选择改变，携带值为', grade)
    this.setData({
      multiIndex: e.detail.value,
      grade: e.detail.value[0] * 6 + e.detail.value[1]+1,

    })
    console.log('picker发送选择改变，wawa携带值为', this.data.grade)
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    list = e.detail.value;
    this.setData({
       index: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;

         switch (data.multiIndex[0]) {
           case 0:
            data.multiArray[1] = ['一年级', '二年级', '三年级', '四年级', '五年级','六年级'];
             break;
           case 1:
             data.multiArray[1] = ['一年级', '二年级', '三年级'];
             break;
        
           case 2:
             data.multiArray[1] = ['一年级', '二年级', '三年级'];
             break;
    
           case 3:
             data.multiArray[1] = ['高等数学', '线性代数', '概率论'];
          break;
        data.multiIndex[1] = 0;
        break;
             console.log(data.multiIndex);
             break;
         }
        
    this.setData(data);
  },
 
  generate:function(){
    var that =this;
    wx.showModal({
      //title: '开始测试',
      content: '确定开始测试吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
         if(0<=grade1<=6){
           choose1=grade1+1;
         }
          console.log('picker发送选择改变，fasf携带值为', choose1)
          wx.navigateTo({
            url: '../test/test?key='+choose1,
          })
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
    
    },
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
 
 
})
