import {useRouter} from 'next/router'

export default ({title = 'page'}) => {
    const {back: goBack} = useRouter()

    // console.log(router.back())
    return (
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
                                        <a className = 'text-capitalize'>404</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="error-content text-center" style={{backgroundImage: `url(/assets/images/backgrounds/error-bg.jpg)`}}>
                    <div className="container">
                        <h1 className="error-title">Error 404</h1>
                        <p>We are sorry, the {title} you've requested is not available.</p>
                        <a onClick = {() => goBack()} className="btn btn-warning p-4">
                            <span>GO BACK</span>
                            <i className="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}