var config = require('../../comm/script/config')
var douban = require('../../comm/script/fetch')
var app = getApp();
Page({
  data:{
    gridList: [
      {enName:'favorite', zhName:'收藏'},
      {enName:'history', zhName:'浏览记录'},
      {enName:'shake', zhName:'摇一摇'},
      {enName:'gallery', zhName:'相册'},
      {enName:'setting', zhName:'设置'}
    ],
    skin: ''
  },
  onLoad:function(cb){
    var that = this
    console.log(app.globalData.userDataInfo)
    // 检测是否存在用户信息
    if (app.globalData.userInfo != null) {
      that.setData({
          userInfo: app.globalData.userInfo
      })
    } else {
       app.getUserInfo();
    }
    typeof cb == 'function' && cb()
  },
  onShow:function(){
    var that = this
    if (app.globalData.userInfo != null) {
      that.setData({
            userInfo: app.globalData.userInfo
        })
    }
    that.setData({
        skin: config.skinList[0].imgUrl
      })
    douban.HttpGet("api=getSkinInfo").then((res)=>{
        if(res.Code==0){
          let _skinId=res.Data;
          that.setData({
            skin: config.skinList[_skinId].imgUrl
          })
        }
        
    });
  },
  onPullDownRefresh: function() {
    this.onLoad(function(){
      wx.stopPullDownRefresh()
    })
  },
  viewGridDetail: function(e) {
    var data = e.currentTarget.dataset
		wx.navigateTo({
			url: "../" + data.url + '/' + data.url
		})
  },
  viewSkin: function() {
		wx.navigateTo({
			url: "../skin/skin"
		})
  }
})