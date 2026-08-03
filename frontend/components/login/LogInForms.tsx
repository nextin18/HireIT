import React from 'react'

function loginform() {
  return (
    <div>
        <form className="space-y-6">
            <input type="email" placeholder="Email" className="inputform" />
            <input type="password" placeholder="Password" className="inputform" />
            <button type="submit" className="actionBtn">
                Sign I
                n
            </button>
        </form>
    </div>
  )
}

export default loginform