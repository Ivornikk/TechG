'use client'
import PersonalInfo from "@/app/components/accountInfo/personalInfo"
import SecurityInfo from "@/app/components/accountInfo/securityInfo"
import { StoreContext } from "@/app/store/StoreProvider"
import { useContext, useState } from "react"

const Settings = () => {
    const { user } = useContext(StoreContext)
    console.log("USER: ", user)

    return (
        <div className="bg-categories shadow-xl px-10 py-3">
            <h1 className="text-[1.5em] mb-5">Settings</h1>
            <div className="grid grid-cols-3 gap-5">
                <div className="w-50 flex flex-col gap-5">
                    <div className="h-50 bg-stroke flex justify-center items-center rounded-[100%]">
                        User Avatar
                    </div>
                    <button className="bg-button-active text-white border border-button-active py-3 cursor-pointer transition hover:text-button-active hover:bg-categories rounded-xl">
                        Change Avatar
                    </button>
                </div>
                <div className="col-span-2 flex flex-col gap-5">
                    <hr className="w-full border-stroke m-auto"></hr>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col gap-5 w-full">
                        </div>
                    </div>
                    <hr className="w-full border-stroke m-auto"></hr>
                </div>
            </div> 
        </div>
    )
}

export default Settings