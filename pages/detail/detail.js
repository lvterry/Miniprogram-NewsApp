const util = require('../../utils/util.js');

Page({

  data: {
    detail: ''
  },

  onLoad: function (options) {
    this.newsId = options.id
    this.getNewsItem()
    console.log(options.id)
  },

  getNewsItem() {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.newsId
      },
      success: (res) => {
        if ((res.statusCode === 200) && (res.data.code === 200)) {
          let result = res.data.result
          result.shortTime = util.shortTime(new Date(result.date))
          this.setData({ detail: result })
        }
      }
    })
  }
})