import React, { useState } from 'react';
import '../../CSS/ComponentCSS/SignUpBox.css';
import { CreateAccount } from '../../BackEndData';

const SignUpBox = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [role, setRole] = useState();
  const handleSubmit = async (e)=>{
    try {
      e.preventDefault()
      const data = await CreateAccount(name,email,password,phone,role)
      console.log(data)
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">Join us today - create your free account</p>
        
        <form className="signup-form" onSubmit={(e)=>handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input 
              type="text" 
              id="name" 
              className="form-input" 
              placeholder="Enter your full name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input 
              type="email" 
              id="email" 
              className="form-input" 
              placeholder="Enter your email address"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              id="password" 
              className="form-input" 
              placeholder="Create a strong password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              className="form-input" 
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="role" className="form-label">Role</label>
            <select 
              id="role" 
              className="form-select" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select your role</option>
              <option value="shop_owner">Shop Owner</option>
            </select>
          </div>

          <button type="submit" className="signup-button">
            Create Account
          </button>
        </form>

        <p className="login-link">
          Already have an account? <a href="#" className="login-link-text">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpBox;