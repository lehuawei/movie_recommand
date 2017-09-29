var app = getApp();
var douban = require('../../comm/script/fetch')
var config = require('../../comm/script/config');
var filmNullTip = {
      tipText: '亲，找不到电影的收藏',
      actionText: '去逛逛',
      routeUrl: '../../pages/popular/popular'
    }
var personNullTip = {
      tipText: '亲，找不到人物的收藏',
      actionText: '去逛逛',
      routeUrl: '../../pages/popular/popular'
    }
Page({
  data:{
    film_favorite: [],
    person_favorite: [],
    show: 'film_favorite',
    nullTip: filmNullTip
  },
  onLoad:function(options){
    var that = this
    let movieList = [];
    for(let key in app.globalData.collectMovie){
        douban.fetchFilmDetail.call(that, config.apiList.filmDetail, app.globalData.collectMovie[key], function(data){
          movieList.push(data);
         
          that.setData({
            film_favorite: movieList
          })
        });
    }

    let personList = [];
    for(let key in app.globalData.collectPeople){
        douban.fetchPersonDetail.call(that, config.apiList.personDetail, app.globalData.collectPeople[key], function(data){
          personList.push(data);
          
          that.setData({
            person_favorite: personList
          })
        });
    }
    wx.stopPullDownRefresh()
  },
  viewFilmDetail: function(e) {
		var data = e.currentTarget.dataset
		wx.redirectTo({
			url: "../filmDetail/filmDetail?id=" + data.id
		})
  },
  viewPersonDetail: function(e) {
		var data = e.currentTarget.dataset
		wx.redirectTo({
			url: "../personDetail/personDetail?id=" + data.id
		})
  },
  changeViewType: function(e) {
    var data = e.currentTarget.dataset
    this.setData({
      show: data.type,
      nullTip: data.type == 'film_favorite' ? filmNullTip : personNullTip
    })
  }
})