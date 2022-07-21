import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {API_ROUTE} from '../../config'
import Header from '../../components/Page/Header'
import Footer from '../../components/Page/Footer'

const CapFirstLetter = (string) => typeof string === 'string' && string.length > 0 ? String(string).replace(String(string)[0], String(string)[0].toUpperCase()) : ''

export default () => {
    const [displayPic, setDisplayPic] = useState()
    const [postData, setPostData] = useState()
    const {query: {blogID}} = useRouter()

    useEffect(async () => {
        const req = await fetch(`${API_ROUTE.admin_get_blog_post_data}?blogID=${blogID}`)
        const {data} = await req.json()

        setPostData(data)
        setDisplayPic(data.images[0])
    }, [])

    return (
        <>
            <Header></Header>
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
                                        <a href={`/blog/${postData?.id}`}>Blog</a>
                                        <span className = 'bi bi-chevron-right mx-3'></span>
                                    </div>
                                    <div>
                                        <a className = 'text-capitalize'>{postData?.title}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container py-4 pb-5 mb-5">
                    <div className="mb-4">
                        <div className = 'large-display-image border bg-light'></div>
                    </div>
                    <div className="">
                        <div className="row a-i-c">{
                            (postData?.images.length > 0)
                            ? (
                                postData?.images.map(
                                    (each, key) => (
                                        <div key = {key} onClick = {() => setDisplayPic(each)} className="col-auto mb-4">
                                            <div style = {{
                                                width: '100px',
                                                height: '100px',
                                                backgroundImage: `url(${API_ROUTE.blog_images}/${postData?.id}/${each})`,
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat'
                                            }} className = 'shadow-sm rounded border'></div>
                                        </div>
                                    )
                                )
                            )
                            : <></>
                        }</div>
                    </div>
                    <div className="mb-3">
                        <h2 className = 'bold letter-spacing-1 text-dark'>{CapFirstLetter(postData?.title)}</h2>
                        <div className = 'mb-2 bold text-muted letter-spacing-1 mt-2'>By: {CapFirstLetter(postData?.authur)}</div>
                        <div className = 'mb-2 bold text-muted letter-spacing-1 mt-2'>Date: {CapFirstLetter(new Date(postData?.timestamp).toDateString())} {CapFirstLetter(new Date(postData?.timestamp).toLocaleTimeString())}</div>
                        <div className = 'pt-3'>{
                            (postData?.tags.length > 0)
                            ? (
                                postData?.tags.map((each, key) => (
                                    <button key = {key} className="mr-3 mb-3 outline-0 border-0 px-3 py-2 rounded-2x shadow theme-bg text-white">{CapFirstLetter(each)}</button>
                                ))
                            )
                            : <></>
                        }</div>
                    </div>
                    <div className = 'pb-5'>
                        <p className = 'fo-s-15 pb-4' style = {{maxWidth: '700px'}}>{CapFirstLetter(postData?.content)}</p>
                    </div>
                    <div>
                        <div className="border text-uppercase text-muted rounded-1x px-5 py-4 d-inline-block">Thanks for reading !</div>
                    </div>
                    <style jsx>{`
                        .large-display-image{
                            max-width: 700px;
                            height: 450px;${(
                                (postData)
                                ? `background-image: url(${API_ROUTE.blog_images}/${postData?.id}/${displayPic});`
                                : ''
                            )}
                            background-position: center;
                            background-size: cover;
                            background-repeat: no-repeat;
                        }
                    `}</style>
                </div>
            </section>
            <Footer></Footer>
        </>
    )
}

export async function getServerSideProps(context){
    const {req: {cookies}, query: {productID}} = context
    const cookie = cookies['OLLYMANN_FARMS'] || undefined

    return {
        props: {
            userData: cookie ? JSON.parse(cookie) : null,
            isLoggedIn: cookie && JSON.parse(cookie).id ? true : false,
            userCart: cookie && JSON.parse(cookie).cart ? JSON.parse(cookie).cart : {},
        }
    }
}