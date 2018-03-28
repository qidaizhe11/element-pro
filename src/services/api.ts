import request from 'utils/request'

export function fakeAccountLogin(params: any) {
  return request.post('/api/login/account', params)
}
