import React from 'react'

const AuthRole = ({children}) => {

    const role = localStorage.getItem('role')

    if(role === 'user'){
        return 
    }else if(role === 'admin') {
        return children
    }


  
}

export default AuthRole