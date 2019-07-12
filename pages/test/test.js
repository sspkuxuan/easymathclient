// pages/test/test.js
var app = getApp()
var W
var Q
var wrongLists
var choose=1


Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions: [],
    openid:"",
    value:"",
    wid:0,
    code:"",

    index: 0,
    realIndex: 0,//乱序后的题目号
    questionCount: 0,//题目个数
    optionCount: 0,
    wrong: 0,
    wrongdata:[],
    myoption: ["A", "B", "C", "D", "E", "F"],
    isSelected: false,
    questionArrays: [],
    answerArrays1: ["A", "B", "C"],               //三个选项题目乱序前的数组
    answerArrays2: ["A", "B", "C", "D"],           //四个选项题目乱序前的数组
    answerArrays3: ["A", "B", "C", "D", "E", "F"],  //六个选项题目乱序前的数组
    setColor: "green",
    icon: ["circle", "circle", "circle", "circle", "circle", "circle"],  
    wrongList:[],
    questionDetail: [],
    options:[],
    questionImage:[],
    optionnumber: [],
  },
  //乱序算法
  randSort: function () {
    return Math.random() > 0.5 ? 1 : -1;
  },
  //对数组乱序
  setList: function () {
    var newList = this.data.questionArrays.sort(this.randSort);
    this.setData({
      list: newList,//对数组进行乱序 也就是相当于将题号进行了乱序
    });
  },
  //对三个选项乱序
  setOption1: function () {
    var  newOption1 = this.data.answerArrays1.sort(this.randSort);  
    this.setData({
      answerArrays1: newOption1
    })
  },
  //对四个选项乱序
  setOption2: function () {
    var newOption2 = this.data.answerArrays2.sort(this.randSort);
    this.setData({
      answerArrays2: newOption2
    })
  },
  //对六个选项乱序
  setOption3: function () {
    var newOption3 = this.data.answerArrays3.sort(this.randSort);
    this.setData({
      answerArrays3: newOption3
    })
  },
  //点击选项触发函数
  select: function (event) {

    setTimeout(function () {
    this.setData({
      icon: ["circle", "circle", "circle", "circle", "circle", "circle"]
    })
    }.bind(this), 200);
      var value = event.currentTarget.dataset.value;//选择的那一行的具体内容
      var chooseOption = event.currentTarget.dataset.option;//选择的选项，第几个1,2,3,4,5,6转换为ABCDEF
      // var trueOption = this.data.questions[this.data.realIndex].true;//正确选项 是ABCDEF其中一个
      // var wid = this.data.questions[this.data.realIndex].id;//id 值
      // var trueVaule = this.data.questions[this.data.realIndex].option[trueOption];//正确选项的具体答案 内容
      var trueOption = this.data.questions[this.data.index].true;//正确选项 是ABCDEF其中一个
      var wid = this.data.questions[this.data.index].id;//id 值
      var trueVaule = this.data.questions[this.data.index].option[trueOption];//正确选项的具体答案 内容
      console.log("选择的选项是：" + this.data.myoption[chooseOption] + " 选择的值：" + value);
      console.log("本题乱序前的选项是：" + trueOption + " 值是:" + trueVaule);

      //错题,如果不相等 保存起来
      if (value != trueVaule) {
        var that=this;
        var icons = ["circle", "circle", "circle", "circle", "circle", "circle"];  
        var tmp = { "order": "","wid":"","trueOption":"","wrongOption":""};
        icons[chooseOption] = "cancel";//选择的错误位置变为错号
        tmp.order = that.data.index;
        tmp.wid = wid;//错误的id存储起来
        tmp.trueOption = trueOption;//正确选项
        tmp.wrongOption = that.data.myoption[chooseOption];//选择的错误选项 对应ABCDEF
        console.log(tmp);
        wrongLists.push(tmp);//将错题信息压进去
        console.log(wrongLists);
        that.setData({
          icon: icons,
          wrong: that.data.wrong + 1,//错题个数加一
          wrongList: wrongLists,
          wid:wid,//错题标号
          value:value,
        })
        wx.request({
          url: "https://www.easymath.top/api/v1/results/",//请求地址
          data: {//发送给后台的数据
            openid: that.data.openid, 
            questionid :that.data.wid, 
            qs: that.data.questions[that.data.index].question,
            useranswer:value,
            trueanswer: trueVaule,
            
          },

          method: "POST",//get为默认方法/POST
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log("sucess");
           

          },
          fail: function (err) { },//请求失败
          complete: function () { }//请求完成后执行的函数
        })
        console.log("orderid:"+that.data.wid);
        console.log("ordervalue:" + that.data.myoption[chooseOption]);
       // W = JSON.stringify(this.data.wrongList)
      } else {
        var icons = ["circle", "circle", "circle", "circle", "circle", "circle"];
        icons[chooseOption] = "success";//选择的正确 位置变为success
        this.setData({
          icon: icons
        })
      }

    if (this.data.index < this.data.questionCount - 1) {
        //题目没有遍历玩 继续

        this.setData({
          isSelected: false,
          index: this.data.index + 1,//index加一
        })
        this.setData({//重新分配题目
          questionDetail: this.data.questions[this.data.index].question,
          options: this.data.questions[this.data.index].option,
          questionImage: this.data.questions[this.data.index].url,
          optionnumber: this.data.questions[this.data.index].number
        })
        // W = JSON.stringify(this.data.wrongList)

        // this.setData({
        //   realIndex: this.data.questionArrays[this.data.index]//realIndex 的值 随机数组的值
        // })
        // /
        // this.setData({//重新分配题目
        //   questionDetail: this.data.questions[this.data.realIndex].question,
        //   options: this.data.questions[this.data.realIndex].option,
        //   questionImage: this.data.questions[this.data.realIndex].url,
        //   optionnumber: this.data.questions[this.data.realIndex].number
        // })
        // console.log("选择后的index:" + this.data.index);
        // console.log("选择后的realIndex:" + this.data.realIndex);
      } else {
        W = JSON.stringify(this.data.wrongList);
      
        wx.navigateTo({
          url: '/pages/result/result?wrong=' + this.data.wrong + '&wrongList=' + W + '&qcount=' + this.data.questionCount
            + '&openid=' + this.data.openid
        })
      }
         

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;

    choose = options.key;
    console.log("年级值");
    console.log(choose);
    //设置标题
    wx.login({
      success: function (res) {
        console.log(res.code)
        that.setData({
          code: res.code //获取用户code
        });
        wx.request({
          url: "https://www.easymath.top/api/v1/login/",//请求地址 获取用户openid
          data: {//发送给后台的数据
            code: that.data.code,
          },

          method: "POST",//get为默认方法/POST
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res) { 
            console.log("答题区");

            console.log(res.data);
            that.setData({
              openid: res.data//将openid保存起来
            })
          },
          fail: function (err) { },//请求失败
          complete: function () { }//请求完成后执行的函数
        })

      }
    })
  
    wrongLists = [];//错题
    that.getdata();//去getdata函数 初始化题目信息
    //在js中初始化一个数组，数组里存储正序的题号。这里题号从1开始
    
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
  getdata: function () {//定义函数名称 初始化题目信息的

    var that = this; 
   
     // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了 
    wx.request({
      url: "https://www.easymath.top/api/v1/questions/",//请求地址获取题目信息
      data: {//发送给后台的数据

        grade: choose//年级信息
      },

      method: "POST",//get为默认方法/POST
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据 这里是题库
        // console.log(res.data.length); //题目的长度
        //console.log(Object.keys(res).length); //一个item中有几个元素
        let now_informations = [];//题目信息装入
        for (let i = 0; i < res.data.length; i++) {//获取后台题目的值
          var t = res.data[i].answer;//正确答案取出 因为正确答案后面有一个字符 所以需要取出去掉
          now_informations.push({ "id": res.data[i].id,"question": res.data[i].question, "url": "", 
          "option": { "A": res.data[i].choiceA, "B": res.data[i].choiceB, "C": res.data[i].choiceC, 
          "D": res.data[i].choiceD },
          "true": t.substr(0, t.length - 1), "number": "4"
          });//"url": ""存放图片地址  "number": "4" 存放 选项是三 四还是六 暂时处理为4
        }
        app.ques = now_informations;
        // console.log(now_informations);
        that.setData({
          questions: now_informations, //把刚才now_informations存起来
          questionCount: res.data.length//问题个数
        })
      
        that.setData({
          questionDetail: that.data.questions[that.data.index].question,//问题
          options: that.data.questions[that.data.index].option,//问题选项
          questionImage: that.data.questions[that.data.index].url,//问题图片
          optionnumber: that.data.questions[that.data.index].number//问题答案个数，3,4,6
        })
  
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})