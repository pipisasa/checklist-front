import React from 'react'
import './Confetti.css'

function Confetti() {
  return (
    <>
    {Array(150).fill(null).map((_,i)=>(
      <div key={`confetti-${i}`} className={`confetti-${i}`} />
    ))}
    </>
  )
}

export default Confetti;