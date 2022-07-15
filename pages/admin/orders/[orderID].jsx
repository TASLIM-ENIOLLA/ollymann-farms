import AdminPageTemplate from '../../../components/Admin/Page/AdminPageTemplate'

export default () => {
    return (
        <AdminPageTemplate title = 'Order Data'>

        </AdminPageTemplate>
    )
}

export async function getServerSideProps(context){
    const {req: {cookies}, query: {orderID}} = context
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
            orderID,
            adminData: cookie ? JSON.parse(cookie) : null,
            isLoggedIn: cookie && JSON.parse(cookie).id ? true : false,
        }
    }
}