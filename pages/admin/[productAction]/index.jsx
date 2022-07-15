import AdminPageTemplate from '../../../components/Admin/Page/AdminPageTemplate'
import {API_ROUTE} from '../../../config'
import {useState} from 'react'
import currency from '../../../components/currency'
import {notify} from '../../../components/Popups'

const NumberInput = ({...props}) => {
    return (
        <input {...props} type = 'text' onKeyPress = {e => isNaN(Number(e.key)) || (e.target.value.replace(/\,/g, '').length >= 11) ? e.preventDefault() : true} />
    )
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

export default () => {
    const [formData, setFormData] = useState({
        name: '',
        quantity: 0,
        category: '',
        measure: '',
        price: 0,
        description: '',
        images: []
    })

    return (
        <AdminPageTemplate >
            <form onSubmit = {(e) => {
                e.preventDefault()

                AddProduct(formData).then(
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
                                }
                            }
                        })
                    }
                )
            }} className="d-block w-100">
                <div className="row">
                    <div className="col-md-6 mb-5">
                        <p className = 'text-capitalize mb-2'>Product name *</p>
                        <input value = {CapFirstLetter(formData.name)} onChange = {(e) => setFormData({...formData, name: e.target.value})} type="text" className = 'p-4 d-block w-100 outline-0 border rounded' />
                    </div>
                    <div className="col-md-6 mb-5">
                            <p className = 'text-capitalize mb-2'>Product measure *</p>
                            <select value = {formData.measure} onChange = {(e) => setFormData({...formData, measure: e.target.value})} className = 'p-4 d-block text-capitalize w-100 outline-0 border rounded'>
                                <option className = 'text-capitalize' value="">--- Select measure ---</option>
                                <option className = 'text-capitalize' value="bowl">bowl</option>
                                <option className = 'text-capitalize' value="basket">basket</option>
                                <option className = 'text-capitalize' value="bundle">bundle</option>
                                <option className = 'text-capitalize' value="sack">sack</option>
                            </select>
                        </div>
                    <div className="col-md-6 mb-5">
                        <p className = 'text-capitalize mb-2'>Product category *</p>
                        <select value = {formData.category} onChange = {(e) => setFormData({...formData, category: e.target.value})} className = 'p-4 d-block text-capitalize w-100 outline-0 border rounded'>
                            <option className = 'text-capitalize' value="">--- Select category ---</option>
                            <option className = 'text-capitalize' value="veges">veges</option>
                            <option className = 'text-capitalize' value="fruits">fruits</option>
                        </select>
                    </div>
                    <div className="col-md-6 mb-5">
                        <p className = 'text-capitalize mb-2'>Product quantity *</p>
                        <NumberInput value = {new Intl.NumberFormat().format(formData.quantity)} onChange = {(e) => setFormData({...formData, quantity: e.target.value.replace(/\,/g, '')})} className = 'p-4 d-block w-100 outline-0 border rounded' />
                    </div>
                    <div className="col-md-12 mb-5">
                        <p className = 'text-capitalize mb-2'>Product price ({currency}) *</p>
                        <NumberInput value = {new Intl.NumberFormat().format(formData.price)} onChange = {(e) => setFormData({...formData, price: e.target.value.replace(/\,/g, '')})} className = 'p-4 d-block w-100 outline-0 border rounded' />
                    </div>
                    <div className="col-md-12 mb-5">
                        <p className = 'text-capitalize mb-2'>Product description *</p>
                        <textarea value = {CapFirstLetter(formData.description)} onChange = {(e) => setFormData({...formData, description: e.target.value})} rows = "5" className = 'p-4 resize-0 d-block w-100 outline-0 border rounded' placeholder = 'Enter product description...'></textarea>
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
                                            <ParseImageFile key = {key} src = {each} /> 
                                        )
                                    )
                                )
                                : (
                                    <div style = {{height: '100%'}} className="flex-v w-100 a-i-c j-c-c">
                                        <p>
                                            <span className = 'bi bi-image fa-3x'></span>
                                        </p>
                                        <span>No image file choosen!</span>
                                    </div>
                                )
                            )}</div>
                            <label tabIndex = '1' className="d-block text-center p-4 bg-light m-0 border-top cursor-pointer w-100">
                                <span>Choose Images (*.jpg, *.png, *.gif)</span>
                                <input accept = '.jpg, .png, .jpeg' multiple = {true} onChange = {(e) => setFormData({...formData, images: e.target.files})} type = "file" hidden />
                            </label>
                        </div>
                    </div>
                    <div className="col-md-12 my-5">
                        <button type="submit" className = 'p-4 d-block w-100 outline-0 border-0 theme-bg shadow text-white text-uppercase bold letter-spacing-1 rounded'>Add product</button>
                    </div>
                </div>
            </form>
        </AdminPageTemplate>
    )
}

const AddProduct = async (formData) => {
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

    const req = await fetch(`${API_ROUTE.admin_add_product}`, {method: 'POST', body: FORM})
    return await req.json()
}

export async function getServerSideProps(context){
    const {resolvedUrl, req: {cookies}} = context
    const cookie = cookies['OLLYMANN_FARMS_ADMIN'] || undefined

    const paths = ['/admin/add-product', '/admin/edit-product/[productID]']

    if(!paths.includes(resolvedUrl)){
        return {notFound: true}
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
            adminData: cookie ? JSON.parse(cookie) : null,
            isLoggedIn: cookie && JSON.parse(cookie).id ? true : false,
        }
    }
}