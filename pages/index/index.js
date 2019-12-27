//index.js
//获取应用实例
const app = getApp()
const categoryCodes = ['gn', 'gj', 'cj', 'yl', 'js', 'ty', 'other'];
const util = require('../../utils/util.js');

Page({
  data: {
    categories: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他'],
    selectedIndex: 0
  },

  onLoad () {
    this.selectedIndex = 0;
    this.getNews()
  },

  onCategoryTapped (event) {
    if (this.selectedIndex !== event.target.dataset.index) {
      this.selectedIndex = event.target.dataset.index
      this.setData({
        selectedIndex: this.selectedIndex
      })
      this.getNews()
    } 
  },

  newsItemTapped (event) {
    let itemId = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${itemId}`
    })
  },

  onPullDownRefresh () {
    this.getNews(()=> {
      wx.stopPullDownRefresh()
    })
  },

  getNews(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: categoryCodes[this.selectedIndex]
      },
      success: (res) => {
        let result = res.data.result
        result.forEach((item, key) => 
          item.time = util.shortTime(new Date(item.date))
        )
        this.setData({
          newsItems: result
        })
      },
      complete: () => callback && callback()
    })
  }
})
