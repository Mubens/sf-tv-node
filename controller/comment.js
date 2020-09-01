const mainp1 = {
  page: 1,
  limit: 10,
  total: 15,
  all_total: 18,
  comments: [
    {
      user: {
        id: 1,
        face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
        name: '任评测'
      },
      comment: { id: 1, content: '来了来了，是时候表演真正的速度了', like: 175, time: 1590730920000 },
      children: {
        errno: 0,
        msg: 'hot sub comment',
        data: {
          page: 1,
          limit: 3,
          total: 4,
          comments: [
            {
              user: {
                id: 11,
                face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
                name: 'Dell小明'
              },
              reply_user: {
                id: 1,
                face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
                name: '任评测'
              },
              comment: {
                id: 11,
                content: '最近视频很难腹泻式更新，因为肠胃在腹泻_(:3」∠)_',
                like: 8,
                time: 1590731460000
              }
            },
            {
              user: {
                id: 12,
                face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
                name: '西瓜蛋挞丶'
              },
              reply_user: {
                id: 1,
                face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
                name: '任评测'
              },
              comment: { id: 12, content: '哇 我刚看完评测君的对比视频真是巧了', like: 0, time: 1590764640000 }
            },
            {
              user: {
                id: 13,
                face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
                name: '江苏大学流体中心'
              },
              reply_user: {
                id: 1,
                face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
                name: '任评测'
              },
              comment: { id: 13, content: '有小闪电，捞一手', like: 0, time: 1590740820000 }
            }
          ]
        }
      }
    },
    {
      user: {
        id: 2,
        face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
        name: '蟑螂恶霸丸子龙'
      },
      comment: {
        id: 2,
        content: '冷知识，“神作”这个中国特色名词的起源就是90年代异度系列的第一作异度装甲',
        like: 94,
        time: 1590760980000
      },
      children: {}
    },
    {
      user: {
        id: 3,
        face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
        name: '莱克斯X'
      },
      comment: { id: 3, content: '开头这舌头卧槽…回忆一下上来了…', like: 72, time: 1590729420000 },
      children: {}
    },
    {
      user: {
        id: 4,
        face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
        name: '小N白'
      },
      comment: {
        id: 4,
        content: '5月29日发布的大作：\n异度之刃（X）\n美少女万华镜（√）',
        like: 74,
        time: 1590730560000
      },
      children: {}
    },
    {
      user: {
        id: 5,
        face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
        name: '幻宇者'
      },
      comment: { id: 5, content: '开头那句 **大家听我说话清楚吗？ 有内味了', like: 43, time: 1590730020000 },
      children: {}
    },
    {
      user: {
        id: 6,
        face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
        name: '黑旋风为民除害'
      },
      comment: {
        id: 6,
        content:
          '明哥，推荐你一个网站叫乐园数据管理室，是异度之刃的中文资料站，很完整，现在他们又在筹备xb1决定版的资料站了，网站是 xenoblade2.cn',
        like: 32,
        time: 1591008180000
      },
      children: {}
    },
    {
      user: {
        id: 7,
        face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
        name: '星雪灵'
      },
      comment: { id: 7, content: '等到明哥了', like: 25, time: 1590728880000 },
      children: {}
    },
    {
      user: {
        id: 8,
        face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
        name: '康娜有个小小号'
      },
      comment: { id: 8, content: '当年就是看小明异度2入的主机', like: 23, time: 1590730020000 },
      children: {}
    },
    {
      user: {
        id: 9,
        face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
        name: 'ChatwinYau'
      },
      comment: { id: 9, content: '我要看小明露脸。不露脸视频还有啥意思', like: 20, time: 1590757920000 },
      children: {}
    },
    {
      user: {
        id: 10,
        face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
        name: 'Hsin江雪'
      },
      comment: {
        id: 10,
        content:
          '《尼尔机械纪元》的开头问:“我们是否终有一天，会把箭射向给了我们无尽迷题的神?”\n《异度之刃》的结尾回答:“我们要凭借自己的力量斩杀神，开辟未来。”\n这不禁让我想起，希里杀死林中夫人之后，杰洛特向村民说得那句话:“这不是无人之地，这也不是夫人之地，这就是属于你们的土地。”\n也许也是这些游戏像表达的意义之一吧:人不可能向神明祈求未来，只能靠自己所拥有的条件把握现在。',
        like: 18,
        time: 1590716400000
      },
      children: {}
    }
  ]
}

const mainp2 = {
  page: 2,
  limit: 10,
  total: 15,
  all_total: 18,
  comments: [
    {
      user: {
        id: 14,
        face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
        name: '槍羽銳二'
      },
      comment: {
        id: 14,
        content: '明哥记得到第17章等梅利亚单独行动的时候，把时间调到0点，然后让她和男主单独对话会有惊喜',
        like: 12,
        time: 1592453640000
      },
      children: {}
    },
    {
      user: {
        id: 15,
        face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
        name: '千手修兵'
      },
      comment: { id: 15, content: '开头这灵活的舌头', like: 10, time: 1590728880000 },
      children: {}
    },
    {
      user: {
        id: 16,
        face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
        name: '真是明哥的女粉'
      },
      comment: { id: 16, content: '肝帝明真不是浪得虚名的！明哥牛逼！', like: 8, time: 1590729480000 },
      children: {}
    },
    {
      user: {
        id: 17,
        face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
        name: '泰古1'
      },
      comment: {
        id: 17,
        content: '肝了一天终于赶上明哥直播的速度了！玩累了再来看看视频，四舍五入就是玩了三遍！好游戏就是要慢慢品！',
        like: 7,
        time: 1590846900000
      },
      children: {}
    },
    {
      user: {
        id: 18,
        face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
        name: '胖猫一号'
      },
      comment: { id: 18, content: '小明太快了', like: 7, time: 1590729420000 },
      children: {}
    }
  ]
}

const mainp = [mainp1, mainp2]

/* 获取一级评论 */
const getMainComment = (vId, page, limit) => {
  return mainp[page]
}

/* 获取二级评论 */
const getSubComment = (cId, page, limit) => {
  return {
    page: 1,
    limit: 10,
    total: 4,
    comments: [
      {
        user: {
          id: 11,
          face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
          name: 'Dell小明'
        },
        reply_user: {
          id: 1,
          face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
          name: '任评测'
        },
        comment: { id: 11, content: '最近视频很难腹泻式更新，因为肠胃在腹泻_(:3」∠)_', like: 8, time: 1590731460000 }
      },
      {
        user: {
          id: 20,
          face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
          name: '我只想静静-'
        },
        reply_user: {
          id: 1,
          face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
          name: '任评测'
        },
        comment: { id: 20, content: '梦幻联动', like: 0, time: 1590735900000 }
      },
      {
        user: {
          id: 13,
          face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
          name: '江苏大学流体中心'
        },
        reply_user: {
          id: 1,
          face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
          name: '任评测'
        },
        comment: { id: 13, content: '有小闪电，捞一手', like: 0, time: 1590740820000 }
      },
      {
        user: {
          id: 12,
          face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
          name: '西瓜蛋挞丶'
        },
        reply_user: {
          id: 1,
          face: 'http://localhost:3000/images/70a44598a0fc5c3f3539dd2e22890f674e0b8678.png@144w_144h.webp',
          name: '任评测'
        },
        comment: { id: 12, content: '哇 我刚看完评测君的对比视频真是巧了', like: 0, time: 1590764640000 }
      }
    ]
  }
}

module.exports = {
  getMainComment,
  getSubComment
}
