var app=getApp();
var util=require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateTitle:"",
    movies:{},
    requestUrl:'',
    totalCount:0,
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {//options专门来获取url上的参数
  var category=options.category;
   this.data.navigateTitle=category;
    console.log(category);
    var dataUrl="";
    switch(category){
      case "正在热映":
        dataUrl = app.globalData.domainDuoBan +"in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a";
        break;
      case "即将上映":
        dataUrl = app.globalData.domainDuoBan + "coming_soon?apikey=0df993c66c0c636e29ecbb5344252a4a";
        break;
      case "豆瓣热搜250部电影":
        dataUrl = app.globalData.domainDuoBan + "top250?apikey=0df993c66c0c636e29ecbb5344252a4a";
        break;
    }
    this.data.requestUrl=dataUrl;
    util.http(dataUrl, this.processDuoBanData);
    
  },
  onScrollLower(event) {
  //当把滚动条拖动到最底部时，可以触发一个scrolltolower事件，运行后续的功能
     var nextUrl=this.data.requestUrl+"&start="+this.data.totalCount+
     "&count=20";
     util.http(nextUrl,this.processDuoBanData);
     wx.showNavigationBarLoading();//开启正在加载提示
  },
  processDuoBanData: function (moviesData) {
    var movies = [];
    for (var key in moviesData.subjects) {
      var subject = moviesData.subjects[key];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      // console.log(util.convertToStarsArray(subject.rating.stars));
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
    }
    var totalMovies={};
    
    if(!this.data.isEmpty){
      totalMovies=this.data.movies.concat(movies);
    }else{//第一次加载时走下面这行代码
      totalMovies=movies;
      this.data.isEmpty=false;
    }
    this.setData({
      movies:totalMovies
    });
    this.data.totalCount += 20;
    //  console.log(this.data.readyData)
    wx.hideNavigationBarLoading();//关闭正在加载提示
    wx.stopPullDownRefresh();

  },
  onMovieTap(event) {
    var movieId = event.currentTarget.dataset.movieId;
    console.log(movieId);
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({//要在onReady里面使用才有效果
      title: this.data.navigateTitle,
      success: function () {
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {//先onLoad----onShow-----onReady生命周期是这样的
  
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
    console.log('在下拉刷新么')
    var refreshUrl = this.data.requestUrl + "&start=0&count=20";
    this.data.movies={};//这两行代码很必要,每次下拉刷新都要对上次所有数据清空,这样就保证
    //每次下拉刷新你都只能得到20条数据,而不是一直多拿20条数据
    this.data.isEmpty=true;
    util.http(refreshUrl, this.processDuoBanData);
    wx.showNavigationBarLoading();
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