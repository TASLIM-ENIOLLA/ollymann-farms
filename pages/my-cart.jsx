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
                                <div className = 'fa-3x bold'>Shopping Cart</div>
                                <div className = 'fa-1x text-muted fo-s-16'>Your shopping cart</div>
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
                                        <a href="/my-cart">My Cart</a>
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
                    <div className="row py-5">
                        <div className="col-xs-12 col-sm-12 col-lg-8">
                            <div className="row">
                                <div className="col-d-none col-lg-d-block col-12">
                                    <div className = 'table-responsive'>
                                        <table className = 'table'>
                                            <thead className = 'border-bottom p-3'>
                                                <tr className = 'text-muted text-center text-capitalize'>
                                                    <td>product</td>
                                                    <td>price</td>
                                                    <td>quantity</td>
                                                    <td>total</td>
                                                    <td></td>
                                                </tr>
                                            </thead>
                                            <tbody className = 'text-muted text-center'>
                                                <tr>
                                                    <td>
                                                        <div className="container">
                                                            <div className="row a-i-c py-2">
                                                                <div className="col-auto p-0">
                                                                    <div className = 'border' style = {{width: '70px', height: '70px', backgroundImage: 'url(assets/images/products/cart/product-1.jpg)', backgroundPosition: 'center', backgroundSize: 'cover'}}>

                                                                    </div>
                                                                </div>
                                                                <div className="col">
                                                                    <p>Lorem ipsum dolor sit amet.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="container">
                                                            <div className="row a-i-c" style = {{width: '70px', height: '70px'}}>
                                                                <div className="col-12">
                                                                    {currency}80.00
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="container">
                                                            <div className="row a-i-c" style = {{width: '70px', height: '70px'}}>
                                                                <div className="col-12">
                                                                    3
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="container">
                                                            <div className="row a-i-c" style = {{width: '70px', height: '70px'}}>
                                                                <div className="col-12">
                                                                    {currency}80.00
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="container">
                                                            <div className="row a-i-c" style = {{height: '70px'}}>
                                                                <div className="col-12">
                                                                    <span className = 'fa-2x bi bi-x'></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="container">
                                                            <div className="row a-i-c py-2">
                                                                <div className="col-auto p-0">
                                                                    <div className = 'border' style = {{width: '70px', height: '70px', backgroundImage: 'url(assets/images/products/cart/product-1.jpg)', backgroundPosition: 'center', backgroundSize: 'cover'}}>

                                                                    </div>
                                                                </div>
                                                                <div className="col">
                                                                    <p>Lorem ipsum dolor sit amet.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="container">
                                                            <div className="row a-i-c" style = {{width: '70px', height: '70px'}}>
                                                                <div className="col-12">
                                                                    {currency}80.00
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="container">
                                                            <div className="row a-i-c" style = {{width: '70px', height: '70px'}}>
                                                                <div className="col-12">
                                                                    3
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="container">
                                                            <div className="row a-i-c" style = {{width: '70px', height: '70px'}}>
                                                                <div className="col-12">
                                                                    {currency}80.00
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="container">
                                                            <div className="row a-i-c" style = {{height: '70px'}}>
                                                                <div className="col-12">
                                                                    <span className = 'fa-2x bi bi-x'></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className = 'col-lg-d-none col-12'>
                                    <div className="flex-h rounded border mb-4 po-rel pt-4">
                                        <div className = 'p-2 top-0 right-0 po-abs'>
                                            <span className = 'bi bi-x fa-2x'></span>
                                        </div>
                                        <div className = 'mx-auto text-c p-4 col-auto'>
                                            <div className="row a-i-c py-2">
                                                <div className="col-auto p-0">
                                                    <div className = 'border' style = {{width: '70px', height: '70px', backgroundImage: 'url(assets/images/products/cart/product-1.jpg)', backgroundPosition: 'center', backgroundSize: 'cover'}}>

                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <p>Lorem ipsum dolor sit amet.</p>
                                                </div>
                                            </div>
                                            <div className = 'py-3'>
                                                <span>{currency}80.00</span>
                                            </div>
                                            <div className = 'py-3'>
                                                <span>1</span>
                                            </div>
                                            <div className = 'py-3'>
                                                <span className = 'text-choco'>{currency}80.00</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-h rounded border mb-4 po-rel pt-4">
                                        <div className = 'p-2 top-0 right-0 po-abs'>
                                            <span className = 'bi bi-x fa-2x'></span>
                                        </div>
                                        <div className = 'mx-auto text-c p-4 col-auto'>
                                            <div className="row a-i-c py-2">
                                                <div className="col-auto p-0">
                                                    <div className = 'border' style = {{width: '70px', height: '70px', backgroundImage: 'url(assets/images/products/cart/product-1.jpg)', backgroundPosition: 'center', backgroundSize: 'cover'}}>

                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <p>Lorem ipsum dolor sit amet.</p>
                                                </div>
                                            </div>
                                            <div className = 'py-3'>
                                                <span>{currency}80.00</span>
                                            </div>
                                            <div className = 'py-3'>
                                                <span>1</span>
                                            </div>
                                            <div className = 'py-3'>
                                                <span className = 'text-choco'>{currency}80.00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className = 'py-4 col-12'>
                                    <button className="d-block w-auto text-center text-uppercase py-3 px-5 w-100 ml-auto border bg-clear rounded">update cart</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-lg-4">
                            <div className = 'border rounded bg-light p-4'>
                                <div>
                                    <div className = 'text-capitalize bold letter-spacing-1 px-3 pb-4 border-bottom text-muted'>Cart total</div>
                                </div>
                                <div className = 'py-4'>
                                    <div className = 'flex-h j-c-space-between a-i-c py-4'>
                                        <div className = 'flex-h px-3'>
                                            Total
                                        </div>
                                        <div className = 'flex-h px-3'>
                                            {currency}160.00
                                        </div>
                                    </div>
                                    <div>
                                        <a href = '/checkout' className="d-block text-uppercase p-3 w-100 border-choco text-center text-choco bg-clear rounded">proceed to checkout</a>
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
            <style jsx>{`
                .table td, .table th{
                    border-top: 0 !important;
                }
            `}</style>
            <Footer />
        </>
    )
}