'use client'
import { editUser } from "@/app/http/UserAPI"
import { StoreContext } from "@/app/store/StoreProvider"
import { observer } from "mobx-react-lite"
import Link from "next/link"
import { useContext, useState } from "react"

const EditUser = observer(() => {
    const { user } = useContext(StoreContext)
    const userId = user.user.id
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [usernameEditing, setUsernameEditing] = useState(false)
    const [emailEditing, setEmailEditing] = useState(false)
    const [passwordEditing, setPasswordEditing] = useState(false)

    const saveChanges = () => {
        if (newPassword != '') {
            if (newPassword != confirmPassword) {
                alert('Passwords do not match')
                return
            }
        }
        try {
            editUser({
                id: userId, email, username, oldPassword, newPassword
            })
            .then(data => {
                const result = user.user
                result.username = data.username
                result.email = data.email
                user.setUser(result)
            })
            .finally(() => {
                setUsernameEditing(false)
                setEmailEditing(false)
                setPasswordEditing(false)
            })
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <div className="bg-categories shadow-xl px-10 py-3 md:max-w-[65vw] m-auto flex flex-col md:my-30 my-12">
            <h1 className="text-[1.5em] mb-5 flex gap-3">
                <Link className="cursor-pointer"
                    href={'/account/settings'}>
                    {'<'}
                </Link>
                Edit Account
            </h1>
            <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2 flex flex-col gap-5">
                    <hr className="w-full border-stroke m-auto"></hr>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col gap-5 w-full">
                            { usernameEditing ?
                                <form onSubmit={e => e.preventDefault()}
                                    className="flex md:flex-row flex-col items-center justify-between">
                                    <input placeholder="New username"
                                        onChange={e => setUsername(e.target.value)}
                                        className="md:py-1 py-2 my-2 md:m-0 border border-brand rounded text-center" />
                                    <div className="flex gap-3">
                                        <button className="px-4 py-2 cursor-pointer rounded-xl bg-brand text-white border border-brand hover:bg-white hover:text-brand transition"
                                            onClick={saveChanges}>
                                            Save
                                        </button>
                                        <button className="px-4 py-2 cursor-pointer rounded-xl bg-brand text-white border border-brand hover:bg-white hover:text-brand transition"
                                            onClick={() => setUsernameEditing(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                                :
                                <div className="flex flex-col gap-2 w-full">
                                    <p className="text-gray-text">
                                        Username
                                    </p>
                                    <div className="flex justify-between">
                                        <h3>
                                            {user.user.username}
                                        </h3>
                                    <button className="px-4 py-2 cursor-pointer rounded-xl bg-brand text-white border border-brand hover:bg-white hover:text-brand transition"
                                        onClick={() => setUsernameEditing(true)}>
                                        Edit
                                    </button>
                                    </div>
                                </div>
                            }
                            { emailEditing ?
                                <form onSubmit={e => e.preventDefault()}
                                    className="flex md:flex-row flex-col items-center justify-between">
                                    <input placeholder="New email"
                                        onChange={e => setEmail(e.target.value)}
                                        className="md:py-1 py-2 my-2 md:m-0 border border-brand rounded text-center" />
                                    <div className="flex gap-3">
                                        <button className="px-4 py-2 cursor-pointer rounded-xl bg-brand text-white border border-brand hover:bg-white hover:text-brand transition"
                                            onClick={saveChanges}>
                                            Save
                                        </button>
                                        <button className="px-4 py-2 cursor-pointer rounded-xl bg-brand text-white border border-brand hover:bg-white hover:text-brand transition"
                                            onClick={() => setEmailEditing(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                                :
                                <div className="flex flex-col gap-2 w-full">
                                    <p className="text-gray-text">
                                        Email
                                    </p>
                                    <div className="flex justify-between">
                                        <h3>
                                            {user.user.email}
                                        </h3>
                                    <button className="px-4 py-2 cursor-pointer rounded-xl bg-brand text-white border border-brand hover:bg-white hover:text-brand transition"
                                        onClick={() => setEmailEditing(true)}>
                                        Edit
                                    </button>
                                    </div>
                                </div>
                            }
                            { passwordEditing ?
                                <form onSubmit={e => e.preventDefault()}
                                    className="flex md:flex-row flex-col items-center justify-between">
                                        <input placeholder="Old Password"
                                            onChange={e => setOldPassword(e.target.value)}
                                            type="password"
                                            className="md:py-1 py-2 my-2 md:m-0 border font-sans border-brand rounded text-center" />
                                        <input placeholder="New Password"
                                            onChange={e => setNewPassword(e.target.value)}
                                            type="password"
                                            className="md:py-1 py-2 my-2 md:m-0 border font-sans border-brand rounded text-center" />
                                        <input placeholder="Repeat New Password"
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            type="password"
                                            className="md:py-1 py-2 my-2 md:m-0 border font-sans border-brand rounded text-center" />
                                    <div className="flex gap-3">
                                        <button className="px-4 py-2 cursor-pointer rounded-xl bg-brand text-white border border-brand hover:bg-white hover:text-brand transition"
                                            onClick={saveChanges}>
                                            Save
                                        </button>
                                        <button className="px-4 py-2 cursor-pointer rounded-xl bg-brand text-white border border-brand hover:bg-white hover:text-brand transition"
                                            onClick={() => setPasswordEditing(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                                :
                                <div className="flex flex-col gap-2 w-full">
                                    <p className="text-gray-text">
                                        Password
                                    </p>
                                    <div className="flex justify-between">
                                        <h3>
                                            *********
                                        </h3>
                                    <button className="px-4 py-2 cursor-pointer rounded-xl bg-brand text-white border border-brand hover:bg-white hover:text-brand transition"
                                        onClick={() => setPasswordEditing(true)}>
                                        Edit
                                    </button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <hr className="w-full border-stroke m-auto"></hr>
                </div>
            </div> 
        </div>
    )
})

export default EditUser