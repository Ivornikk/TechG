const Payment = () => {

    const address = {
            id: 1, 
            firstName: "Ivelin", 
            lastName: "Metodiev", 
            phone: '0895757519',
            addressLine: 'Burgas, Meden Rudnik Vustanicheska 487', 
            country: 'Bulgaria',
            region: 'Burgas', 
            City: 'Burgas', 
            ZIP: '5000'
        }

    const cost = 143.52

    return (
        <div className="max-w-[1600px] m-auto">
            <h1 className="text-[2em]">Payment</h1>
            <div className="grid grid-cols-4 gap-10 my-10">
                <div className="col-span-3 flex flex-col gap-10">
                    <div className="bg-categories shadow-xl px-10 py-10">
                        <h2 className="text-[1.5em]">Payment method</h2>
                        <form className="grid grid-cols-2 grid-rows-2 gap-5 text-xl">
                            <div className="flex gap-5 items-center cursor-pointer border border-transparent hover:border-button-active rounded-xl transition">
                                <input type="radio" name="paymentMethod" />
                                <label className="cursor-pointer flex items-center gap-5" htmlFor="paymentMethod">
                                    <img src="/DebitCardIcon.svg"></img>
                                    <h3 className="text-xl">Debit/Credit Card</h3>
                                </label>
                            </div>
                            <div className="flex gap-5 items-center cursor-pointer border border-transparent hover:border-button-active rounded-xl transition">
                                <input type="radio" name="paymentMethod" />
                                <img src="/applePayIcon.svg"></img>
                                <h3 className="text-xl">Apple Pay</h3>
                            </div>
                            <div className="flex gap-5 items-center cursor-pointer border border-transparent hover:border-button-active rounded-xl transition">
                                <input type="radio" name="paymentMethod" />
                                <img src="/googlePayIcon.svg"></img>
                                <h3 className="text-xl">Google Pay</h3>
                            </div>
                        </form>
                    </div>
                    <div className="bg-categories shadow-xl px-10 py-10">
                        <h2 className="text-[1.5em] mb-10">Payment</h2>
                        <form className="grid grid-cols-2 gap-5 text-xl px-30">
                            <div className="col-span-2 flex flex-col gap-3">
                                <label>Card number</label>
                                <input type="text" placeholder="0000 0000 0000 0000" className="my-1 border border-brand" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label>Expiration Date</label>
                                <input type="text" placeholder="MM/YY" className="my-1 border border-brand" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label>Security Code</label>
                                <input type="text" placeholder="000" className="my-1 border border-brand" />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-span-1 bg-categories shadow-xl flex flex-col items-center p-5 gap-3">
                    <h2 className="text-[2em]">Your Bill</h2>
                    <hr className="border-stroke w-[90%]" />
                    <h3 className="self-start mx-5">Shipping address:</h3>
                    <div className="mx-5">
                        {address.firstName} {address.lastName}, {address.phone} {address.addressLine}, {address.region}, {address.country}, {address.ZIP}
                    </div>
                    <hr className="border-stroke w-[90%]" />
                    <div className="flex justify-between w-full px-5 text-xl">
                        <h3>Total Payment:</h3>
                        <h3>{cost}$</h3>
                    </div>
                    <button className="mt-10 text-center bg-brand border border-brand text-white rounded-xl w-full py-4 text-xl hover:bg-categories hover:text-brand cursor-pointer transition">
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Payment