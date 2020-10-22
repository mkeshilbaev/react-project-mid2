import axios from 'axios'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { BACKEND_API_URL as API_URL } from '../shared/constants'


interface Props {
    setToken: (token: string) => void
}

export default function Auth(props: Props): ReactElement {
    const [validationErrors, setValidationErrors] = useState({
        email: '',
        password: ''
    })
    const validationStyle = { color: 'red' }
    const [redirect, setRedirect] = useState(false)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        emailRef.current?.focus()
    }, [])

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const isRight = validate()

        if (isRight) {
            axios.post(API_URL + 'sign-in', {
                username: emailRef.current?.value,
                password: passwordRef.current?.value
            })
                .then(response => {
                    if (response.data.accessToken) {
                        localStorage.setItem('token', response.data.accessToken)
                        props.setToken(response.data.accessToken)
                        setRedirect(true)
                    }
                })
        }
    }

    function validate() {
        const validation = { email: '', password: '' };

        if (!emailRef.current?.value.includes('@'))
            validation.email = 'Wrong format';

        if (passwordRef.current && passwordRef.current.value.length < 6)
            validation.password = 'Password\'s length < 6';

        if (validation.email || validation.password) {
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
                    <span style={validationStyle}>{validationErrors.email}</span>
                </div>
                <div className='form-inputs'>
                    <label>PASSWORD: </label>
                    <input ref={passwordRef} type='password' required />
                    <span style={validationStyle}>{validationErrors.password}</span>
                </div>
                <div className='form-inputs'>
                    <input type='submit' value='SUBMIT' />
                </div>
            </form>
        </div>
    );
}
