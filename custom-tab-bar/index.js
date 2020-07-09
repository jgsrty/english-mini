import create from '../utils/create'

create({
  data: {
    playState: '',
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
        pagePath: "/pages/player/index/index",
        text: "player",
        iconPath: "/images/tabbar/play.png",
        selectedIconPath: "/images/tabbar/pause.png"
      },
      {
        pagePath: "/pages/github/index/index",
        text: "github",
        iconPath: "/images/tabbar/github.png",
        selectedIconPath: "/images/tabbar/github-selected.png"
      }
    ]
  },
  methods: {
    switchTab(e) {
      this.store.data.isAddNew = false
      const url = e.currentTarget.dataset.path
      wx.switchTab({
        url
      })
    }
  }
})