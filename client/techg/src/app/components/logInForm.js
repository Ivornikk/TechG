'use client'
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import Link from "next/link";
import { StoreContext } from "../store/StoreProvider";
import { logIn } from "../http/UserAPI";
import { redirect } from "next/navigation";


const LogInForm = observer(() => {
    const {user} = useContext(StoreContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        setEmail('')
        setPassword('')
        try {
            await logIn(email, password)
            user.setUser(user)
            user.setIsAuth(true)
            redirect('/')
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <div>
            <form className="flex flex-col gap-5 mx-50"
                onSubmit={e => e.preventDefault()}>
                <input className="py-1 border border-brand" 
                    value={email}
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}/>
                <input type="password" 
                    value={password}
                    className="py-1 border border-brand font-sans" 
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)} />
                <button className="mt-5 text-center justify-self-end bg-brand border border-brand text-white rounded-xl w-full py-4 text-xl hover:bg-categories hover:text-brand cursor-pointer transition"
                    onClick={handleLogin}>
                    Log in
                </button>
            </form>
            <p className="py-3 mx-5">
                Don't have an account? <Link href={'/sign-up'} className="text-button-active hover:underline">Sign up</Link>
            </p>
        </div>
    )
})

export default LogInForm

