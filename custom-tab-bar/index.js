Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/posts/posts",
      text: "阅读",
      iconPath: "/images/tab/yuedu.png",
      selectedIconPath: "/images/tab/yuedu_hl.png"
    },
      {
        pagePath: "/pages/movies/movies",
        text: "电影",
        iconPath: "/images/tab/dianying.png",
        selectedIconPath: "/images/tab/dianying_hl.png"
      }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})