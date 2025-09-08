'use client'

import { fetchAllUsers } from "@/app/http/UserAPI"
import { StoreContext } from "@/app/store/StoreProvider"
import { DownArrow, UpArrow } from "@/app/utils/symbols"
import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import dayjs from "dayjs"
import { redirect } from "next/navigation"

const Clients = observer(() => {
    const { user } = useContext(StoreContext)
    const [role, setRole] = useState('all')
    const [sort, setSort] = useState(['createdAt', 'ASC'])

    useEffect(() => {
        fetchAllUsers({role, sort})
        .then(data => {
            user.setUsers(data.rows)
            user.setUsersCount(data.count)
        })
    }, [role, sort])

    return (
        <div className="m-auto flex flex-col gap-10">
            <div className="bg-categories shadow-xl p-10 flex gap-10">
                <button className="text-xl hover:underline flex cursor-pointer"
                    onClick={() => {
                        setSort(sort[1] == 'ASC' ? ['createdAt', 'DESC'] : ['createdAt', 'ASC'])
                    }}>
                    Date {sort[1] == 'ASC' ? <UpArrow /> : <DownArrow />}
                </button>
                <select onChange={e => setRole(e.target.value)}
                        className="cursor-pointer border border-brand rounded">
                    <option value={'all'}>
                        All
                    </option>
                    <option value={'ADMIN'}>
                        Admins
                    </option>
                    <option value={'USER'}>
                        Users
                    </option>
                </select>
            </div>
            <div className=" text-[2em] text-center">
                {user.usersCount} Results
            </div>
            <div className="bg-categories shadow-xl p-10 ">
                <ul className="flex flex-col gap-5">
                    { 
                        user.users.map(user => {
                            return (
                                <li key={user.id}
                                    className="p-5 text-xl border border-stroke grid grid-rows-3 grid-flow-col-dense">
                                    <div>Username: {user.username}</div>
                                    <div>Email: {user.email}</div>
                                    <div>Date of creation: {dayjs(user.createdAt).format("DD.MM.YYYY HH:mm")}</div>
                                    <div>Role: {user.role}</div>
                                    <div>Phone number: {user.phoneNumber}</div>
                                    <div>Country: {user.country}</div>
                                    <div className="row-span-3 flex flex-col justify-evenly">
                                        <button className="my-3 px-4 py-1 bg-brand text-white border border-brand rounded-xl cursor-pointer hover:text-brand hover:bg-white transition"
                                            onClick={() => redirect(`/admin/clients/${user.id}`)}>
                                            User Details
                                        </button>
                                        <button className="my-3 px-4 py-1 bg-brand text-white border border-brand rounded-xl cursor-pointer hover:text-brand hover:bg-white transition">
                                            Delete User
                                        </button>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
})

export default Clients