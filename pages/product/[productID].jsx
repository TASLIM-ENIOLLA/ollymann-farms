import Header from '../../components/Page/Header'
import Footer from '../../components/Page/Footer'
import currency from '../../components/currency'
import {API_ROUTE} from '../../config'
import {useState, useEffect, useContext} from 'react'
import {useRouter} from 'next/router'
import {GlobalContext} from '../../components/context/GlobalContext'
import Component404 from '../../components/Page/404'
import {notify} from '../../components/Popups'

export const Rating = ({rating}) => {
    return (
        <>
            <div>{
                [true, true, true, true, true].map(
                    (each, index) => (
                        <span key = {index} className = {`bi bi-star-fill mx-1 text-${index < rating ? 'warning' : 'muted'}`}></span>
                    )
                )
            }
            </div>
            <div>
                <span>{rating} star rating</span>
            </div>
        </>
    )
}

const ProductImagesSmall = ({src, onClick}) => {
    return (
        <div className="col-lg-12 col col-sm-3">
            <div onClick = {onClick} className="min-w-110px max-h-120px overflow-0 bg-light border mb-3">
                <img src={src} alt="Product Image" className="d-block w-100"/>
            </div>
            <style jsx>{`
                .min-w-110px{
                    min-width: 110px;
                }
                .max-h-120px{
                    max-height: 120px;
                }
            `}</style>
        </div>
    )
}

const ProductImageLarge = ({src}) => {
    return (
        <div className = 'border shadom-sm' style = {{
            height: '400px',
            backgroundImage: `url(${src})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
        }}></div>
    )
}

export default () => {
    const {globalStates: {cart: {state: cart, updater: updateCart}}} = useContext(GlobalContext)
    const [productData, setProductData] = useState()
    const [is404, set404] = useState()
    const {query: {productID}} = useRouter()
    const [largeProductImage, setLargeProductImage] = useState('')
    // const [carted, setCarted] = useState()

    useEffect(async () => {
        const req = await fetch(`${API_ROUTE.product_data}?productID=${productID}`)
        const {type, data: productData} = await req.json()

        if(type === 'success'){
            set404(false)
            productData.isCarted = !!cart[productData?.id]
            setProductData(productData)
            setLargeProductImage(productData?.images[0])
        }
        else{
            set404(true)
        }
    }, [cart])

    return (
        <>
            <Header></Header>
            {(
                (is404)
                ? <Component404 title = 'product' />
                : (
                    (is404 === false)
                    ? (
                        <>
                            <section>
                                <div className = 'border-top'>
                                    <div className = 'container'>
                                        <div className="row">
                                            <div className="col-12 b">
                                                <div className = 'py-4 flex-h a-i-c'>
                                                    <div>
                                                        <a href="/home">Home</a>
                                                        <span className = 'bi bi-chevron-right mx-3'></span>
                                                    </div>
                                                    <div>
                                                        <a href="/shop">Shop</a>
                                                        <span className = 'bi bi-chevron-right mx-3'></span>
                                                    </div>
                                                    <div>
                                                        <a className = 'text-capitalize'>{productData?.name}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section>
                                <div className="container py-4 pb-5 mb-5">
                                    <div className="row">
                                        <div className="col-lg-8">
                                            <div className="row" style = {{flexDirection: 'row-reverse'}}>
                                                <div className="col-lg-9 col-md-12 mb-4">
                                                    <ProductImageLarge src = {
                                                        (productData)
                                                        ? `${API_ROUTE.product_images}/${productData?.id}/${largeProductImage}`
                                                        : ''
                                                    } />
                                                </div>
                                                <div className="col-lg-3 col-md-12 col-12 mb-4 overflow-y-auto max-h-400px">
                                                    <div className = 'row'>{
                                                        productData?.images.map(
                                                            (src, key) => (
                                                                <ProductImagesSmall key = {key} onClick = {() => {
                                                                    setLargeProductImage(src)
                                                                }} src = {(
                                                                    (productData)
                                                                    ? `${API_ROUTE.product_images}/${productData?.id}/${src}`
                                                                    : ''
                                                                )} />
                                                            )
                                                        )
                                                    }</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div>
                                                <h2 className = 'text-capitalize'>{productData?.name}</h2>
                                                <div className = 'mb-2'>
                                                    <Rating rating = {3} />
                                                </div>
                                                <p className = 'text-capitalize text-danger'>
                                                    <span className = 'h3 text-danger'>{currency}{new Intl.NumberFormat().format(productData?.price || 0)}</span>
                                                </p>
                                                <p className = 'mb-4 text-capitalize'>
                                                    {productData?.description}
                                                </p>
                                                <div className="row">
                                                    <div className="col-auto">{
                                                        (productData?.isCarted)
                                                        ? (
                                                            <button onClick = {() => {
                                                                const newCart = {}
                                                                
                                                                Object.values(cart).forEach(
                                                                    ({id: cartID, name, price, image, quantity}) => (
                                                                        (cartID !== productData?.id)
                                                                        ? (newCart[cartID] = {id: cartID, name, price, image, quantity})
                                                                        : true
                                                                    )
                                                                )

                                                                updateCart(newCart)
                                                                notify({
                                                                    message: `Product '${productData?.name}' removed from cart!`,
                                                                    type: 'success'
                                                                })
                                                            }} className = 'px-5 d-block py-3 theme-border rounded bg-clear outline-0'>
                                                                <span className = 'bi bi-cart-x mr-3 theme-color'></span>
                                                                <span className = 'text-uppercase theme-color'>remove from cart</span>
                                                            </button>
                                                        )
                                                        : (
                                                            (productData?.isCarted === false)
                                                            ? (
                                                                <button onClick = {() => {
                                                                    updateCart({
                                                                        ...cart,
                                                                        [productData?.id]: {id: productData?.id, name: productData?.name, price: productData?.price, image: `${API_ROUTE.product_images}/${productData?.id}/${productData?.images[0]}`, quantity: '1'}
                                                                    })
                                                                    notify({
                                                                        message: `Product '${productData?.name}' added to cart!`,
                                                                        type: 'success'
                                                                    })
                                                                }} className = 'px-5 d-block py-3 theme-border rounded bg-clear outline-0'>
                                                                    <span className = 'bi bi-cart2 mr-3 theme-color'></span>
                                                                    <span className = 'text-uppercase theme-color'>add to cart</span>
                                                                </button>
                                                            )
                                                            : <></>
                                                        )
                                                    }</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </>
                    )
                    : <></>
                )
            )}<Footer />
            <style jsx>{`
                .max-h-400px{
                    max-height: 400px;
                }
                .scrollUpDown{
                    animation: scrollUpDown 3s ease infinite;
                }
                @keyframes scrollUpDown{
                    from: {
                        background-position: top;
                    }
                    to: {
                        background-position: bottom;
                    }
                }
            `}</style>
        </>
    )
}

export async function getServerSideProps(context){
    const {req: {cookies}, query: {productID}} = context
    const cookie = cookies['OLLYMANN_FARMS'] || undefined

    return {
        props: {
            userData: cookie ? JSON.parse(cookie) : null,
            isLoggedIn: cookie && JSON.parse(cookie).id ? true : false,
            userCart: cookie && JSON.parse(cookie).cart ? JSON.parse(cookie).cart : {},
        }
    }
}