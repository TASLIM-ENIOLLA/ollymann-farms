import {useState} from 'react';

export const SignIn = ({onSubmit}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    
    return (
        <form action = '' method = 'post' onSubmit = {(e) => e.preventDefault() && onSubmit()}>
            <div className = 'mb-4'>
                <p>Email address *</p>
                <input value = {formData.email} onChange = {(e) => {
                    setFormData({
                        ...formData,
                        email: e.target.value
                    })
                }} type="email" className = 'd-block w-100 p-4 border rounded' />
            </div>
            <div className = 'mb-4'>
                <p>Password *</p>
                <input value = {formData.password} onChange = {(e) => {
                    setFormData({
                        ...formData,
                        password: e.target.value
                    })
                }} type="password" className = 'd-block w-100 p-4 border rounded' />
            </div>
            <div className = 'py-5'>
                <input type="submit" value = 'LOG IN' className = 'd-inline-block px-5 py-4 border-choco text-choco bg-clear rounded' />
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
    const [formData, setFormData] = useState({
        f_name: '',
        l_name: '',
        phone: '',
        email: '',
        password: '',
        c_password: ''
    })
    
    return (
        <form action = '' method = 'post' onSubmit = {(e) => e.preventDefault() && onSubmit()}>
            <div className = 'mb-4'>
                <p>First Name *</p>
                <input value = {formData.f_name} onChange = {(e) => {
                    setFormData({
                        ...formData,
                        f_name: e.target.value
                    })
                }} type="text" className = 'd-block w-100 p-4 border rounded' />
            </div>
            <div className = 'mb-4'>
                <p>Last Name *</p>
                <input value = {formData.l_name} onChange = {(e) => {
                    setFormData({
                        ...formData,
                        l_name: e.target.value
                    })
                }} type="text" className = 'd-block w-100 p-4 border rounded' />
            </div>
            <div className = 'mb-4'>
                <p>Phone Number *</p>
                <input value = {formData.phone} onChange = {(e) => {
                    setFormData({
                        ...formData,
                        phone: e.target.value
                    })
                }} type="phone" className = 'd-block w-100 p-4 border rounded' />
            </div>
            <div className = 'mb-4'>
                <p>Email address *</p>
                <input value = {formData.email} onChange = {(e) => {
                    setFormData({
                        ...formData,
                        email: e.target.value
                    })
                }} type="email" className = 'd-block w-100 p-4 border rounded' />
            </div>
            <div className = 'mb-4'>
                <p>Password *</p>
                <input value = {formData.password} onChange = {(e) => {
                    setFormData({
                        ...formData,
                        password: e.target.value
                    })
                }} type="password" className = 'd-block w-100 p-4 border rounded' />
            </div>
            <div className = 'mb-4'>
                <p>Confirm Password *</p>
                <input value = {formData.password} onChange = {(e) => {
                    setFormData({
                        ...formData,
                        c_password: e.target.value
                    })
                }} type="password" className = 'd-block w-100 p-4 border rounded' />
            </div>
            <div className = 'py-5'>
                <input type="submit" value = 'REGISTER' className = 'd-inline-block px-5 py-4 border-choco text-choco bg-clear rounded' />
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