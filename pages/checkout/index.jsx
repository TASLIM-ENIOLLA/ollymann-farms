import {useState, useContext} from 'react'
import Header from '../../components/Page/Header'
import Footer from '../../components/Page/Footer'
import currency from '../../components/currency'
import {GlobalContext} from '../../components/context/GlobalContext'
import {notify} from '../../components/Popups'
import {API_ROUTE} from '../../config'

export default () => {
    let {globalStates: {cart: {state: cart, updater: updateCart}, isLoggedIn: {state: isLoggedIn}, userData: {state: {id: userID}}}} = useContext(GlobalContext)
    const [formData, setFormData] = useState({
        f_name: '',
        l_name: '',
        phone: '',
        email: '',
        country: 'nigeria',
        address: '',
        customer_id: userID,
        town_or_city: '',
        state_or_region: '',
        postal_or_zipcode: '',
        notes: '',
        order_list: JSON.stringify(Object.values(cart).map(({id, quantity, name, price}) => ({id, quantity, name, price})))
    })
    const [isOrdering, setIsOrdering] = useState(false)

    return (
        <>
            <Header />
            <section style = {{backgroundImage: `url('/assets/images/page-header-bg.jpg')`, backgroundPosition: 'center', backgroundSize: 'cover'}} >
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className = 'p-5 flex-v j-c-c a-i-c text-center' style = {{minHeight: '250px'}}>
                                <div className = 'fa-3x bold'>Checkout</div>
                                <div className = 'fa-1x text-muted fo-s-16'>Place your order &amp; make payment</div>
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
                                        <a href="/checkout">Checkout</a>
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
                    <div className="pt-5">
                        <h3>Billing Details</h3>
                    </div>
                    <div className="row py-5">
                        <div className="col-lg-8 col-sm-12">
                            <div className = 'row'>
                                <div className="col-lg-6 col-sm-12 pb-4">
                                    <p className = 'mb-2'>First Name *</p>
                                    <input value = {formData.f_name} onChange = {(e) => setFormData({...formData, f_name: e.target.value})} type="text" className = 'p-3 rounded d-block w-100 border outline-0 bg-light' />
                                </div>
                                <div className="col-lg-6 col-sm-12 pb-4">
                                    <p className = 'mb-2'>Last Name *</p>
                                    <input value = {formData.l_name} onChange = {(e) => setFormData({...formData, l_name: e.target.value})} type="text" className = 'p-3 rounded d-block w-100 border outline-0 bg-light' />
                                </div>
                                <div className="col-sm-12 pb-4">
                                    <p className = 'mb-2'>Country</p>
                                    <input value = {formData.country} onChange = {(e) => setFormData({...formData, country: e.target.value})} type="text" readOnly = {true} value = 'Nigeria' className = 'p-3 user-select-0 disabled rounded d-block w-100 border outline-0 bg-light' />
                                </div>
                                <div className="col-sm-12 pb-4">
                                    <p className = 'mb-2'>Address *</p>
                                    <input value = {formData.address} onChange = {(e) => setFormData({...formData, address: e.target.value})} type="text" className = 'p-3 rounded d-block w-100 border outline-0 bg-light' />
                                </div>
                                <div className="col-lg-6 col-sm-12 pb-4">
                                    <p className = 'mb-2'>Town / City *</p>
                                    <input value = {formData.town_or_city} onChange = {(e) => setFormData({...formData, town_or_city: e.target.value})} type="text" className = 'p-3 rounded d-block w-100 border outline-0 bg-light' />
                                </div>
                                <div className="col-lg-6 col-sm-12 pb-4">
                                    <p className = 'mb-2'>State / Region *</p>
                                    <input value = {formData.state_or_region} onChange = {(e) => setFormData({...formData, state_or_region: e.target.value})} type="text" className = 'p-3 rounded d-block w-100 border outline-0 bg-light' />
                                </div>
                                <div className="col-lg-6 col-sm-12 pb-4">
                                    <p className = 'mb-2'>Postal Code / ZIP *</p>
                                    <input value = {formData.postal_or_zipcode} onChange = {(e) => setFormData({...formData, postal_or_zipcode: e.target.value})} type="text" className = 'p-3 rounded d-block w-100 border outline-0 bg-light' />
                                </div>
                                <div className="col-lg-6 col-sm-12 pb-4">
                                    <p className = 'mb-2'>Phone number *</p>
                                    <input value = {formData.phone} onChange = {(e) => setFormData({...formData, phone: e.target.value})} type="phone" className = 'p-3 rounded d-block w-100 border outline-0 bg-light' />
                                </div>
                                <div className="col-sm-12 pb-4">
                                    <p className = 'mb-2'>Email Address *</p>
                                    <input value = {formData.email} onChange = {(e) => setFormData({...formData, email: e.target.value})} type="email" className = 'p-3 rounded d-block w-100 border outline-0 bg-light' />
                                </div>
                                <div className="col-sm-12 pb-4">
                                    <p className = 'mb-2'>Order Notes (optional)</p>
                                    <textarea value = {formData.notes} onChange = {(e) => setFormData({...formData, notes: e.target.value})} rows = '5' className = 'p-3 resize-0 rounded d-block w-100 border outline-0 bg-light'></textarea>
                                </div>
                                {/* <div className = 'col-12 pt-5'>
                                    <a href = '#place-order' className="d-block text-uppercase p-3 w-100 border-choco text-center text-choco bg-clear rounded">place order</a>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <div className = 'border rounded bg-light p-4'>
                                <div>
                                    <div className = 'text-capitalize bold letter-spacing-1 px-3 pb-4 border-bottom text-muted'>
                                        Your order{(
                                            (Object.values(cart).length > 0)
                                            ? (
                                                <p className = 'text-muted mb-0 mt-2'>You can click <a href="/my-cart" className = 'underline'>here</a> to modify order before checking out</p>
                                            )
                                            : <></>
                                        )}
                                    </div>
                                </div>
                                <div className = 'py-4'>
                                    <div>
                                        <div className = 'flex-h j-c-space-between bold letter-spacing-1 text-muted a-i-c py-4'>
                                            <div className = 'flex-h px-3'>
                                                Product
                                            </div>
                                            <div className = 'flex-h px-3'>
                                                Subtotal
                                            </div>
                                        </div>
                                        <div>{(
                                            (Object.values(cart).length > 0)
                                            ? Object.values(cart).map(
                                                ({name, quantity, price}, key) => (
                                                    <div key = {key} className = 'flex-h j-c-space-between text-muted py-4 border-bottom mb-3'>
                                                        <div className = 'px-3 double-line text-capitalize'>
                                                            {name}
                                                            <p className="mb-0 mt-2 theme-color">{quantity} unit{quantity > 1 ? 's' : ''}</p>
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
                                        <div className = 'flex-h j-c-space-between bold letter-spacing-1 text-muted a-i-c py-4'>
                                            <div className = 'flex-h px-3'>
                                                Total
                                            </div>
                                            <div className = 'flex-h px-3'>
                                                {currency}{new Intl.NumberFormat().format(
                                                    (Object.values(cart).length > 0)
                                                    ? (
                                                        Object.values(cart).map(
                                                            ({price, quantity}) => price * quantity
                                                        ).reduce((a, b) => +a + +b)
                                                    )
                                                    : 0
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className = 'pt-3'>
                                        <a onClick = {() => {
                                            if(!isLoggedIn){
                                                notify({message: 'You have to be logged in before placing orders!', type: 'notify'})
                                            }
                                            else{
                                                setIsOrdering(true)
                                                placeOrder(formData).then(
                                                    ({type, data}) => {
                                                        setIsOrdering(false)
                                                        notify({
                                                            message: data, 
                                                            type: type === 'success' ? type : 'danger', 
                                                            callback: () => {
                                                                notify({message: 'Cart cleared!', type: 'success'})
                                                                updateCart({})
                                                                setFormData({ f_name: '', l_name: '', phone: '', email: '', country: 'nigeria', address: '', customer_id: userID, town_or_city: '', state_or_region: '', postal_or_zipcode: '', notes: '', order_list: []})
                                                            }
                                                        })
                                                    } 
                                                )
                                            }
                                        }} className={`${isOrdering ? 'disabled' : ''} d-block cursor-pointer text-uppercase p-3 w-100 border-choco text-center text-choco bg-clear rounded`}>{(
                                            (isOrdering)
                                            ? (
                                                <span className = 'fa fa-spin bi bi-arrow-clockwise fa-2x'></span>
                                            )
                                            : 'place order'
                                        )}</a>
                                    </div>
                                </div>
                            </div>
                            <div className = 'pt-5'>
                                <a href = '/shop' className="d-block text-center text-uppercase p-3 w-100 border bg-clear rounded">continue shopping</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

const placeOrder = async (formData) => {
    const FORM = new FormData()

    for(let prop in formData){
        FORM.append(prop, formData[prop])
    }
    const req = await fetch(API_ROUTE.place_order, {method: 'POST', body: FORM})
    return await req.json()
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