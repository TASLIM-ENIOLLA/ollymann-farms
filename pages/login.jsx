import {useState, useContext, useEffect} from 'react'
import Header from '../components/Page/Header'
import Footer from '../components/Page/Footer'
import {Register, SignIn} from '../components/SignIn'
import {useRouter} from 'next/router'
import {API_ROUTE} from '../config'
import {notify} from '../components/Popups'
import {GlobalContext} from '../components/context/GlobalContext'

export default ({tabName}) => {
    const {globalStates: {cookieStore}} = useContext(GlobalContext)
    const {query: {continueURL}} = useRouter()
    const [tab, setTab] = useState(tabName)
    const tabs = {
        'register': <Register onSubmit = {async (e) => {
            const FORM = new FormData()
            const formData = JSON.parse(e.target.getAttribute('form-data'))
            
            for(let prop in formData){
                FORM.append(prop, formData[prop])
            }
            
            const req = await fetch(API_ROUTE.register, {method: 'POST', body: FORM})
            const {type, data, user_data} = await req.json()

            notify({
                message: data,
                type: type === 'success' ? type : 'danger',
                callback: () => {
                    if(type === 'success'){
                        cookieStore.get('OLLYMANN_FARMS').then(
                            res => {
                                if(res){
                                    let {value: existingCookieValue} = res
                                    existingCookieValue = JSON.parse(existingCookieValue)
    
                                    cookieStore.set({
                                        name: 'OLLYMANN_FARMS',
                                        value: JSON.stringify({
                                            ...existingCookieValue,
                                            ...user_data,
                                            account_type: 'customer'
                                        }),
                                        expires: (new Date().getTime() + (356 * 24 * 3600 * 1000)),
                                        path: '/' 
                                    })
                                    setTimeout(() => {
                                        window.location.replace(continueURL)
                                    }, 500)
                                }
                                else{
                                    cookieStore.set({
                                        name: 'OLLYMANN_FARMS',
                                        value: JSON.stringify({
                                            ...user_data,
                                            account_type: 'customer'
                                        }),
                                        expires: (new Date().getTime() + (356 * 24 * 3600 * 1000)),
                                        path: '/' 
                                    })
                                    setTimeout(() => {
                                        window.location.replace(continueURL)
                                    }, 500)
                                }
                            }
                        )
                    }
                }
            })
        }} />,
        'sign-in': <SignIn onSubmit = {async (e) => {
            const FORM = new FormData()
            const formData = JSON.parse(e.target.getAttribute('form-data'))
        
            for(let prop in formData){
                FORM.append(prop, formData[prop])
            }
            const req = await fetch(API_ROUTE.signin, {method: 'POST', body: FORM})
            const {type, data, user_data} = await req.json()
        
            notify({
                message: data,
                type: type === 'success' ? type : 'danger',
                callback: () => {
                    if(type === 'success'){
                        cookieStore.get('OLLYMANN_FARMS').then(
                            res => {
                                if(res){
                                    let {value: existingCookieValue} = res
                                    existingCookieValue = JSON.parse(existingCookieValue)
    
                                    cookieStore.set({
                                        name: 'OLLYMANN_FARMS',
                                        value: JSON.stringify({
                                            ...existingCookieValue,
                                            ...user_data,
                                            account_type: 'customer'
                                        }),
                                        expires: (new Date().getTime() + (356 * 24 * 3600 * 1000)),
                                        path: '/' 
                                    })
                                    setTimeout(() => {
                                        window.location.replace(continueURL)
                                    }, 500)
                                }
                                else{
                                    cookieStore.set({
                                        name: 'OLLYMANN_FARMS',
                                        value: JSON.stringify({
                                            ...user_data,
                                            account_type: 'customer'
                                        }),
                                        expires: (new Date().getTime() + (356 * 24 * 3600 * 1000)),
                                        path: '/' 
                                    })
                                    setTimeout(() => {
                                        window.location.replace(continueURL)
                                    }, 500)
                                }
                            }
                        )
                    }
                }
            })
        }} />
    }

    return (
        <>
            <Header />
            <section className = 'hero-bg' style = {{padding: '10% 0%'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className = 'bg-white shadow mx-auto rounded-1x' style = {{maxWidth: '550px', padding: '50px 40px'}}>
                                <div>
                                    <div className = 'row col a-i-c m-0'>
                                        <div className="col px-0">
                                            <button onClick = {() => setTab('sign-in')} className={`outline-0 text-uppercase bg-clear d-block w-100 p-4 ${tab === 'sign-in' ? ' active-tab' : 'border-0'}`}>Sign In</button>
                                        </div>
                                        <div className="col px-0">
                                            <button onClick = {() => setTab('register')} className={`outline-0 text-uppercase bg-clear d-block w-100 p-4 ${tab === 'register' ? ' active-tab' : 'border-0'}`}>Register</button>
                                        </div>
                                    </div>
                                    <hr className = 'm-0 border-top' />
                                </div>
                                <div className = 'pt-5'>
                                    {tabs[tab]}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <style jsx>{`
                .hero-bg{
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                    background-image: url(assets/images/backgrounds/login-bg.jpg);
                }
                .active-tab{
                    border: 0;
                    border-bottom: 3px solid #c96;
                    color: #c96;
                }
            `}</style>
        </>
    )
}

export const getServerSideProps = (context) => {
    const {req: {cookies}, query: {tab}} = context
    const cookie = cookies['OLLYMANN_FARMS'] || undefined

    return {
        props: {
            tabName: tab || 'sign-in',
            userData: cookie ? JSON.parse(cookie) : null,
            isLoggedIn: cookie && JSON.parse(cookie).id ? true : false,
            userCart: cookie && JSON.parse(cookie).cart ? JSON.parse(cookie).cart : {}
        }
    }
}