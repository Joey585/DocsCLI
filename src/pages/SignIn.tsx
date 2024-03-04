import {ChangeEvent, FormEvent, useState} from "react";

export const SignIn = () => {
    const [password, setPassword] = useState<string>();

    const handleSubmitEvent = (e: FormEvent<HTMLFormElement>) => {
        const passwordOutput = e.currentTarget.children.item(0)!.children.item(2)!;
        e.preventDefault();
        if(password === "") return passwordOutput.innerHTML = "You need to input a password!"


    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return(
        <div id="signin-page">
            <h1>Please sign in using the password given to you below.</h1>
            <h3>If you don't own a password then apply for one <a href="/signup">here</a></h3>
            <form onSubmit={handleSubmitEvent}>
                <div className='form-control'>
                    <label htmlFor="password-input">Password</label>
                    <input
                        type="password"
                        id="password-input"
                        name="password"
                        aria-describedby="password"
                        aria-invalid="false"
                        onChange={handleInput}
                    />
                    <div id="password-output"></div>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}