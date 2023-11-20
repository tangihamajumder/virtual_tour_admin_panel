const setToLocalStorage = (key, value) => {
    if (!key || typeof window === 'undefined') {
        return ""
    }
    return localStorage.setItem(key, value)
}

export default setToLocalStorage;
