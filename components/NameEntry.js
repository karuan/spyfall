import React, { useState, useEffect } from "react";
import Link from "next/link";
import { withTranslation } from "../i18n";

const NameEntry = ({ t, onNameEntry, nameStatus, gameCode }) => {
	const [name, setName] = useState("");

	// if dev game, pick random name and submit
	useEffect(() => {
		if (gameCode === "ffff") {
			const randFourDig = Math.floor(1000 + Math.random() * 9000);
			onNameEntry(randFourDig);
		}
	}, []);

	const handleNameChange = ({ target: { value } }) => setName(value);
	const handleJoin = (e) => {
		e.preventDefault();
		onNameEntry(name);
	};

	return (
		<div className="main-menu">
			<h4>{t("ui.welcome to spyfall")}</h4>

			<hr />
			<form id="join-game">
				<div>
					<input
						type="text"
						id="player-name"
						name="playerName"
						placeholder={t("ui.enter your name")}
						value={name}
						onChange={handleNameChange}
					/>

					<div className="button-container">
						<input type="submit" value={t("ui.join")} onClick={handleJoin} />
						<Link href="/">
							<button>{t("ui.back")}</button>
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default withTranslation("common")(NameEntry);