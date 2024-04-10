import React, { useState, useEffect } from "react";
import "./Clock.css";

function Clock() {
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [hours, setHours] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		let interval = null;

		if (isRunning) {
			interval = setInterval(() => {
				setSeconds((prevSeconds) => {
					if (prevSeconds === 59) {
						setMinutes((prevMinutes) => {
							if (prevMinutes === 59) {
								setHours((prevHours) => (prevHours + 1) % 24);
								return 0;
							}
							return prevMinutes + 1;
						});
						return 0;
					}
					return prevSeconds + 1;
				});
			}, 1000);
		} else {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [isRunning]);

	useEffect(() => {
		const secondsAngle = seconds * 6;
		const minutesAngle = (minutes + seconds / 60) * 6;
		const hoursAngle = ((hours % 12) + minutes / 60) * 30;
		document.getElementById("second-hand").style.transform = `rotate(${secondsAngle}deg)`;
		document.getElementById("minute-hand").style.transform = `rotate(${minutesAngle}deg)`;
		document.getElementById("hour-hand").style.transform = `rotate(${hoursAngle}deg)`;
	}, [seconds, minutes, hours]);

	return (
		<div className="card">
			<div id="clock">
				<div id="hour-hand" className="hand"></div>
				<div id="minute-hand" className="hand"></div>
				<div id="second-hand" className="hand"></div>
			</div>
			<div>
				<p>
					{hours}h {minutes}m {seconds}s
				</p>
			</div>
			<div className="buttons">
				<button onClick={() => setIsRunning(!isRunning)}>{isRunning ? "Stop" : "Start"}</button>
				<button
					onClick={() => {
						setSeconds(0);
						setMinutes(0);
						setHours(0);
						setIsRunning(false);
					}}
				>
					Reset
				</button>
			</div>
		</div>
	);
}

export default Clock;
