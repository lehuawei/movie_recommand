var config = require('../../comm/script/config')
var douban = require('../../comm/script/fetch')
Page({
  data:{
    skinList: config.skinList,
    nowSkinId: 0,
    nowSkin:""
  },
  onLoad:function(options){
    var that = this
    douban.HttpGet("api=getSkinInfo").then((res)=>{
        if(res.Code==0){
          that.data.nowSkinId=res.Data;
        }
        that.setData({
          nowSkin: config.skinList[that.data.nowSkinId].imgUrl
        })
    });
  },
  chooseSkin: function(e) {
    let that = this;
    let _data = e.currentTarget.dataset
    console.log("data",_data);
    douban.HttpGet("api=updateSkinInfo&skinId="+_data.id).then(
      (res)=>{
        if(res.Code==0){
          that.setData({
            nowSkinId:_data.id
          });
          wx.navigateBack({
            delta: 1,
            success: function(res){
              console.log('success')
            }
          })
        }
      }
    );
  }
})