import Header from '../components/Page/Header'
import Footer from '../components/Page/Footer'
import currency from '../components/currency'

export default () => {
    return (
        <>
            <Header />
            <section style = {{backgroundImage: `url('assets/images/page-header-bg.jpg')`, backgroundPosition: 'center', backgroundSize: 'cover'}} >
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
                                    <input type="text" className = 'p-3 rounded d-block w-100 border outline-0 bg-light' />
                                </div>
                                <div className="col-lg-6 col-sm-12 pb-4">
                                    <p className = 'mb-2'>Last Name *</p>
                                    <input type="text" className = 'p-3 rounded d-block w-100 border outline-0 bg-light' />
                                </div>
                                <div className="col-sm-12 pb-4">
                                    <p className = 'mb-2'>Country</p>
                                    <input type="text" value = 'Nigeria' className = 'p-3 user-select-0 disabled rounded d-block w-100 border outline-0 bg-light' />
                                </div>
                                <div className="col-sm-12 pb-4">
                                    <p className = 'mb-2'>Address *</p>
                                    <input type="text" className = 'p-3 rounded d-block w-100 border outline-0 bg-light' />
                                </div>
                                <div className="col-lg-6 col-sm-12 pb-4">
                                    <p className = 'mb-2'>Town / City *</p>
                                    <input type="text" className = 'p-3 rounded d-block w-100 border outline-0 bg-light' />
                                </div>
                                <div className="col-lg-6 col-sm-12 pb-4">
                                    <p className = 'mb-2'>State / Region *</p>
                                    <input type="text" className = 'p-3 rounded d-block w-100 border outline-0 bg-light' />
                                </div>
                                <div className="col-lg-6 col-sm-12 pb-4">
                                    <p className = 'mb-2'>Postal Code / ZIP *</p>
                                    <input type="text" className = 'p-3 rounded d-block w-100 border outline-0 bg-light' />
                                </div>
                                <div className="col-lg-6 col-sm-12 pb-4">
                                    <p className = 'mb-2'>Postal Code / ZIP *</p>
                                    <input type="text" className = 'p-3 rounded d-block w-100 border outline-0 bg-light' />
                                </div>
                                <div className="col-sm-12 pb-4">
                                    <p className = 'mb-2'>Email Address *</p>
                                    <input type="email" className = 'p-3 rounded d-block w-100 border outline-0 bg-light' />
                                </div>
                                <div className="col-sm-12 pb-4">
                                    <p className = 'mb-2'>Order Notes (optional)</p>
                                    <textarea rows = '5' className = 'p-3 resize-0 rounded d-block w-100 border outline-0 bg-light'></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <div className = 'border rounded bg-light p-4'>
                                <div>
                                    <div className = 'text-capitalize bold letter-spacing-1 px-3 pb-4 border-bottom text-muted'>Your order</div>
                                </div>
                                <div className = 'py-4'>
                                    <div>
                                        <div className = 'flex-h j-c-space-between bold letter-spacing-1 text-muted a-i-c py-4'>
                                            <div className = 'flex-h px-3'>
                                                Product
                                            </div>
                                            <div className = 'flex-h px-3'>
                                                Total
                                            </div>
                                        </div>
                                        <div>
                                            <div className = 'flex-h j-c-space-between text-muted a-i-c py-4 border-bottom mb-3'>
                                                <div className = 'px-3 double-line'>
                                                    Beige knitted elastic runner shoes
                                                </div>
                                                <div className = 'px-3'>
                                                    {currency}80.00
                                                </div>
                                            </div>
                                            <div className = 'flex-h j-c-space-between text-muted a-i-c py-4 border-bottom mb-3'>
                                                <div className = 'px-3 double-line'>
                                                    Beige knitted elastic runner shoes
                                                </div>
                                                <div className = 'px-3'>
                                                    {currency}80.00
                                                </div>
                                            </div>
                                        </div>
                                        <div className = 'flex-h j-c-space-between bold letter-spacing-1 text-muted a-i-c py-4'>
                                            <div className = 'flex-h px-3'>
                                                Subtotal
                                            </div>
                                            <div className = 'flex-h px-3'>
                                                {currency}160.00
                                            </div>
                                        </div>
                                    </div>
                                    <div className = 'pt-3'>
                                        <a href = '#place-order' className="d-block text-uppercase p-3 w-100 border-choco text-center text-choco bg-clear rounded">place order</a>
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