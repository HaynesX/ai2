import React, {useEffect, useState} from 'react'

const Main = () => {

    const [text, setText] = useState("It's funny how a word can mean everything.")


    useEffect(() => {
        const timer = setTimeout(() => {
            setText("The words change. We do not change.")
        }, 10000)
        return () => clearTimeout(timer)
    }
    , [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setText("Sometimes the player dreamed it watched words on a screen.")
        }, 20000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setText("478868574082066804 + ????????????????")
        }, 60000)
        return () => clearTimeout(timer)
    }
    , [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setText("It's funny how a word can mean everything.")
        }, 61000)
        return () => clearTimeout(timer)
    }
    , [])


    


  return (
    <div className='font-light opacity-50 isPatienceTheAnswer OrIsFaithAndResilience2011 61 6E 64 20 74 68 65 20 75 6E 69 76 65 72 73 65 20 73 61 69 64 20 79 6F 75 20 61 72 65 20 70 61 74 69 65 6E 74 2E 20 32 30 32 34 2D 31 31 2D 31 35 2E'>
        {text}
    </div>
  )
}

export default Main