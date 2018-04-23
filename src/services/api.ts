import request from 'utils/request'

export function queryRule(params: any) {
  return request.get('/api/rule', {
    params: params
  })
}

export function removeRule(params: any) {
  return request.post('/api/rule', {
    method: 'delete',
    ...params
  })
}

export function addRule(params: any) {
  return request.post('/api/rule', {
    method: 'post',
    ...params
  })
}

export function fakeAccountLogin(params: any) {
  return request.post('/api/login/account', params)
}

export function fakeSubmitForm(params: any) {
  return request.post('/api/forms', params)
}

export function fakeChartData() {
  return request.get('/api/fake_chart_data')
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
