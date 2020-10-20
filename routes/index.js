const fs = require('fs')
const path = require('path')
const router = require('koa-router')()

const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getRecentUpdate, getSerialAnimation, getEndAnimation } = require('../controller/index')

router.prefix('/api/index')

// 轮播图
router.get('/hot_carousel', async (ctx) => {
  try {
    const data = await new Promise((reslove, reject) => {
      fs.readFile(path.join(__dirname, '../data/index-carousel.json'), 'utf8', (err, res) => {
        err ? reject(err) : reslove(res)
      })
    })

    ctx.body = new SuccessModel(JSON.parse(data), '轮播图')
  } catch (err) {
    ctx.body = new ErrorModel('找不到资源')
  }
})

// 最近更新
router.get('/recent_update', async (ctx) => {
  const data = await getRecentUpdate()
  ctx.body = data ? new SuccessModel(data, '最近更新') : new ErrorModel('没有数据')
})

// 连载动画
router.get('/serial_animation', async (ctx) => {
  const data = await getSerialAnimation()
  ctx.body = data ? new SuccessModel(data, '连载动画') : new ErrorModel('没有数据')
})

// 完结动画
router.get('/end_animation', async (ctx) => {
  const data = await getEndAnimation()
  ctx.body = data ? new SuccessModel(data, '完结动画') : new ErrorModel('没有数据')
})

module.exports = router
