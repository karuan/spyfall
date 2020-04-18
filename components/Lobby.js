import { withTranslation } from "../i18n";
import Router from "next/router";

const Lobby = ({ t, gameState, socket }) => {
	const playerList = gameState.players.map((player) => ({
		...player,
		hasName: player.nameStatus === "named",
		isMe: player.name === gameState.me.name,
	}));
	return (
		<>
			<h4>{t("ui.waiting for players")}</h4>

			<div className="access-code">
				{t("ui.access code")}: <span>{gameState.code}</span>
			</div>

			<hr />

			<ol className="lobby-player-list">
				{playerList.map((player) => (
					<li>
						{player.hasName && player.name}
						{!player.hasName && <i>Joining...</i>}

						{player.isMe && (
							<a
								href="#"
								className="btn-edit-player"
								data-player-id="{{ _id }}"
								onClick={() => Router.push(window.location.pathname)}
							>
								Edit name
							</a>
						)}
						{!player.isMe && (
							<a
								href="#"
								className="btn-remove-player"
								data-player-id="{{ _id }}"
								onClick={() => socket.emit("removePlayer", player.name)}
							>
								Remove player
							</a>
						)}
					</li>
				))}
			</ol>

			<hr />

			<div className="button-container">
				<button className="btn-start" onClick={() => socket.emit("startGame")}>
					{t("ui.start game")}
				</button>
				<button className="btn-leave" onClick={() => Router.push("/")}>
					{t("ui.leave game")}
				</button>
			</div>
		</>
	);
};

export default withTranslation("common")(Lobby);