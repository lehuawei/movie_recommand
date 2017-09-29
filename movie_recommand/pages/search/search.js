var message = require('../../component/message/message')
var douban  = require('../../comm/script/fetch')
var config  = require('../../comm/script/config')
Page({
  data:{
    searchType: 'keyword',
    hotKeyword: config.hotKeyword,
    hotTag: config.hotTag,
    hotPer:config.hotPer
  },
  onLoad:function(options){
      let that = this;
      let postData="api=getSearchTypeName";
      douban.HttpGet(postData).then((res)=>{
          that.setData({hotTag:res.Data});
      });
      postData = "api=getSearchMovieName";
      douban.HttpGet(postData).then((res)=>{
         that.setData({hotKeyword:res.Data});
      });
       postData = "api=getSearchPersonName";
       douban.HttpGet(postData).then((res)=>{
         that.setData({hotPer:res.Data});
      });
  },
  changeSearchType: function() {
    var types = ['默认', '类型'];
    var searchType = ['keyword', 'tag']
    var that = this
    wx.showActionSheet({
      itemList: types,
      success: function(res) {
        console.log(res)
        if (!res.cancel) {
          that.setData({
            searchType: searchType[res.tapIndex]
          })
        }
      }
    })
  },
  search: function(e) {
    var that = this
    var keyword = e.detail.value.keyword
    if (keyword == '') {
      message.show.call(that,{
        content: '请输入内容',
        icon: 'null',
        duration: 1500
      })
      return false
    } else {
      var searchUrl = that.data.searchType == 'keyword' ? config.apiList.search.byKeyword : config.apiList.search.byTag
      if(that.data.searchType == 'keyword'){
        //that.updateSearchName(keyword);
        that.updatePeopleName(keyword);
      }else{
        that.updateSearchTag(keyword);
        
      }
      wx.redirectTo({
        url: '../searchResult/searchResult?url=' + encodeURIComponent(searchUrl) + '&keyword=' + keyword
      })
    }
  },
  searchByKeyword: function(e) {
    var that = this
    var keyword = e.currentTarget.dataset.keyword
    //that.updateSearchName(keyword);
    wx.redirectTo({
      url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byKeyword) + '&keyword=' + keyword
    })
  },
  searchByTag: function(e) {
    var that = this
    var keyword = e.currentTarget.dataset.keyword
    that.updateSearchTag(keyword);
    wx.redirectTo({
      url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byTag) + '&keyword=' + keyword
    });
  },
  searchByPer:function(e) {
    var that = this
    var keyword = e.currentTarget.dataset.keyword
    that.updatePeopleName(keyword);
    wx.redirectTo({
      url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byTag) + '&keyword=' + keyword
    });
  },
  updateSearchTag(tagName){
    let postData="api=UpdateSearchTypeName&movieTypeName="+tagName;
    douban.HttpGet(postData);
  },
  updateSearchName(movieName){
    let postData="api=UpdateSearchMovieName&movieName="+movieName;
    douban.HttpGet(postData);
  },
   updatePeopleName(peopleName){
    let postData="api=UpdateSearchPeopleName&peopleName="+peopleName;
    douban.HttpGet(postData);
  }
  
})