import React from 'react';
import { useState } from 'react/cjs/react.development';
import './Stack.scss';
import axios from 'axios';

export default function Stack() {
    const initialSearch = {
        hasReact: true,
        hasCSS: false,
        hasNodejs: false,
        hasExpress: false,
        hasJS: false
    }

    const tags = [{
        tag: 'reactjs',
        key: 'hasReact'
    },
    {
        tag: 'CSS',
        key: 'hasCSS'
    },
    {
        tag: 'node.js',
        key: 'hasNodejs'
    },
    {
        tag: 'express',
        key: 'hasExpress'
    },
    {
        tag: 'javascript',
        key: 'hasJS'
    }]

    const [search, setSearch] = useState(initialSearch);

    const selectTag = tag => {
        setSearch(prevSearch => {
            const newSearch = {...prevSearch}
            newSearch[tag] = !prevSearch[tag]
            return newSearch
        })
    }

    const tagBuilder = tags => {
        return tags
            .filter(tag => {
                if (search[tag.key]) return tag;
            })
            .map(tag => tag.tag)
            .join('%3')
    }

    let from = '1638316800';
    let to = '1640908800';

    const getQuestions = (tags, from, to) => {
        axios
            .get(`https://api.stackexchange.com/2.3/search?page=1&pagesize=5&fromdate=${from}&todate=${to}&order=desc&sort=votes&tagged=${tags}&site=stackoverflow`)
            .then(response => {
                console.log(response)
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
                    className={search.hasCSS ? "stack__button stack__button--selected" : "stack__button"}
                    onClick={() => selectTag('hasCSS')}
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
            <button className="stack__button" onClick={() => getQuestions(tagBuilder(tags), from, to)}>Get Posts</button>
        </div>
    )
}
