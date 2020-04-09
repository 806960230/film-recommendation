var postsData=require('../../data/posts-data.js');


Page({
   
  /**
   * 页面的初始数据
   */
  data: {
    date:"Sep 18 2016",
    title:"豪车500W"
  },
  onPostTap:function(event){
    //dataset是获取所有自定义data-*属性的值,其中我获取了postId自定义属性的值
    //如果是在另一头再自定义一个属性叫data-post-name-id则我们需要获取该属性值的话
    //应该是dataset.postNameId
   var postId=event.currentTarget.dataset.postId;
     wx.navigateTo({
      url:"post-detail/post-detail?id="+postId
     });
  },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.setData({//一般用于异步操作更新数据
      posts_key:postsData.postList
    });
    //也可以this.data.posts_key=postsData.postList
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})