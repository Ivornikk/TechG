import {useRouter} from 'next/router'

const user = () => {

    const router = useRouter()
    console.log(router.query.id)

    return (
        <div>
            <h1>user Page</h1>

        </div>

    )
}

export default user