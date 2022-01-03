import React from 'react';
import './StackItems.scss';

export default function StackItems( { questions } ) {
    const questionList = questions.map((question, i) => {
        return (
            <li className="stacklist__item" key={i}><a className="stacklist__link" href={question.link} target="_blank">{decodeURI(question.title).slice(0, 45)+'...'}</a></li>
        )
    })

    return (
        <ol className='stacklist'>
            {questionList}
        </ol>
    )
}
