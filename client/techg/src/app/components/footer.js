import Link from "next/link"

const Footer = () => {
    return (
        <footer className={`md:px-30 bg-brand w-[100vw] px-5 bottom-0 z-50 flex between pb-5 md:pb-0 text-white`}>
            <Link className="flex-shrink-0"
                href={'/'}>
                <img src="/nav-logo.svg"
                    alt="Logo"
                    className="py-5 md:w-[178px] w-[130px] cursor-pointer"
                    width={150}>
                </img>
            </Link>
            <div className="flex flex-col justify-between w-full">
                <div className="translate-y-16 text-center ">
                    contact us: techgcontact08@gmail.com
                </div>
            </div>
        </footer>
    )
}

export default Footer