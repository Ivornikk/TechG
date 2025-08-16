import Link from "next/link"

const LogIn  = () => {
    return (
        <div className="m-auto bg-categories shadow-xl w-200 pt-10">
            <h2 className="text-[1.5em] text-center mb-5">Log in</h2>
            <form className="flex flex-col gap-5 mx-50">
                <input className="py-1 border border-brand" placeholder="Username" />
                <input type="password" className="py-1 border border-brand font-sans" placeholder="Password" />
                <button className="mt-5 text-center justify-self-end bg-brand border border-brand text-white rounded-xl w-full py-4 text-xl hover:bg-categories hover:text-brand cursor-pointer transition">
                    Log in
                </button>
            </form>
            <p className="py-3 mx-5">
                Don't have an account? <Link href={'/sign-up'} className="text-button-active hover:underline">Sign up</Link>
            </p>
        </div>
    )
}

export default LogIn