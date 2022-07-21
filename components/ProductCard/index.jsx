import {useState, useEffect, useContext} from 'react'
import currency from '../currency';
import {GlobalContext} from '../context/GlobalContext'
import {notify} from '../Popups'

export const SeeMoreProducts = () => (
    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
        <div className={`border transit rounded-1x po-rel pb-4 h-100 mb-5 flex-v j-c-c a-i-c shadow`}>
            <div className = 'p-2'>
                <a href="/shop" className = 'text-capitalize text-primary'>
                    <span>see more</span>
                    <span className = 'ml-3 bi bi-arrow-right'></span>
                </a>
            </div>
        </div>
    </div>
)

export const ProductCard = ({id = null, type = 'best sale', measure = 'basket', isCarted = false, images, rating, price, category, name}) => {
    const {globalStates: {cart: {state: cart, updater: updateCart}}} = useContext(GlobalContext)
    const [shadow, setShadow] = useState(false)
    const [imageFlip, setImageFlip] = useState(0)
    const [carted, setCarted] = useState(isCarted)

    images = images ? images : [
        'assets/images/demos/demo-21/bestSellers/product-1-1.jpg',
        'assets/images/demos/demo-21/bestSellers/product-1-2.jpg'
    ]

    useEffect(() => cart[id] ? setCarted(true) : setCarted(false))

    return (
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <div className={`border transit overflow-0 rounded-1x po-rel pb-4 mb-5 ${shadow ? 'shadow' : ''}`} onMouseOver = {() => setShadow(true)} onMouseLeave = {() => setShadow(false)}>
                <div className="po-abs top-0 left-0 p-4">
                    <div className = {`px-3 py-2 text-capitalize shadow rounded bg-${type === 'hot' ? 'danger' : 'warning'} text-white`}>{type}</div>
                </div>
                <div className = 'p-'>
                    <a onMouseOver = {() => images.length > 1 && setImageFlip(1)} onMouseLeave = {() => setImageFlip(0)} className = 'product-image w-100 po-rel overflow-0 bg-light'>
                        <div className={`${!shadow ? 'd-none' : 'animated slideInUp'} black-gradient py-4 px-3 po-abs left-0 bottom-0 w-100`}>
                            <button title = 'See more about this product...' onClick = {() => window.location = `/product/${id}`} className = 'border outline-0 cursor-pointer overflow-0 px-4 py-3 rounded-1x bg-clear text-capitalize text-white'>view more</button>
                        </div>
                    </a>
                    <div className = 'text-center pt-3 border-top'>
                        <p className = 'text-capitalize text-muted mb-1'>{category}</p>
                        <p className = 'text-capitalize text-dark'>
                            <a href={`/product/${id}`}>{name}</a>
                        </p>
                        <p className = 'text-capitalize text-danger'>
                            <span>{currency}{new Intl.NumberFormat().format(price)} / {measure}</span>
                        </p>
                        <div className = 'text-capitalize mb-4'>
                            <Rating rating = {rating} />
                        </div>
                        <p>{(
                            (carted)
                            ? (
                                <button onClick = {() => {
                                    // setCarted(false)
                                    const newCart = {}
                                    
                                    Object.values(cart).forEach(
                                        ({id: cartID, name, price, image, quantity}) => (
                                            (cartID !== id)
                                            ? (newCart[cartID] = {id: cartID, name, price, image, quantity})
                                            : true
                                        )
                                    )
                                    
                                    updateCart(newCart)
                                    notify({
                                        message: `Product '${name}' removed from cart!`,
                                        type: 'success'
                                    })
                                }} className = 'btn text-uppercase p-3 bg-clear border text-warning outline-0 border-warning d-block col-10 mx-auto'>
                                    <span className="bi bi-cart-x mx-2"></span>
                                    remove from cart
                                </button>
                            )
                            : (
                                <button onClick = {() => {
                                    // setCarted(true)
                                    updateCart({
                                        ...cart,
                                        [id]: {id, name, price, image: images[0], quantity: '1'}
                                    })
                                    notify({
                                        message: `Product '${name}' added to cart!`,
                                        type: 'success'
                                    })
                                }} className = 'btn text-uppercase outline-0 p-3 btn-warning d-block col-10 mx-auto'>
                                    <span className="bi bi-cart2 mx-2"></span>
                                    add to cart
                                </button>
                            )
                        )}
                        </p>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .black-gradient{
                    background: linear-gradient(transparent, rgba(0,0,0,.8))
                }
                .product-image{
                    min-height: 320px;
                    max-height: 320px;
                    background-image: url(${images[imageFlip]});
                    background-size: cover;
                    background-position: center;
                }
            `}</style>
        </div>
    )
}
export const ShopProductCard = ({id = null, type = 'hot', isCarted = false, images, rating, price, category, name}) => {
    const {globalStates: {cart: {state: cart, updater: updateCart}}} = useContext(GlobalContext)
    const [shadow, setShadow] = useState(false)
    const [imageFlip, setImageFlip] = useState(0)
    const [carted, setCarted] = useState(isCarted)

    images = images ? images : [
        'assets/images/demos/demo-21/bestSellers/product-1-1.jpg',
        'assets/images/demos/demo-21/bestSellers/product-1-2.jpg'
    ]

    return (
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <div className={`border transit rounded-1x po-rel pb-4 mb-5 ${shadow ? 'shadow' : ''}`} onMouseOver = {() => setShadow(true)} onMouseLeave = {() => setShadow(false)}>
                <div className="po-abs top-0 left-0 p-4">
                    <div className = {`px-3 py-2 text-capitalize rounded bg-${type === 'hot' ? 'danger' : 'warning'} text-white`}>{type}</div>
                </div>
                <div className = 'p-2'>
                    <a href={`/product/${id}`} onMouseOver = {() => setImageFlip(1)} onMouseLeave = {() => setImageFlip(0)} className = 'd-block w-100 overflow-0' style = {{minHeight: '320px', maxHeight: '320px'}}>
                        <img src={images[imageFlip]} alt="Product image" className="product-image transit" />
                    </a>
                    <div className = 'text-center pt-3'>
                        <p className = 'text-capitalize text-muted mb-1'>{category}</p>
                        <p className = 'text-capitalize text-dark'>
                            <a href={`/product/${id}`}>{name}</a>
                        </p>
                        <p className = 'text-capitalize text-danger'>
                            <span>{currency}{new Intl.NumberFormat().format(price)}</span>
                        </p>
                        <div className = 'text-capitalize mb-4'>
                            <Rating rating = {rating} />
                        </div>
                        <p>{(
                            (carted)
                            ? (
                                <button onClick = {() => {
                                    setCarted(false)
                                    const newCart = {}
                                    
                                    Object.values(cart).forEach(
                                        ({id: cartID, name, price, image, quantity}) => (
                                            (cartID !== id)
                                            ? (newCart[cartID] = {id: cartID, name, price, image, quantity})
                                            : true
                                        )
                                    )
                                    
                                    updateCart(newCart)
                                    notify({
                                        message: `Product '${name}' removed from cart!`,
                                        type: 'success'
                                    })
                                }} className = 'btn text-uppercase p-3 bg-clear border text-warning outline-0 border-warning d-block col-10 mx-auto'>
                                    <span className="bi bi-cart-x mx-2"></span>
                                    remove from cart
                                </button>
                            )
                            : (
                                <button onClick = {() => {
                                    setCarted(true)
                                    updateCart({
                                        ...cart,
                                        [id]: {id, name, price, image: images[0], quantity: '1'}
                                    })
                                    notify({
                                        message: `Product '${name}' added to cart!`,
                                        type: 'success'
                                    })
                                }} className = 'btn text-uppercase outline-0 p-3 btn-warning d-block col-10 mx-auto'>
                                    <span className="bi bi-cart2 mx-2"></span>
                                    add to cart
                                </button>
                            )
                        )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
    /*
    return (
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
            <div className={`border transit rounded-1x po-rel pb-4 mb-5 ${shadow ? 'shadow' : ''}`} onMouseOver = {() => setShadow(true)} onMouseLeave = {() => setShadow(false)}>
                <div className="po-abs z-index-100 top-0 left-0 p-4">
                    <div className = {`px-3 py-2 text-capitalize rounded bg-${type === 'hot' ? 'danger' : 'warning'} text-white`}>{type}</div>
                </div>
                <div className={`po-abs z-index-100 top-0 right-0 p-4`}>
                    <div title = 'Add to wishlist' style = {{width: '35px', height: '35px'}} className = {`text-capitalize animated fadeIn flex-h a-i-c j-c-c rounded-circle border ${shadow ? '' : 'd-none'}`}>
                        <span className = 'bi bi-heart fo-s-15'></span>
                    </div>
                </div>
                <div className = 'p-2'>
                    <a href={`/product/${id}`} className = 'product-image d-block w-100 border-bottom po-rel' style = {{height: '260px'}}>
                    
                    </a>
                    <div className = 'po-rel'>
                        <div className = {`po-abs bottom-0 left-0 w-100 p-2 flex-h animated fadeIn bg-faded-white ${shadow ? '' : 'd-none'}`}>{(
                            (carted)
                            ? (
                                <button title = 'Remove from cart' onClick = {() => removeFromCart({id: id, callback: () => {
                                    setCarted(false)
                                    notify({
                                        message: `Product '${name}' removed from cart!`,
                                        type: 'success'
                                    })
                                }})} className = 'outline-0 py-2 bg-clear border-0 cursor-pointer col-6 px-1 flex-v border-right j-c-c a-i-c'>
                                    <span className = 'bi bi-cart-x'></span>
                                    <span className = 'text-capitalize one-line'>remove from cart</span>
                                </button>
                            )
                            : (
                                <button title = 'Add to cart' onClick = {() => addToCart({id: id, name: name, image: images[0], quantity: '1', callback: () => {
                                    setCarted(true)
                                    notify({
                                        message: `Product '${name}' added to cart!`,
                                        type: 'success'
                                    })
                                }})} className = 'outline-0 py-2 bg-clear border-0 cursor-pointer col-6 px-1 flex-v border-right j-c-c a-i-c'>
                                    <span className = 'bi bi-cart2'></span>
                                    <span className = 'text-capitalize one-line'>add to cart</span>
                                </button>
                            )
                        )}
                            <button title = 'Quick view' className = 'outline-0 py-2 bg-clear border-0 cursor-pointer col-6 px-1 flex-v j-c-c a-i-c'>
                                <span className = 'bi bi-binoculars'></span>
                                <span className = 'text-capitalize one-line'>quick view</span>
                            </button>
                        </div>
                    </div>
                    <div className = 'px-3 pt-4'>
                        <p className = 'text-capitalize text-muted mb-1'>{category}</p>
                        <p className = 'text-capitalize text-dark'>
                            <a href={`/product/${id}`}>{name}</a>
                        </p>
                        <p className = 'text-capitalize text-danger'>
                            <span>{currency}{new Intl.NumberFormat().format(price)}</span>
                        </p>
                        <div className = 'text-capitalize mb-4'>
                            <Rating rating = {rating} />
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .product-image{
                    background-size: cover;
                    background-position: top;
                    background-image: url(${images[imageFlip]});
                }
                .product-image:hover{
                    animation: upDown 2s ease-in-out alternate infinite;
                }
                .z-index-100{
                    z-index: 100;
                }
                .bg-faded-white{
                    background: rgba(255, 255, 255, .6)
                }
                @keyframes upDown{
                    from{
                        background-position: top;
                    }
                    to{
                        background-position: bottom;
                    }
                }
            `}</style>
        </div>
    )
    */
}

// export const ShopProductCard = ({id = null, type = 'hot', isCarted = false, images, rating, price, category, name}) => {
//     const [shadow, setShadow] = useState(false)
//     const [imageFlip, setImageFlip] = useState(0)
//     const [carted, setCarted] = useState(false)

//     images = images ? images : [
//         'assets/images/demos/demo-21/bestSellers/product-1-1.jpg',
//         'assets/images/demos/demo-21/bestSellers/product-1-2.jpg'
//     ]

    // return (
    //     <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
    //         <div className={`border transit rounded-1x po-rel pb-4 mb-5 ${shadow ? 'shadow' : ''}`} onMouseOver = {() => setShadow(true)} onMouseLeave = {() => setShadow(false)}>
    //             <div className="po-abs z-index-100 top-0 left-0 p-4">
    //                 <div className = {`px-3 py-2 text-capitalize rounded bg-${type === 'hot' ? 'danger' : 'warning'} text-white`}>{type}</div>
    //             </div>
    //             <div className={`po-abs z-index-100 top-0 right-0 p-4`}>
    //                 <div title = 'Add to wishlist' style = {{width: '35px', height: '35px'}} className = {`text-capitalize animated fadeIn flex-h a-i-c j-c-c rounded-circle border ${shadow ? '' : 'd-none'}`}>
    //                     <span className = 'bi bi-heart fo-s-15'></span>
    //                 </div>
    //             </div>
    //             <div className = 'p-2'>
    //                 <a href={`/product/${id}`} className = 'product-image d-block w-100 border-bottom po-rel' style = {{height: '260px'}}>
    //                     {/* Product Image Placeholder */}
    //                 </a>
    //                 <div className = 'po-rel'>
    //                     <div className = {`po-abs bottom-0 left-0 w-100 p-2 flex-h animated fadeIn bg-faded-white ${shadow ? '' : 'd-none'}`}>{(
    //                         (carted)
    //                         ? (
    //                             <button title = 'Remove from cart' onClick = {() => removeFromCart({id: id, callback: () => {
    //                                 setCarted(false)
    //                                 notify({
    //                                      message: `Product '${name}' removed from cart!`,
    //                                      type: 'success'
    //                                  })
    //                             }})} className = 'outline-0 py-2 bg-clear border-0 cursor-pointer col-6 px-1 flex-v border-right j-c-c a-i-c'>
    //                                 <span className = 'bi bi-cart-x'></span>
    //                                 <span className = 'text-capitalize one-line'>remove from cart</span>
    //                             </button>
    //                         )
    //                         : (
    //                             <button title = 'Add to cart' onClick = {() => addToCart({id: id, name: name, image: images[0], quantity: '1', callback: () => {
    //                                 setCarted(true)
    //                                 notify({
    //                                      message: `Product '${name}' added to cart!`,
    //                                      type: 'success'
    //                                  })
    //                             }})} className = 'outline-0 py-2 bg-clear border-0 cursor-pointer col-6 px-1 flex-v border-right j-c-c a-i-c'>
    //                                 <span className = 'bi bi-cart2'></span>
    //                                 <span className = 'text-capitalize one-line'>add to cart</span>
    //                             </button>
    //                         )
    //                     )}
    //                         <button title = 'Quick view' className = 'outline-0 py-2 bg-clear border-0 cursor-pointer col-6 px-1 flex-v j-c-c a-i-c'>
    //                             <span className = 'bi bi-binoculars'></span>
    //                             <span className = 'text-capitalize one-line'>quick view</span>
    //                         </button>
    //                     </div>
    //                 </div>
    //                 <div className = 'px-3 pt-4'>
    //                     <p className = 'text-capitalize text-muted mb-1'>{category}</p>
    //                     <p className = 'text-capitalize text-dark'>
    //                         <a href={`/product/${id}`}>{name}</a>
    //                     </p>
    //                     <p className = 'text-capitalize text-danger'>
    //                         <span>{currency}{new Intl.NumberFormat().format(price)}</span>
    //                     </p>
    //                     <div className = 'text-capitalize mb-4'>
    //                         <Rating rating = {rating} />
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //         <style jsx>{`
    //             .product-image{
    //                 background-size: cover;
    //                 background-position: top;
    //                 background-image: url(${images[imageFlip]});
    //             }
    //             .product-image:hover{
    //                 animation: upDown 2s ease-in-out alternate infinite;
    //             }
    //             .z-index-100{
    //                 z-index: 100;
    //             }
    //             .bg-faded-white{
    //                 background: rgba(255, 255, 255, .6)
    //             }
    //             @keyframes upDown{
    //                 from{
    //                     background-position: top;
    //                 }
    //                 to{
    //                     background-position: bottom;
    //                 }
    //             }
    //         `}</style>
    //     </div>
    // )
// }

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
