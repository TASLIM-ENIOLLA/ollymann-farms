import AdminPageTemplate from '../../../components/Admin/Page/AdminPageTemplate'
import {API_ROUTE} from '../../../config'
import {useState, useEffect} from 'react'
import {notify} from '../../../components/Popups'

const ParseImageFile = ({src}) => {
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
                backgroundImage: `url(${imageSrc})`
            }}></div>
        </div>
    )
}

const CreateNewPost = async (formData) => {
    const __formData__ = new FormData()

    for(let prop in formData){
        prop === 'tags' ? formData[prop] = JSON.stringify(formData[prop]) : undefined

        prop === 'images'
        ? formData[prop].forEach(each => __formData__.append(`${prop}[]`, each))
        : __formData__.append(prop, formData[prop])
    }

    return fetch(`${API_ROUTE.admin_create_new_post}`, {method: 'POST', body: __formData__}).then(e => e.json())
}

export default () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        images: [],
        tags: []
    })

    const PostTagCreator = ({value, onChange = () => true}) => {
        // const [tags, setTags] = useState(value || [])
        const [tagName, setTagName] = useState('')
    
        // useEffect(() => onChange(tags), [tags])
        
        return (
            <>
                <p className = 'text-capitalize mb-2'>Post tags *</p>
                <div className = 'bg-white rounded-1x border overflow-0'>
                    <div style = {{height: '150px'}} className = ' p-4 overflow-y-auto'>{
                        formData.tags.map((tag, key) => (
                            <div key = {key} title = {`Remove '${tag}'`} style = {{cursor: 'not-allowed'}} onClick = {() => setFormData({...formData, tags: formData.tags.filter(each => tag !== each)})} className = 'bg-light shadow-sm rounded-1x border p-3 d-inline-block mb-3 mr-3'>
                                {tag}
                            </div>
                        ))
                    }</div>
                    <div className = 'border-top p-3 bg-light'>
                        <div className="row a-i-c">
                            <div className="col">
                                <input value = {tagName} onChange = {(e) => setTagName(e.target.value)} placeholder = 'Enter tag name' type="text" className = 'rounded p-3 d-block w-100 border' />
                            </div>
                            <div className="col-auto">
                                <button type = 'button' onClick = {() => (
                                    (tagName.length > 0 && !formData.tags.includes(tagName))
                                    ? (setFormData({...formData, tags: [...formData.tags, tagName]}), setTagName(''))
                                    : undefined
                                )} className = 'theme-bg p-3 border-0 rounded shadow text-white bold letter-spacing-1 text-capitalize'>add tag</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }


    return (
        <AdminPageTemplate title = 'create new post'>
            <form onSubmit = {(e) => (e.preventDefault(), CreateNewPost(formData).then(({type, data, ...rest}) => notify({message: data, type: type !== 'success' ? 'danger' : type, callback: () => (
                (type === 'success')
                ? setFormData({title: '', content: '', images: [], tags: []})
                : undefined
            )})))} className="row">
                <div className="mx-auto col-lg-7 mb-5">
                    <p className = 'text-capitalize mb-2'>Post title *</p>
                    <input value = {formData.title} onChange = {(e) => setFormData({...formData, title: e.target.value})} type="text" className = 'rounded-1x p-4 d-block w-100 outline-0 border' />
                </div>
                <div className="mx-auto col-lg-7 mb-5">
                    <p className = 'text-capitalize mb-2'>Post content *</p>
                    <textarea value = {formData.content} onChange = {(e) => setFormData({...formData, content: e.target.value})} className = 'rounded-1x p-4 d-block w-100 outline-0 border resize-0' rows = '7'></textarea>
                </div>
                <div className="mx-auto col-lg-7 mb-5">
                    <PostTagCreator value = {formData.tags} onChange ={(tags) => setFormData({...formData, tags})} />
                </div>
                <div className="col-lg-7 mx-auto mb-5">
                    <div className = 'bg-white border rounded'>{(
                        (formData.images.length > 0)
                        ? (
                            <div className = 'text-center bold letter-spacing-1 p-4 border-bottom'>
                                {formData.images.length} file{formData.images.length > 1 ? 's' : ''} chosen
                            </div>
                        )
                        : <></>
                    )}
                        <div className = 'overflow-x-auto flex-h a-i-c' style = {{height: '150px'}}>{(
                            (formData.images.length > 0)
                            ? (
                                formData.images.map(
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
                            <input accept = '.jpg, .png, .jpeg' multiple = {true} onChange = {(e) => setFormData({...formData, images: Object.values(e.target.files)})} type = "file" hidden />
                        </label>
                    </div>
                </div>
                <div className="mx-auto col-lg-7 mb-5">
                    <button type = 'submit' className = 'theme-bg py-4 border-0 rounded-1x shadow text-white bold letter-spacing-1 text-uppercase px-5'>create post</button>
                </div>
            </form>
        </AdminPageTemplate>
    )
}

export async function getServerSideProps(context){
    const {req: {cookies}} = context
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
            adminData: cookie ? JSON.parse(cookie) : null,
            isLoggedIn: cookie && JSON.parse(cookie).id ? true : false,
        }
    }
}