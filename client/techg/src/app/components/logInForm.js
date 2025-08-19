'use client'
import { observer } from "mobx-react-lite";
import { useStore } from "../store/StoreProvider";
import Link from "next/link";

const LogInForm = observer(() => {
    const {userStore} = useStore()

    return (
        <div>
            <form className="flex flex-col gap-5 mx-50"
                onSubmit={e => e.preventDefault()}>
                <input className="py-1 border border-brand" placeholder="Username" />
                <input type="password" className="py-1 border border-brand font-sans" placeholder="Password" />
                <button className="mt-5 text-center justify-self-end bg-brand border border-brand text-white rounded-xl w-full py-4 text-xl hover:bg-categories hover:text-brand cursor-pointer transition"
                    onClick={() => userStore.setIsAuth(true)}>
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