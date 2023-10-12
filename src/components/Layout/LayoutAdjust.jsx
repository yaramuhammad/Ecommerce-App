import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

export default function LayoutAdjust() {

    function setNavRight(color) {
        let links = document.querySelectorAll('.toggle-white-login');
        links.forEach(link => {
            link.classList.add(color);
        });
    }

    function setNavLeft(color) {
        document.querySelector('.navbar-brand').classList.add(color);
        let links = document.querySelectorAll('.toggle-white-register');
        links.forEach(link => {
            link.classList.add(color);
        });
    }

    useEffect(() => {
        
        setNavLeft('text-body');
        setNavRight('text-body');
        document.querySelector('.cart').classList.remove('d-none');
        let hidden = document.querySelectorAll('.hide-on-toggle')
        hidden.forEach(link => {
            link.classList.remove('d-none')
        })
    }, [])
  return (
    <Outlet/>
  )
}
