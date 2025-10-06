import Link from "next/link"

const Settings = () => {

    return (
        <div className="bg-categories shadow-xl px-10 py-3 md:max-w-[65vw] m-auto flex flex-col md:my-30 my-10">
            <h1 className="text-[1.5em] mb-5 flex gap-3">
                <Link className="cursor-pointer"
                    href={'/account/main'}>
                    {'<'}
                </Link>
                Settings
            </h1>
            <div className="gap-5">
                <div className="flex flex-col gap-5">
                    <hr className="w-full border-stroke m-auto"></hr>
                    <ul className="text-gray-text">
                        <li className="p-5 w-full cursor-pointer ">
                            <Link className="w-full flex"
                                href={'/account/settings/edit-user'}>
                                Edit Account
                            </Link>
                        </li>    
                    </ul>
                </div>
            </div> 
        </div>
    )
}

export default Settings