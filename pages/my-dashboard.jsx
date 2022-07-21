import Header from '../components/Page/Header'
import Footer from '../components/Page/Footer'
import {useState, useContext, createContext, useEffect} from 'react'
import {GlobalContext} from '../components/context/GlobalContext'
import {API_ROUTE} from '../config'
import {notify} from '../components/Popups'
import currency from '../components/currency'

const PageContext = createContext()

const Orders = () => {
    const {globalStates: {userData: {state: {id}}}} = useContext(GlobalContext)
    const [customerOrders, setCustomerOrders] = useState([])
    const TableRows = ({index, order_data, timestamp, status}) => {
        return (
            <tr className = 'text-muted'>
                <td className = 'px-3'>{index}</td>
                <td>
                    <a className = {`w-100 row${index} one-line my-3`}>{
                        order_data.map(
                            ({name, price, quantity}, key) => (
                                <div key = {key} className = 'mb-3'>
                                    <div className = 'text-capitalize'>
                                        {quantity} {name} at {currency}{new Intl.NumberFormat().format(price)} apiece
                                    </div>
                                </div>
                            )
                        )
                    }
                        <div><b>Total</b>: {currency}{new Intl.NumberFormat().format(order_data.map(({name, price, quantity}, key) => price * quantity).reduce((a, b) => +a + +b))}</div>
                    </a>
                </td>
                <td className = 'text-capitalize text-muted'>{status}</td>
                <td>{timestamp}</td>
                <style jsx>{`
                    .row${index}:hover{
                        display: block;
                    }
                    td, th{
                        padding: 15px 5px;
                        vertical-align: middle;
                    }
                `}</style>
            </tr>
        )
    }

    useEffect(async () => {
        const req = await fetch(`${API_ROUTE.customer_orders}?id=${id}`)
        const {type, data} = await req.json()

        if(type === 'success'){
            setCustomerOrders(data)
        }
    }, [])

    return (
        <>
            <p className = 'mt-4 theme-color'>{customerOrders.length} row{customerOrders.length > 0 ? 's' : ''} returned</p>
            <div className = 'table-responsive border rounded-1x mb-4'>
                <table className="table table-hover text-center m-0">
                    <thead className = 'bg-light'>
                        <tr>
                            <th>S/N</th>
                            <th>Order(s)</th>
                            <th>Status</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>{
                        customerOrders.map(
                            (order, key) => (
                                <TableRows index = {++key} key = {order.id} {...order} />
                            )
                        )
                    }</tbody>
                </table>
            </div>
            <style jsx>{`
                td, th{
                    padding: 15px 5px;
                    vertical-align: middle;
                }
            `}</style>
        </>
    )
}
const UserInfo = () => {
    const {globalStates: {userData: {state: {id}}}} = useContext(GlobalContext)
    const [isUpdated, setIsUpdated] = useState(false)
    const [formData, setFormData] = useState({
        f_name: '', l_name: '', email: '', phone: '', country: '', town_or_city: '', state_or_region: '', postal_or_zipcode: '', profile_img: '', address: '', userID: id
    })
    const [profileImage, setProfileImage] = useState(formData.profile_img)

    useEffect(async () => {
        const req = await fetch(`${API_ROUTE.get_user_data}?id=${id}`)
        const {type, data} = await req.json()
        
        setFormData({...formData, ...data})
        setProfileImage(`${API_ROUTE.customer_images}/${data.id}/${data.profile_img}`)
    }, [])

    return (
        <form onSubmit = {async (e) => {
            e.preventDefault()

            const FORM = new FormData()

            for(let prop in formData){
                FORM.append(prop, formData[prop])
            }

            const req = await fetch(API_ROUTE.update_user_info, {method: 'POST', body: FORM})
            const {type, data} = await req.json()

            notify({
                message: data,
                type: type === 'success' ? type : 'danger',
                callback: () => (type === 'success') && setIsUpdated(false)
            })
        }} className = 'row'>
            <div className="col-12">{(
                (Object.values(formData).includes(''))
                ? (
                    <p className = 'theme-color px-3 py-4 bg-light mb-5 rounded border shadow-sm'>Please fill out all fields.</p>
                )
                : ''
            )}</div>
            <div className="col-12 mb-5">
                <div style = {{width: '200px', height: '200px', backgroundSize: 'cover', backgroundPosition: 'top', backgroundImage: `url(${profileImage})`}} className = 'mx-auto shadow rounded-circle border'></div>
                <p className = 'text-c pt-3'>
                    <label>
                        <span className = 'underline theme-color text-capitalize'>Change profile picture</span>
                        <input type = 'file' onChange = {(e) => {
                            setFormData({...formData, profile_img: e.target.files[0]})
                            setIsUpdated(true)
                            
                            const fileReader = new FileReader()
                            fileReader.readAsDataURL(e.target.files[0])

                            fileReader.onload = () => {
                                setProfileImage(fileReader.result)
                            }
                        }} accept = '.jpg, .png, .gif' hidden />
                    </label>
                </p>
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
                <p className = 'mb-2'>First Name</p>
                <input type="text" value = {formData.f_name} onChange = {(e) => {
                    setFormData({...formData, f_name: e.target.value})
                    setIsUpdated(true)
                }} className = 'p-3 text-capitalize rounded d-block w-100 border outline-0 bg-light' />
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
                <p className = 'mb-2'>Last Name</p>
                <input type="text" value = {formData.l_name} onChange = {(e) => {
                    setFormData({...formData, l_name: e.target.value})
                    setIsUpdated(true)
                }} className = 'p-3 text-capitalize rounded d-block w-100 border outline-0 bg-light' />
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
                <p className = 'mb-2'>Phone number</p>
                <input type="phone" value = {formData.phone} onChange = {(e) => {
                    setFormData({...formData, phone: e.target.value})
                    setIsUpdated(true)
                }} className = 'p-3 rounded d-block w-100 border outline-0 bg-light' />
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
                <p className = 'mb-2'>Email Address</p>
                <input type="email" value = {formData.email} onChange = {(e) => {
                    setFormData({...formData, email: e.target.value})
                    setIsUpdated(true)
                }} className = 'p-3 rounded d-block w-100 border outline-0 bg-light' />
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
                <p className = 'mb-2'>Country</p>
                <input type="text" value = {formData.country} onChange = {(e) => {
                    setFormData({...formData, country: e.target.value})
                    setIsUpdated(true)
                }} readOnly = {true} value = 'Nigeria' className = 'p-3 text-capitalize user-select-0 disabled rounded d-block w-100 border outline-0 bg-light' />
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
                <p className = 'mb-2'>Town / City</p>
                <input type="text" value = {formData.town_or_city} onChange = {(e) => {
                    setFormData({...formData, town_or_city: e.target.value})
                    setIsUpdated(true)
                }} className = 'p-3 text-capitalize rounded d-block w-100 border outline-0 bg-light' />
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
                <p className = 'mb-2'>State / Region</p>
                <input type="text" value = {formData.state_or_region} onChange = {(e) => {
                    setFormData({...formData, state_or_region: e.target.value})
                    setIsUpdated(true)
                }} className = 'p-3 text-capitalize rounded d-block w-100 border outline-0 bg-light' />
            </div>
            <div className="col-lg-6 col-sm-12 pb-4">
                <p className = 'mb-2'>Postal Code / ZIP</p>
                <input type="text" value = {formData.postal_or_zipcode} onChange = {(e) => {
                    setFormData({...formData, postal_or_zipcode: e.target.value})
                    setIsUpdated(true)
                }} className = 'p-3 rounded d-block w-100 border outline-0 bg-light' />
            </div>
            <div className="col-sm-12 pb-4">
                <p className = 'mb-2'>Address</p>
                <textarea rows = '4' type="text" value = {formData.address.replace(/^\w/, String(formData.address[0]).toUpperCase()) || ''} onChange = {(e) => {
                    setFormData({...formData, address: e.target.value})
                    setIsUpdated(true)
                }} className = 'p-3 rounded resize-0 d-block w-100 border outline-0 bg-light'></textarea>
            </div>
            <div className = 'col-12 pt-5'>
                <button type = 'submit' className={`text-uppercase transit p-3 border-choco text-center text-choco bg-clear rounded ${isUpdated ? '' : 'disabled'}`}>update data</button>
            </div>
        </form>
    )
}
const Logout = () => {
    const {globalStates: {cookieStore}} = useContext(GlobalContext)
    const {updater} = useContext(PageContext)

    return (
        <div style = {{maxWidth: '500px'}} className = 'shadow my-5 animated slideInTop mx-auto rounded-2x p-5 bg-white'>
            <p className = 'text-center text-muted'>Are you sure you want to logout?</p>
            <div className="row mt-5">
                <div className="col-6">
                    <button onClick = {() => updater('orders')} className = 'border border-danger outline-0 rounded-1x bg-clear text-capitalize text-danger py-4 px-3 d-block w-100'>cancel</button>
                </div>
                <div className="col-6">
                    <button onClick = {() => {
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
                                            expires: (new Date().getTime() + (356 * 24 * 3600 * 1000)),
                                            path: '/' 
                                        })
                                        setTimeout(() => {
                                            window.location = '/'
                                        }, 500)
                                    }
                                    else{
                                        cookieStore.set({
                                            name: 'OLLYMANN_FARMS',
                                            value: '',
                                            expires: (new Date().getTime() + (356 * 24 * 3600 * 1000)),
                                            path: '/' 
                                        })
                                        setTimeout(() => {
                                            window.location = '/'
                                        }, 500)
                                    }
                                }
                            )
                        }
                    }} className = 'border border-success outline-0 rounded-1x bg-clear text-capitalize text-success py-4 px-3 d-block w-100'>logout</button>
                </div>
            </div>
        </div>
    )
}

export default () => {
    const {globalStates: {isLoggedIn: {state: isLoggedIn}}} = useContext(GlobalContext)
    const [pageTab, setPageTab] = useState('orders')
    const PageContent = {
        'orders': <Orders />,
        'user info': <UserInfo />,
        'logout': <Logout />,
    }

    useEffect(() => {
        if(!isLoggedIn){
            window.location = '/'
        }
    }, [])

    return (
        <PageContext.Provider value = {{state: pageTab, updater: setPageTab}}>
            <Header />
            <section style = {{backgroundImage: `url('assets/images/page-header-bg.jpg')`, backgroundPosition: 'center', backgroundSize: 'cover'}} >
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className = 'p-5 flex-v j-c-c a-i-c text-center' style = {{minHeight: '250px'}}>
                                <div className = 'fa-3x bold'>My Dashboard</div>
                                <div className = 'fa-1x text-muted fo-s-16'>Check out your transactions and personal data</div>
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
                                        <a href="/about">Shop</a>
                                        <span className = 'bi bi-chevron-right mx-3'></span>
                                    </div>
                                    <div>
                                        <a>My Dashboard</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container py-5">
                    <div className="row">
                        <div className = 'col-lg-3'>
                            <div className = 'row p-4'>{
                                Object.keys(PageContent).map(
                                    (each, key) => (
                                        <div key = {key} onClick = {() => setPageTab(each)} className = {`${pageTab === each ? 'border-left-thick bg-light' : 'bg-clear'} d-block cursor-pointer transit text-uppercase text-left w-100 py-4 col-12`}>{each}</div>
                                    )
                                )
                            }</div>
                        </div>
                        <div className = 'col-lg-9'>
                            {PageContent[pageTab]}
                        </div>
                    </div>
                </div>
            </section>
            <style jsx>{`
                .border-left-thick{
                    border-left: 7px solid #dfc013;
                }
            `}</style>
            <Footer />
        </PageContext.Provider>
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