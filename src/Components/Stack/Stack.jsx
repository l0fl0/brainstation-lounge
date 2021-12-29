import React from 'react';
import { useState } from 'react/cjs/react.development';
import './Stack.scss';
import axios from 'axios';
import StackBtn from '../StackBtn/StackBtn';

export default function Stack() {
    const initialSearch = {
        hasReact: true,
        hasCSS: false,
        hasNodejs: false,
        hasExpress: false,
        hasJS: false
    }

    const tags = [{
        name: 'React',
        tag: 'reactjs',
        key: 'hasReact'
    },
    {
        name: 'CSS',
        tag: 'CSS',
        key: 'hasCSS'
    },
    {
        name: 'Node.js',
        tag: 'node.js',
        key: 'hasNodejs'
    },
    {
        name: 'Express',
        tag: 'express',
        key: 'hasExpress'
    },
    {
        name: 'JS',
        tag: 'javascript',
        key: 'hasJS'
    }]

    const [search, setSearch] = useState(initialSearch);

    const selectTag = key => {
        setSearch(prevSearch => {
            const newSearch = {...prevSearch}
            newSearch[key] = !prevSearch[key]
            return newSearch
        })
    }

    const tagBuilder = tags => {
        return tags
            .filter(tag => {
                if (search[tag.key]) return tag;
            })
            .map(tag => tag.tag)
            .join(';')
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
                {tags.map((tag, i) => <StackBtn key={i} isSelected={search[tag.key]} name={tag.name} clickHandler={() => selectTag(tag.key)}/>)}
                
            </div>
            <button className="stack__button" onClick={() => getQuestions(tagBuilder(tags), from, to)}>Get Posts</button>
        </div>
    )
}
