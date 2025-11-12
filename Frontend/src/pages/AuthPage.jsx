import React, { useState} from 'react'
import LoginBox from "../components/Auth/LoginBox"
import SignUpBox from "../components/Auth/SignUpBox"
import "../CSS/PageCSS/AuthPage.css"

const AuthPage = () => {
    const [isToggle, setIsToggle] = useState(1)

    const handleToggle = (value) => {
        setIsToggle(value)
    }

    // Create floating particles
    const renderParticles = () => {
        return Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="particle" style={{
                animationDelay: `${-index * 2}s`,
                background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,107,107,0.1) 70%)`
            }} />
        ))
    }

    return (
        <div className="AuthPage">
            {/* Floating Particles */}
            {renderParticles()}
            
            {/* Toggle Buttons */}
            <div className="AuthToggleOptions">
                <button 
                    className={`AuthToggleButton ${isToggle === 1 ? 'active' : ''}`}
                    onClick={() => handleToggle(1)}
                >
                    Login
                </button>
                <button 
                    className={`AuthToggleButton ${isToggle === 2 ? 'active' : ''}`}
                    onClick={() => handleToggle(2)}
                >
                    Sign Up
                </button>
            </div>

            {/* Auth Component Area */}
            <div className='AuthToggleArea'>
                {isToggle === 1 ? <LoginBox/> : <SignUpBox/>}
            </div>

            {/* Animated Background Text */}
            <div style={{
                position: 'absolute',
                bottom: '10px',
                color: 'rgba(255,255,255,0.3)',
                fontSize: '12px',
                textAlign: 'center',
                width: '100%',
                zIndex: 0
            }}>
                Welcome to Our Platform • Secure Authentication • Join Us Today
            </div>
        </div>
    )
}

export default AuthPage