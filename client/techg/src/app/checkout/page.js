const Checkout = () => {
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
        {
            id: 4, firstName: "Ivelin", lastName: "Metodiev", phone: '0895757519',
            addressLine: 'Burgas, Meden Rudnik Vustanicheska 487', country: 'Bulgaria',
            region: 'Burgas', City: 'Burgas', ZIP: '5000'
        },
        {
            id: 5, firstName: "Ivelin", lastName: "Metodiev", phone: '0895757519',
            addressLine: 'Burgas, Meden Rudnik Vustanicheska 487', country: 'Bulgaria',
            region: 'Burgas', City: 'Burgas', ZIP: '5000'
        },
    ]

    const products = [
        { id: 1, quantity: 2, price: 13.54, shippingDate: 'Aug 25th 2025', name: 'Samsung Galaxy S25 Pro Max', img: 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25626687/DSC08433.jpg?quality=90&strip=all&crop=16.675%2C0%2C66.65%2C100&w=2400' },
        { id: 2, quantity: 1, price: 24.64, shippingDate: 'Aug 27th 2025', name: 'Xiaomi Realme C55', img: 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25626687/DSC08433.jpg?quality=90&strip=all&crop=16.675%2C0%2C66.65%2C100&w=2400' },
        { id: 3, quantity: 5, price: 17.05, shippingDate: 'Aug 24th 2025', name: 'Sony Xperia', img: 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25626687/DSC08433.jpg?quality=90&strip=all&crop=16.675%2C0%2C66.65%2C100&w=2400' },
        { id: 4, quantity: 4, price: 56.73, shippingDate: 'Aug 25th 2025', name: 'Iphone 15 Pro', img: 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25626687/DSC08433.jpg?quality=90&strip=all&crop=16.675%2C0%2C66.65%2C100&w=2400' },
    ]

    return (
        <div className="max-w-1600 m-auto">
            <h1 className="text-[2em]">Checkout</h1>
            <div className="grid grid-cols-4 gap-10 my-10 mx-20">
                <div className="py-5 col-span-3">
                    <div className="flex justify-between px-20 flex-col shadow-xl bg-categories">
                        <h2 className="text-[1.5em]">Address</h2>
                        {
                            addresses.length === 0 ?
                                (<button className="text-button-active text-xls">
                                    + Add new address
                                </button>)
                                :
                                <ul className="flex my-7 scrollbar-thin overflow-x-auto">
                                    {
                                        addresses.map(address => {
                                            return (
                                                <li key={address.id}
                                                    className="w-75 flex-shrink-0">
                                                    <div>
                                                        {address.firstName}, {address.lastName}, {address.phone} <br />
                                                        {address.addressLine}, {address.country}, {address.region}, {address.ZIP} <br />
                                                    </div>
                                                    <div className="mt-3">
                                                        <button className="px-3 py-2 cursor-pointer bg-button-active text-white border border-button-active rounded-xl hover:bg-categories hover:text-brand transition">
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
                    <div className="flex gap-5 py-5 items-center px-20 shadow-xl bg-categories my-10">
                        <h2 className="text-[1.5em]">Payment method</h2>
                        <div className="border border-brand px-10 py-5 rounded-xl text-xl">
                            Online payment
                        </div>
                    </div>
                </div>
                <div className="bg-categories shadow-xl col-span-1">
                    
                </div>
            </div>
        </div>
    )
}

export default Checkout