import AdminDash from '../../components/Page/AdminDash'
import {useRouter} from 'next/router'
import {useState} from 'react'
import currency from '../../components/currency'
import {server} from '../../config'

const NumberInput = ({...props}) => {
    return (
        <input {...props} type = 'number' onKeyPress = {e => isNaN(Number(e.key)) ? e.preventDefault() : true} />
    )
}

export default () => {
    const {route} = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        gender: undefined,
        category: '',
        price: '',
        description: '',
        images: undefined
    })

    return (
        <AdminDash title = {route.match(/\w+\-?\w+$/)[0].replace('-', ' ')}>
            <div className="">
                <form onSubmit = {async (e) => {
                    e.preventDefault()

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

                    const req = await fetch(`${server.backend.url}php/processes/admin/add-product.php`, {method: 'POST', body: FORM})
                    const {type, data} = await req.json()

                    if(type === 'success'){
                        setFormData({
                            name: '',
                            quantity: '',
                            category: '',
                            price: '',
                            gender: undefined,
                            description: '',
                            images: null
                        })
                    }

                    console.log(type, data)
                }} method = 'POST' encType = 'multipart/form-data' className="row">
                    <div className="col-sm-12 mb-4">
                        <p className="mb-2 text-dark">Name *</p>
                        <input value = {formData.name} onChange = {e => setFormData({...formData, name: e.target.value})} type="text" className = 'd-block w-100 p-4 border rounded' />
                    </div>
                    <div className="col-lg-6 col-sm-12 mb-4">
                        <p className="mb-2 text-dark">Quantity *</p>
                        <NumberInput value = {formData.quantity} onChange = {e => setFormData({...formData, quantity: e.target.value})} className = 'd-block w-100 p-4 border rounded' />
                    </div>
                    <div className="col-lg-6 col-sm-12 mb-4">
                        <p className="mb-2 text-dark">Sex *</p>
                        <select value = {formData.gender} onChange = {e => setFormData({...formData, gender: e.target.value})} className = 'd-block text-capitalize w-100 p-4 border rounded'>
                            <option className = 'text-capitalize' value="">--- select gender ---</option>
                            <option className = 'text-capitalize' value="unisex">unisex</option>
                            <option className = 'text-capitalize' value="male">male</option>
                            <option className = 'text-capitalize' value="female">female</option>
                        </select>
                    </div>
                    <div className="col-lg-6 col-sm-12 mb-4">
                        <p className="mb-2 text-dark">Category *</p>
                        <select value = {formData.category} onChange = {e => setFormData({...formData, category: e.target.value})} className = 'd-block text-capitalize w-100 p-4 border rounded'>
                            <option className = 'text-capitalize' value="">--- Select category ---</option>
                            <option className = 'text-capitalize' value="shoes">shoes</option>
                            <option className = 'text-capitalize' value="clothes">clothes</option>
                            <option className = 'text-capitalize' value="bags">bags</option>
                            <option className = 'text-capitalize' value="accessories">accessories</option>
                        </select>
                    </div>
                    <div className="col-lg-6 col-sm-12 mb-4">
                        <p className="mb-2 text-dark">Price ({currency}) *</p>
                        <NumberInput value = {formData.price} onChange = {e => setFormData({...formData, price: e.target.value})} className = 'd-block w-100 p-4 border rounded' />
                    </div>
                    <div className="col-sm-12 mb-4">
                        <p className="mb-2 text-dark">Description *</p>
                        <textarea value = {formData.description} onChange = {e => setFormData({...formData, description: e.target.value})} className = 'd-block w-100 p-4 border rounded resize-0' rows = '5'></textarea>
                    </div>
                    <div className="col-sm-12 mb-4">
                        <p className="mb-2 text-dark">Image *</p>
                        <div className = 'text-center border rounded bg-white'>
                            <div className = 'p-5 my-5'>
                                <span className = 'bi bi-images fa-4x text-muted'></span>
                            </div>
                            <label tabIndex = '0' htmlFor="images" className = 'cursor-pointer d-block w-100 m-0'>
                                <div className = 'p-4 border-top flicker bg-light text-capitalize'>
                                    click to select images
                                </div>
                                <input onChange = {e => setFormData({...formData, images: e.target.files})} type="file" id = 'images' multiple = {true} accept = '.jpg, .png, .jpeg' hidden = {true} className = 'p-4 border rounded' />
                            </label>
                        </div>
                    </div>
                    <div className="col-sm-12 mt-5">
                        <button className = 'd-block text-capitalize shadow w-100 p-4 theme-bg text-light letter-spacing-1 bold border-0 rounded text-center'>add product</button>
                    </div>
                </form>
            </div>
        </AdminDash>
    )
}