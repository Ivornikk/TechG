import Link from "next/link"

const Pages = ({pagesNum}) => {
    const page = 1

    return (
        <div className="flex flex-row gap-4 float-right m-10">
            <Link className="border border-stroke py-1 px-5 bg-button-active rounded-md text-white" href={'/'}>{page}</Link>
            <Link className="border border-stroke py-1 px-5 rounded-md hover:bg-button-active hover:text-white transition" href={'/'}>{page + 1}</Link>
            { pagesNum == 4 ?
                <Link className="border border-stroke py-1 px-5 rounded-md hover:bg-button-active hover:text-white transition" href={'/'}>{page + 2}</Link>
                :
                <p>...</p>
            }
            <Link className="border border-stroke py-1 px-5 rounded-md hover:bg-button-active hover:text-white transition" href={'/'}>{pagesNum}</Link>
            { page == pagesNum-3 ?
                <div></div>
                :
                <Link className="border border-stroke py-1 px-5 rounded-md hover:bg-button-active hover:text-white transition" href={'/'}>{'>'}</Link>
            }
        </div>
    )
}

export default Pages