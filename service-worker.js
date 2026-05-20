/*
=====================================================
CACHE
=====================================================
*/

const CACHE_NAME =
    "guia-premium-v1";

/*
=====================================================
FILES
=====================================================
*/

const urlsToCache = [

    "/",

    "/index.html",

    "/css/base.css",

    "/js/app.js"

];

/*
=====================================================
INSTALL
=====================================================
*/

self.addEventListener(

    "install",

    (event) => {

        event.waitUntil(

            caches.open(
                CACHE_NAME
            ).then((cache) => {

                return cache.addAll(
                    urlsToCache
                );

            })

        );

    }

);

/*
=====================================================
FETCH
=====================================================
*/

self.addEventListener(

    "fetch",

    (event) => {

        event.respondWith(

            caches.match(
                event.request
            ).then((response) => {

                return (
                    response
                    ||
                    fetch(event.request)
                );

            })

        );

    }

);