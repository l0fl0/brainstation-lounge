import React from 'react'

export default function StackBtn({name, clickHandler, isSelected}) {
    return (
        <button 
            className={isSelected ? "stack__button stack__button--selected" : "stack__button"}
            onClick={clickHandler}
        >{name}</button>
    )
}
