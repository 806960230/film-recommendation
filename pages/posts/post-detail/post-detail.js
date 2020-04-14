var postsData=require('../../../data/posts-data.js')
var app=getApp();//获取全局变量
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    
  },
  onCollectionTap:function(event){
    var postsCollected =  wx.getStorageSync('posts_collected');
    var postCollected=postsCollected[this.data.currentPostId];
    postCollected=!postCollected;
    postsCollected[this.data.currentPostId]=postCollected;
    this.showModal(postsCollected, postCollected);
    console.log(this.data.postCollected);
  },
  showModal:function(postsCollected,postCollected){
    var that=this;
    wx.showModal({
      title: '收藏',
      content: postCollected?'收藏该文章?':"取消收藏该文章?",
      showCancel: 'true',
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确定",
      confirmColor: "405f80",
      success:function(res){
        if(res.confirm){
          wx.setStorageSync('posts_collected', postsCollected);
          that.setData({
            collected: postCollected
          });
          wx.showToast({
            title: postCollected ? "收藏成功" : "取消收藏"
          });
        }
      }

    })
  },
  showToast: function (postsCollected, postCollected){
      wx.setStorageSync('posts_collected', postsCollected);
    this.setData({
      collected: postCollected
    });
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消收藏"
    });
  },
  onShareTap:function(event){
    var itemList = ['分享给微信好友',
      '分享到朋友圈',
      '分享到QQ',
      '分享到微博'];
      wx.showActionSheet({
        itemList:itemList,
        itemColor:"#405f80",
        success:function(res){
         //res.cancel用户是不是点击了取消按钮
         //res.tapIndex数组元素的序号,从0开始
         wx.showModal({
           title:"用户"+itemList[res.tapIndex],
           content:"用户是否选择取消?"+"现在无法实现分享功能,什么时候能支持呢"
         })
        }
      })
  },
  onMusicTap:function(event){
      
      console.log('播放了吗');
    const backgroundAudioManager = wx.getBackgroundAudioManager()

    backgroundAudioManager.title = '此时此刻'
    backgroundAudioManager.epname = '此时此刻'
    backgroundAudioManager.singer = '许巍'
    backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    // 设置了 src 之后会自动播放
    backgroundAudioManager.src = 'http:\/\/ws.stream.qqmusic.qq.com\C400001QJyJ32zybEe.m4a?guid=2552400768&vkey=99F501B73D2D30F83779AE9B7891D212CAD553BDB014E9E16D59FB364640315C797B62851EA9700C05535219AAE6B37D7B0B8300162DF9BA&uin=7270&fromtag=66'
     backgroundAudioManager.play();
    backgroundAudioManager.onError((err) => {
      console.log(err)
    })//bug播放不了???
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var globalData=app.globalData;//获取全局变量
    console.log(globalData);
     var postId=options.id;//获取被点击后获得id
     var postData=postsData.postList[postId];
     this.data.currentPostId=postId;
     this.setData({
       postList:postData
     });
     var postsCollected=wx.getStorageSync('posts_collected');
     if(postsCollected){
       var postCollected = postsCollected[postId];
       this.setData({
         collected:postCollected
       })
     }else{
       var postsCollected={    
       };
       postsCollected[postId]=false;
       wx.setStorageSync('posts_collected', postsCollected)
     }
     
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