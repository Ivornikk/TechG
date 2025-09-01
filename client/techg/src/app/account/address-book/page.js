'use client'

import AddAddressForm from "@/app/components/addAddressForm"
import { createAddress, fetchUserAddresses } from "@/app/http/AddressAPI"
import { StoreContext } from "@/app/store/StoreProvider"
import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"

const AddressBook = observer(() => {
    const { address, user } = useContext(StoreContext)
    const userId = user.user.id
    const [newAddressModalShown, setNewAddressModalShown] = useState(false)

    useEffect(() => {
        fetchUserAddresses(userId).then(data => {
            address.setAddresses(data.rows)
        })
    }, [])

    const deleteAddress = () => {
        removeAddress(userId).then(
            fetchUserAddresses(userId).then(data => {
                address.setAddresses(data.rows)
            })
        )
    }

    return (
        <div className="bg-categories shadow-xl px-10 py-3">
            <h1 className="text-[1.7em] mb-5">Address Book</h1>
            <div className="grid grid-cols-2 grid-rows-2 mx-50 gap-5 my-10">
                {
                    address.addresses.map(address => {
                        return (
                            <div key={address.id}
                                className="flex flex-col gap-5">
                                <div>
                                    {address.firstName} {address.lastName}, {address.telephone}, {address.addressLine}, {address.region}, {address.City}, {address.country}, {address.ZIP}
                                </div>
                                <div className="flex justify-between w-[50%]">
                                    <button className="bg-button-active text-white px-5 py-1 rounded-xl border border-button-active cursor-pointer hover:bg-categories hover:text-button-active transition">
                                        Edit
                                    </button>
                                    <button className="bg-button-active text-white px-5 py-1 rounded-xl border border-button-active cursor-pointer hover:bg-categories hover:text-button-active transition">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            { !newAddressModalShown && 
                <div className="flex items-center">
                    <button className="bg-button-active flex gap-5 text-[1.3em] text-white px-10 py-2 rounded-xl border border-button-active cursor-pointer hover:bg-categories hover:text-button-active transition"
                        onClick={() => setNewAddressModalShown(true)}>
                        + Add New Address (Max 4)
                    </button>
                </div>
            }
            <AddAddressForm isShown={newAddressModalShown}
                onHide={() => setNewAddressModalShown(false)} />
        </div>
    )
})

export default AddressBook