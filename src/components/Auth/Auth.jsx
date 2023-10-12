import React, { useEffect } from 'react'
import './auth.css'
import Register from './Register';
import Login from './Login';

export default function Auth({ target }) {

    function setNavColors() {
        let links = document.querySelectorAll('.toggle-white-login');
        links.forEach(link => {
            link.classList.add('text-body');
            link.classList.remove('text-white');
        });
        document.querySelector('.navbar-brand').classList.add('text-white');
        document.querySelector('.navbar-brand').classList.remove('text-body');

        let linkss = document.querySelectorAll('.toggle-white-register');
        linkss.forEach(link => {
            link.classList.add('text-white');
            link.classList.remove('text-body');
        });
    }
    function toggleNavColors() {
        let links = document.querySelectorAll('.toggle-white-login');
        links.forEach(link => {
            link.classList.toggle('text-white');
            link.classList.toggle('text-body');
        });
        document.querySelector('.navbar-brand').classList.toggle('text-white');
        document.querySelector('.navbar-brand').classList.toggle('text-body');

        let link = document.querySelectorAll('.toggle-white-register');
        link.forEach(link => {
            link.classList.toggle('text-white');
            link.classList.toggle('text-body');

        });
    }

    useEffect(() => {
        const container = document.getElementById('container');
        const btnSignUp = document.getElementById('btn-sign-up');
        const btnSignIn = document.getElementById('btn-sign-in');

        btnSignUp.addEventListener('click', () => {
            container.classList.toggle('change')
            setTimeout(() => {
                toggleNavColors()
            }, 600);

        })
        btnSignIn.addEventListener('click', () => {
            container.classList.toggle('change')
            setTimeout(() => {
                toggleNavColors()
            }, 600);

        })
        
        document.querySelector('.cart').classList.add('d-none');
        let hidden = document.querySelectorAll('.hide-on-toggle')
        hidden.forEach(link => {
            link.classList.add('d-none')
        })

        setNavColors();
        if(target=='login') {
            container.classList.toggle('change')
            toggleNavColors()
        }
    }, [])
    return (
        <>
            <div className="f-container w-100 min-vh-100 shadow rounded position-fixed top-0 change" id="container">

                <Login />

                <Register toggle={toggleNavColors} />


                <div className="overlay position-absolute w-100 h-100 top-0 start-0 bg-white">
                    <div className="panel-sign-up d-flex justify-content-center align-items-center text-center flex-col flex-column flex-wrap align-center position-absolute top-0 start-50 w-50 h-100 px-5 bg-primary">
                        <h2 className="mb-3 fw-bold text-white">Hello, Friend!</h2>
                        <p className="mt-2 text-white">Enter your personal details and start journey with us</p>
                        <p className="mt-2 text-white">Don't Have An Account?</p>
                        <button className="mt-2 px-5 py-2 rounded-pill outline-none btn btn-primary bg-transparent border border-white" id="btn-sign-up">
                            Register
                        </button>
                    </div>
                    <div className="panel-sign-in justify-content-center align-items-center text-center flex-col flex-column flex-wrap align-center position-absolute top-0 start-0 w-50 h-100 px-5 bg-primary">
                        <h2 className="mb-3 fw-bold  text-white">Welcome!</h2>
                        <p className="mt-2 text-white">Enter your personal details and start journey with us</p>
                        <p className="mt-2 text-white">Already Have An Account?</p>
                        <button className="mt-2 px-5 py-2 rounded-pill outline-none btn btn-primary bg-transparent border border-white" id="btn-sign-in">
                            Login
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}


