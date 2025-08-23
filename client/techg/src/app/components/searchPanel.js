'use client'
import { redirect } from "next/navigation"
import { useState } from "react"

const SearchPanel = () => {
    const [searchInput, setSearchInput] = useState('')

    return (
        <form onSubmit={e => e.preventDefault()}
            className="sm:ml-30">
            <div className="flex items-center">
                <input onChange={(e) => setSearchInput(e.target.value)}
                    className="bg-search h-[40px] md:h-[56px] rounded-4xl px-5 xl:min-w-200 xl:flex-1 lg:w-130 md:w-70 text-black p-3 outline-none" placeholder="Search for products" type="text" />
                <button onClick={() => redirect(`/search?q=${searchInput}`)}
                    className="cursor-pointer -translate-x-[50px] flex-shrink-0 mx-4"><img src="/search-icon.svg"></img></button>
            </div>
        </form>
    )
}

export default SearchPanel