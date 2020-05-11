import React from "react";

import e0Image from "./events/e0.jpg";
import e1Image from "./events/e1.jpg";
import e2Image from "./events/e2.jpg";
import e3Image from "./events/e3.jpg";
import e4Image from "./events/e4.jpg";
import e5Image from "./events/e5.jpg";
import e6Image from "./events/e6.jpg";
import e7Image from "./events/e7.jpg";
import e8Image from "./events/e8.jpg";
import e9Image from "./events/e9.jpg";
import e10Image from "./events/e10.jpg";
import e11Image from "./events/e11.jpg";
import e12Image from "./events/e12.jpg";
import e13Image from "./events/e13.jpg";
import e14Image from "./events/e14.jpg";
import e15Image from "./events/e15.jpg";
import e16Image from "./events/e16.jpg";
import e17Image from "./events/e17.jpg";
import e18Image from "./events/e18.jpg";
import e19Image from "./events/e19.jpg";
import { submitLeaderboards } from "./leaderboards";

const createEvent = (title, logEntry, effect, options) => ({
  title,
  logEntry,
  effect,
  ...options,
});

export const e0 = createEvent(
  "Koronawirus dotarł do Polski",
  "Podczas konferencji prasowej minister zdrowia Łukasz Szumowski przekazał, że w Polsce pojawił się pierwszy, potwierdzony przypadek koronawirusa.",
  (state) => {},
  { image: e0Image }
);

export const e1 = createEvent(
  "Brakuje pieniędzy w budżecie",
  "Dziura w budżecie nie pozwala na dalszą walkę z COVID-19!",
  (state) => {},
  { image: e1Image }
);

export const e2 = createEvent(
  "Gospodarka Polski upadła",
  "Gospodarka w stanie agonii. Nie ma kto, gdzie i jak pracować!",
  (state) => {},
  { image: e2Image }
);

export const e3 = createEvent(
  "Kolaps polityki socjalnej rządu",
  "Ludzie przywiązani do pomocy państwa nie wiedzą co robić.",
  (state) => {},
  { image: e3Image }
);

export const e4 = createEvent(
  "Służba zdrowia pod respiratorem",
  "Służba zdrowia umarła. Nie ma kto i jak leczyć chorych.",
  (state) => {},
  { image: e4Image }
);

export const e5 = createEvent(
  "Protesty i zamieszki w całym kraju",
  "Rozwścieczeni ludzie wyszli na ulice! Sklepy padają łupem plądrujących.",
  (state) => {},
  { image: e5Image }
);

export const e6 = createEvent(
  "Prezes rozważa rozwiązanie Partii",
  "PiS utracił poparcie najtwardszego elektoratu.",
  (state) => {},
  { image: e6Image }
);

export const e7 = createEvent(
  "Pierwsza ofiara koronawirusa",
  "Zmarł pierwszy pacjent chory na koronawirusa. Miał choroby współistniejące.",
  (state) => {},
  { image: e7Image }
);

export const e8 = createEvent(
  "Cały rząd podał się do dymisji!",
  "Wotum nieufności dla całego rządu! Polska pogrążona w ruinie!",
  (state) => {},
  { image: e8Image }
);

export const e9 = createEvent(
  "Pandemia koronawirusa opanowana!",
  "Wysiłek tysięcy Polaków powstrzymał wirusa w ryzach!",
  (state) => {},
  { image: e9Image }
);

export const e10 = createEvent(
  "Andrzej Duda wybrany na kolejną kadencję",
  "Rekordowy wynik kandydata PiS - nikt nie zagłosował na innego kandydata!",
  (state) => {},
  { image: e10Image }
);

export const e11 = createEvent(
  "Szczepionka wynaleziona",
  "Polscy naukowcy w pocie czoła opracowali skuteczną szczepionkę przeciw koronawirusowi!",
  (state) => {},
  { image: e11Image }
);

export const e12 = createEvent(
  "Lek na koronawirusa darem od Boga",
  "Chorzy wracają szybciej do zdrowia. Wysiłek rządu i medyków przyniósł efekty!",
  (state) => {},
  { image: e12Image }
);

export const e13 = createEvent(
  "Policja zmienia oficjalnie nazwę",
  "Policja zrzuca maskę i przyjmuje prawdziwą formę. Powrót do korzeni.",
  (state) => {},
  { image: e13Image }
);

export const e14 = createEvent(
  "Dziękuję za grę!",
  "Cieszę się że zagrałeś/aś w Koronę Krulów! Podziel się w sieci #koronakrulow i #wylacztvpis póki jeszcze możesz! Podpisano: Poczta Polska",
  (state) => {},
  { image: e14Image }
);

export const e15 = createEvent(
  "Rząd wprowadza stan epidemii",
  "Spodziewać należy się ograniczeń w przemieszczaniu się i skupienia działań rządu na walce z wirusem.",
  (state) => {},
  { image: e15Image }
);

export const e16 = createEvent(
  "Stan wyjątkowy wprowadzony",
  "Rząd szykuje się do wprowadzenia restrykcji uderzających w wolność człowieka.",
  (state) => {},
  { image: e16Image }
);

export const e17 = createEvent(
  "Kaczyński wprowadza stan wojenny",
  "Naczelny Wódz przejmuje władzę. Protesty krwawo tłumione.",
  (state) => {},
  { image: e17Image }
);

const url = "https://koronakrulow.pl";
const encodedUrl = encodeURIComponent(url);
const text =
  "Satyryczna gra o koronawirusie, polskiej polityce i propagandzie #TVPiS. Poczuj się jak Prezes i pokieruj Polską w dobie pandemii!";
const encodedText = encodeURIComponent(text);

export const e18 = createEvent(
  "Podziel się Koroną!",
  "Twoje wsparcie pozwoli otworzyć oczy Twoim znajomym i rodzinie na otaczającą Nas propagandę.",
  (state) => {},
  {
    image: e18Image,
    imageWidth: 1280,
    imageHeight: 540,
    content: (
      <div className="extra-actions">
        <a
          className="button"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Udostępnij na Facebooku
        </a>
        <a
          className="button"
          href={`https://twitter.com/share?url=${encodedUrl}&text=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Podziel się na Twitterze
        </a>
      </div>
    ),
  }
);

const onInputFocus = (event) => {
  try {
    event.target.select();
  } catch (error) {
    console.error(error);
  }
};

export const e19 = createEvent(
  "Dopisz się do rankingu",
  "To łatwiejsze niż dopisanie się do spisu wyborców!",
  (state) => {},
  {
    image: e19Image,
    postAction: async ({ day, dead, recovered, reported, win: won }) => {
      let name = "Anonim";
      try {
        const nameElement = document.getElementById("leaderboards-name");

        name = nameElement.value;
      } catch (error) {
        console.error(error);
      }

      try {
        submitLeaderboards({
          day,
          dead,
          name,
          recovered,
          reported,
          won,
        });
      } catch (error) {
        console.error(error);
      }
    },
    content: (
      <div className="extra-actions">
        <label>
          Wpisz imię lub ksywkę:
          <input
            autoFocus
            defaultValue="Anonim"
            id="leaderboards-name"
            maxLength={18}
            onFocus={onInputFocus}
            type="text"
          />
        </label>
      </div>
    ),
  }
);
