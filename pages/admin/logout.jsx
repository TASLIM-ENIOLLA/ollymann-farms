import AdminPageTemplate from '../../components/Admin/Page/AdminPageTemplate'
import {useRouter} from 'next/router'
import {GlobalContext} from '../../components/context/GlobalContext'
import {useContext} from 'react'

export default () => {
    const {globalStates: {cookieStore}} = useContext(GlobalContext)
    const {back} = useRouter()

    return (
        <AdminPageTemplate>
            <div className = "pt-4 px-3 animated-fast slideInDown">
                <div style = {{
                    maxWidth: "500px"
                }} className = "shadow bg-white mx-auto py-5 px-3 rounded-2x">
                    <div className = "text-c py-4 half-bold text-secondary">
                        Are you sure you really want to logout?
                    </div>
                    <div className = "flex-h j-c-space-evenly a-i-c p-3">
                        <button className = "border-0 outline-0 px-4 rounded py-3 bg-danger half-bold text-white text-capitalize mx-3" onClick = {
                            (e) => (
                                cookieStore.set({
                                    name: 'OLLYMANN_FARMS_ADMIN',
                                    value: null,
                                    expires: 'Thu, 01 Jan 1970 00:00:00 UTC',
                                    path: '/' 
                                }).then(e => window.location = '/admin/login')
                            )
                        }>logout</button>
                        <button className = "theme-border outline-0 px-4 rounded py-3 bg-clear half-bold theme-color text-capitalize mx-3" onClick = {(e) => back()}>cancel</button>
                    </div>
                </div>
            </div>
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