import AdminPageTemplate from '../../../components/Admin/Page/AdminPageTemplate'
import {API_ROUTE} from '../../../config'
import {useState, useEffect} from 'react'
import currency from '../../../components/currency'
import {notify} from '../../../components/Popups'
import {useRouter} from 'next/router'

export default ({productID}) => {
    const [productsData, setProductsData] = useState(undefined)
    const [displayPic, setDisplayPic] = useState(productsData?.images[0])
    const router = useRouter()

    useEffect(async () => {
        const req = await fetch(`${API_ROUTE.product_data}?productID=${productID}`)
        const {data, type} = await req.json()
        
        setProductsData(data)
        setDisplayPic(data?.images[0])
    }, [])

    return (
        <AdminPageTemplate title = 'Product Data'>{(
            (productsData)
            ? (
                <>
                    <div className="container-fluid">
                        <div className="row pt-3">
                            <div className = "col-12 px-0 px-md-2 mb-5">
                                <div>
                                    <p className = 'text-capitalize mb-2 text-dark bold letter-spacing-1'>Product name</p>
                                    <div>
                                        <div className = 'border my-3 slideUpDown' style = {{
                                            height: '400px', 
                                            maxWidth: '400px',
                                            backgroundImage: `url(${API_ROUTE.product_images}/${productsData?.id}/${displayPic})`,
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover'
                                        }}></div>
                                    </div>
                                    <div className="row pt-3 overflow-x-auto col-md-9 px-0" style = {{flexWrap: 'nowrap'}}>{
                                        productsData?.images.map(
                                            (each, key) => (
                                                <div key = {key} onClick = {() => setDisplayPic(each)} className="col-auto">
                                                    <div style = {{
                                                        width: '100px',
                                                        height: '100px',
                                                        backgroundImage: `url(${API_ROUTE.product_images}/${productsData?.id}/${each})`,
                                                        backgroundPosition: 'center',
                                                        backgroundSize: 'cover'
                                                    }} className = 'd-inline-block shadow-sm rounded border'></div>
                                                </div>
                                            )
                                        )
                                    }</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 px-0 px-md-2 mb-5">
                                <div className="bg-white p-3 rounded-1x border">
                                    <p className = 'text-capitalize mb-2 text-dark bold letter-spacing-1'>Product name</p>
                                    <div className = 'pt-2 pb-2 d-block w-100 text-muted text-capitalize'>{productsData?.name}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 px-0 px-md-2 mb-5">
                                <div className="bg-white p-3 rounded-1x border">
                                    <p className = 'text-capitalize mb-2 text-dark bold letter-spacing-1'>Product price</p>
                                    <div className = 'pt-2 pb-2 d-block w-100 text-muted'>{currency}{new Intl.NumberFormat().format(productsData?.price)} / {productsData?.measure}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 px-0 px-md-2 mb-5">
                                <div className="bg-white p-3 rounded-1x border">
                                    <p className = 'text-capitalize mb-2 text-dark bold letter-spacing-1'>Product quantity</p>
                                    <div className = 'pt-2 pb-2 d-block w-100 text-muted'>{new Intl.NumberFormat().format(productsData?.quantity)} unit{productsData?.quantity > 1 ? 's' : ''}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 px-0 px-md-2 mb-5">
                                <div className="bg-white p-3 rounded-1x border">
                                    <p className = 'text-capitalize mb-2 text-dark bold letter-spacing-1'>Units sold</p>
                                    <div className = 'pt-2 pb-2 d-block w-100 text-muted'>{new Intl.NumberFormat().format(productsData?.sold)} unit{productsData?.sold > 1 ? 's' : ''}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 px-0 px-md-2 mb-5">
                                <div className="bg-white p-3 rounded-1x border">
                                    <p className = 'text-capitalize mb-2 text-dark bold letter-spacing-1'>Category</p>
                                    <div className = 'pt-2 pb-2 d-block w-100 text-muted text-capitalize'>{productsData?.category}</div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 px-0 px-md-2 mb-5">
                                <div className="bg-white p-3 rounded-1x border">
                                    <p className = 'text-capitalize mb-2 text-dark bold letter-spacing-1'>Time created</p>
                                    <div className = 'pt-2 pb-2 d-block w-100 text-muted'>{new Date(productsData?.timestamp).toDateString()}</div>
                                </div>
                            </div>
                            <div className="col-12 px-0 px-md-2 mb-5">
                                <div className="bg-white p-3 rounded-1x border">
                                    <p className = 'text-capitalize mb-2 text-dark bold letter-spacing-1'>Description</p>
                                    <div className = 'pt-2 pb-2 d-block w-100 text-muted text-capitalize'>{
                                        (productsData?.description?.length > 0)
                                        ? productsData?.description
                                        : '--- No description available ---'
                                    }</div>
                                </div>
                            </div>
                            <div className="col-12 px-0 pt-3">
                                <div className="flex-h">
                                    <div className="col-md-6 px-2 mb-4">
                                        <a href = {`/admin/edit-product/${productsData?.id}`} className = 'text-center d-block bold letter-spacing-1 w-100 theme-bg text-white p-4 rounded shadow border-0 outline-0'>Edit Product</a>
                                    </div>
                                    <div className="col-md-6 px-2 mb-4">
                                        <button onClick = {() => DeleteProduct(productsData?.id).then(
                                            ({type, data}) => notify({message: data, type: type !== 'success' ? 'danger' : type, callback: () => type === 'success' ? router.back() : false})
                                        )} className = 'text-center d-block bold letter-spacing-1 w-100 bg-danger text-white p-4 rounded shadow border-0 outline-0'>Remove Product</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <style jsx>{`
                        .slideUpDown{
                            animation: slideUpDown 8s ease-in-out alternate infinite;
                        }
                        @keyframes slideUpDown{
                            from{
                                background-position: top;
                            }
                            to{
                                background-position: bottom;
                            }
                        }
                    `}</style>
                </>
            )
            : (
                (productsData === undefined)
                ? <></>
                : (
                    <section>
                        <div className="error-content text-center" style={{backgroundImage: `url(/assets/images/backgrounds/error-bg.jpg)`}}>
                            <div className="container">
                                <h1 className="error-title">Error 404</h1>
                                <p>We are sorry, the product you requested might have been deleted.</p>
                                <a onClick = {() => router.back()} className="btn btn-warning p-4">
                                    <span>GO BACK</span>
                                    <i className="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </section>
                )
            )
        )}</AdminPageTemplate>
    )
}

const DeleteProduct = (productID) => {
    return fetch(`${API_ROUTE.admin_delete_product}?productID=${productID}`).then(res => res.json())
}


export async function getServerSideProps(context){
    const {resolvedUrl, req: {cookies}, query: {productID}} = context
    const cookie = cookies['OLLYMANN_FARMS_ADMIN'] || undefined

    if(!cookie){
        return {
            redirect: {
                destination: '/admin/login'
            }
        }
    }

    return {
        props: {
            productID: productID,
            adminData: cookie ? JSON.parse(cookie) : null,
            isLoggedIn: cookie && JSON.parse(cookie).id ? true : false,
        }
    }
}