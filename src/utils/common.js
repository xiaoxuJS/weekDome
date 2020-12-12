export function setToken(token) {
    sessionStorage.setItem('token', token)
}

export function getToken() {
    return sessionStorage.getItem('token');
}

export function setItem(key, value) {
    let str = JSON.stringify(value);
    sessionStorage.setItem(key, str)
}

export function getItem(key) {
    let res = sessionStorage.getItem(key);
    return JSON.parse(res)
}

export function removeItem(key) {
    sessionStorage.removeItem(key)
}