import React from "react";
import { useState } from "react";
import "./Stack.scss";
import axios from "axios";
import StackBtn from "./StackBtn/StackBtn";
import StackItems from "./StackItems/StackItems";

export default function Stack() {
	const initialSearch = {
		hasReact: true,
		hasCSS: false,
		hasNodejs: false,
		hasExpress: false,
		hasJS: false,
	};

	const tags = [
		{
			name: "React",
			tag: "reactjs",
			key: "hasReact",
		},
		{
			name: "CSS",
			tag: "CSS",
			key: "hasCSS",
		},
		{
			name: "Node.js",
			tag: "node.js",
			key: "hasNodejs",
		},
		{
			name: "Express",
			tag: "express",
			key: "hasExpress",
		},
		{
			name: "JS",
			tag: "javascript",
			key: "hasJS",
		},
	];

	const [search, setSearch] = useState(initialSearch);
	const [questions, setQuestions] = useState();
	const [isLoaded, setIsLoaded] = useState(false);

	const selectTag = (key) => {
		setSearch((prevSearch) => {
			const newSearch = { ...prevSearch };
			newSearch[key] = !prevSearch[key];
			return newSearch;
		});
	};

	const tagBuilder = (tags) => {
		return tags
			.filter((tag) => search[tag.key])
			.map((tag) => tag.tag)
			.join(";");
	};

	let from = "1638316800";
	let to = "1640908800";

	const getQuestions = (tags, from, to) => {
		axios
			.get(
				`https://api.stackexchange.com/2.3/search?page=1&pagesize=5&fromdate=${from}&todate=${to}&order=desc&sort=votes&tagged=${tags}&site=stackoverflow`
			)
			.then((response) => {
				console.log(response.data.items);
				setQuestions(response.data.items);
				setIsLoaded(true);
			});
	};

	return (
		<div className="stack">
			<h1 className="stack__title">Top 5 Stack Overflow Questions</h1>
			<div className="stack__button-container">
				tags:
				{tags.map((tag, i) => (
					<StackBtn
						key={i}
						isSelected={search[tag.key]}
						name={tag.name}
						clickHandler={() => selectTag(tag.key)}
					/>
				))}
			</div>
			<button
				className="stack__button"
				onClick={() => getQuestions(tagBuilder(tags), from, to)}
			>
				Get Posts
			</button>
			{isLoaded ? <StackItems questions={questions} /> : <></>}
		</div>
	);
}
