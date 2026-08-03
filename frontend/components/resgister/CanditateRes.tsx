
import React from 'react'
import { useState } from 'react'
import globalStyles from '@/app/globals.css'


function CanditateRes() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });


  function formhandle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <div>
      <form className="space-y-6" onSubmit={formhandle}>
        <input type="text" placeholder="Full Name" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="inputform" />
        <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="inputform" />
        <input type="tel" placeholder="Phone number" value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} className="inputform" />
        <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="inputform" />
        <input type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} className="inputform" />
        <button type="submit" className="actionBtn">
          Create Account
        </button>
      </form>
    </div>
  )
}

export default CanditateRes