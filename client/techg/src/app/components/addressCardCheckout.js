'use client'
import { useContext, useEffect, useState } from "react"
import AddAddressForm from "./forms/addAddressForm"
import { StoreContext } from "../store/StoreProvider"
import { fetchUserAddresses } from "../http/AddressAPI"
import { observer } from "mobx-react-lite"

const AddressCardCheckout = observer(({setSelectedAddressId}) => {
    const {address, user} = useContext(StoreContext)
    const userId = user.user.id
    
    const [addAddressShown, setAddAddressShown] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(0)

    useEffect(() => {
        fetchUserAddresses(userId).then(data => {
            console.log(data)
            address.setAddresses(data.rows)
        })
    }, [])

    return (
        <div className="flex justify-between px-20 py-7 flex-col shadow-xl bg-categories">
            <div className="w-full flex justify-between">
                <h2 className="text-[1.5em]">{addAddressShown ? 'Add new address' : 'Address'}</h2>
                { !addAddressShown && address.addresses.length < 4 &&
                    <button className="text-button-active text-[1.2em] cursor-pointer hover:text-[1.4em] transition-all"
                        onClick={() => setAddAddressShown(true)}>
                        + Add new address
                    </button>
                }
            </div>
                <AddAddressForm isShown={addAddressShown} onHide={() => setAddAddressShown(false)} />
            { !addAddressShown &&
                <ul className="flex my-7 scrollbar-thin overflow-x-auto">
                    {
                        address.addresses.map(address => {
                            return (
                                <li key={address.id}
                                    className={`w-68 flex-shrink-0 p-3 rounded transition ${
                                        address.id == selectedAddress ? 
                                        'border border-xl border-brand text-white bg-brand' : ''
                                        }`}>
                                    <div>
                                        {address.firstName} {address.lastName}, {address.telephone} <br />
                                        {address.country}, {address.region}, {address.addressLine},  {address.ZipCode} <br />
                                    </div>
                                    <div className="mt-3">
                                        <button className={`px-3 py-2
                                                        border border-button-active rounded-xl ${
                                                            address.id == selectedAddress ?
                                                            'cursor-default bg-categories text-brand' :
                                                            'cursor-pointer bg-button-active text-white hover:bg-categories hover:text-brand transition'
                                                        }`}
                                            onClick={() => {
                                                if (address.id != selectedAddress) {
                                                    setSelectedAddressId(address.id)
                                                    setSelectedAddress(address.id)
                                                }
                                            }}>
                                            Choose
                                        </button>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            }
        </div>
    )
})

export default AddressCardCheckout