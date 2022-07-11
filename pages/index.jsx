export default () => {
    return (
        <>
        </>
    )
}

export const getServerSideProps = () => {
    return {
        redirect: {
            destination: '/home'
        }
    }
}