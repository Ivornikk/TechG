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
            >
            <div className="flex">
                <input onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                    placeholder="Search products"
                    type="text"
                    className="bg-white text-black rounded-full px-3 py-3 w-full " />
                <button onClick={handleSearch}
                    className="-translate-x-7 cursor-pointer">
                    <img src="/search-icon.svg"></img>
                </button>
            </div>
        </form>
    )
}

export default SearchPanel