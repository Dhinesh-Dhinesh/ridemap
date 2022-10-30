import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom/dist'

export default function ProtectRoute() {

    const navigate = useNavigate();

    useEffect(() => {
        navigate('/')
    }, [navigate])

    return (
        <div>ProtectedRoute</div>
    )
}
