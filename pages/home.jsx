import  Header                            from '../components/Page/Header'
import  Footer                            from '../components/Page/Footer'
import  NewsLetter                        from '../components/Page/NewsLetter'
import {ProductCard}                      from '../components/ProductCard'
import {API_ROUTE}                        from '../config'
import {useEffect, useState, useContext}  from 'react'
import {GlobalContext}                    from '../components/context/GlobalContext'
import {LargeBlogCard, SmallBlogCard}     from '../components/Blog'
import  Loader                            from '../components/Loader'

const newArrivalsCategory = ['all','men','women','shoes','accessories']

export default ({cart: unrefinedCart}) => {
    const {globalStates: {cart: {state: refinedCart}}} = useContext(GlobalContext)
    const [bestSellers, setBestSellers] = useState()
    const [blogPosts, setBlogPosts] = useState()
    const [categories, setCategories] = useState()
    
    useEffect(async () => {
        const req = await fetch(API_ROUTE.home)
        const {data: {bestSellers, categories, blogPosts}} = await req.json()

        setBlogPosts(blogPosts)
        setCategories(categories)
        setBestSellers(bestSellers.map((each) => ({
            ...each,
            isCarted: !!unrefinedCart[each.id]
        })))
    }, [])
    
    return (
        <>
            {/* <TopRibbon></TopRibbon> */}
            <Header></Header>
            <section>
                <div className="container-fluid">
                    <div className="row" style = {{backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.3)), url(/assets/images/backgrounds/2.jpg)`}}>
                        <div className="px-5 col-12">
                            <div style={{minHeight: '600px'}} className = 'container flex-v a-i- j-c-c'>
                                <div className = 'intro'>
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
                </div>
            </section>
            <section className = 'py-5'>
                <div className="p-5">
                    <div className="fa-2x bold text-center">BEST SELLERS</div>
                    <p className="content text-center">Here's our fastest selling farm produce</p>
                </div>
                <div className="container py-4">
                    <div className="row">{(
                        (bestSellers)
                        ? (
                            (bestSellers.length > 0)
                            ? (
                                bestSellers.map(
                                    ({name, id, category, isCarted, images, price, type}, key) => (
                                        (++key < 6)
                                        ? (
                                            <ProductCard id = {id} key = {id} type = {type} images = {images.map(e => `${API_ROUTE.product_images}/${id}/${e}`)} price = {price} category = {category} isCarted = {isCarted} name = {name} rating = {Math.floor(((Math.random() * 10) % 5) + 1)} />
                                        )
                                        : undefined
                                    )
                                )
                            )
                            : (
                                <div className="col-auto mx-auto text-c">
                                    <div className = 'animated pulse infinite'>
                                        <span className="fa-5x bi bi-basket text-muted"></span>
                                        <p>Oops! We are currently restocking. Please check again soon.</p>
                                    </div>
                                </div>
                            )
                        )
                        : <Loader />
                    )}</div>
                </div>
            </section>
            <section className = 'py-5'>
                <div className="p-5">
                    <div className="fa-2x bold text-center">CATEGORY</div>
                    <p className="content text-center">Check out our categories of farm produce!</p>
                </div>
                <div className="container py-4">
                    <div className="row">{
                        (categories)
                        ? (
                            (categories.length > 0)
                            ? categories.map(({name, id, images}, key) => (
                                <div key = {key} className="col-lg-3 pb-5 col-md-4 col-sm-6 col-xs-12">
                                    <a href = {`/shop?category=${name}`} className="text-center rounded-2x flex-v j-c-c shadow p-3" style = {{
                                        minHeight: '150px',
                                        backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url(${API_ROUTE.category_images}/${id}/${images[0]})`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover'
                                    }}>
                                        <h3 className = 'text-uppercase bold letter-spacing-1 text-white'>{name}</h3>
                                    </a>
                                </div>
                            ))
                            : (
                                <div className="col-auto mx-auto text-c">
                                    <div className = 'animated pulse infinite'>
                                        <span className="fa-5x bi bi-basket text-muted"></span>
                                        <p>Oops! We are currently restocking. Please check again soon.</p>
                                    </div>
                                </div>
                            )
                        )
                        : <Loader />
                    }</div>
                </div>
            </section>
            <section className = 'py-5'>
                <div className="p-5">
                    <div className="fa-2x bold text-center">BLOG</div>
                    <p className="content text-center">See our recent activities and know what we are up to...</p>
                </div>
                <div className="container py-4">
                    <div className="row">{
                        (blogPosts)
                        ? (
                            (blogPosts.length > 0)
                            ? (
                                <>
                                    <div className="col-lg-5">
                                        <LargeBlogCard href = {`/blog/${blogPosts[0].id}`} {...blogPosts[0]} />
                                    </div>
                                    <div className="col-lg-7">{
                                        blogPosts.map((props, key) => (
                                            (key > 0 && key < 3)
                                            ? (
                                                <SmallBlogCard key = {`${props.id}-${key}`} href = {`/blog/${props.id}`} {...props} />
                                            )
                                            : undefined
                                        ))
                                    }</div>
                                </>
                            )
                            : (
                                <div className="col-12">
                                    <div className="p-5 border text-c text-muted bold letter-spacing-1 rounded-1x shadow-sm col-md-9 mx-auto">
                                        <div className = 'pb-4'>
                                            <span className="bi bi-exclamation-square-fill fa-3x"></span>
                                        </div>
                                        <p>
                                            We currently do not have any post in our blog. Stick around to get more update from our blog.
                                        </p>
                                    </div>
                                </div>
                            )
                        )
                        : (
                            <Loader />
                        )
                    }</div>
                </div>
            </section>
            <section style = {{minHeight: '300px', backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(/assets/images/backgrounds/1.jpg)`}} className = 'py-5 flex-v j-c-c a-i-c'>
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
                <div className="container mb-5 py-4">
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
            <NewsLetter />
            <Footer />
            <style jsx>{`
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