import React, { Component, useState, useEffect } from "react";
import "./index.css";

/*
class Toggler extends React.Component<object> {
	constructor(props: object) {
		super(props);

		this.state = {
			isDarkMode: false
		};
	}

	handleToggler() {
		console.log(this.state.isDarkMode);
		this.setState({ value: !this.state.isDarkMode });
		console.log("ISSOU");
	}

	render() {
		return (
			<div className="toggle-container">
				<label>
					<input onChange={this.handleToggler} type="checkbox" id="toggler" name="theme" />
					Toggle
				</label>
			</div>
		);
	}
}*/

function Toggler() {
	const [state, setState] = useState({ isDarkMode: false });

	//state isnt loaded since comp init as false

	useEffect(() => {
		let darkThemeSelected = localStorage.getItem("themeSwitch") !== null && localStorage.getItem("themeSwitch") === "dark";
		let checkbox = document.querySelector("input[name=theme]");
		//	if (checkbox) checkbox.checked = darkThemeSelected;

		// update body data-theme attribute
		darkThemeSelected
			? document.documentElement.setAttribute("data-theme", "dark")
			: document.documentElement.removeAttribute("data-theme");
	});

	let transitionTheme = () => {
		document.documentElement.classList.add("transition");
		window.setTimeout(() => {
			document.documentElement.classList.remove("transition");
		}, 750);
	};

	function handleToggler() {
		setState({ isDarkMode: !state.isDarkMode });

		if (state.isDarkMode) {
			transitionTheme();
			localStorage.setItem("themeSwitch", "dark");
			document.documentElement.setAttribute("data-theme", "dark");
		} else {
			transitionTheme();
			localStorage.removeItem("themeSwitch");
			document.documentElement.setAttribute("data-theme", "light");
		}
	}

	return (
		<div className="toggle-container">
			<label>
				<input onChange={handleToggler} type="checkbox" id="toggler" name="theme" />
				Toggle
			</label>
		</div>
	);
}

class App extends Component {
	render() {
		return (
			<>
				<Toggler></Toggler>
				<div className="container">
					<div className="hero-text">
						<h1 className="heroAnim">Dead simple URL shortener</h1>
						<h2 className="heroAnim">Copy and paste your link below</h2>
					</div>

					<div className="form-wrapper">
						<form method="POST" action="/" className="shorten-form">
							<input name="longUrl" type="text" className="search-txt" placeholder="Your link here..." required />
							<button type="submit" className="search-btn">
								<i className="fas fa-arrow fa-arrow-right"></i>
							</button>
						</form>
					</div>
				</div>
			</>
		);
	}
}

export default App;
