// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return localStorage.getItem('antd-pro-authority') || 'user'
}

export function setAuthority(authority: string) {
  return localStorage.setItem('antd-pro-authority', authority)
}
