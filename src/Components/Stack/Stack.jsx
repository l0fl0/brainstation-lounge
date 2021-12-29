import React from 'react'
import { useState } from 'react/cjs/react.development'
import './Stack.scss'

export default function Stack() {
    const initialSearch = {
        hasReact: true,
        hasSASS: false,
        hasNodejs: false,
        hasExpress: false,
        hasJS: false
    }

    const [search, setSearch] = useState(initialSearch);

    const selectTag = tag => {
        setSearch(prevSearch => {
            const newSearch = {...prevSearch}
            newSearch[tag] = !prevSearch[tag]
            return newSearch
        })
    }

    return (
        <div className='stack'>
            <h1 className="stack__title">Top 5 Stack Overflow Questions</h1>
            <div className="stack__button-container">
                <button 
                    className={search.hasReact ? "stack__button stack__button--selected" : "stack__button"}
                    onClick={() => selectTag('hasReact')}
                >React</button>
                <button 
                    className={search.hasSASS ? "stack__button stack__button--selected" : "stack__button"}
                    onClick={() => selectTag('hasSASS')}
                >SASS</button>
                <button 
                    className={search.hasNodejs ? "stack__button stack__button--selected" : "stack__button"}
                    onClick={() => selectTag('hasNodejs')}
                >Node.js</button>
                <button 
                    className={search.hasExpress ? "stack__button stack__button--selected" : "stack__button"}
                    onClick={() => selectTag('hasExpress')}
                >Express</button>
                <button 
                    className={search.hasJS ? "stack__button stack__button--selected" : "stack__button"}
                    onClick={() => selectTag('hasJS')}
                >JS</button>
            </div>
        </div>
    )
}
