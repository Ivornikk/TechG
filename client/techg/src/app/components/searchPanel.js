'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

const SearchPanel = () => {
    const [searchInput, setSearchInput] = useState('')
    const router = useRouter()
    const handleSearch = () => {
        setSearchInput('')
        router.push(`/search?q=${searchInput}`)
    }

    return (
        <form onSubmit={e => e.preventDefault()}
            className="sm:ml-30">
            <div className="flex items-center">
                <input onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                    className="bg-search h-[40px] md:h-[56px] rounded-4xl px-5 xl:min-w-200 xl:flex-1 lg:w-130 md:w-70 text-black p-3 outline-none" placeholder="Search for products" type="text" />
                <button onClick={handleSearch}
                    className="cursor-pointer -translate-x-[50px] flex-shrink-0 mx-4">
                    <img src="/search-icon.svg"></img>
                </button>
            </div>
        </form>
    )
}

export default SearchPanel