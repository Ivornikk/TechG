'use client'

import { setToken, updateCategories, updateProducts } from "@/app/http/supplierAPI"

const Settings = () => {
    return (
        <div>
            <button className="px-5 py-2 rounded-xl bg-brand text-white cursor-pointer"
                onClick={setToken}>
                Set Access Token
            </button>
            <button className="px-5 py-2 rounded-xl bg-brand text-white cursor-pointer"
                onClick={updateCategories}>
                Update Categories
            </button>
            <button className="px-5 py-2 rounded-xl bg-brand text-white cursor-pointer"
                onClick={updateProducts}>
                Update Products
            </button>
        </div>
    )
}

export default Settings