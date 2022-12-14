import React, { useState } from "react";
import CountryFlag from "./CountryFlag";

const Matchesonly = ({ match, dataVote }) => {
  const [isDraw, setIsDraw] = useState(true);

  let color = "bg-kasar3";

  const matchDate = new Date(match.date);
  const monthNumber = matchDate.getMonth();
  const dayNumber = matchDate.getDate();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const jourSemaine = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const dayString = jourSemaine[matchDate.getDay()];
  const hour = matchDate.getHours();
  const minutes =
    (matchDate.getMinutes() < 10 ? "0" : "") + matchDate.getMinutes();

  return (
    <div className="place-items-center">
      <div
        key={match.match_id}
        className="p-6 rounded-lg border border-gray-200 shadow-md bg-kasar1 place-items-center max-w-md"
      >
        <div className="max-w-md text-center items-center">
          <h5 className="flex-1 mb-2 text-2xl font-bold tracking-tight text-white max-w-[100%] m-auto">
            {dayString +
              " " +
              dayNumber +
              "/" +
              monthNumber +
              " à " +
              hour +
              ":" +
              minutes}
          </h5>
          <h5 className="flex-1 mb-2 text-2xl font-bold tracking-tight text-white max-w-[100%] m-auto">
            {match.home_team}
          </h5>
          <div className="flex flex-wrap text-center items-center w-fit m-auto">
            <CountryFlag teamName={match.home_team} />
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white max-w-[100%]">
              {" "}
              - VS -{" "}
            </h5>
            <CountryFlag teamName={match.away_team} />
          </div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white max-w-[100%]">
            {match.away_team}
          </h5>

          <div className="flex justify-between my-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default Matchesonly;
