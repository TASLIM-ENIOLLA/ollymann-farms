import {useState} from 'react'
import {API_ROUTE} from '../../config'
import {notify} from '../../components/Popups'

export default () => {
    const [email, setEmail] = useState('')
    const [submiting, setSubmiting] = useState(false)

    return (
        <section style = {{minHeight: '0', backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url(/assets/images/backgrounds/1.jpg)`}} className = 'py-5'>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center py-5">
                        <p className = 'pb-3'>
                            <span className = 'bi text-white bi-envelope-paper fa-2x'></span>
                        </p>
                        <div className = 'h1 bold text-white text-uppercase letter-spacing-1'>subscribe to our newsLetter</div>
                        <div className = 'text-white mb-5 fo-s-15'>Learn about new offers and get more deals by joining our newsletter</div>
                        <div className = 'col-md-6 col-sm-9 col-lg-7 mx-auto'>
                            <form onSubmit = {(e) => {
                                e.preventDefault()

                                if(email.length < 1){
                                    notify({
                                        type: 'danger',
                                        message: 'Email address cannot be empty!'
                                    })
                                }
                                else{
                                    setSubmiting(true)
                                    NewsLetterSubscription(email).then(({type, data}) => notify({
                                        type: type === 'success' ? type : 'danger',
                                        message: data,
                                        callback: () => type === 'success' ? (setEmail(''), setSubmiting(false)) : undefined
                                    }))
                                }
                            }} className = 'flex-h rounded overflow-0 bg-white'>
                                <input value = {email} onChange = {(e) => setEmail(e.target.value)} type="email" className = 'p-3 bg-clear border-0 outline-0 flex-1' />
                                <button type="submit" className = {`${submiting ? 'disabled' : ''} px-4 py-3 text-white border-0 outline-0 bg-warning`}>{
                                    (submiting)
                                    ? <span className="fa bi-arrow-clockwise px-4 fa-spin"></span>
                                    : 'SUBSCRIBE'
                                }</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
const NewsLetterSubscription = (email) => new Promise((res) => {
    const formData = new FormData()
    formData.append('email', email)

    fetch(API_ROUTE.newsletter, {method: 'POST', body: formData})
    .then(e => e.json())
    .then(e => res(e))    
})