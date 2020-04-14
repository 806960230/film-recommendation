var util=require('../../utils/util.js')
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    comingSoon:{},
    top250:{},
    containerShow:true,
    searchPannelShow:false,
    searchResult:{}
  },
  onMoreMovie(event){
    var category=event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category='+category,
    });
  
  },
  getMovieListData(url,settedKey,categoryTitle){
    var that=this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "application/xml"//不要写json否则请求不到
      },
      success: function (res) {
        console.log(res.data)

        that.processDuoBanData(res.data, settedKey, categoryTitle);

      },
      fail: function (error) {
        console.log(error)
      },
      complete: function () {
       
      }
    })
  },
  processDuoBanData: function (moviesData, settedKey, categoryTitle){
     var movies=[];
     for(var key in moviesData.subjects){
        var subject=moviesData.subjects[key];
       var title=subject.title;
       if(title.length>=6){
         title=title.substring(0,6)+"...";
       }
       console.log(util.convertToStarsArray(subject.rating.stars));
       var temp={
         stars:util.convertToStarsArray(subject.rating.stars),
         title:title,
         average:subject.rating.average,
         coverageUrl:subject.images.large,
         movieId:subject.id
       }
       movies.push(temp);
     }
     var readyData={};
     readyData[settedKey]={
       movies:movies,
       categoryTitle: categoryTitle
     };
     console.log(readyData);
     this.setData(readyData);
    //  console.log(this.data.readyData)

  },
  onBindFocus(event){
    this.setData({containerShow:false,searchPannelShow:true});

  },
  onMovieTap(event){
    var movieId=event.currentTarget.dataset.movieId;
    console.log(movieId);
     wx.navigateTo({
       url: 'movie-detail/movie-detail?id='+movieId
     })
  },
  onBindConfirm(event){
     console.log('打印出搜索电影结果了吗')
     var text=event.detail.value;//获得文本内容
    var searchUrl = app.globalData.domainDuoBan + `subject/26683290?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  this.getMovieListData(searchUrl, "searchResult", "搜索结果");
    this.setData({
      containerShow: false,
      searchPannelShow: true,
    })
    console.log(this.data.searchResult);
  },
  onCancelImgTap(event){
     this.setData({
       containerShow:true,
       searchPannelShow:false,
       searchResult:{}
     })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var hotplayUrl = app.globalData.domainDuoBan +"in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=3";
    var commingsoonUrl = app.globalData.domainDuoBan + "coming_soon?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=3";
    var top250Url = app.globalData.domainDuoBan + "top250?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=3";
    this.getMovieListData(hotplayUrl,"inTheaters","正在热映");
    this.getMovieListData(commingsoonUrl,"commingSoon","即将上映");
    this.getMovieListData(top250Url,"top250","豆瓣热搜250部电影");
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
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
    
  }
})