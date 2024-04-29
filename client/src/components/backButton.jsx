import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function backButton() {
    return (
        <div>
            <Link to='/dashboard'><Button className="Back-btn" variant='contained' startIcon={<i className='bx bx-arrow-back'></i>}>Go Back to Dashboard</Button></Link></div>
    )
}

export default backButton