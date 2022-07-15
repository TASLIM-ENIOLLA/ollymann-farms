import AdminPageTemplate from '../../../components/Admin/Page/AdminPageTemplate'
import {API_ROUTE} from '../../../config'
import {useState, useEffect} from 'react'
import currency from '../../../components/currency'
import {notify} from '../../../components/Popups'

const NumberInput = ({...props}) => {
    return (
        <input {...props} type = 'text' onKeyPress = {e => isNaN(Number(e.key)) || (e.target.value.replace(/\,/g, '').length >= 11) ? e.preventDefault() : true} />
    )
}

const UpdateProduct = async (formData) => {
    const FORM = new FormData()

    for(let prop in formData){
        if(prop === 'images'){
            if(!!formData[prop]){
                for(let file of formData[prop]){
                    FORM.append(`${prop}[]`, file)
                }
            }
            continue
        }
        FORM.append(prop, formData[prop])
    }

    return fetch(`${API_ROUTE.admin_update_product}`, {method: 'POST', body: FORM}).then(res => res.json())
}

const CapFirstLetter = (string) => string.length > 0 ? String(string).replace(String(string)[0], String(string)[0].toUpperCase()) : ''

const ParseImageFile = ({src, product_id}) => {
    const [imageSrc, setImageSrc] = useState()

    if(typeof src !== 'string'){
        const fileReader = new FileReader()
        fileReader.readAsDataURL(src)
        
        fileReader.onload = () => setImageSrc(fileReader.result)
    }

    return (
        <div className="col-auto">
            <div className = 'border d-inline-block' style = {{
                width: '120px',
                height: '120px',
                verticalAlign: 'middle',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(${(
                    (typeof src === 'string')
                    ? `${API_ROUTE.product_images}/${product_id}/${src}`
                    : imageSrc
                )})`
            }}></div>
        </div>
    )
}

export default ({productID}) => {
    const [formData, setFormData] = useState(undefined)
    const [isUpdated, setIsUpdated] = useState(false)

    useEffect(async () => {
        if(!isUpdated){
            const req = await fetch(`${API_ROUTE.product_data}?productID=${productID}`)
            const {data, type} = await req.json()
            
            setFormData(data)
        }
    }, [isUpdated])

    return (
        <AdminPageTemplate title = 'Edit Product'>{(
            (formData)
            ? (
                <form onSubmit = {(e) => {
                    e.preventDefault()
                    
                    UpdateProduct(formData).then(
                        ({type, data}) => {
                            notify({
                                message: data,
                                type: type === 'success' ? type : 'danger',
                                callback: () => {
                                    if(type === 'success'){
                                        setFormData({
                                            name: '',
                                            quantity: 0,
                                            category: '',
                                            measure: '',
                                            price: 0,
                                            description: '',
                                            images: []
                                        })

                                        setIsUpdated(false)
                                    }
                                }
                            })
                        }
                    )
                }} className="d-block w-100">
                    <div className="row">
                        <div className="col-md-6 mb-5">
                            <p className = 'text-capitalize mb-2'>Product name *</p>
                            <input value = {CapFirstLetter(formData?.name)} onChange = {(e) => (setIsUpdated(true), setFormData({...formData, name: e.target.value}))} type="text" className = 'p-4 d-block w-100 outline-0 border rounded' />
                        </div>
                        <div className="col-md-6 mb-5">
                            <p className = 'text-capitalize mb-2'>Product measure *</p>
                            <select value = {formData?.measure} onChange = {(e) => (setIsUpdated(true), setFormData({...formData, measure: e.target.value}))} className = 'p-4 d-block text-capitalize w-100 outline-0 border rounded'>
                                <option className = 'text-capitalize' value="">--- Select measure ---</option>
                                <option className = 'text-capitalize' value="bowl">bowl</option>
                                <option className = 'text-capitalize' value="basket">basket</option>
                                <option className = 'text-capitalize' value="bundle">bundle</option>
                                <option className = 'text-capitalize' value="sack">sack</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-5">
                            <p className = 'text-capitalize mb-2'>Product category *</p>
                            <select value = {formData?.category} onChange = {(e) => (setIsUpdated(true), setFormData({...formData, category: e.target.value}))} className = 'p-4 d-block text-capitalize w-100 outline-0 border rounded'>
                                <option className = 'text-capitalize' value="">--- Select category ---</option>
                                <option className = 'text-capitalize' value="veges">veges</option>
                                <option className = 'text-capitalize' value="fruits">fruits</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-5">
                            <p className = 'text-capitalize mb-2'>Product quantity *</p>
                            <NumberInput value = {new Intl.NumberFormat().format(formData?.quantity)} onChange = {(e) => (setIsUpdated(true), setFormData({...formData, quantity: e.target.value.replace(/\,/g, '')}))} className = 'p-4 d-block w-100 outline-0 border rounded' />
                        </div>
                        <div className="col-md-12 mb-5">
                            <p className = 'text-capitalize mb-2'>Product price ({currency}) *</p>
                            <NumberInput value = {new Intl.NumberFormat().format(formData?.price)} onChange = {(e) => (setIsUpdated(true), setFormData({...formData, price: e.target.value.replace(/\,/g, '')}))} className = 'p-4 d-block w-100 outline-0 border rounded' />
                        </div>
                        <div className="col-md-12 mb-5">
                            <p className = 'text-capitalize mb-2'>Product description *</p>
                            <textarea value = {CapFirstLetter(formData?.description)} onChange = {(e) => (setIsUpdated(true), setFormData({...formData, description: e.target.value}))} rows = "5" className = 'p-4 resize-0 d-block w-100 outline-0 border rounded' placeholder = 'Enter product description...'></textarea>
                        </div>
                        <div className="col-md-12 mb-5">
                            <div className = 'bg-white border rounded'>{(
                                (formData?.images.length > 0)
                                ? (
                                    <div className = 'text-center bold letter-spacing-1 p-4 border-bottom'>
                                        {formData?.images.length} file{formData?.images.length > 1 ? 's' : ''} chosen
                                    </div>
                                )
                                : <></>
                            )}
                                <div className = 'overflow-x-auto flex-h a-i-c' style = {{height: '120px'}}>{(
                                    (formData?.images.length > 0)
                                    ? (
                                        Object.values(formData?.images).map(
                                            (each, key) => (
                                                <ParseImageFile key = {key} product_id = {productID} src = {each} /> 
                                            )
                                        )
                                    )
                                    : (
                                        <div style = {{height: '100%'}} className="w-100 flex-v a-i-c j-c-c">
                                            <p>
                                                <span className = 'bi bi-image fa-3x'></span>
                                            </p>
                                            <span>No image file choosen!</span>
                                        </div>
                                    )
                                )}</div>
                                <label tabIndex = '1' className="d-block text-center p-4 bg-light m-0 border-top cursor-pointer w-100">
                                    <span>Choose Images (*.jpg, *.png, *.gif)</span>
                                    <input accept = '.jpg, .png, .jpeg' multiple = {true} onChange = {(e) => (setIsUpdated(true), setFormData({...formData, images: e.target.files}))} type = "file" hidden />
                                </label>
                            </div>
                        </div>
                        <div className="col-md-12 my-5">
                            <button type="submit" className = {`p-4 d-block w-100 outline-0 border-0 theme-bg shadow text-white text-uppercase bold letter-spacing-1 rounded ${isUpdated ? '' : 'disabled'}`}>Update changes</button>
                        </div>
                    </div>
                </form>
            )
            : (
                (formData === undefined)
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

export async function getServerSideProps(context){
    const {resolvedUrl, req: {cookies}, query: {productID}} = context
    const cookie = cookies['OLLYMANN_FARMS_ADMIN'] || undefined

    if(!new RegExp('^/admin/edit-product', 'i').test(resolvedUrl)){
        return {
            notFound: true
        }
    }
    else if(!cookie){
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