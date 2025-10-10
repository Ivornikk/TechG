'use client'

import { fetchOneUser } from "@/app/http/UserAPI"
import Link from "next/link"
import { useParams } from "next/navigation"

const UserDetail = () => {
    const { id } = useParams()

    const user = fetchOneUser(id)
    .then(data => console.log(data))

    return (
        <div className="md:m-30 md:mt-5">
            <div className="flex">
                <Link href={'/admin/clients'}>
                    {'<'}
                </Link>
                <h1></h1>
            </div>
        </div>
    )
}

export default UserDetail