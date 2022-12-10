import fetch from 'cross-fetch'
import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'

export default function customFetch(url, options) {
    typeof window === 'undefined' ? fetch : window.fetch.bind(window)
    const originalUrl = new URL(url)
    const {pathname, search} = originalUrl
    const newUrl = `${getAppOrigin()}/mobify/proxy/uniform${pathname}${search}`
    return fetch(newUrl, options)
}
