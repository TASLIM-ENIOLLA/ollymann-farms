import {useState, useContext} from 'react'
import {useRouter} from 'next/router'
import SideBar, {SideBarContext} from '../Page/SideBar'
import URL from '../../data/URL'
import currency from '../currency'
import {GlobalContext} from '../context/GlobalContext'

export default () => {
    const {asPath} = useRouter()
    let {
        globalStates: {
            cart: {
                state: cart,
                updater: updateCart
            },
            isLoggedIn: {
                state: isLoggedIn
            },
            userData: {
                state: userData
            },
            cookieStore
        }
    } = useContext(GlobalContext)
    
    cart = Object.values(cart)

    return (
        <header>
            <SideBar>
                <div className = 'container px-4'>
                    <div className = 'row j-c-space-between'>
                        <div className="col-auto">
                            <div className="py-4">{(
                                (isLoggedIn)
                                ? (
                                    <a href = '/my-dashboard'>
                                        <span className="bi bi-person-square mr-3"></span>
                                        <span title = 'View Profile' className = 'text-uppercase'>Welcome {userData?.f_name}</span>
                                    </a>
                                )
                                : <></>
                            )}</div>
                        </div>
                        <div className="col-auto ml-auto">
                            <div className = 'py-4'>{(
                                    (isLoggedIn)
                                    ? (
                                        <>
                                            <a href = '/my-dashboard' className = 'mx-3 text-uppercase'>
                                                my dashboard
                                            </a>
                                            <span className = 'mx-3 cursor-pointer text-uppercase' onClick = {() => {
                                                if(confirm('Are you sure you want to logout?')){
                                                    cookieStore.get('OLLYMANN_FARMS').then(
                                                        res => {
                                                            if(res){
                                                                let {value: existingCookieValue} = res
                                                                existingCookieValue = JSON.parse(existingCookieValue)
                                                                const {cart} = existingCookieValue
                                
                                                                cookieStore.set({
                                                                    name: 'OLLYMANN_FARMS',
                                                                    value: JSON.stringify({cart}),
                                                                    expires: new Date().getTime() + (356 * 24 * 3600),
                                                                    path: '/' 
                                                                })
                                                                setTimeout(() => {
                                                                    window.location.reload()
                                                                }, 500)
                                                            }
                                                            else{
                                                                cookieStore.set({
                                                                    name: 'OLLYMANN_FARMS',
                                                                    value: '',
                                                                    expires: new Date().getTime() + (356 * 24 * 3600),
                                                                    path: '/' 
                                                                })
                                                                setTimeout(() => {
                                                                    window.location.reload()
                                                                }, 500)
                                                            }
                                                        }
                                                    )
                                                }
                                            }}>
                                                <span className = 'bi bi-door-open mx-2'></span>
                                                logout
                                            </span>
                                        </>
                                    )
                                    : (
                                        <>
                                            <a href="tel://5732021737" className = 'mx-3 text-uppercase'>
                                                <span className = 'bi bi-telephone mx-2'></span>
                                                5732021737
                                            </a>
                                            <a href={`/login?continueURL=${encodeURIComponent(asPath)}`} className = 'mx-3 text-uppercase'>
                                                <span className = 'bi bi-person mx-2'></span>
                                                login
                                            </a>
                                        </>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <hr className = 'm-0 border-top' />
                <div className = 'container px-4'>
                    <div className = 'user-select-0 row py-5 px-3 j-c-space-between a-i-c'>
                        <div className = 'flex-h a-i-c'>
                            <div className = 'col-lg-d-none pr-4'>
                                <SideBarContext.Consumer>{({state, updater}) => (
                                    <span onClick = {() => updater(true) && alert()} className = 'bi fa-3x bi-filter-left'></span>
                                )}</SideBarContext.Consumer>
                            </div>
                            <div>
                                <a href="/home">
                                    <img width = '130' src="/assets/images/demos/demo-21/logo-name.png"  />
                                </a>
                            </div>
                            <div className = 'col-d-none col-lg-d-block px-5'>{
                                URL.map(
                                    ({href, name}, index) => (
                                        <a key = {index} href={href} className = {`text-uppercase mx-5 ${asPath === href ? 'active-link': ''}`}>{name}</a>
                                    )
                                )
                            }
                            </div>
                        </div>
                        <div className = ''>
                            <div className="d-inline-block px-4 po-rel">
                                <div className="flex-h a-i-c ttt-parent rounded-2x">
                                    <a href = '' onClick = {(e) => e.preventDefault()} className = 'ttt cursor-pointer'>
                                        <span className="bi ml-3 bi-search fo-s-22"></span>
                                    </a>
                                    <div className="ttt-menu">
                                        <input type="search" className = 'd-none border-0 w-100 p-3 outline-0 bg-clear' placeholder = 'Search here...' />
                                    </div>
                                </div>
                            </div>
                            <div className="d-inline-block px-4 po-rel">
                                <a href = '' onClick = {(e) => e.preventDefault()} className = 'ttt cursor-pointer'>
                                    <span className="bi bi-cart2 fo-s-22"></span>
                                    <span style = {{transform: 'scale(.85)', top: '-50%', width: '18px', height: '18px'}} className = 'po-abs flex-v j-c-c a-i-c text-white text-c right-0 rounded-circle theme-bg'>{cart.length}</span>
                                </a>
                                <div className = {`po-abs top-150pcent right-0 bg-white z-index-1000 animated fadeIn rounded shadow vw80 max-width-400px p-3 ttt-more`}>
                                    <div>{(
                                        (cart.length > 0)
                                        ? cart.map(
                                            ({name, price, quantity, image, id}, key) => (
                                                <div key = {key} className="flex-h border-bottom a-i-c px-3 py-4">
                                                    <div className = 'mr-3 flex-1'>
                                                        <p className = 'double-line text-capitalize text-dark'>
                                                            {name}
                                                        </p>
                                                        <p className = 'm-0 text-muted'>{quantity} x {currency}{new Intl.NumberFormat().format(price)}</p>
                                                    </div>
                                                    <div>
                                                        <div className = 'border flex-v j-c-c bg-light overflow-0' style = {{width: '70px', height: '70px'}}>
                                                            <img className = 'd-block w-100' src={image} alt=""/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span className="bi bi-x fa-2x pl-3" onClick = {() => {
                                                            const newCart = {}
                                                            
                                                            cart.forEach(
                                                                ({id: cartID, name, price, image, quantity}) => (
                                                                    (cartID !== id)
                                                                    ? (newCart[cartID] = {id: cartID, name, price, image, quantity})
                                                                    : true
                                                                )
                                                            )
                                                            
                                                            updateCart(newCart)
                                                        }}></span>
                                                    </div>
                                                </div>
                                            )
                                        )
                                        : (
                                            <div className = 'p-5 text-center text-muted'>
                                                Cart is currently empty!
                                            </div>
                                        )
                                    )}</div>
                                    <div className = 'border-top'>
                                        <div className = 'flex-h px-3 py-4 a-i-c j-c-space-between'>
                                            <p>TOTAL</p>
                                            <p>{currency} {(
                                                (cart.length > 0)
                                                ? new Intl.NumberFormat().format(cart.map(
                                                    ({price, quantity}) => price * quantity
                                                ).reduce((a, b) => +a + +b))
                                                : '0'
                                            )}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className = 'pb-3'>
                                            <a href = '/my-cart' className = 'shadow rounded text-uppercase d-block w-100 btn btn-warning p-3 mb-3'>View Cart</a>
                                            <a href = '/checkout' className = 'shadow rounded text-uppercase d-block w-100 btn btn-success p-3 mb-3'>Checkout</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SideBar>
            <style jsx>{`
                .top-150pcent{
                    top: 150%;
                }
                .max-width-400px{
                    max-width: 400px;
                }
                .vw80{
                    width: 80vw;
                }
                .z-index-1000{
                    z-index: 1000;                    
                }
                .active-link{
                    color: #c96 !important;
                }
                .ttt-more, .ttt-menu{
                    display: none;
                }
                .ttt:focus~.ttt-more, .ttt-more:hover{
                    display: block;
                }
                .ttt:focus~.ttt-menu, .ttt-menu:hover{
                    display: block;
                }
                .ttt:focus .ttt-parent{
                    border: 1px solid #dee2e6!important;
                }
            `}</style>
        </header>
    )
}
