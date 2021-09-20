import React, { memo } from "react";

const Legal = ({ details, toggleDetails }) => (
  <div className="legal">
    <p>
      Gra zawiera elementy mogące podlegagać prawom autorskim. Użycie na
      warunkach dozwolonego użytku publiczego w celu uświadomienia społeczeństwa
      na zagrożenia propagandy uprawianej przez państwową telewizję i rząd.
    </p>
    <p>
      Strona nie ma związku z tvp, celem jest parodia, pastisz i karykatura
      propagandy. Część wydarzeń w grze jest fikcją - wszelkie podobieństwo do
      żyjących postaci jest przypadkowe.
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
          Mapy{" "}
          <a
            href="https://pigeon-maps.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pigeon
          </a>{" "}
          na licencji © autorzy{" "}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenStreetMap
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
          W przypadku jakichkolwiek zatrzeżeń, proszę o kontakt podany poniżej.
        </p>
      </div>
    )}
    <p className="contact">
      Kontakt:{" "}
      <a href="mailto:koronakrulow@ciunkos.com">koronakrulow@ciunkos.com</a>
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
);

export default memo(Legal);
