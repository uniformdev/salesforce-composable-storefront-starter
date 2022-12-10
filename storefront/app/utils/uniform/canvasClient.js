import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'
import {
    CanvasClient,
    CANVAS_DRAFT_STATE,
    CANVAS_PUBLISHED_STATE,
    createLimitPolicy
} from '@uniformdev/canvas'
import customFetch from './customFetch'

export async function getCompositionBySlug(slug, preview) {
    const canvasClient = new CanvasClient({
        apiKey: 'fake',
        apiHost: getAppOrigin(),
        fetch: customFetch,
        limitPolicy: createLimitPolicy({
            retry: {
                retries: 0
            }
        })
    })
    const {composition} = await canvasClient.getCompositionBySlug({
        slug,
        state:
            process.env.NODE_ENV === 'development' || preview
                ? CANVAS_DRAFT_STATE
                : CANVAS_PUBLISHED_STATE
    })
    return composition
}
