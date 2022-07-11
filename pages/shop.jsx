import Header from '../components/Page/Header'
import Footer from '../components/Page/Footer'
import {ShopProductCard} from '../components/ProductCard'

export default () => {
    return (
        <>
            {/* <TopRibbon></TopRibbon> */}
            <Header></Header>
            <section style = {{backgroundImage: `url('assets/images/page-header-bg.jpg')`, backgroundPosition: 'center', backgroundSize: 'cover'}} >
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className = 'p-5 flex-v j-c-c a-i-c text-center' style = {{minHeight: '250px'}}>
                                <div className = 'fa-3x bold'>Shop</div>
                                <div className = 'fa-1x text-muted fo-s-16'>Check out our clothes &amp; accesories</div>
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
                                        <a href="/shop">Shop</a>
                                        <span className = 'bi bi-chevron-right mx-3'></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = 'container'>
                    <div className="row j-c-space-between a-i-c py-5">
                        <div className="col-xs-12 col-sm-12 col-lg-auto">
                            <div className = 'mb-3 flex-h a-i-c'>
                                <span className = 'bi bi-list fo-s-20 mr-3'></span>
                                <span className="text-uppercase">filter</span>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-lg-auto">
                            <div className = 'mb-3 flex-h a-i-c'>
                                Showing 5 of 56 products
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-lg-auto">
                            <div className = 'mb-3'>
                                <span>Sort by: </span>
                                <select className = 'text-capitalize border rounded p-3 ml-2'>
                                    <option value="">most popular</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row py-5">
                        <ShopProductCard images = {[
                            'assets/images/demos/demo-21/bestSellers/product-1-1.jpg',
                            'assets/images/demos/demo-21/bestSellers/product-1-2.jpg'
                        ]} price = '13595.34' category = 'shoes' name = 'nike renew arena' rating = '3' />
                        <ShopProductCard images = {[
                            'assets/images/demos/demo-21/bestSellers/product-1-1.jpg',
                            'assets/images/demos/demo-21/bestSellers/product-1-2.jpg'
                        ]} price = '13595.34' category = 'shoes' name = 'nike renew arena' rating = '3' />
                        <ShopProductCard images = {[
                            'assets/images/demos/demo-21/bestSellers/product-1-1.jpg',
                            'assets/images/demos/demo-21/bestSellers/product-1-2.jpg'
                        ]} price = '13595.34' category = 'shoes' name = 'nike renew arena' rating = '3' />
                        <ShopProductCard images = {[
                            'assets/images/demos/demo-21/bestSellers/product-1-1.jpg',
                            'assets/images/demos/demo-21/bestSellers/product-1-2.jpg'
                        ]} price = '13595.34' category = 'shoes' name = 'nike renew arena' rating = '3' />
                        <ShopProductCard images = {[
                            'assets/images/demos/demo-21/bestSellers/product-1-1.jpg',
                            'assets/images/demos/demo-21/bestSellers/product-1-2.jpg'
                        ]} price = '13595.34' category = 'shoes' name = 'nike renew arena' rating = '3' />
                        <div className="col-12">
                            <div className="py-5 text-center">
                                <button className = 'px-5 py-3 d-inline-block text-uppercase border bg-clear rounded'>
                                    <span>more products</span>
                                    <span className = 'bi ml-2 bi-arrow-counterclockwise'></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </>
    )
}