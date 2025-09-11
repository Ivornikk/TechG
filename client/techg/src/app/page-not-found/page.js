'use client'
import { redirect } from "next/navigation";

export default function PageNotFound() {
    return (
        <div className="m-auto w-full h-[100vh] flex justify-center items-center">
            <div className="flex flex-col gap-5">
                <h1 className="text-[2.5em]">
                    Page is not found {':('}
                </h1>
                <button className="bg-brand text-white text-[2em] border border-brand rounded-xl cursor-pointer px-10 py-3 hover:bg-white hover:text-brand transition"
                    onClick={() => redirect('/')}>
                    Go to home page
                </button>
            </div>
        </div>
    )
}