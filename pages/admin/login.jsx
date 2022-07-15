import {useState, useContext} from 'react'
import {API_ROUTE} from '../../config'
import {notify} from '../../components/Popups'
import {GlobalContext} from '../../components/context/GlobalContext'

const Login = async (formData) => {
    const FORM = new FormData()

    for(let prop in formData){
        FORM.append(prop, formData[prop])
    }

    const req = await fetch(`${API_ROUTE.admin_login}`, {method: 'POST', body: FORM})
    return await req.json()
}

export default () => {
    const {globalStates: {cookieStore}} = useContext(GlobalContext)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    return (
        <div className="vh100 vw100 bg-white overflow-y-auto">
            <div className = 'px-3 py-5 flex-v a-i-c j-c-c' style = {{minHeight: '100%'}}>
                <div className = 'p-5 bg-light shadow rounded-2x' style = {{maxWidth: '500px', width: '100%'}}>
                    <div>
                        <img className = 'mx-auto' src="/assets/images/demos/demo-21/logo-name.png" width = '125' />
                    </div>
                    <div>
                        <h3 className = 'text-capitalize bold letter-spacing-1 mt-3 text-dark text-center'>admin login</h3>
                    </div>
                    <form onSubmit = {(e) => {
                        e.preventDefault()

                        Login(formData).then(({type, user_data: {id, f_name, profile_img, email}, data}) => {
                            notify({
                                message: data,
                                type: type === 'success' ? type : 'error',
                                callback: () => {
                                    setFormData({
                                        email: '',
                                        password: ''
                                    })
                                    cookieStore.set({
                                        name: 'OLLYMANN_FARMS_ADMIN',
                                        value: JSON.stringify({id, f_name, email, profile_img}),
                                        expires: (new Date().getTime() + (356 * 24 * 3600 * 1000)),
                                        path: '/' 
                                    })
                                    window.location = '/admin/home'
                                }
                            })
                        })
                    }} className = 'py-5'>
                        <div className = 'mb-4 pb-3'>
                            <p className = 'text-capitalize'>email address</p>
                            <input name = 'email' value = {formData.email} onChange = {(e) => setFormData({...formData, email: e.target.value})} type="email" className = 'p-4 border rounded-1x outline-0 d-block w-100' />
                        </div>
                        <div className = 'mb-4 pb-3'>
                            <p className = 'text-capitalize'>password</p>
                            <input name = 'password' value = {formData.password} onChange = {(e) => setFormData({...formData, password: e.target.value})} type="password" className = 'p-4 border rounded-1x outline-0 d-block w-100' />
                        </div>
                        <div className = 'mb-4 py-3'>
                            <button type="submit" className = 'py-4 px-5 text-uppercase bold letter-spacing-1 text-white shadow theme-bg border-0 rounded-1x outline-0'>
                                log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context){
    const {req: {cookies}} = context
    const cookie = cookies['OLLYMANN_FARMS_ADMIN'] || undefined

    if(cookie){
        return {
            redirect: {
                destination: '/admin/home'
            }
        }
    }

    return {
        props: {}
    }
}