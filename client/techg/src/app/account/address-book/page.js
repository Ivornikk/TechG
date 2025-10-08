'use client'

import AddAddressForm from "@/app/components/forms/addAddressForm"
import { fetchUserAddresses, removeAddress } from "@/app/http/AddressAPI"
import { StoreContext } from "@/app/store/StoreProvider"
import { observer } from "mobx-react-lite"
import Link from "next/link"
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
    
    const deleteAddress = id => {
        removeAddress(id).then(() => {
            fetchUserAddresses(userId).then(data => {
                address.setAddresses(data.rows)
            })
        })
    }

    return (
        <div className="my-5 w-full mx-auto">
            <h1 className="text-[1.7em] mb-5 flex gap-3 m-3">
                <Link className="cursor-pointer"
                    href={'/account/main'}>
                    {'<'}
                </Link>
                Address Book
            </h1>
            <div className="bg-categories shadow-xl md:px-10 py-3 md:my-30 mx-auto md:max-w-[90vw]">
                <div className="grid grid-cols-2 grid-rows-2 xl:mx-50 mx-auto gap-5">
                    { address.addresses?.length == 0 && !newAddressModalShown ?
                        <div className="text-[3em] text-gray-text text-center m-auto col-span-2">
                            No Addresses
                        </div>
                        :
                        address.addresses.map(address => {
                            return (
                                <div key={address.id}
                                    className="flex flex-col">
                                    <div>
                                        {address.firstName} {address.lastName}, {address.telephone}
                                    </div>
                                    <div>
                                        {address.addressLine}
                                    </div>
                                    <div>
                                        {address.region}, {address.City}, {address.country}, {address.ZIP}
                                    </div>
                                    <div className="flex justify-between w-[50%] mt-5">
                                        <button className="bg-button-active text-white px-5 py-1 rounded-xl border border-button-active cursor-pointer hover:bg-categories hover:text-button-active transition"
                                            onClick={() => deleteAddress(address.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                { !newAddressModalShown &&
                    <div className="flex items-center justify-self-center">
                        <button className="bg-button-active flex gap-5 text-[1.3em] text-white px-10 py-2 rounded-xl border border-button-active cursor-pointer hover:bg-categories hover:text-button-active transition"
                            onClick={() => setNewAddressModalShown(true)}>
                            + Add New Address (Max 4)
                        </button>
                    </div>
                }
                <AddAddressForm isShown={newAddressModalShown}
                    onHide={() => setNewAddressModalShown(false)} />
            </div>
        </div>
    )
})

export default AddressBook