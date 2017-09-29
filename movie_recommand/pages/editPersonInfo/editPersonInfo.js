var util = require('../../util/util')
var fetch =require('../../comm/script/fetch.js');
var app = getApp();
//app.getUserInfo();
//console.log(app.globalData.userDataInfo);
Page({
  data:{
    name: '',
    nickName: '',
    gender: 0,
    genderArray: ['男', '女'],
    genderIndex: 0,
    age: 0,
    birthday: '',
    constellation: '',
    constellationArray: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
    constellationIndex: 0,
    company: '',
    school: '',
    tel: '',
    email:'',
    intro: '',
    birthdayEndDate: ''
  },
  onLoad:function(options){
    console.log("person",app.globalData.userDataInfo)
    var birthdayEndDate = util.getDate()
    var that = this
    let data = app.globalData.userDataInfo;
    that.setData({
        name: data.userName,
        nickName: data.nickName,
        gender: data.sex,
        age: data.age,
        birthday: data.birthday,
        constellation: data.star,
        company: data.company,
        school: data.school,
        tel: data.iphone,
        email: data.email,
        intro: data.sign,
        birthdayEndDate: birthdayEndDate
      })
  },
  savePersonInfo: function(e) {
    var data = e.detail.value
    console.log("saveData",data);
    let postData="api=updateUserInfo";
    for(var key in data){
      postData+="&";
      postData += key+"="+data[key];
    }
   // postData+="&userId="+app.globalData.userDataInfo.userId; 
    fetch.HttpGet(postData).then((data)=>{
        console.log("sucess",data);
        if(data.Code==0){
          app.globalData.userDataInfo = data.Data;
          wx.showToast({
            title: '资料修改成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function(){
            wx.navigateTo({
              url: '../personInfo/personInfo'
            })
          },2000)
        }else{
          wx.showToast({
            title: '资料修改失败',
            icon: 'fail',
            duration: 2000
          })
        }
    });
  },
  changeGender: function(e) {
    console.log(e)
    var genderIndex = e.detail.value
    if (genderIndex != "null") {
      this.setData({
        genderIndex: genderIndex,
        gender: this.data.genderArray[this.data.genderIndex]
      })
    }
  },
  changeBirthday: function(e) {
    var birthday = e.detail.value
    if (birthday != "null") {
      this.setData(
        {birthday: birthday}
      )
    }
  },
  changeConstellation: function(e) {
    var constellationIndex = e.detail.value
    if (constellationIndex != "null") {
      this.setData({
        constellationIndex: constellationIndex,
        constellation: this.data.constellationArray[this.data.constellationIndex]
      })
    }
  }
})