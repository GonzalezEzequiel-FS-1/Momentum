import React from 'react'
import { useTaskUI } from '../context/UIContext'

const Tester = () => {
    const { toggleTraitVisibility, closeTraitVisibility } = useTaskUI()
    const handleOpenVisibility = async () => {
        await toggleTraitVisibility()
        //console.log(traitsVisible)
        return
    }
    const handleCloseVisibility = async () => {
        await closeTraitVisibility()
        //console.log(traitsVisible)
        return
    }
    const handleToggleVisibility = async () => {
        await toggleTraitVisibility()
        // console.log(traitsVisible)
        return
    }
    return (
        <>
            <button className='z-50' onClick={handleOpenVisibility}>
                Close Visibility
            </button>
            <button className='z-50' onClick={handleCloseVisibility}>
                Open Visibility
            </button>
            <button className='z-50' onClick={handleToggleVisibility}>
                Toggle Visibility
            </button>
        </>
    )
}

export default Tester