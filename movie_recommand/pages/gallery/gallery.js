var douban = require('../../comm/script/fetch')
var app=getApp();
Page({
  data:{
    pictures: [],
    nullTip: {
      tipText: '亲，没有上传照片哦',
      actionText: '上传',
      fn: 'uploadImg'
    }
  },
  onLoad:function(options){
    var that = this;
    douban.HttpGet("api=getUploadList").then(
      (res)=>{
        if(res.Code==0){
          that.setData({
            pictures: res.Data
          })
        }   
      }
    );
  },
  uploadImg: function() {
    var that = this;
    let url="https://www.chinasouhu.net/movie/api.php";
    let userId=0;
    if(app.globalData.userDataInfo!=null){
      userId = app.globalData.userDataInfo.userId;
    }
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        console.log("url",url);
        wx.uploadFile({
          url: url, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData:{
            'api': 'uploadPic',
            'userId':userId
          },
          success: function(res){
            var data = JSON.parse(res.data);
            //do something
            let _pictures = that.data.pictures;
            _pictures.push(data.Data);
            that.setData({
              pictures: _pictures
            })
          },
          fail:function(res){
            console.log("fail",res);
          }
        })
      }
    })
    // wx.chooseImage({
    //   count: 1,
    //   success: function(res) {
    //     var tempFilePath = res.tempFilePaths[0]
    //     console.log("tempFilePaths",res);
    //     douban.uploadPic(tempFilePath);
    //     wx.saveFile({
    //       tempFilePath: tempFilePath,
    //       success: function(res) {
    //         var savedFilePath = res.savedFilePath
    //         console.log(savedFilePath)
    //         that.setData({
    //           pictures: that.data.pictures.concat(savedFilePath)
    //         })
    //         wx.setStorage({
    //           key: 'gallery',
    //           data: that.data.pictures
    //         })
    //       }
    //     })
    //   }
    // })
  },
  previewImage: function(e) {
    var data =  e.currentTarget.dataset
    var index = data.index
    var that = this
    wx.previewImage({
      current: that.data.pictures[index], // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: that.data.pictures
    })
  }
})