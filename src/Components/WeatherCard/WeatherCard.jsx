import "./weatherCard.css";
import React, { useEffect, useState } from "react";

const WeatherCard = () => {
	// state for input
	const [input, setInput] = useState("");
	// state for locale data
	const [locale, setLocale] = useState({ foo: "bar" });
	const [localeName, setLocaleName] = useState("");
	const [localeCountry, setLocaleCountry] = useState("");
	const [localeTemp, setLocaleTemp] = useState("");
	const [LocaleCondition, setLocaleCondition] = useState("");
	const [localeFeelsLike, setLocaleFeelsLike] = useState("");
	const [localeWind, setLocaleWind] = useState("");

	useEffect(() => {
		const newWeather = locale;
		setLocale(newWeather);
		if (Object.hasOwn(locale, "location")) {
			console.log(locale);
			setLocaleName(locale.location.name);
			setLocaleCountry(locale.location.country);
			setLocaleTemp(`${locale.current.temp_c}ºC`);
			const condition = locale.current.condition.text;
			setLocaleCondition(condition);
			setLocaleFeelsLike(`Feels like: ${locale.current.feelslike_c}º`);
			setLocaleWind(
				`Wind: ${Math.round(locale.current.wind_kph)} km/h ${
					locale.current.wind_dir
				}`
			);
		}
	}, [locale]);

	async function fetchLocaleJSON() {
		let localeJSON = { foo: "bar" };
		let localeInput = input;
		const response = await fetch(
			`http://api.weatherapi.com/v1/current.json?key=78a3782df11840c5952223430230105&q=${localeInput}&aqi=no`
		);
		if (response.ok) {
			localeJSON = await response.json();
			setLocale(localeJSON);
		} else {
			alert(`Error: Status code '${response.status}: ${response.statusText}'`);
		}
	}

	const submitOnEnter = (e) => {
		e.preventDefault();
		if (e.key === "Enter") {
			if (input === "" || input === " ") {
				return;
			}
			document.getElementById("submitSearch").click();
		}
	};
	async function updateWeather() {
		if (!input) {
			return;
		}
		await fetchLocaleJSON();
	}

	return (
		<div id="headerContainer">
			<h1>Enter a city</h1>
			<h2>or use your ZIP/Postal Code</h2>
			<div className="inputContainer">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					id="inputField"
					onKeyUp={submitOnEnter}
				/>
				<button
					id="submitSearch"
					onClick={() => {
						updateWeather();
					}}
				>
					Search
				</button>
			</div>
			<h2 id="localeName">{localeName ? localeName : ""}</h2>
			<h4 id="localeName">{localeCountry ? localeCountry : ""}</h4>
			<h2 id="localeTemp">{localeTemp ? localeTemp : ""}</h2>
			<div className="conditionContainer">
				<h3 id="localeCondition">{LocaleCondition ? LocaleCondition : ""}</h3>
				<img
					src={
						LocaleCondition ? locale.current.condition.icon : "/transparent.png"
					}
				/>
			</div>
			<h3 id="hiTemp">{localeFeelsLike ? localeFeelsLike : ""}</h3>
			<h3 id="localeWind">{localeWind ? localeWind : ""}</h3>
		</div>
	);
};

export default WeatherCard;
