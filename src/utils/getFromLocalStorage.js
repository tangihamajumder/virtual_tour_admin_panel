const getFromLocalStorage = key => {
    if (!key || typeof window === 'undefined') {
        return ""
    }
    return localStorage.getItem(key)
}

export default getFromLocalStorage;
