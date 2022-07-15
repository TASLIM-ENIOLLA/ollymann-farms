import Header from '../components/Page/Header'
import Footer from '../components/Page/Footer'

export default () => {
    return (
        <>
            <Header />
            <section style = {{backgroundImage: `url('assets/images/page-header-bg.jpg')`, backgroundPosition: 'center', backgroundSize: 'cover'}} >
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className = 'p-5 flex-v j-c-c a-i-c text-center' style = {{minHeight: '250px'}}>
                                <div className = 'fa-3x bold'>About</div>
                                <div className = 'fa-1x text-muted fo-s-16'>Here's all you need to know about us</div>
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
                                        <a href="/about">About Us</a>
                                        <span className = 'bi bi-chevron-right mx-3'></span>
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
                        <div className = 'col-12'>
                            <div className = 'text-center'>
                                <h1 className = 'py-5'>
                                    Who We Are
                                </h1>
                                <p>
                                    Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, uctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis.
                                </p>
                                <div className = 'text-center'>
                                    <img src="assets/images/about/signature.png" className="d-inline-block py-3"/>
                                </div>
                                <div className="py-5">
                                    <img src="assets/images/about/img-1.jpg" className="d-block w-100 mx-auto"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container py-5">
                    <div className="row">
                        <div className="pb-5 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                            <div className = 'text-center'>
                                <p>
                                    <span className = 'bi bi-puzzle fa-2x'></span>
                                </p>
                                <p className = 'text-dark bold'>
                                    Design Quality
                                </p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus cupiditate consequuntur suscipit laboriosam, commodi eius omnis!</p>
                            </div>
                        </div>
                        <div className="pb-5 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                            <div className = 'text-center'>
                                <p>
                                    <span className = 'bi bi-emoji-smile fa-2x'></span>
                                </p>
                                <p className = 'text-dark bold'>
                                    Professional Support
                                </p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus cupiditate consequuntur suscipit laboriosam, commodi eius omnis!</p>
                            </div>
                        </div>
                        <div className="pb-5 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                            <div className = 'text-center'>
                                <p>
                                    <span className = 'bi bi-heart fa-2x'></span>
                                </p>
                                <p className = 'text-dark bold'>
                                    Made With Love
                                </p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus cupiditate consequuntur suscipit laboriosam, commodi eius omnis!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className = 'achievements-image py-5'>
                <div className="container py-5">
                    <div className="row a-i-c py-5 text-white">
                        <div className = 'col-lg-3 col-md-6 col-sm-12 col-xs-12'>
                            <div className = 'mb-5 text-center'>
                                <div className = 'h2 bold letter-spacing-1 text-white'>41k+</div>
                                <div>Happy Customers</div>
                            </div>
                        </div>
                        <div className = 'col-lg-3 col-md-6 col-sm-12 col-xs-12'>
                            <div className = 'mb-5 text-center'>
                                <div className = 'h2 bold letter-spacing-1 text-white'>20+</div>
                                <div>Years in Business</div>
                            </div>
                        </div>
                        <div className = 'col-lg-3 col-md-6 col-sm-12 col-xs-12'>
                            <div className = 'mb-5 text-center'>
                                <div className = 'h2 bold letter-spacing-1 text-white'>97%</div>
                                <div>Clients Return</div>
                            </div>
                        </div>
                        <div className = 'col-lg-3 col-md-6 col-sm-12 col-xs-12'>
                            <div className = 'mb-5 text-center'>
                                <div className = 'h2 bold letter-spacing-1 text-white'>15</div>
                                <div>Awards Won</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <style jsx>{`
                .achievements-image{
                    background-image: url(assets/images/backgrounds/bg-4.jpg);
                    background-position: center;
                    background-size: cover;
                }
            `}</style>
        </>
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