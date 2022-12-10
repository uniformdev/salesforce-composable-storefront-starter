/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
'use strict'

const path = require('path')
const {getRuntime} = require('pwa-kit-runtime/ssr/server/express')
const {isRemote} = require('pwa-kit-runtime/utils/ssr-server')
const {getConfig} = require('pwa-kit-runtime/utils/ssr-config')
const helmet = require('helmet')
const dotenv = require('dotenv')
const {IN_CONTEXT_EDITOR_QUERY_STRING_PARAM} = require('@uniformdev/canvas')

dotenv.config()

const options = {
    // The build directory (an absolute path)
    buildDir: path.resolve(process.cwd(), 'build'),

    // The cache time for SSR'd pages (defaults to 600 seconds)
    defaultCacheTimeSeconds: 600,

    // This is the value of the 'mobify' object from package.json
    mobify: getConfig(),

    // The port that the local dev server listens on
    port: 3000,

    // The protocol on which the development Express app listens.
    // Note that http://localhost is treated as a secure context for development.
    protocol: 'http'
}

const runtime = getRuntime()

const {handler} = runtime.createHandler(options, (app) => {
    // Set HTTP security headers
    app.use(
        helmet({
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    'img-src': ["'self'", '*', 'data:'],
                    'script-src': [
                        "'self'",
                        "'unsafe-eval'",
                        'storage.googleapis.com',
                        'uniform.app',
                        'canary.uniform.app'
                    ],
                    'connect-src': [
                        "'self'",
                        'uniform.app',
                        'canary.uniform.app',
                        '*.salesforce.com'
                    ],

                    // Do not upgrade insecure requests for local development
                    'upgrade-insecure-requests': isRemote() ? [] : null,
                    'frame-ancestors': ["'self'", 'uniform.app', 'canary.uniform.app']
                }
            },
            hsts: isRemote()
        })
    )

    // Handle the redirect from SLAS as to avoid error
    app.get('/callback?*', (req, res) => {
        res.send()
    })
    app.get('/robots.txt', runtime.serveStaticFile('static/robots.txt'))
    app.get('/favicon.ico', runtime.serveStaticFile('static/ico/favicon.ico'))

    app.get('/worker.js(.map)?', runtime.serveServiceWorker)

    app.get('/preview', (req, res) => {
        const queryParamsToPreserve = [IN_CONTEXT_EDITOR_QUERY_STRING_PARAM]

        const slug = req.query.slug

        if (!slug) {
            return res.status(400).json({message: 'Missing slug'})
        }

        const newQuery = new URLSearchParams()
        queryParamsToPreserve.forEach((param) => {
            const paramValue = req.query[param]
            if (typeof paramValue === 'string') {
                newQuery.append(param, paramValue)
            }
        })

        newQuery.append('preview', 'true')

        const urlToRedirectTo = newQuery.toString() ? `${slug}?${newQuery.toString()}` : slug

        res
            // Set Referrer-Policy header for Canvas to know where the redirect came from
            .set('Referrer-Policy', 'origin')
            .redirect(301, urlToRedirectTo)
    })

    app.get('*', runtime.render)
})
// SSR requires that we export a single handler function called 'get', that
// supports AWS use of the server that we created above.
exports.get = handler
