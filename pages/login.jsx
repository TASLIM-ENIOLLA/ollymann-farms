import {useState} from 'react'
import Header from '../components/Page/Header'
import Footer from '../components/Page/Footer'

import{Register, SignIn} from '../components/SignIn'

export default ({tabName}) => {
    const [tab, setTab] = useState(tabName)
    const tabs = {
        'register': <Register />,
        'sign-in': <SignIn />
    }
    return (
        <>
            <Header />
            <section className = 'hero-bg' style = {{padding: '10% 0%'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className = 'bg-white shadow mx-auto rounded-1x' style = {{maxWidth: '550px', padding: '50px 40px'}}>
                                <div className = 'row py-4 a-i-c j-c-c'>
                                    <div className="col">
                                        <button onClick = {() => setTab('sign-in')} className={`outline-0 text-uppercase bg-clear d-block w-100 p-4 ${tab === 'sign-in' ? ' active-tab' : 'border-0'}`}>Sign In</button>
                                    </div>
                                    <div className="col">
                                        <button onClick = {() => setTab('register')} className={`outline-0 text-uppercase bg-clear d-block w-100 p-4 ${tab === 'register' ? ' active-tab' : 'border-0'}`}>Register</button>
                                    </div>
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

export const getServerSideProps = ({query: {tab}}) => {
    console.log(tab)
    return {
        props: {
            tabName: tab || 'sign-in'
        }
    }
}