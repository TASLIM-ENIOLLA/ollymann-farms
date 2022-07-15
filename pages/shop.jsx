import Header from '../components/Page/Header'
import Footer from '../components/Page/Footer'
import {ProductCard} from '../components/ProductCard'
import {useState, useMemo, useRef, useEffect} from 'react'
import {useRouter} from 'next/router'
import {API_ROUTE} from '../config'
import currency from '../components/currency'

const CheckBox = ({...props}) => {
    const [_check, setCheck] = useState(props.checked)
    const checkbox = useRef()

    useEffect(() => {
        checkbox.current.click()
    }, [])

    return (
        <>
            <span onClick = {() => (
                checkbox.current.click(),
                setCheck(!_check)
            )} className = {`bi bi-check-square${_check ? '-fill': ''}`}></span>
            <input ref = {checkbox} {...props} type="checkbox" hidden/>
        </>
    )
}

const Slider = () => {
    const [dragable, setDragable] = useState(false)
    
    useEffect(() => {
        window.addEventListener('pointermove', ({x, y}) => {
            if(dragable){
                console.log(x, y)
            }
        })
    }, [dragable])

    return (
        <div className = 'po-rel'>
            <div style = {{height: '5px'}} className = 'bg-muted rounded-1x border'></div>
            <span onPointerDown = {(e) => setDragable(true)} onPointerUp = {(e) => setDragable(false)} className="po-abs rounded-circle theme-bg" style = {{top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '12px', height: '12px'}}></span>
        </div>
    )
}

export default ({cart: unrefinedCart}) => {
    const [bestSellers, setBestSellers] = useState([])
    const [filterBar, setFilterBar] = useState(false)
    const [minMaxPrice, setMinMaxPrice] = useState({
        minValue: 0,
        maxValue: 0
    })
    const {query: {category}} = useRouter()
    const [filters, setFilters] = useState({
        category: [],
        sex: []
    })

    useEffect(async () => {
        const req = await fetch(API_ROUTE.home)
        const {type, data: {bestSellers}} = await req.json()

        const bestSellersList = bestSellers.map(
            e => {
                e['isCarted'] = !!unrefinedCart[e.id]
                return e
            }
        )

        setBestSellers(bestSellersList)
        setMinMaxPrice({
            ...minMaxPrice,
            minValue: Math.min(...bestSellersList.map(({price}) => price)),
            maxValue: Math.max(...bestSellersList.map(({price}) => price)),
        })
    }, [])

    return (
        <>
            {/* <TopRibbon></TopRibbon> */}
            <Header></Header>
            <section className={`${filterBar ? '' : 'd-none'} animated slideInLeft p-5 vh100 flex-v po-fixed top-0 left-0 bg-white shadow`} style = {{width: '90%', maxWidth: '300px', zIndex: 10000}}>
                <div className = 'flex-h a-i-c j-c-space-between'>
                    <div onClick = {() => setFilterBar(false)} className="text-uppercase flex-h a-i-c">
                        <span className = 'bi bi-x mr-3 fo-s-20'></span>
                        <span>filter</span>
                    </div>
                    <div className="text-capitalize theme-color">clean all</div>
                </div>
                <hr className="m-0 border-top mt-3"/>
                <div className = 'flex-1 overflow-y-auto py-5'>
                    <div className = 'mb-5'>
                        <div className="flex-h a-i-c j-c-space-between">
                            <div className="text-uppercase">category</div>
                        </div>
                        <div className = 'pt-3'>
                            <label className = 'd-block w-100 mb-4' htmlFor="">
                                <CheckBox checked = {true} value = 'shoes' onChange = {({target: {checked, value}}) => (checked, value)} />
                                <span className = 'ml-3 text-capitalize'>Shoes</span>
                            </label>
                            <label className = 'd-block w-100 mb-4' htmlFor="">
                                <CheckBox />
                                <span className = 'ml-3 text-capitalize'>Clothes</span>
                            </label>
                            <label className = 'd-block w-100 mb-4' htmlFor="">
                                <CheckBox />
                                <span className = 'ml-3 text-capitalize'>Bags</span>
                            </label>
                        </div>
                    </div>
                    <div className = 'mb-5'>
                        <div className="flex-h a-i-c j-c-space-between">
                            <div className="text-uppercase">sex</div>
                        </div>
                        <div className = 'pt-3'>
                            <label className = 'd-block w-100 mb-4' htmlFor="">
                                <CheckBox />
                                <span className = 'ml-3 text-capitalize'>unisex</span>
                            </label>
                            <label className = 'd-block w-100 mb-4' htmlFor="">
                                <CheckBox />
                                <span className = 'ml-3 text-capitalize'>male</span>
                            </label>
                            <label className = 'd-block w-100 mb-4' htmlFor="">
                                <CheckBox />
                                <span className = 'ml-3 text-capitalize'>female</span>
                            </label>
                        </div>
                    </div>
                    <div className = 'mb-5'>
                        <div className="flex-h a-i-c j-c-space-between">
                            <div className="text-uppercase">price range ({currency})</div>
                        </div>
                        <div className = 'pt-3'>
                            <label className = 'd-block w-100 mb-4' htmlFor="">
                                {/* <input type="range" min = {minMaxPrice.minValue} max = {minMaxPrice.maxValue} className = 'd-block w-100 bg-danger' /> */}
                                <Slider />
                                <div className="flex-h a-i-c j-c-space-between">
                                    <div>{currency}{minMaxPrice.minValue}</div>
                                    <div>{currency}{minMaxPrice.maxValue}</div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </section>
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
                            <div className = 'mb-3 cursor-pointer flex-h a-i-c' onClick = {() => setFilterBar(true)}>
                                <span className = 'bi bi-list fo-s-20 mr-3'></span>
                                <span className="text-uppercase">filter</span>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-lg-auto">
                            <div className = 'mb-3 flex-h a-i-c'>
                                Showing {bestSellers.length} of {bestSellers.length} products
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row py-5">{(
                        (bestSellers.length > 0)
                        ? (
                            <>
                                {bestSellers.map(
                                    ({name, id, category, isCarted, images, price, type}, key) => (
                                        <ProductCard id = {id} key = {id} type = {type} images = {images.map(e => `${API_ROUTE.product_images}/${id}/${e}`)} price = {price} category = {category} isCarted = {isCarted} name = {name} rating = {Math.floor(((Math.random() * 10) % 5) + 1)} />
                                    )
                                )}
                                <div className="col-12">
                                    <div className="py-5 text-center">
                                        <button className = 'px-5 py-3 d-inline-block text-uppercase border bg-clear rounded'>
                                            <span>more products</span>
                                            <span className = 'bi ml-2 bi-arrow-counterclockwise'></span>
                                        </button>
                                    </div>
                                </div>
                            </>
                            
                        )
                        : (
                            <div className="col-auto mx-auto text-c">
                                <div className = 'animated pulse infinite'>
                                    <span className="fa-5x bi bi-basket text-muted"></span>
                                    <p>Restocking...</p>
                                </div>
                            </div>
                        )
                    )}</div>
                </div>
            </section>
            <Footer></Footer>
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