import PersonalInfo from "@/app/components/accountInfo/personalInfo"
import SecurityInfo from "@/app/components/accountInfo/securityInfo"

const Settings = () => {

    const userInfo = {
        personalInfo: [
            {id: 1, name: 'username', value: 'Ivornikk'},
            {id: 2, name: 'gender', value: 'male'},
            {id: 3, name: 'birth date', value: '30.08.2009'},
        ],
        securityInfo: [
            {id: 4, name: 'email', value: 'metodievi038@gmail.com'},
            {id: 5, name: 'phone number', value: '0895757519'},
            {id: 6, name: 'password', value: 'test123'},
        ]
    }

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
                    <PersonalInfo info={userInfo.personalInfo} />
                    <hr className="w-full border-stroke m-auto"></hr>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col gap-5 w-full">
                            <SecurityInfo info={userInfo.securityInfo} />
                        </div>
                    </div>
                    <hr className="w-full border-stroke m-auto"></hr>
                </div>
            </div> 
        </div>
    )
}

export default Settings