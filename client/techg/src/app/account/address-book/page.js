const AddressBook = () => {

    const addresses = [
        {
            id: 1, firstName: "Ivelin", lastName: "Metodiev", phone: '0895757519',
            addressLine: 'Burgas, Meden Rudnik Vustanicheska 487', country: 'Bulgaria',
            region: 'Burgas', City: 'Burgas', ZIP: '5000'
        },
        {
            id: 2, firstName: "Ivelin", lastName: "Metodiev", phone: '0895757519',
            addressLine: 'Burgas, Meden Rudnik Vustanicheska 487', country: 'Bulgaria',
            region: 'Burgas', City: 'Burgas', ZIP: '5000'
        },
        {
            id: 3, firstName: "Ivelin", lastName: "Metodiev", phone: '0895757519',
            addressLine: 'Burgas, Meden Rudnik Vustanicheska 487', country: 'Bulgaria',
            region: 'Burgas', City: 'Burgas', ZIP: '5000'
        },
    ]

    return (
        <div className="bg-categories shadow-xl px-10 py-3">
            <h1 className="text-[1.7em] mb-5">Address Book</h1>
            <div className="grid grid-cols-2 grid-rows-2 mx-50 gap-5 my-10">
                {
                    addresses.map(address => {
                        return (
                            <div key={address.id}
                                className="flex flex-col gap-5">
                                <div>
                                    {address.firstName} {address.lastName}, {address.phone}, {address.addressLine}, {address.region}, {address.City}, {address.country}, {address.ZIP}
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
            <div className="flex items-center">
                <button className="bg-button-active flex gap-5 text-[1.3em] text-white px-10 py-2 rounded-xl border border-button-active cursor-pointer hover:bg-categories hover:text-button-active transition">
                    + Add New Address (Max 4)
                </button>
            </div>
        </div>
    )
}

export default AddressBook