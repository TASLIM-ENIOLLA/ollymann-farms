import {useState, useEffect, useContext, createContext} from 'react'
import Header from '../components/Page/Header'
import Footer from '../components/Page/Footer'
import currency from '../components/currency'
import {GlobalContext} from '../components/context/GlobalContext'
import {notify} from '../components/Popups'

const CartContext = createContext()

const NumberInput = ({value, onChange = () => true}) => {
    const [a, b] = useState(value || 0)
    const {state, updater} = useContext(CartContext)

    useEffect(() => {
        onChange(a)
    }, [a])

    return (
        <div className = 'd-inline-block w-auto border rounded'>
            <div className = 'flex-h a-i-c'>
                <div>
                    <span onClick = {() => a > 1 ? b(+a - 1) : true} className="fa-2x bi bi-dash ml-3"></span>
                </div>
                <div className = 'text-center'>
                    <span className = 'mx-3'>{a}</span>
                </div>
                <div>
                    <span onClick = {() => b(+a + 1)} className="fa-2x bi bi-plus mr-3"></span>
                </div>
            </div>
        </div>
    )
}

const CartRow = ({id, name, price, quantity, image, updateCart}) => {
    const [total, setTotal] = useState(price * quantity)
    const {state: localCart, updater: localCartUpdater} = useContext(CartContext)

    return (
        <tr>
            <td>
                <div className="container">
                    <div className="row a-i-c py-2">
                        <div className="col-auto p-0">
                            <div className = 'border overflow-0' style = {{width: '70px', height: '70px'}}>
                                <img src={image} className="d-block w-100"/>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div className="container">
                    <div style = {{width: '70px', height: '70px'}} className="col flex-v a-i-c j-c-c mx-auto">
                        <p className = 'text-capitalize mb-0'>{name}</p>
                    </div>
                </div>
            </td>
            <td>
                <div className="container">
                    <div className="row a-i-c mx-auto" style = {{width: '70px', height: '70px'}}>
                        <div className="col-12">
                            {currency}{new Intl.NumberFormat().format(price)}
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div className="container">
                    <div className="row a-i-c mx-auto" style = {{width: '70px', height: '70px'}}>
                        <div className="col-12">
                            <NumberInput onChange = {(newQuantity) => {
                                setTotal(newQuantity * price)
                                localCartUpdater({
                                    ...localCart,
                                    [id]: {
                                        ...localCart[id],
                                        quantity: newQuantity
                                    }
                                })
                            }} value = {quantity} />
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div className="container">
                    <div className="row a-i-c mx-auto" style = {{width: '70px', height: '70px'}}>
                        <div className="col-12 text-center">
                            {currency}{new Intl.NumberFormat().format(total)}
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div className="container">
                    <div className="row a-i-c mx-auto" style = {{height: '70px'}}>
                        <div className="col-12" onClick = {() => {
                            if(confirm('Do you really want to remove product from cart?')){
                                const newCart = {}
                        
                                Object.values(localCart).forEach(
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
                            }
                        }}>
                            <span className = 'fa-2x bi bi-x'></span>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}

const CartBlock = ({id, name, price, quantity, image, updateCart}) => {
    const [total, setTotal] = useState(price * quantity)
    const {state: localCart, updater: localCartUpdater} = useContext(CartContext)

    return (
        <div className="flex-h rounded border mb-4 po-rel pt-4">
            <div className = 'p-2 top-0 right-0 po-abs'>
                <span className = 'bi bi-x fa-2x' onClick = {() => {
                    if(confirm('Do you really want to remove product from cart?')){
                        const newCart = {}
                
                        Object.values(localCart).forEach(
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
                    }
                }}></span>
            </div>
            <div className = 'mx-auto text-c p-4 col-auto'>
                <div className="row a-i-c py-2">
                    <div className="col-auto p-0">
                        <div className = 'border overflow-0' style = {{width: '70px', height: '70px'}}>
                            <img src={image} className="d-block w-100"/>
                        </div>
                    </div>
                    <div className="col">
                        <p className = 'text-capitalize'>{name}</p>
                    </div>
                </div>
                <div className = 'py-3'>
                    <span>{currency}{new Intl.NumberFormat().format(price)}</span>
                </div>
                <div className = 'py-3'>
                    <NumberInput onChange = {(newQuantity) => {
                        setTotal(newQuantity * price)
                        localCartUpdater({
                            ...localCart,
                            [id]: {
                                ...localCart[id],
                                quantity: newQuantity
                            }
                        })
                    }} value = {quantity} />
                </div>
                <div className = 'py-3'>
                    <span className = 'text-choco'>{currency}{total}</span>
                </div>
            </div>
        </div>
    )
}

const CartReceipt = ({cart}) => {

    return (
        <>
            <div className = 'border rounded bg-light p-4'>
                <div>
                    <div className = 'text-capitalize bold letter-spacing-1 px-3 pb-4 border-bottom text-muted'>Cart total</div>
                </div>
                <div className = 'py-4'>
                    <div>{(
                        (Object.values(cart).length > 0)
                        ? Object.values(cart).map(
                            ({name, id, quantity, price}) => (
                                <div key = {id} className = 'flex-h j-c-space-between text-muted py-4 border-bottom mb-3'>
                                    <div className = 'px-3 double-line text-capitalize'>
                                        {name}
                                        <p className="mb-0 mt-2">{quantity} unit{quantity > 1 ? 's' : ''}</p>
                                    </div>
                                    <div className = 'px-3'>
                                        {currency}{new Intl.NumberFormat().format(price * quantity)}
                                    </div>
                                </div>
                            )
                        )
                        : (
                            <div className = 'p-5 text-center'>You cart is empty. Go to <a href="/shop" className = 'underline'>shop</a> to add products to your cart</div>
                        )
                    )}</div>
                    <div className = 'flex-h bold text-muted j-c-space-between a-i-c py-4'>
                        <div className = 'flex-h px-3'>
                            Total
                        </div>
                        <div className = 'flex-h px-3'>
                            {currency}{
                                (Object.values(cart).length > 0)
                                ? (
                                    new Intl.NumberFormat().format(Object.values(cart).map(({quantity, price}) => +quantity * +price).reduce((a, b) => +a + +b))
                                )
                                : 0
                            }
                        </div>
                    </div>
                    <div>
                        <a href = '/checkout' className={`d-block text-uppercase p-3 w-100 border-choco text-center text-choco bg-clear rounded ${(Object.values(cart).length > 0) ? '' : 'disabled'}`}>proceed to checkout</a>
                    </div>
                </div>
            </div>
            <div className = 'pt-5'>
                <a href = '/shop' className={`d-block text-center text-uppercase p-3 w-100 border bg-clear rounded`}>continue shopping</a>
            </div>
        </>
    )
}

export default () => {
    let {globalStates: {cart: {state: cart, updater: updateCart}}} = useContext(GlobalContext)
    const [localCart, updateLocalCart] = useState(cart || {})

    useEffect(() => updateLocalCart(cart), [cart])

    return (
        <CartContext.Provider value = {{state: localCart, updater: updateLocalCart}}>
            <Header />
            <section style = {{backgroundImage: `url('assets/images/page-header-bg.jpg')`, backgroundPosition: 'center', backgroundSize: 'cover'}} >
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className = 'p-5 flex-v j-c-c a-i-c text-center' style = {{minHeight: '250px'}}>
                                <div className = 'fa-3x bold'>Shopping Cart</div>
                                <div className = 'fa-1x text-muted fo-s-16'>Your shopping cart</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className = 'border-bottom'>
                    <div className = 'container'>
                        <div className="row">
                            <div className="col-12 b">
                                <div className = 'py-4 flex-h a-i-c'>
                                    <div>
                                        <a href="/home">Home</a>
                                        <span className = 'bi bi-chevron-right mx-3'></span>
                                    </div>
                                    <div>
                                        <a href="/my-cart">My Cart</a>
                                        <span className = 'bi bi-chevron-right mx-3'></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row py-5">
                        <div className="col-xs-12 col-sm-12 col-lg-8">
                            <div className="row">
                                <div className="col-d-none col-lg-d-block col-12">
                                    <div className = 'table-responsive'>
                                        <table className = 'table'>
                                            <thead className = 'border-bottom p-3'>
                                                <tr className = 'text-muted text-center text-capitalize'>
                                                    <td></td>
                                                    <td>product</td>
                                                    <td>price</td>
                                                    <td>quantity</td>
                                                    <td>total</td>
                                                    <td></td>
                                                </tr>
                                            </thead>
                                            <tbody className = 'text-muted text-center'>{(
                                                (Object.values(localCart).length > 0)
                                                ? Object.values(localCart).map(
                                                    ({name, id, price, quantity, image}) => (
                                                        <CartRow updateCart = {updateCart} id = {id} key = {id} name = {name} price = {price} quantity = {quantity} image = {image} />
                                                    )
                                                )
                                                : (
                                                    <tr>
                                                        <td colSpan = '5'>
                                                            <div className="p-5 text-center">
                                                                Cart is currently empty!
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            )}</tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className = 'col-lg-d-none col-12'>{(
                                    (Object.values(localCart).length > 0)
                                    ? Object.values(localCart).map(
                                        ({name, id, price, quantity, image}) => (
                                            <CartBlock updateCart = {updateCart} id = {id} key = {id} name = {name} price = {price} quantity = {quantity} image = {image} />
                                        )
                                    )
                                    : (
                                        <div className="p-5 bg-light shadow-sm text-center">
                                            Cart is currently empty!
                                        </div>
                                    )
                                )}</div>
                                <div className = {`py-4 col-12`}>
                                    <div>
                                        <button onClick = {() => {
                                            const newCart = {}
                                    
                                            Object.values(localCart).forEach(
                                                ({id, name, price, image, quantity}) => (newCart[id] = {id, name, price, image, quantity})
                                            )

                                            updateCart(newCart)
                                            notify({
                                                message: `Cart updated!`,
                                                type: 'success'
                                            })
                                        }} className={`d-block w-auto text-center text-uppercase py-3 px-5 w-100 ml-auto transit border bg-clear rounded`}>update cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-lg-4">
                            <CartReceipt updateCart = {updateCart} cart = {cart} />
                        </div>
                    </div>
                </div>
            </section>
            <style jsx>{`
                .table td, .table th{
                    border-top: 0 !important;
                }
            `}</style>
            <Footer />
        </CartContext.Provider>
    )
}

export async function getServerSideProps(context){
    const {req: {cookies}} = context
    const cookie = cookies['OLLYMANN_FARMS'] || undefined

    return {
        props: {
            userData: cookie ? JSON.parse(cookie) : null,
            isLoggedIn: cookie && JSON.parse(cookie).id ? true : false,
            userCart: cookie && JSON.parse(cookie).cart ? JSON.parse(cookie).cart : {}
        }
    }
}