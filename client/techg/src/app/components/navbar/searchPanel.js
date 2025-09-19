'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

const SearchPanel = ({isMobile}) => {
    const [searchInput, setSearchInput] = useState('')
    const router = useRouter()
    const handleSearch = () => {
        setSearchInput('')
        router.push(`/search?q=${searchInput}&page=1`)
    }

    return (
        <>
        { isMobile ?
            <form onSubmit={e => e.preventDefault()}
                className="flex">
                <input onChange={e => setSearchInput(e.target.value)}
                    placeholder="Search Products"
                    className="bg-white text-black rounded-sm pl-3 pr-10 py-3 w-full" />
                <button className="-translate-x-10 cursor-pointer"
                    onClick={handleSearch}>
                    <img src="search-icon.svg"></img>
                </button>
            </form>
        :
        <form onSubmit={e => e.preventDefault()}
            >
            <div className="flex sm:text-[1em] text-[0.8em]">
                <input onChange={(e) => setSearchInput(e.target.value)}
                    value={searchInput}
                    placeholder="Search products"
                    type="text"
                    className="bg-white text-black rounded-full pl-3 pr-10 py-3 w-full " />
                <button onClick={handleSearch}
                    className="-translate-x-7 cursor-pointer">
                    <img src="/search-icon.svg"></img>
                </button>
            </div>
        </form>
        }
        </>
    )
}

export default SearchPanel