const Categories = () => {
    return (
        <div className="mr-30 self-start justify-self-start flex-shrink-0">
            <div className="group cursor-pointer flex bg-button rounded p-1 flex-shrink-0">
                <img src="/categories-icon.svg"></img>
                <button className=" sm:block ml-2 mr-14 cursor-pointer text-lg">Categories</button>
                <img className=" sm:block -rotate-90 group-hover:rotate-none transition" src="/dropdown-arrow.svg"></img>
            </div>
        </div>
    )
}

export default Categories