import LogInForm from "../components/forms/logInForm"

const LogIn  = () => {

    return (
        <div className="m-auto bg-categories shadow-xl md:w-200 pt-10">
            <h2 className="text-[1.5em] text-center mb-5">Log in</h2>
            <LogInForm />
        </div>
    )
}

export default LogIn