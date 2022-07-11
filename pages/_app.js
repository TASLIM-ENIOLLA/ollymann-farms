import {useState} from 'react'
import Head from 'next/head'
import GlobalStates, {GlobalStatesContext} from '../components/contexts/GlobalStatesContext'

export default ({Component, pageProps: {userCart, ...pageProps}}) => {
    const [cart, updateCart] = useState(userCart)
    const saveCartDataToCookies = async (cartData) => {
        cookieStore.get('OLLYMANN_FARMS').then(res => {
            const cookieValue = res ? JSON.parse(res.value) : {}
        
            cookieStore.set({
                name: 'OLLYMANN_FARMS',
                value: JSON.stringify({
                    ...cookieValue,
                    cart: cartData
                }),
                expires: (new Date().getTime() + (356 * 24 * 3600 * 1000)),
                path: '/' 
            })
        })
    }
    const GlobalStatesValue = {
        globalStates: {
            cart: {
                state: cart,
                updater: updateCart,
                addToCart: (cartData) => {
                    if(typeof cartData === 'object'){
                        const {id, name, quantity, price, image} = cartData
                        const newCart = {
                            ...cart,
                            [id]: {id, name, quantity, price, image}
                        }

                        updateCart(newCart)
                        console.log(newCart)
                        return saveCartDataToCookies(newCart)
                    }
                    else{
                        console.warn('Cart data is not an object')
                    }
                },
                removeFromCart: (id) => {
                    const newCart = {}

                    for(let cartID in cart){
                        if(cartID !== id){
                            newCart[cartID] = cart[cartID]
                        }
                    }

                    updateCart(newCart)
                    console.log(newCart)
                    return saveCartDataToCookies(newCart)
                },
            }
        }
    }

    return (
        <>
            <Head>
                <title>Ollymann farms</title>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="keywords" content="Coloneli Simpsoni" />
                <meta name="description" content="Coloneli Simpsoni" />
                <meta name="author" content="Coloneli Simpsoni" />
                <link rel="shortcut icon" href="/assets/images/demos/demo-21/logo.png" />
                <meta name="apple-mobile-web-app-title" content="Molla" />
                <meta name="application-name" content="Molla" />
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
            <GlobalStates value = {GlobalStatesValue}>
                <Component className = "po-rel" style = {{zIndex: 0}} {...pageProps} />
            </GlobalStates>
        </>
    )
}
