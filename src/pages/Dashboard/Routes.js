import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Bookings from './Bookings'
import Events from './Events'

export default function Index() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='bookings' element={<Bookings />} />
            <Route path='events/*' element={<Events />} />
        </Routes>
    )
}
