const displayNavbarAndSidebar = (...url) => {
    const [landingPageURL, categoryPageURL] = url
    if (!landingPageURL && !categoryPageURL) {
        return true
    }
    return false
}

export { displayNavbarAndSidebar }