import { useEffect, useState } from "react";
import VoteCards from "../../components/votes/VoteCards";
import cookie from "cookie";
import jwt_decode from "jwt-decode";
import Context from "../../context/UserContext";
import { useContext } from "react";
import Head from "next/head";
import countryFlagEmoji from "country-flag-emoji";
import getScore from "../../context/getScore";

export default function votePage({ token }) {
  const [dataGames, setDataGames] = useState(null);
  const [dataGamesError, setDataGamesError] = useState(null);
  const [dataVotes, setDataVotes] = useState(null);
  const [dataVotesError, setDataVotesError] = useState(null);
  const { username, signIn, admin, newadmin } = useContext(Context);

  useEffect(() => {
    //define url if localhost for dev or
    let url = "";
    let tokenUsername = null;
    if (typeof token !== "undefined" && !username) {
      //page reaload -> restore username from cookie and fetch the score from api
      var decode = jwt_decode(token);
      tokenUsername = decode.username;
      if (decode.is_admin == true) {
        console.log("test " + decode.is_admin)
        newadmin();
      }
    }

    if (
      !window.location.origin.includes("3000") &&
      window.location.hostname == "localhost"
    ) {
      url = "http://localhost/api";
    } else if (
      window.location.hostname == "localhost" &&
      window.location.origin.includes("3000")
    ) {
      url = "http://localhost:8080";
    } else {
      url = window.location.origin + "/api";
    }

    // fetch games data
    const gamesDataFetch = async () => {
      if (tokenUsername) {
        //user has been restored from cookie, now restore the score
        const scoreUser = await getScore(url, tokenUsername);
        signIn(decode.username, scoreUser);
      }

      const games = await (
        await fetch(url + "/games/", {
          withCredntials: true,
          credentials: "include",
        })
      ).json();
      const votes = await (
        await fetch(url + "/votes/", {
          withCredntials: true,
          credentials: "include",
        })
      ).json();
      // set state when the data received
      if (games.status === "success") {
        setDataGames(games.msg);
      } else {
        setDataGamesError("Cannot load the data for the games... Try later.");
      }
      if (votes.status === "success") {
        setDataVotes(votes.msg);
      } else {
        setDataVotesError(
          "Cannot load the votes for the user... Save your votes first or try later."
        );
      }
    };

    gamesDataFetch();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 content-start">
      <Head>
        <title>Vote</title>
      </Head>
      {dataGames ? (
        dataGames.map((match, index) => {
          return (
            <div className="p-2 inline" key={match.match_id}>
              <VoteCards
                match={match}
                key={match.match_id}
                dataVote={
                  dataVotes
                    ? dataVotes.filter((vote) => vote.game_ID == match.match_id)
                    : []
                }
              />
            </div>
          );
        })
      ) : dataGamesError ? (
        <p>{dataGamesError}</p>
      ) : null}
    </div>
  );
}

votePage.getInitialProps = ({ req, res }) => {
  const data = cookie.parse(req ? req.headers.cookie || "" : document.cookie);

  return {
    token: data.token,
  };
};
