'use client'
import { useState } from "react"

const PersonalInfo = ({info}) => {

    const [editState, setEditState] = useState(false)

    return (
        <div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-5">
                    <h2 className="text-[1.3em]">Personal information</h2>
                    {
                        editState ?
                        <form className="flex flex-col gap-5 justify-between">
                            {
                                info.map(el => {
                                    return ( el.id !=3 &&
                                        <div key={el.id}
                                            className="flex flex-col justify-between gap-2">
                                            <label className="text-label-gray">
                                                New {el.name}
                                            </label>
                                            <input className="py-1 border border-brand"
                                                placeholder="" />
                                        </div>
                                    )
                                })
                            }
                            <button className="bg-button-active text-white border border-button-active py-3 cursor-pointer transition hover:text-button-active hover:bg-categories rounded-xl"
                                onClick={() => setEditState(!editState)}>
                                Confirm
                            </button>
                        </form>
                        :
                        <div className="flex flex-col gap-5 justify-between">
                            {
                                info.map(el => {
                                    return (
                                        <div key={el.id}
                                            className="flex flex-col justify-between gap-2">
                                            <h3 className="text-label-gray">{el.name}</h3>
                                            <h3 className="text-xl">{el.value}</h3>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
                {   !editState &&
                    <button onClick={() => setEditState(!editState)}
                        className="text-button-active cursor-pointer transition-all text-lg hover:text-xl self-start">
                        Edit
                    </button>
                }
            </div>
        </div>
    )
}

export default PersonalInfo