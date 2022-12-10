import {Context, enableDebugConsoleLogDrain, enableContextDevTools} from '@uniformdev/context'
import {CookieTransitionDataStore, UNIFORM_DEFAULT_COOKIE_NAME} from '@uniformdev/context'
import Cookies from 'cookie'
import manifest from './contextManifest.json'

class SfcsfTransitionStore extends CookieTransitionDataStore {
    constructor(cookieValue) {
        super({
            serverCookieValue: getNextServerCookieValue(cookieValue)
        })
    }
}

function getNextServerCookieValue(cookieValue) {
    if (!cookieValue) {
        return ''
    }

    const parsed = Cookies.parse(cookieValue)
    return parsed[UNIFORM_DEFAULT_COOKIE_NAME]
}

export default function createUniformContext(providedManifest, cookieValue) {
    const plugins = [enableContextDevTools(), enableDebugConsoleLogDrain('debug')]
    const context = new Context({
        defaultConsent: true,
        manifest: providedManifest ?? manifest,
        transitionStore: new SfcsfTransitionStore(cookieValue),
        plugins: plugins
    })
    return context
}
