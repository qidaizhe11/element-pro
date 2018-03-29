const mockjs = require('mockjs')

module.exports = {
  'GET /api/currentUser': {
    name: 'Serati Ma',
    avatar:
      'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    notifyCount: 12
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [
      {
        name: '@city',
        'value|1-100': 150,
        'type|0-2': 1
      }
    ]
  }),
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body
    if (password === '888888' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin'
      })
      return
    }
    if (password === '123456' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user'
      })
      return
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guset'
    })
  }
}
