import React, { useEffect, useState } from "react";
import "styles/pages/choose-players.css";
import Avatar from "components/Avatar";
import Button from "components/Button";
import TextField from "components/Textfield";
import apiClient from "../utils/apiClient";

const ChoosePlayers = () => {
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const [venue, setVenue] = useState("");
  const [team1Name, setTeam1Name] = useState("");
  const [team2Name, setTeam2Name] = useState("");
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState([]);

  const handleSelect = (team, player) => {
    const setter = team === "team1" ? setTeam1Players : setTeam2Players;
    const currentPlayers = team === "team1" ? team1Players : team2Players;

    if (currentPlayers.includes(player)) {
      setter(currentPlayers.filter((p) => p !== player));
    } else {
      if (currentPlayers.length < 11) {
        setter([...currentPlayers, player]);
      }
    }
  };

  const isPlayerDisabled = (team, player) => {
    if (team === "team1") {
      return team2Players.includes(player);
    } else if (team === "team2") {
      return team1Players.includes(player);
    }
    return false;
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await apiClient.get(
          "http://localhost:8080/api/players/players"
        );

        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setPlayers(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPlayers();
  }, []);

  const handleClick = () => {
    console.log(team1Name, team1Players, team2Name, team2Players, venue);
  };

  return (
    <div className="choose-players-container">
      <div className="form">
        <div className="form-row">
          <TextField
            label="Venue"
            value={venue}
            handleChange={setVenue}
            name="venue"
          />
        </div>
        <div className="form-row">
          <div className="team-section">
            <TextField
              label="Team1 Name"
              value={team1Name}
              handleChange={setTeam1Name}
              name="team1Name"
            />
            <div className="dropdown">
              <TextField label="Team1 Players" />
              <div className="dropdown-content">
                {players.map((player) => (
                  <label key={player.name}>
                    <input
                      type="checkbox"
                      checked={team1Players.includes(player.name)}
                      onChange={() => handleSelect("team1", player.name)}
                      disabled={
                        isPlayerDisabled("team1", player.name) ||
                        (team1Players.length >= 11 &&
                          !team1Players.includes(player.name))
                      }
                    />
                    {player.name}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="team-section">
            <TextField
              label="Team2 Name"
              value={team2Name}
              handleChange={setTeam2Name}
              name="team2Name"
            />
            <div className="dropdown">
              <TextField label="Team2 Players" />
              <div className="dropdown-content">
                {players.map((player) => (
                  <label key={player.name}>
                    <input
                      type="checkbox"
                      checked={team2Players.includes(player.name)}
                      onChange={() => handleSelect("team2", player.name)}
                      disabled={
                        isPlayerDisabled("team2", player.name) ||
                        (team2Players.length >= 11 &&
                          !team2Players.includes(player.name))
                      }
                    />
                    {player.name}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="team-list">
        <div className="team">
          <h3>Team 1</h3>
          <div className="team-avatars">
            {team1Players.map((name) => {
              const player = players.find((p) => p.name === name);
              return (
                <div key={name} className="avatar">
                  <Avatar name={name} src={player?.avatar} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="team">
          <h3>Team 2</h3>
          <div className="team-avatars">
            {team2Players.map((name) => {
              const player = players.find((p) => p.name === name);
              return (
                <div key={name} className="avatar">
                  <Avatar name={name} src={player?.avatar} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="start-game-button">
        <Button text="Start Game" handleClick={handleClick} />
      </div>
    </div>
  );
};

export default ChoosePlayers;
