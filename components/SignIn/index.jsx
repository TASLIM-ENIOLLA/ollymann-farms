import {useState} from 'react';

export const SignIn = ({onSubmit}) => {
    const [logginIn, setLoggingIn] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    
    return (
        <form action = '' method = 'post'  form-data = {JSON.stringify(formData)} onSubmit = {(e) => {
            e.preventDefault()
            setLoggingIn(true)
            onSubmit(e).then(e => setTimeout(() => setLoggingIn(false), 1000))
        }}>
            <div className = 'mb-4'>
                <p>Email address *</p>
                <input value = {formData.email} onChange = {(e) => {
                    setFormData({
                        ...formData,
                        email: e.target.value
                    })
                }} type="email" name="email" className = 'd-block w-100 p-4 border rounded' />
            </div>
            <div className = 'mb-4'>
                <p>Password *</p>
                <input value = {formData.password} onChange = {(e) => {
                    setFormData({
                        ...formData,
                        password: e.target.value
                    })
                }} type="password" name="password" className = 'd-block w-100 p-4 border rounded' />
            </div>
            <div className = 'py-5'>{(
                (logginIn)
                ? (
                    <button type = 'button' className = 'd-inline-block disabled transit px-5 py-3 outline-0 border-choco text-choco bg-clear rounded'>
                        <span className = 'fa fa-spin bi bi-arrow-clockwise fa-2x'></span>
                    </button>
                )
                : (
                    <input type="submit" value = 'LOG IN' className = 'd-inline-block px-5 py-4 border-choco text-choco bg-clear rounded' />
                )
            )}
            </div>
            <style>{`
                .border-choco{
                    border: 2px solid #c96;
                }
                .text-choco{
                    color: #c96;
                }
            `}</style>
        </form>
    )
}


export const Register = ({onSubmit}) => {
    const [logginIn, setLoggingIn] = useState(false)
    const [formData, setFormData] = useState({
        f_name: '',
        l_name: '',
        phone: '',
        email: '',
        password: '',
        c_password: ''
    })
    
    return (
        <form action = '' method = 'post' form-data = {JSON.stringify(formData)} onSubmit = {(e) => {
            e.preventDefault()
            setLoggingIn(true)
            onSubmit(e).then(e => setTimeout(() => setLoggingIn(false), 1000))
        }}>
            <div className = 'mb-4'>
                <p>First Name *</p>
                <input value = {formData.f_name} onChange = {(e) => {
                    setFormData({
                        ...formData,
                        f_name: e.target.value
                    })
                }} name = "f_name" type="text" className = 'd-block w-100 p-4 border rounded' />
            </div>
            <div className = 'mb-4'>
                <p>Last Name *</p>
                <input value = {formData.l_name} onChange = {(e) => {
                    setFormData({
                        ...formData,
                        l_name: e.target.value
                    })
                }} name = "l_name" type="text" className = 'd-block w-100 p-4 border rounded' />
            </div>
            <div className = 'mb-4'>
                <p>Phone Number *</p>
                <input value = {formData.phone} onChange = {(e) => {
                    setFormData({
                        ...formData,
                        phone: e.target.value
                    })
                }} name = "phone" type="phone" className = 'd-block w-100 p-4 border rounded' />
            </div>
            <div className = 'mb-4'>
                <p>Email address *</p>
                <input value = {formData.email} onChange = {(e) => {
                    setFormData({
                        ...formData,
                        email: e.target.value
                    })
                }} name = "email" type="email" className = 'd-block w-100 p-4 border rounded' />
            </div>
            <div className = 'mb-4'>
                <p>Password *</p>
                <input value = {formData.password} onChange = {(e) => {
                    setFormData({
                        ...formData,
                        password: e.target.value
                    })
                }} name = "password" type="password" className = 'd-block w-100 p-4 border rounded' />
            </div>
            <div className = 'mb-4'>
                <p>Confirm Password *</p>
                <input value = {formData.c_password} onChange = {(e) => {
                    setFormData({
                        ...formData,
                        c_password: e.target.value
                    })
                }} name = "password" type="password" className = 'd-block w-100 p-4 border rounded' />
            </div>
            <div className = 'py-5'>{(
                (logginIn)
                ? (
                    <button type = 'button' className = 'd-inline-block disabled transit px-5 py-3 outline-0 border-choco text-choco bg-clear rounded'>
                        <span className = 'fa fa-spin bi bi-arrow-clockwise fa-2x'></span>
                    </button>
                )
                : (
                    <input type="submit" value = 'REGISTER' className = 'd-inline-block px-5 py-4 border-choco text-choco bg-clear rounded' />
                )
            )}
            </div>
            <style>{`
                .border-choco{
                    border: 2px solid #c96;
                }
                .text-choco{
                    color: #c96;
                }
            `}</style>
        </form>
    )
}