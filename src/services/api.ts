import request from 'utils/request'

export function fakeAccountLogin(params: any) {
  return request.post('/api/login/account', params)
}

export function fakeSubmitForm(params: any) {
  return request.post('/api/forms', params)
}

export function queryTags() {
  return request.get('/api/tags')
}

export function queryBasicProfile() {
  return request.get('/api/profile/basic')
}

export function queryAdvancedProfile() {
  return request.get('/api/profile/advanced')
}
