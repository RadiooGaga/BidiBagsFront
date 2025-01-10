import React from 'react'
import { useNavigate } from 'react-router-dom'
import './GoBack.css'

export const GoBack = () => {

    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <button 
        className='goBackButton'
        onClick={handleGoBack}
        >
            <img src="/assets/icons/goBack.png" alt="goBackButton" />
        </button>
    )
}
