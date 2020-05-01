import React, { useState } from "react";
import Map from "pigeon-maps";

import useWindowSize from "./useWindowSize";
import Logo from "./Logo";
import analytics from "./analytics";

import "./Menu.scss";

function mapTilerProvider(x, y, z, dpr) {
  const s = String.fromCharCode(97 + ((x + y + z) % 3));
  return `https://${s}.basemaps.cartocdn.com/dark_nolabels/${z}/${x}/${y}${
    dpr >= 2 ? "@2x" : ""
  }.png`;
}

const Menu = ({ active, setActive, resetState, setCustom, custom }) => {
  const [width, height] = useWindowSize();
  const [details, showDetails] = useState(false);

  const toggleDetails = (event) => {
    showDetails(!details);
    event.preventDefault();
  };

  const onPlayClick = async () => {
    analytics("play");
    setCustom(false);
    await resetState();
    setActive(false);
  };

  const onCustomPlayClick = async () => {
    analytics("play_custom");
    setCustom(true);
    await resetState();
    setActive(false);
  };

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
                Ikony alertów przez{" "}
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
        </div>
      </div>
    </div>
  );
};

export default Menu;
