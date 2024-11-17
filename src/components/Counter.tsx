// import { useState } from 'react'
// import React from 'react'
import { ReactNode } from 'react'

type CounterProps=
{
    setCount:React.Dispatch<React.SetStateAction<number>>,
    children:ReactNode,
}
const Counter = ({ setCount, children}: CounterProps) => {
    // const [count, setCounter] = useState(1) // explicit:  useState<number | null >(1)
    return (
    <>
        <h1>{children}</h1>
        <button onClick={() => setCount(prev => prev +1)}>+</button>
        <button onClick={() => setCount(prev => prev -1)}>-</button>


    </>
    )
}

export default Counter;
