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
                                <div className = 'fa-3x bold'>Contact</div>
                                <div className = 'fa-1x text-muted fo-s-16'>Reach out to us</div>
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
                                        <a href="/contact">Contact Us</a>
                                        <span className = 'bi bi-chevron-right mx-3'></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className = 'border-bottom'>
                <div className="container py-5">
                    <div className="row">
                        <div className="pb-5 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                            <div className = 'text-center'>
                                <p>
                                    <span className = 'bi bi-door-open fa-2x'></span>
                                </p>
                                <p className = 'text-dark bold'>
                                    Office
                                </p>
                                <p>
                                    1 New York Plaza, New York, <br />
                                    NY 10004, USA
                                </p>
                            </div>
                        </div>
                        <div className="pb-5 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                            <div className = 'text-center'>
                                <p>
                                    <span className = 'bi bi-chat-text fa-2x'></span>
                                </p>
                                <p className = 'text-dark bold'>
                                    Start Conversation
                                </p>
                                <div>
                                    <p className = 'mb-1'>
                                        <a href="mailto://info@molla.com">info@molla.com</a>
                                    </p>
                                    <p>
                                        <a className = 'pb-2' href="tel://+1 987-876-6543">+1 987-876-6543</a>, 
                                        <a className = 'pb-2' href="tel://+1 987-976-1234">+1 987-976-1234</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="pb-5 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                            <div className = 'text-center'>
                                <p>
                                    <span className = 'bi bi-phone fa-2x'></span>
                                </p>
                                <p className = 'text-dark bold'>
                                    Follow us
                                </p>
                                <p>
                                    <span className = 'fo-s-15 bi bi-facebook mx-3'></span>
                                    <span className = 'fo-s-15 bi bi-instagram mx-3'></span>
                                    <span className = 'fo-s-15 bi bi-twitter mx-3'></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container py-5">
                    <div className="row py-5">
                        <div className="col-12 col-lg-9 mx-auto">
                            <div className="text-center mb-5">
                                <h2>Get in Touch</h2>
                                <p>We collaborate with ambitious brands and people; we’d love to build something great together.</p>
                            </div>
                        </div>
                        <div className="col-lg-9 mx-auto pt-5">
                            <div className="row">
                                <div className = 'col-xs-12 col-sm-12 col-lg-4'>
                                    <div className = 'mb-5'>
                                        <input type="text" className = 'd-block w-100 p-3 border rounded outline-0' placeholder = 'Name *' />
                                    </div>
                                </div>
                                <div className = 'col-xs-12 col-sm-12 col-lg-4'>
                                    <div className = 'mb-5'>
                                        <input type="email" className = 'd-block w-100 p-3 border rounded outline-0' placeholder = 'Email *' />
                                    </div>
                                </div>
                                <div className = 'col-xs-12 col-sm-12 col-lg-4'>
                                    <div className = 'mb-5'>
                                        <input type="phone" className = 'd-block w-100 p-3 border rounded outline-0' placeholder = 'Phone *' />
                                    </div>
                                </div>
                                <div className = 'col-xs-12 col-sm-12 col-lg-12'>
                                    <div className = 'mb-5'>
                                        <input type="text" className = 'd-block w-100 p-3 border rounded outline-0' placeholder = 'Subject *' />
                                    </div>
                                </div>
                                <div className = 'col-xs-12 col-sm-12 col-lg-12'>
                                    <div className = 'mb-5'>
                                        <textarea className = 'd-block w-100 p-3 border resize-0 rounded outline-0' placeholder = 'Subject *' rows = '5'></textarea>
                                    </div>
                                </div>
                                <div className = 'col-xs-12 col-sm-12 col-lg-12'>
                                    <div className = 'my-5 text-c'>
                                        <button className = 'px-5 py-4 btn-warning bold letter-spacing-1 shadow theme-border btn text-uppercase rounded outline-0'>
                                            <span>submit</span>
                                            <span className = 'bi bi-arrow-right ml-3'></span>
                                        </button>
                                    </div>
                                </div>
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