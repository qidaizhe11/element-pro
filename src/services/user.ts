import request from 'utils/request'

export function queryCurrent() {
  return request.get('/api/currentUser')
}
