import "./weather.css";
import React, { useEffect, useState } from "react";

const Weather = () => {
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

	const [forecast, setForecast] = useState();
	const [forecastDate1, setForecastDate1] = useState([]);
	const [forecastImg1, setForecastImg1] = useState([]);
	const [forecastTemp1, setForecastTemp1] = useState([]);

	const [forecastDate2, setForecastDate2] = useState([]);
	const [forecastImg2, setForecastImg2] = useState([]);
	const [forecastTemp2, setForecastTemp2] = useState([]);

	const [forecastDate3, setForecastDate3] = useState([]);
	const [forecastImg3, setForecastImg3] = useState([]);
	const [forecastTemp3, setForecastTemp3] = useState([]);

	useEffect(() => {
		const newWeather = locale;
		setLocale(newWeather);

		if (Object.hasOwn(locale, "location")) {
			console.log(forecast);
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
			setForecastDate1(forecast.forecast.forecastday[1].date);
			const forecastCondition1 = forecast.forecast.forecastday[1].day.condition;
			setForecastImg1(forecastCondition1.icon);
			console.log(forecastImg1);
			setForecastTemp1(
				Math.round(forecast.forecast.forecastday[1].day.avgtemp_c)
			);

			setForecastDate2(forecast.forecast.forecastday[2].date);
			const forecastCondition2 = forecast.forecast.forecastday[2].day.condition;
			setForecastImg2(forecastCondition2.icon);
			setForecastTemp2(
				Math.round(forecast.forecast.forecastday[2].day.avgtemp_c)
			);

			// setForecastDate3(forecast.forecast.forecastday[3].date);
			// const forecastCondition3 = forecast.forecast.forecastday[3].day.condition;
			// setForecastImg3(forecastCondition3.icon);
			// setForecastTemp3(
			// 	Math.round(forecast.forecast.forecastday[3].day.avgtemp_c)
			// );
		}
	}, [locale]);

	async function fetchLocaleJSON() {
		let localeJSON = { foo: "bar" };
		let localeForecast = { foo: "bar" };
		let localeInput = input;
		const response = await fetch(
			`http://api.weatherapi.com/v1/current.json?key=78a3782df11840c5952223430230105&q=${localeInput}&aqi=no`
		);
		const response2 = await fetch(
			`http://api.weatherapi.com/v1/forecast.json?key=78a3782df11840c5952223430230105&q=${localeInput}&days=5&aqi=no&alerts=yes`
		);
		if (response.ok) {
			localeJSON = await response.json();
			localeForecast = await response2.json();
			setLocale(localeJSON);
			setForecast(localeForecast);
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
			<img src="/hellokitty1.png" alt="hello kitty" id="helloKitty1" />
			<img src="/hellokitty2.png" alt="hello kitty" id="helloKitty2" />
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

			<br />
			<div className="forecastCard">
				<h3>{forecast ? "Tomorrow" : ""}</h3>
				<img src={forecast ? forecastImg1 : ""} alt="" />
				<h3>{forecast ? forecastTemp1 + "ºC" : ""}</h3>
			</div>
			<div id="forecastContainer">
				{/* <div className="forecastCard">
					<h3>{forecast ? forecastDate2 : ""}</h3>
					<img src={forecast ? forecastImg2 : ""} alt="" />
					<h3>{forecast ? forecastTemp2 + "ºC" : ""}</h3>
				</div> */}
				{/* <div className="forecastCard">
					<h3>{forecast ? forecastDate3 : ""}</h3>
					<img src={forecast ? forecastImg3 : ""} alt="" />
					<h3>{forecast ? forecastTemp3 + "ºC" : ""}</h3>
				</div> */}
			</div>
		</div>
	);
};

export default Weather;
