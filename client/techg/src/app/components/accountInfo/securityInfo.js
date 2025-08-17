'use client'
import { useState } from "react"

const SecurityInfo = ({info}) => {

    const [editStateId, setEditStateId] = useState(0)

    return (
        <div>
            <h2 className="text-[1.3em] mb-5">Security Information</h2>
            <div className="flex flex-col gap-5 justify-between w-full">
                {
                    info.map(el => {
                        return ( editStateId == el.id ?
                            <form key={el.id}
                                className="flex justify-between items-center">
                                <div className="flex flex-col gap-2">
                                    <label className="text-label-gray">
                                        New {el.name}
                                    </label>
                                    <input className="py-1 border border-brand" />
                                </div>
                            <button className="bg-button-active text-white border border-button-active px-5 py-3 cursor-pointer transition hover:text-button-active hover:bg-categories rounded-xl"
                                onClick={() => setEditStateId(0)}>
                                Confirm
                            </button>
                            </form>
                            :
                            <div key={el.id}
                                className="flex justify-between items-center">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-label-gray">
                                        {el.name}
                                    </h3>
                                    <h3 className="text-xl">
                                        {el.value}
                                    </h3>
                                </div>
                                <button onClick={() => setEditStateId(el.id)}
                                    className="text-button-active cursor-pointer transition-all text-lg hover:text-xl">
                                    Edit
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SecurityInfo