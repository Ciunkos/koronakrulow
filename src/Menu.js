import { exact } from "@sandstreamdev/std/array";
import { clamp } from "@sandstreamdev/std/math";
import { classNames } from "@sandstreamdev/std/web";
import React, { useState, useEffect } from "react";
import Map from "pigeon-maps";

import useWindowSize from "./useWindowSize";
import Logo from "./Logo";
import analytics from "./analytics";
import StatusBar from "./StatusBar";
import formatLongDisplayDateWithOffsetWithOffset from "./formatLongDisplayDateWithOffset";
import * as randomPropaganda from "./random";
import * as actions from "./actions";
import * as events from "./events";
import useApi from "./useApi";
import { LEADERBOARDS_ENDPOINT } from "./leaderboards";

import "./Menu.scss";

const SHOW_LEADERBOARD = true;

function mapTilerProvider(x, y, z, dpr) {
  const s = String.fromCharCode(97 + ((x + y + z) % 3));
  return `https://${s}.basemaps.cartocdn.com/dark_nolabels/${z}/${x}/${y}${
    dpr >= 2 ? "@2x" : ""
  }.png`;
}

const LEADERBOARD_RANGE = 5;

const padded = [undefined, undefined, undefined, undefined, undefined];

const Menu = ({ active, setActive, resetState, custom, progress }) => {
  const [width, height] = useWindowSize();
  const [details, showDetails] = useState(false);
  const [daily, setDaily] = useState(true);
  const [wonTake, setWonTake] = useState(LEADERBOARD_RANGE);
  const [lostTake, setLostTake] = useState(LEADERBOARD_RANGE);

  const toggleDetails = (event) => {
    event.preventDefault();
    event.stopPropagation();

    showDetails(!details);
  };

  const onPlayClick = async () => {
    analytics("play");
    await resetState(false);
    setActive(false);
  };

  const onCustomPlayClick = async () => {
    analytics("play_custom");
    await resetState(true);
    setActive(false);
  };

  const [leaderboardsSource, { busy, refetch }] = useApi(LEADERBOARDS_ENDPOINT);

  useEffect(() => {
    if (active && !busy) {
      refetch();
    }
  }, [active]);

  const leaderboards = leaderboardsSource ?? {
    daily: { won: padded, lost: padded },
    allTime: { won: padded, lost: padded },
  };

  const rankingSource = daily ? leaderboards.daily : leaderboards.allTime;

  const hasMoreWon = rankingSource.won.length > wonTake;
  const hasMoreLost = rankingSource.lost.length > lostTake;

  const showMoreLost = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setLostTake(lostTake + 5 * LEADERBOARD_RANGE);
  };

  const showMoreWon = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setWonTake(wonTake + 5 * LEADERBOARD_RANGE);
  };

  const {
    won = 0,
    lost = 0,
    games = 0,
    unlockedActions = [],
    unlockedEvents = [],
    unlockedStripes = [],
  } = progress;

  const leaderboardsWonSource = exact(
    clamp(
      LEADERBOARD_RANGE,
      Math.max(LEADERBOARD_RANGE, rankingSource.won.length)
    )(wonTake)
  )(rankingSource.won);

  const leaderboardsLostSource = exact(
    clamp(
      LEADERBOARD_RANGE,
      Math.max(LEADERBOARD_RANGE, rankingSource.lost.length)
    )(lostTake)
  )(rankingSource.lost);

  return (
    <div className={active ? "backdrop active" : "backdrop"}>
      <div className="map">
        <Map
          provider={mapTilerProvider}
          dprs={[1, 2]}
          center={[52.06, 19.25]}
          zoom={6.5}
          width={width}
          height={height}
        />
      </div>
      <div className="menu">
        <Logo />
        <div className="options">
          <div>
            <button onClick={onPlayClick}>Graj</button>
            <div className="hint">
              Rozpocznij walkę z koronawirusem i sprawdź się w zarządzaniu
              państwem w czasie pandemii
            </div>
          </div>
          {/* <div>
            <button onClick={onQuickPlayClick}>Szybka gra</button>
            <div className="hint">
              Szybka gra rozpoczyna się od przybliżonego stanu na stan
              dzisiejszy
            </div>
          </div> */}
          <div>
            <button disabled={!custom} onClick={onCustomPlayClick}>
              Gra dowolna
            </button>
            <div className="hint">
              Gra dowolna pozwala wybierać akcje z wszystkich dostępnych opcji
            </div>
            {!custom && (
              <div className="requirement">
                Opanuj epidemię w trybie klasycznym aby odblokować
              </div>
            )}
          </div>
        </div>
        <section>
          <h3>Twój postęp</h3>
          <div className="progress-list">
            <div className="progress-box">
              <div className="progress-title">Opanowane epidemie</div>
              <div className="progress-value">{won}</div>
            </div>
            <div className="progress-box">
              <div className="progress-title">Rozwiązanie rządy</div>
              <div className="progress-value">{lost}</div>
            </div>
            <div className="progress-box">
              <div className="progress-title">Rozgrywki</div>
              <div className="progress-value">{games}</div>
            </div>
            <div className="progress-box">
              <div className="progress-title">Odblokowane paski</div>
              <div className="progress-value">
                {unlockedStripes.length}/
                {Object.keys(randomPropaganda).length +
                  Object.keys(actions).length}
              </div>
            </div>
            <div className="progress-box">
              <div className="progress-title">Odblokowane akcje</div>
              <div className="progress-value">
                {unlockedActions.length}/{Object.keys(actions).length}
              </div>
            </div>
            <div className="progress-box">
              <div className="progress-title">Odblokowane wydarzenia</div>
              <div className="progress-value">
                {unlockedEvents.length}/{Object.keys(events).length}
              </div>
            </div>
          </div>
        </section>
        {SHOW_LEADERBOARD && (
          <section>
            <h3>Ranking</h3>
            <div className="tabs">
              <a
                href="#"
                className={classNames("tab", { active: daily })}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();

                  setDaily(true);
                }}
              >
                Dzisiaj
              </a>
              <a
                href="#"
                className={classNames("tab", { active: !daily })}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();

                  setDaily(false);
                }}
              >
                Łączny
              </a>
            </div>
            <div className="leaderboards">
              <div>
                <h4>Najszybciej opanowana epidemia</h4>
                <div className="leaderboard-entries">
                  {leaderboardsWonSource.map((entry, index) => {
                    if (entry) {
                      const { name, reported, recovered, dead, day } = entry;
                      return (
                        <div className="leaderboard-entry" key={index}>
                          <div>
                            {index + 1}.{" "}
                            <span className="entry-name">{name}</span>,{" "}
                            <span>
                              {formatLongDisplayDateWithOffsetWithOffset(day)}
                            </span>
                          </div>
                          <StatusBar
                            reported={reported}
                            dead={dead}
                            recovered={recovered}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div className="leaderboard-entry empty" key={index}>
                          <div>-</div>
                        </div>
                      );
                    }
                  })}
                </div>
                {hasMoreWon && (
                  <a href="#" onClick={showMoreWon}>
                    Pokaż więcej
                  </a>
                )}
              </div>
              <div>
                <h4>Najszybciej rozwiązany rząd</h4>
                <div className="leaderboard-entries">
                  {leaderboardsLostSource.map((entry, index) => {
                    if (entry) {
                      const { name, reported, recovered, dead, day } = entry;
                      return (
                        <div className="leaderboard-entry" key={index}>
                          <div>
                            {index + 1}.{" "}
                            <span className="entry-name">{name}</span>,{" "}
                            <span>
                              {formatLongDisplayDateWithOffsetWithOffset(day)}
                            </span>
                          </div>
                          <StatusBar
                            reported={reported}
                            dead={dead}
                            recovered={recovered}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div className="leaderboard-entry empty" key={index}>
                          <div>-</div>
                        </div>
                      );
                    }
                  })}
                </div>
                {hasMoreLost && (
                  <a href="#" onClick={showMoreLost}>
                    Pokaż więcej
                  </a>
                )}
              </div>
            </div>
          </section>
        )}
        <div className="legal">
          <p>
            Gra zawiera elementy mogące podlegagać prawom autorskim. Użycie na
            warunkach dozwolonego użytku publiczego w celu uświadomienia
            społeczeństwa na zagrożenia propagandy uprawianej przez państwową
            telewizję i rząd.
          </p>
          <p>
            Strona nie ma związku z tvp, celem jest parodia, pastisz i
            karykatura propagandy. Część wydarzeń w grze jest fikcją - wszelkie
            podobieństwo do żyjących postaci jest przypadkowe.
          </p>
          <a href="#" onClick={toggleDetails}>
            {!details
              ? "Pokaż informacje o prywatności i licencjach"
              : "Ukryj informacje o prywatności i licencjach"}
          </a>
          {details && (
            <div className="legal-details">
              <p>
                Aplikacja rejestruje w pełni anonimowe statystyki o przebiegu
                rozgrywki i źródła wejść na stronę - dowiedz się więcej na{" "}
                <a href="https://docs.simpleanalytics.com/what-we-collect">
                  stronie usługodawcy
                </a>
                .
              </p>
              <p>Część użytych obrazów znajduje się w domenie publicznej.</p>
              <p>
                Obraz{" "}
                <a
                  href="http://goorsky.pl/nowy-banknot-500/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  banknotu 500+
                </a>{" "}
                na indywidualnej licencji od autora.
              </p>
              <p>
                Muzyka{" "}
                <a
                  href="https://incompetech.filmmusic.io/song/4490-the-descent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  The Descent by Kevin MacLeod
                </a>{" "}
                na licencji{" "}
                <a
                  href="http://creativecommons.org/licenses/by/4.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CC BY 4.0
                </a>
                .
              </p>
              <p>
                Ikony stworzone przez{" "}
                <a
                  href="https://www.flaticon.com/authors/freepik"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Freepik"
                >
                  Freepik
                </a>{" "}
                i{" "}
                <a
                  href="https://www.flaticon.com/authors/those-icons"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Those Icons"
                >
                  Those Icons
                </a>{" "}
                dla{" "}
                <a
                  href="https://www.flaticon.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Flaticon"
                >
                  www.flaticon.com
                </a>{" "}
                oraz przez{" "}
                <a
                  href="https://www.iconfinder.com/becris"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="becris"
                >
                  becris
                </a>{" "}
                na licencji{" "}
                <a
                  href="https://creativecommons.org/licenses/by-sa/3.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CC BY-SA 3.0
                </a>
                .
              </p>
              <p>Zasoby ze stocków:</p>
              <ul>
                <li>
                  Obraz leku przez Belova59 na{" "}
                  <a
                    href="https://pixabay.com/pl/photos/laboratory-medical-medicine-r%C4%99ka-3827738/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    pixabay
                  </a>
                  .
                </li>
                <li>
                  Obraz policjanta przez Robert_z_Ziemi na{" "}
                  <a
                    href="https://www.needpix.com/photo/1029329/police-surveillance-control-video-monitoring-officer-camera-equipment-cop"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Needpix
                  </a>
                  .
                </li>
              </ul>
              <p>
                Ikony alertów i kontrolek przez{" "}
                <a
                  href="https://github.com/tabler/tabler-icons"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  tabler-icons
                </a>{" "}
                na{" "}
                <a
                  href="https://github.com/tabler/tabler-icons/blob/master/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  licencji MIT.
                </a>
              </p>
              <p>
                Ikony przewiń i stop przez{" "}
                <a
                  href="https://github.com/feathericons/feather"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  feathericons
                </a>{" "}
                na{" "}
                <a
                  href="https://github.com/feathericons/feather/blob/master/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  licencji MIT.
                </a>
              </p>
              <p>
                Zdjęcia przez Daana Stevensa oraz Natanael Melchor na{" "}
                <a
                  href="https://unsplash.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Unsplashu
                </a>
                .
              </p>
              <p>
                W przypadku jakichkolwiek zatrzeżeń, proszę o kontakt podany
                poniżej.
              </p>
            </div>
          )}
          <p className="contact">
            Kontakt:{" "}
            <a href="mailto:koronakrulow@ciunkos.com">
              koronakrulow@ciunkos.com
            </a>
          </p>
          <p className="contact">
            Śledź Koronę Krulów na{" "}
            <a
              href="https://www.facebook.com/koronakrulow"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebooku
            </a>{" "}
            i{" "}
            <a
              href="https://twitter.com/koronakrulow"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitterze
            </a>
            !
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
