import Head from 'next/head'
import React, {useState, useEffect} from 'react'
import GlobalStates from '../components/context/GlobalContext'
import {useRouter} from 'next/router'

export default ({Component, pageProps: {userCart, adminData, userData, isLoggedIn, ...pageProps}}) => {
    const [cart, updateCart] = useState(userCart || {})
    const [_adminData, setAdminData] = useState(adminData)
    const {route} = useRouter()
    const globalStatesValue = {
        cart: {
            state: cart,
            updater: updateCart
        },
        isLoggedIn: {
            state: isLoggedIn
        },
        userData: {
            state: userData,
        },
        adminData: {
            state: _adminData,
        },
        cookieStore: {
            get: (name) => {
                return new Promise(
                    (res) => {
                        const DOC_COOKIE = decodeURIComponent(document.cookie).split(/\;\s?/)
                        
                        DOC_COOKIE.forEach(
                            (eachCookie) => {
                                const [cookieName, cookieValue] = eachCookie.split('=')
                                if(cookieName === name){
                                    res({value: cookieValue})
                                }
                            }
                        )

                        res()
                    }
                )
            },
            set: ({name, value, expires, path}) => {
                return new Promise((res) => {
                    res(document.cookie = `${name}=${value};expires=${expires};path=${path}`)
                })
            }
        }
    }

    useEffect(() => {
        if(!/^\/admin/.test(route)){
            globalStatesValue.cookieStore.get('OLLYMANN_FARMS').then(res => {
                const cookieValue = res ? JSON.parse(res.value) : {}
            
                globalStatesValue.cookieStore.set({
                    name: 'OLLYMANN_FARMS',
                    value: JSON.stringify({
                        ...cookieValue,
                        cart
                    }),
                    expires: new Date(new Date().getTime() + (356 * 24 * 3600 * 1000)),
                    path: '/' 
                })
            })
        }
    }, [cart])

    return (
        <>
            <Head>
                <title>Ollymann Farms</title>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="keywords" content="Ollymann Farms" />
                <meta name="description" content="Ollymann Farms" />
                <meta name="author" content="Ollymann Farms" />
                <link rel="shortcut icon" href="/assets/images/demos/demo-21/logo.png" />
                <meta name="apple-mobile-web-app-title" content="Ollymann Farms" />
                <meta name="application-name" content="Ollymann Farms" />
                <meta name="msapplication-TileColor" content="#cc9966" />
                <meta name="msapplication-config" content="assets/images/icons/browserconfig.xml" />
                <meta name="theme-color" content="#ffffff" />
                {/* Plugins CSS File */}
                <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
                {/* Main CSS File */}
                <link rel="stylesheet" href="/assets/css/style.css" />
                <link rel="stylesheet" href="/assets/css/skins/skin-demo-21.css" />
                <link rel="stylesheet" href="/assets/css/demos/demo-21.css" />
                <link rel="stylesheet" href="/assets/css/demos/demo-21.css" />
                <link rel="stylesheet" href="/styles/css/bootstrap.min.css" />
                <link rel="stylesheet" href="/styles/css/common.css" />
                <link rel="stylesheet" href="/styles/font-awesome/font-awesome/font-awesome.css" />
                <link rel="stylesheet" href="/styles/font-awesome/animate.css" />
                <link rel="stylesheet" href="/b-icon/font/bootstrap-icons.css" />
            </Head>
            <GlobalStates globalStates = {globalStatesValue}>
                <Component className = "po-rel" style = {{zIndex: 0}} cart = {cart} {...pageProps} />
                <div id = '__popup'></div>
            </GlobalStates>
        </>
    )
}
