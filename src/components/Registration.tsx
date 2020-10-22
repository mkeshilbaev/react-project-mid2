import React, { ReactElement, useRef, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

interface Props {
    setToken: any
}

const API_URL = 'http://localhost:3030/'

export default function Registration(props: Props): ReactElement {
    const [validationErrors, setValidationErrors] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        passwordsMatch: ''
    })
    const [redirect, setRedirect] = useState(false)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const passwordConfirmRef = useRef<HTMLInputElement>(null)
    

    useEffect(() => {
        emailRef.current?.focus();
    }, [])

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const isRight = validate()

        if (isRight) {
            axios.post(API_URL + `users`, {
                username: emailRef.current?.value,
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            })
            .then(res => {
                const data = res.data
                if(data.id){
                    axios.post(API_URL + `sign-in`, {
                        username: emailRef.current?.value,
                        password: passwordRef.current?.value
                    })
                    .then(res1 => {
                        if(res1.data.accessToken){
                            localStorage.setItem('token', res1.data.accessToken)
                            props.setToken(res1.data.accessToken); 
                            setRedirect(true)
                        }
                    })
                }

            })
        }
    }

    function validate() {
        const validation = { email: '', password: '', passwordConfirm: '', passwordsMatch: '' };

        if (!emailRef.current?.value.includes('@'))
            validation.email = 'Wrong format';

        if (passwordRef.current && passwordRef.current.value.length < 6)
            validation.password = 'Password\'s length < 6';

        if (passwordConfirmRef.current && passwordConfirmRef.current.value.length < 6)
            validation.passwordConfirm = 'PasswordConfirm\'s length < 6';

        if (passwordRef.current?.value !== passwordConfirmRef.current?.value)
            validation.passwordsMatch = 'Different passwords'

        if (validation.email || validation.password || validation.passwordConfirm || validation.passwordsMatch) {
            setValidationErrors(validation)
            return false;
        }

        return true;
    }

    if (redirect) {
        return <Redirect to='/' />
    }

    return (
        <div className='registration-form'>
            <form onSubmit={handleSubmit}>
                <div className='form-inputs'>
                    <label>EMAIL: </label>
                    <input ref={emailRef} type='text' required />
                    <span style={{ color: 'red' }}>{validationErrors.email}</span>
                </div>
                <div className='form-inputs'>
                    <label>PASSWORD: </label>
                    <input ref={passwordRef} type='password' required />
                    <span style={{ color: 'red' }}>{validationErrors.password}</span>
                </div>
                <div className='form-input'>
                    <label>CONFIRM PASSWORD: </label>
                    <input ref={passwordConfirmRef} type='password' required />
                    <span style={{ color: 'red' }}>{validationErrors.passwordConfirm}</span>
                </div>
                <div className='form-inputs'>
                    <input type='submit' value='SUBMIT' />
                    <span style={{ color: 'red' }}>{validationErrors.passwordsMatch}</span>
                </div>
            </form>
        </div>
    );
}
