import Link from "next/link"

const Footer = () => {
    return (
        <footer className="md:px-30 bg-brand w-full bottom-0 z-50 flex justify-center pb-5 md:pb-0 text-white">
            <Link className="flex-shrink-0  -translate-x-40 -translate-y-5 md:-translate-x-0 md:-translate-y-0" href={'/'}><img src="/nav-logo.svg" alt="Logo" className="py-5 h-auto md:w-[178px] cursor-pointer" width={150}></img></Link>
            <div className="flex flex-col justify-between w-full fixed md:relative">
                <div className="translate-y-16 text-center ">
                    contact us: techgcontact08@gmail.com
                </div>
            </div>
        </footer>
    )
}

export default Footer