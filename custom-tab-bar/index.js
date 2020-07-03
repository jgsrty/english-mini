Component({
  data: {
    activeTab: 0,
    color: "#a9b7b7",
    selectedColor: "#26397d",
    list: [{
        pagePath: "/pages/home/index/index",
        text: "home",
        iconPath: "/images/tabbar/home.png",
        selectedIconPath: "/images/tabbar/home-selected.png"
      },
      {
        pagePath: "/pages/github/index/index",
        text: "github",
        iconPath: "/images/tabbar/github.png",
        selectedIconPath: "/images/tabbar/github-selected.png"
      }
    ]
  },
  methods:{
    switchTab(e){
      const url = e.currentTarget.dataset.path
      wx.switchTab({url})
    }
  }
})