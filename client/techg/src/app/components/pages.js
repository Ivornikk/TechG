
'use client'


import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { redirect } from "next/navigation"

const Pages = ({pagesNum}) => {
    const page = Number(useSearchParams().get('page'))
    const [gotoPage, setGotoPage] = useState(1)

    const handleGoToButton = () => {
        if (gotoPage > pagesNum || gotoPage < 1) {
            alert('Invalid page')
            return
        }
        setGotoPage('')
        redirect(`/?page=${gotoPage}`)
    }

    return (
        <div className="flex flex-col items-end mr-20 mb-5">
            <div className="flex flex-row gap-4 float-right m-10 mr-0 mb-5">
                { page != 1 &&
                <Link className="border border-stroke py-1 px-5 rounded-md hover:bg-button-active hover:text-white transition" href={`/?page=${page-1}`}>{'<'}</Link>
                }
                <Link className={`border border-stroke py-1 px-5 
                ${page <= pagesNum - 2 ? 'bg-button-active text-white' : 'hover:bg-button-active hover:text-white'} rounded-md`}
                href={`/?page=${page > pagesNum-2 ? pagesNum-2 : page}`}>
                    {page > pagesNum-2 ? pagesNum-2 : page}
                    </Link>
                <Link className={`border border-stroke py-1 px-5 
                    ${page == pagesNum - 1 ? 'bg-button-active text-white' : 'hover:bg-button-active hover:text-white'} rounded-md`} 
                    href={`/?page=${page > pagesNum-2 ? pagesNum-1 : page+1}`}>
                        {page > pagesNum-2 ? pagesNum-1 : page+1}
                        </Link>
                { pagesNum >= 4 && page < pagesNum - 2 &&
                    <p>...</p>
                }
                <Link className={`border border-stroke py-1 px-5 rounded-md ${page == pagesNum ? 'bg-button-active text-white' : 'hover:bg-button-active hover:text-white'} transition`} href={`/?page=${pagesNum}`}>{pagesNum}</Link>
                { page < pagesNum-2 &&
                    <Link className="border border-stroke py-1 px-5 rounded-md hover:bg-button-active hover:text-white transition" href={`/?page=${page+1}`}>{'>'}</Link>
                }
            </div>
            <div className="flex items-center justify-between">
                <h1 className="text-xl">Go to page: </h1>
                <input value={gotoPage} className="border rounded-lg w-10 ml-2 mr-5 text-center" 
                type="text"
                onChange={e => {setGotoPage(e.target.value)}}></input>
                <button className="cursor-pointer px-2 py-1 rounded-lg hover:bg-button-active hover:text-white border border-stroke transition"
                        onClick={() => {handleGoToButton()}}>Go</button>
            </div>
        </div>
    )
}

export default Pages