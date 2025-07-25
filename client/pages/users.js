import Link from "next/link"

const Users = ({users}) => {

    return (
        <div>
            <h1>Users Page</h1>
            <ul>
                {users.map(user => 
                    <p><Link href={`/users/${user.id}`}>
                        {user.name}
                    </Link></p>
                )}
            </ul>
        </div>
    )
}

export default Users

export async function getStaticProps(context) {

    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await response.json()

    return {
        props: {users}
    }
}