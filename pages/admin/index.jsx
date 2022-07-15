export default () => {
    return <></>
}

export const getServerSideProps = (context) => {
    const {req: {cookies}} = context
    const cookie = cookies['OLLYMANN_FARMS_ADMIN'] || false

    if(!cookie){
        return {
            redirect: {
                destination: '/admin/login'
            }
        }
    }
    else{
        return {
            redirect: {
                destination: '/admin/home'
            }
        }
    }
}