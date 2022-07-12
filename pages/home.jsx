import Header from '../components/Page/Header'
import Footer from '../components/Page/Footer'
import {ProductCard} from '../components/ProductCard'
import {LargeBlogCard, SmallBlogCard} from '../components/Blog'

export default () => {
    return (
        <>
            <section>
                <Header />
                <hr className = 'm-0 border-top' />
                <section className = 'hero-bg'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className = 'min-height-450px intro flex-v j-c-c'>
                                    <div className="content">
                                        <h3 className  = 'h3-sm text-capitalize'>Growing Our Community's Food</h3>
                                    </div>
                                    <div className="price">
                                        <h3 className  = 'h3-sm text-capitalize'>Delivered from our farm to your home!</h3>
                                    </div>
                                    <div className="action">
                                        <a href="/shop" className="btn btn-warning fo-s-16">
                                            SHOP NOW
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <section className = 'py-5'>
                <div className="p-5">
                    <div className="fa-2x bold text-center">BEST SELLERS</div>
                    <p className="content text-center">The Trends Boutique: The latest fashion trends from top brands!</p>
                </div>
                <div className="container py-4">
                    <div className="row">
                        <ProductCard id = {1} type = 'best' images = {[
                            '/assets/images/products/okra/1.jpg',
                            '/assets/images/products/okra/2.jpg',
                            '/assets/images/products/okra/3.jpg',
                        ]} price = '300' category = 'veges' name = 'okra' rating = '3' />
                        <ProductCard id = {2} type = 'hot' images = {[
                            '/assets/images/products/pepper/1.jpg',
                            '/assets/images/products/pepper/2.jpg',
                            '/assets/images/products/pepper/3.jpg',
                        ]} price = '260' category = 'veges' name = 'pepper' rating = '3' />
                        <ProductCard id = {3} type = 'fresh' images = {[
                            '/assets/images/products/fruits/1.jpg',
                        ]} price = '2000' measure = 'basket' category = 'fruits' name = 'assorted friuts' rating = '3' />
                        <ProductCard id = {4} type = 'fresh' images = {[
                            '/assets/images/products/vegetable/1.jpg',
                            '/assets/images/products/vegetable/2.jpg',
                        ]} price = '300' measure = 'bundle' category = 'veges' name = 'vegetable' rating = '3' />
                    </div>
                </div>
            </section>
            <section className = 'py-5'>
                <div className="p-5">
                    <div className="fa-2x bold text-center">CATEGORY</div>
                    <p className="content text-center">Check out our categories of our farm produce!</p>
                </div>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-lg-3 pb-5 col-md-4 col-sm-6 col-xs-12">
                            <div className="rounded-2x flex-v j-c-c shadow p-3" style = {{minHeight: '150px', backgroundImage: 'url(/assets/images/products/vegetable/2.jpg)', backgroundPosition: 'center', backgroundSize: 'cover'}}>
                                <h4 className = 'text-uppercase text-dark'>veges</h4>
                                <p>
                                    <a href="/shop?category=veges" className = 'fo-s-15 text-capitalize'>
                                        shop now 
                                        <span className = 'bi ml-2 bi-arrow-right'></span>
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 pb-5 col-md-4 col-sm-6 col-xs-12">
                            <div className="rounded-2x flex-v j-c-c shadow p-3" style = {{minHeight: '150px', backgroundImage: 'url(/assets/images/products/fruits/1.jpg)', backgroundPosition: 'center', backgroundSize: 'cover'}}>
                                <h4 className = 'text-uppercase text-white'>fruits</h4>
                                <p>
                                    <a href="/shop?category=fruits" className = 'fo-s-15 text-capitalize'>
                                        shop now 
                                        <span className = 'bi ml-2 bi-arrow-right'></span>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className = 'py-5'>
                <div className="p-5">
                    <div className="fa-2x bold text-center">BLOG</div>
                    <p className="content text-center">See our recent activities and know what we are up to...</p>
                </div>
                <div className="container py-4">
                    <div className="row">
                        <div className="col-lg-5">
                            <LargeBlogCard />
                        </div>
                        <div className="col-lg-7">
                            <SmallBlogCard />
                            <SmallBlogCard />
                        </div>
                    </div>
                </div>
            </section>
            <section style = {{minHeight: '300px', backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(assets/images/backgrounds/bg-2.jpg)`}} className = 'py-5 flex-v j-c-c a-i-c'>
                <div className="container text-c py-5">
                    <div className = 'h1 bold text-white text-capitalize letter-spacing-1'>now available for delivery</div>
                    <div className = 'mt-4'>
                        <button className = 'border rounded bg-clear border-white text-white px-5 py-4 outline-0 text-capitalize'>see delivey areas</button>
                    </div>
                </div>
            </section>
            <section className = 'py-5'>
                <div className="p-5">
                    <div className="fa-2x bold text-center">ABOUT US</div>
                </div>
                <div className="container py-4">
                    <div className="row text-c">
                        <div className="col-md-6 col-lg-4">
                            <div className = 'border shadow-sm mb-4 rounded-1x px-4 py-5'>
                                <span className = 'bi text-muted bi-life-preserver fa-3x'></span>
                                <h2 className = 'mb-5 theme-color'>Growing Health</h2>
                                <p>
                                    We know that food grown on healthy land with healthy farming is healthy food. We act as stewards of this land, caring for its health to support yours.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className = 'border shadow-sm mb-4 rounded-1x px-4 py-5'>
                                <span className="bi-shop fa-3x text-muted"></span>
                                <h2 className = 'mb-5 theme-color'>A Family Tradition</h2>
                                <p>
                                    Our family grew up on the land of Ollymann Farm. We are proud to grow the food that feeds your families. Thank you for supporting this tradition.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className = 'border shadow-sm mb-4 rounded-1x px-4 py-5'>
                                <span className="bi-truck fa-3x text-muted"></span>
                                <h2 className = 'mb-5 theme-color'>Delivery or Pick-up</h2>
                                <p>
                                    We regularly add new pick-up sites and delivery times. Check to find a spot near you! If you have questions about delivery or pick-up options, drop us a line!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section style = {{minHeight: '0', backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: `url(assets/images/demos/demo-21/newsLetter/banner.jpg)`}} className = 'py-5'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center py-5">
                            <p className = 'pb-3'>
                                <span className = 'bi text-white bi-envelope-paper fa-2x'></span>
                            </p>
                            <div className = 'h1 bold text-white text-uppercase letter-spacing-1'>subscribe to our newsLetter</div>
                            <div className = 'text-white mb-5 fo-s-15'>Learn about new offers and get more deals by joining our newsletter</div>
                            <div className = 'col-md-6 col-sm-9 col-lg-7 mx-auto'>
                                <div className = 'flex-h rounded overflow-0 bg-white'>
                                    <input type="email" className = 'p-3 bg-clear border-0 outline-0 flex-1' />
                                    <input type="submit" value="SUBSCRIBE" className = 'px-4 py-3 text-white border-0 outline-0 bg-warning '/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <style jsx>{`
                .min-height-450px{
                    min-height: 550px;
                }
                .hero-bg{
                    background-size: cover;
                    background-position: center;
                    background-image: linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(/assets/images/demos/demo-21/slider/dietmar-reichle-caiX9QloFc8-unsplash.jpg);
                }
                @media screen and (max-width: 576px){
                    .h3-sm{
                        font-size: 4rem !important;
                    }
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
