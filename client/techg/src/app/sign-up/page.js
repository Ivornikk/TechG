'use client'
import Link from "next/link"
import { useContext, useState } from "react"
import { signUp } from "../http/UserAPI"
import { StoreContext } from "../store/StoreProvider"
import { redirect } from "next/navigation"

const SignUp = () => {
    const {user} = useContext(StoreContext)

    const [username, setUsername] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [country, setCountry] = useState('N/A')
    const [currency, setCurrency] = useState('USD')
    const [language, setLanguage] = useState('ENG')
    const [role, setRole] = useState('ADMIN')
    const [avatar, setAvatar] = useState(null)

    const handleSignIn = async () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        try {
            await signUp({
                username,
                phoneNumber,
                email,
                password,
                country,
                currency,
                language,
                role,
                avatar
            })
            user.setUser(user)
            user.setIsAuth(true)
            redirect('/')
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <div className="my-20 m-auto bg-categories shadow-xl md:w-200 pt-10">
            <h2 className="text-[1.5em] text-center mb-5">Sign Up</h2>
            <form className="flex flex-col gap-5 m-10 md:mx-50"
                onSubmit={e => e.preventDefault()}>
                <input className="py-1 border border-brand" 
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)}/>
                <input className="py-1 border border-brand" 
                    placeholder="Email" 
                    onChange={e => setEmail(e.target.value)}/>
                <input className="py-1 border border-brand" 
                    placeholder="Phone number" 
                    onChange={e => setPhoneNumber(e.target.value)}/>
                <input type="password" 
                    className="py-1 border border-brand font-sans" 
                    placeholder="Password" 
                    onChange={e => setPassword(e.target.value)}/>
                <input type="password" 
                    className="py-1 border border-brand font-sans" 
                    placeholder="Confirm password" 
                    onChange={e => setConfirmPassword(e.target.value)}/>
                <button className="mt-5 text-center justify-self-end bg-brand border border-brand text-white rounded-xl w-full py-4 text-xl hover:bg-categories hover:text-brand cursor-pointer transition"
                    onClick={handleSignIn}>
                    Sign up
                </button>
            </form>
            <p className="py-3 mx-5">
                Already have an account? <Link href={'/log-in'} className="text-button-active hover:underline">Log in</Link>
            </p>
        </div>
    )
}

export default SignUp