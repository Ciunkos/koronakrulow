const createAction = (title, logEntry, effect, options) => ({
  title,
  logEntry,
  effect,
  ...options,
});

export const a1 = createAction(
  "Zamknij granice",
  "Polska izoluje się od napływu zarazy od sąsiadów.",
  (state) => {
    state.bordersClosed = true;
    state.economy -= 3;
    state.people += 1;
    state.contactsPerDay *= 0.8;
  },
  {
    message: "Granice Polski bezpieczne",
    strip:
      "▪ Pierwszy przypadek koronawirusa potwierdzony ▪ Zakażony mężczyzna przebywa na oddziale zakaźnym w Zielonej Górze i czuje się dobrze ▪ 65 letni mieszkaniec województwa lubuskiego zgłosił się do lekarza po powrocie z Niemiec.",
  }
);

export const a2 = createAction(
  "Wprowadź godziny dla seniorów",
  "Wprowadzenie godzin dla seniorów",
  (state) => {
    state.contactsPerDay *= 0.9;
    state.politics += 1;
    state.people -= 1;
  },
  {
    message: "Rząd dba o babcie, dziadków, mamy, ojców",
  }
);

export const a3 = createAction(
  "Zamknij wszystkie placówki oświatowe i szkoły wyższe",
  "Powinniśmy się wystrzegać dużych skupisk ludzkich. Podjęliśmy decyzję o zamknięciu wszystkich placówek oświatowych - poinformował w premier Mateusz Morawiecki.",
  (state) => {
    state.contactsPerDay *= 1.1;
    state.people += 2;
  },
  { message: "Szkoły zamknięte dla dobra uczniów i nauczycieli" }
);

export const a4 = createAction(
  "Wprowadź obowiązek zakrywania twarzy w miejscach publicznych",
  "Wprowadzenie obowiązku zakrywania twarzy w miejscach publicznych.",
  (state) => {
    state.infectionProbability *= 0.75;
  },
  { message: "Szumowski: Od dziś maseczki doustnie" }
);

export const a5 = createAction(
  "Zaleć dokładne mycie rąk",
  "Higiena podstawą walki z wirusem. Czy Polacy mają sobie coś do zarzucenia?",
  (state) => {
    state.infectionProbability *= 0.95;
  },
  { message: "Polacy najczystszym narodem świata" }
);

export const a6 = createAction(
  "Wstrzymaj wypłaty programu 500+",
  "Brak szans na wygranie kolejnych wyborów. Wyborcy PiS pozostawieni na lodzie.",
  (state) => {
    state.budget += 5;
    state.economy += 2;
    state.social -= 6;
    state.people -= 5;
    state.politics -= 7;
  },
  { message: "Opozycja blokuje wypłaty 500+" }
);

export const a7 = createAction(
  "Śledź obywateli z pomocą operatorów GSM",
  "Rozpoczęto śledzenie przemieszczania się obywateli za pomocą operatorów GSM.",
  (state) => {
    state.contactsPerDay *= 0.5;
    state.people -= 3;
    state.politics -= 1;
  },
  { message: "Bezpieczeństwo Polaków priorytetem rządu" }
);

export const a8 = createAction(
  "Rozpocznij fałszowanie statystyk",
  "Większość nowych zgonów klasyfikowana jest jako choroby powiązane.",
  (state) => {
    state.people += 1;
    state.politics -= 1;
    state.detectionRate -= 2;
  },
  { message: "Śmiertelność w Polsce mniejsza niż na świecie" }
);

export const a9 = createAction(
  "Rozpocznij produkcję płynu odkażającego przez PKN Orlen",
  "Orlen rozpoczyna produkcję płynu odkażającego. Od dziś dostępny na stacjach jako dodatek do hotdoga.",
  (state) => {
    state.infectionProbability *= 0.9;
    state.healthcare += 1;
    state.people += 1;
  },
  { message: "Polski płyn dla każdego Polaka" }
);

export const a10 = createAction(
  "Zakup dodatkowe respiratory",
  "Rząd kupuje nowe respiratory z Chin - opozycja pyta czy są sprawne.",
  (state) => {
    state.healthcare += 2;
    state.budget -= 2;
    state.icus += 1;
  },
  { message: "Rząd wpiera szpitale lepiej niż WOŚP" }
);

// https://www.pb.pl/urzednicy-moga-masowo-tracic-prace-987764
export const a11 = createAction(
  "Zredukuj zatrudnienie w administracji",
  "Zwolnienia w administracji planem na zdobycie środków na walkę z COVID-19.",
  (state) => {
    state.budget += 2;
    state.social -= 1;
    state.politics -= 4;
  },
  { message: "Rozdmuchana administracja winą PO" }
);

export const a12 = createAction(
  "Wypłać dodatek opiekuńczy dla matek",
  "Rząd wypłaca dodatkowy zasiłek opiekuńczy i podnosi standard życia.",
  (state) => {
    state.budget -= 5;
    state.social += 2;
    state.politics += 2;
    state.people += 1;
  },
  { message: "Rząd wspiera matki, opozycja krytykuje" }
);

export const a13 = createAction(
  "Wprowadź ograniczenia w komunikacji publicznej",
  "Poruszanie się komunikacją publiczną ograniczone aby zmniejszyć rozprzestrzenianie się wirusa.",
  (state) => {
    state.contactsPerDay *= 0.9;
  },
  { message: "Polacy bezpiezcznie dojeżdzają do pracy" }
);

export const a14 = createAction(
  "Wprowadź zakaz zgromadzeń publicznych",
  "Zgromadzenia publiczne zakazane (nie dotyczy władzy).",
  (state) => {
    state.contactsPerDay *= 0.75;
    state.people -= 3;
  },
  { message: "Zbiorowiska miejscem agitacji opozycji" }
);

export const a15 = createAction(
  "Wprowadź zakaz gromadzenia się w miejscach kultu religijnego",
  "Kościoły zamknięte do odwołania - kuria oburzona!",
  (state) => {
    state.contactsPerDay *= 0.75;
    state.politics -= 5;
    state.people -= 2;
  },
  { message: "Modlitwa z TVP codziennie o godz. 20:00" }
);

export const a16 = createAction(
  "Wprowadź przymusową kwarantannę osób powracających z zagranicy",
  "Osoby powracające z zagranicy muszą odbyć dwutygodniową kwarantannę domową.",
  (state) => {
    state.contactsPerDay *= 0.75;
    state.politics += 1;
    state.people -= 2;
    state.economy -= 2;
  },
  {
    message: "Folksdojcze źródłem zarazy",
  }
);

export const a17 = createAction(
  "Wprowadź ograniczenia w branży gastronomicznej",
  "Posiłki tylko na dowóz i na wynos sprawiają że Uber eliminuje taksówkarzy z rynku.",
  (state) => {
    state.contactsPerDay *= 0.9;
    state.politics -= 1;
    state.people -= 1;
    state.economy -= 2;
  },
  { message: "Żony chwyciły za patelnie" }
);

export const a18 = createAction(
  "Zamknij galerie handlowe",
  "Galerie handlowe zostają zakmnięte - młodzież nie wie co ze sobą zrobić.",
  (state) => {
    state.contactsPerDay *= 0.6;
    state.people -= 3;
    state.economy -= 4;
  },
  { message: "Prywaciarze wrogiem społeczeństwa dobrobytu" }
);

export const a19 = createAction(
  "⭐ Upamiętnij katastrofę smoleńską",
  "Prezes złożył hołd ofiarom brata.",
  (state) => {
    state.people -= 3;
    state.politics += 3;

    // if (Math.random() <= 1 / 4) {
    //   const prezes = new Agent();
    //   prezes.infected = true;

    //   state.agents.push(prezes);
    // }
  },
  {
    message: "Pamiętamy o naszych bohaterach!",
    customFilter: (state) => state.day === 43,
    special: true,
  }
);

export const a20 = createAction(
  "Zakaż przeprowadzania aborcji",
  "Kryzys w sieci po zakazaniu aborcji #PiekłoKobiet #StrajkKobiet",
  (state) => {
    state.people -= 4;
    state.politics += 6;
    state.healthcare -= 1;
  },
  {
    message: "Ruch Kobiet z logiem Hitler Jugend",
  }
);

// https://www.wykop.pl/wpis/48801433/w-wiadomosci-tvpis-jest-tyle-propagandy-do-upchnie/
export const a21 = createAction(
  "Oskarż TVN o atak na Prezesa",
  'W "Wiadomościach" skrytykowano materiały "Faktów" w negatywnym tonie opisujące wizytę Jarosława Kaczyńskiego na warszawskim cmentarzu.',
  (state) => {
    state.people -= 3;
    state.politics += 3;
  },
  {
    message: "TVN - fabryka fake newsów?",
  }
);

export const a22 = createAction(
  "Zmień prezesa Poczty Polskiej",
  'W "Wiadomościach" skrytykowano materiały "Faktów" w negatywnym tonie opisujące wizytę Jarosława Kaczyńskiego na warszawskim cmentarzu.',
  (state) => {
    state.people -= 3;
    state.politics += 3;
  },
  { message: "Poprzedni prezes miał pradziadka w PZPR" }
);

export const a23 = createAction(
  "Spacifikuj strajk przedsiębiorców",
  "Przedsiębiorcy zamiast wsparcia dostają pałkami policyjnymi.",
  (state) => {
    state.politics += 1;
    state.economy -= 5;
    state.people -= 2;
  },
  { message: "Rząd ucina rękę podniesioną na władzę" }
);

export const a24 = createAction(
  "Wstrzymaj finansowanie WHO",
  "WHO nie dostanie ani grosza od rządu Polski.",
  (state) => {
    state.budget += 2;
    state.politics -= 1;
  },
  { message: "Polska nie dołoży ani grosza do finansowania WHO" }
);

export const a25 = createAction(
  "Wprowadź kartki żywnościowe",
  "Część Polaków wita PRL z radością.",
  (state) => {
    state.budget += 1;
    state.economy -= 4;
    state.social += 4;
  },
  { message: "Polacy z sentymentem witają nowe czasy" }
);

export const a26 = createAction(
  "Wprowadź testy przesiewowe na koronawirusa",
  "Polacy częściej badani przeciw COVID-19. Zaskakująco dużo wcześniej niewykrytych przypadków.",
  (state) => {
    // TODO: Observe more people
    state.infectionProbability *= 0.8;
    state.budget -= 1;
    state.economy += 1;
    state.people += 1;
    state.healthcare += 2;
  },
  { message: "Rekordowa ilość przeprowadzanych testów" }
);

export const a27 = createAction(
  "Zwiększ kary za naruszenie rozporządzeń",
  "Wysokie kary sprawiają że Polacy pozostają w domach.",
  (state) => {
    state.budget += 3;
    state.people -= 3;
    state.contactsPerDay *= 0.9;
  },
  { message: "Potencjalni mordercy surowo karani" }
);

export const a28 = createAction(
  "Zmniejsz wydatki na górnictwo",
  "Związkowcy zapowiadają prostesty!",
  (state) => {
    state.budget += 5;
    state.people += 3;
    state.politics -= 5;
  },
  { message: "Upadek górnictwa winą poprzedniego rządu" }
);

export const a29 = createAction(
  "Wprowadź kontrole drogowe",
  "Drogówka kontroluje jak obywatele dostosowują się do nowych przepisów ograniczających możliwość przemieszczania i grupowania się osób. Funkcjonariusze sprawdzają zarówno środki komunikacji publicznej, jak i prywatne samochody osobowe.",
  (state) => {
    state.budget += 2;
    state.contactsPerDay *= 0.9;
    state.policeAuthority -= 1;
  },
  { message: "Kontrola podstawą zaufania" }
);

export const a30 = createAction(
  "Znieś zakaz handlu w niedziele",
  "Otwarcie sklepów w niedziele. Solidarność i kościół przeciwne!",
  (state) => {
    state.contactsPerDay *= 1.1;
    state.economy += 4;
    state.people += 3;
    state.politics -= 4;
  },
  { message: "Rząd idzie na ustępstwa w dobie kryzysu" }
);

export const a31 = createAction(
  "Rozpocznij sprzedaż maseczek przez Pocztę Polską",
  "Poczta Polska poszerza asortyment. Maseczki obok pluszaków i czekoladek!",
  (state) => {
    state.infectionProbability *= 0.9;
    state.economy += 1;
    state.people += 1;
    state.politics -= 1;
    state.budget += 2;
  },
  { message: "Narodowe firmy fundamentem ekonomii" }
);

export const a32 = createAction(
  "Zapewnij opiekę psychologów osobom w ciężkiej sytuacji",
  "Rząd wspiera osoby dotknięte kryzysem.",
  (state) => {
    state.economy += 1;
    state.people += 1;
    state.social += 1;
    state.budget -= 1;
  },
  { message: "Psycholog+ programem rządowym" }
);

export const a33 = createAction(
  "Wprowadź kontrole paragonów",
  "Policjanci sprawdzają czy zakupy są konieczne. Wielu ukaranych za kupno piwa.",
  (state) => {
    state.people -= 3;
    state.contactsPerDay *= 0.9;
    state.policeAuthority -= 2;
  },
  { message: "Rozbito mafię paragonową" }
);

export const a34 = createAction(
  "Obniż stopy procentowe",
  "Więcej kredytów, ale jakim kosztem?",
  (state) => {
    state.economy += 1;
    state.budget += 1;
  },
  { message: "Bańka na rynku mieszkaniowym pęka" }
);

// https://natemat.pl/305631,spada-liczba-zakazen-koronawirusem-w-polsce-nie-to-efekt-liczby-testow
export const a35 = createAction(
  "Zmniejsz wykonywaną liczbę testów",
  "Ministerstwo Zdrowia po raz kolejny zanotowało drastyczny spadek przeprowadzonych testów na koronawirusa.",
  (state) => {
    state.people += 1;
    state.politics += 2;
    state.healthcare -= 1;
    state.detectionRate -= 2;
  },
  { message: "Polacy wystarczająco zdrowi" }
);

// https://echodnia.eu/radomskie/uwaga-w-radomiu-powstana-testy-na-koronawirusa-produkcja-ma-ruszyc-po-swietach/ar/c1-14915064
export const a36 = createAction(
  "Rozpocznij produkcję testów w Radomiu",
  "Radom stolicą polskiej technologii! Kolejny sukces polskiej stolicy innowacji.",
  (state) => {
    state.budget -= 2;
    state.people += 1;
    state.healthcare += 2;
    state.detectionRate += 1;
  },
  { message: "#kolejnaradom" }
);

// https://polskatimes.pl/policjanci-blokuja-myjnie-bezdotykowe-co-na-to-przepisy-czy-mozna-umyc-samochod-na-myjni-bezdotykowej/ar/c1-14915322
export const a37 = createAction(
  "Wprowadź kontrole myjni samochodowych",
  "Mycie samochodów wzmacnia rozprzestrzenianie się wirusa - potwierdzają badania rządu.",
  (state) => {
    state.budget += 1;
    state.contactsPerDay *= 0.99;
    state.people -= 2;
    state.policeAuthority -= 1;
  },
  { message: "Myjnie przyczyną suszy w Polsce" }
);

// https://www.wykop.pl/link/5446205/pekin-kontroluje-badania-o-pochodzeniu-koronawirusa/
export const a38 = createAction(
  "Wprowadź cenzurę badań nt. koronawirusa",
  "Rząd wprowadza cenzurę publikacji naukowych nt. koronawirusa. Środowiska naukowe protestują.",
  (state) => {
    state.politics += 3;
    state.people -= 1;
    state.healthcare -= 2;
  },
  { message: "Walka z fejk newsami w środowisku naukowym" }
);

export const a39 = createAction(
  "Wprowadź wzmożone kontrole osób przebywających na kwarantannie",
  "Policja sprawdza i nakłada kary na osoby naruszające zasady kwarantanny.",
  (state) => {
    state.people += 2;
    state.contactsPerDay *= 0.9;
    state.quarantineBreakProbability *= 0.5;
  },
  { message: "Policja sprawdza - zostań w domu" }
);

export const a40 = createAction(
  "Rozkaż policji karanie spacerowiczów",
  "Każdy spacerowicz to prawdopodobny morderca! Rząd nie ma skrupułów!",
  (state) => {
    state.people -= 4;
    state.contactsPerDay *= 0.7;
    state.politics -= 1;
    state.policeAuthority -= 2;
  },
  { message: "Policja poskramia niefrasobliwych obywateli" }
);

// https://www.wiesci24.pl/2020/04/12/kaczynski-boi-sie-ze-ludzie-przyjda-i-wyciagna-go-z-domu-20-funkcjonariuszy-pilnuje-wilii-prezesa-pis/
export const a41 = createAction(
  "Wzmóż ochronę posiadłości Prezesa",
  "20 funkcjonariuszy pilnuje, by nikt nie zakłócał spokoju prezesa PiS.",
  (state) => {
    state.people -= 2;
    state.politics += 3;
    state.policeAuthority -= 2;
  },
  { message: "Polacy ufają TVP i prezesowi Kaczyńskiemu" }
);

// https://www.rp.pl/Koronawirus-SARS-CoV-2/200419846-Von-der-Leyen-Osoby-starsze-moga-byc-izolowane-do-2021-roku.html
export const a42 = createAction(
  "Wprowadź izolację osób starszych",
  "Osoby starsze nie mogą wychodzić z domów dla ich bezpieczeństwa.",
  (state) => {
    state.people += 2;
    state.contactsPerDay *= 0.9;
    state.politics -= 3;
  },
  { message: "TVP spełnia potrzeby seniorów" }
);

// https://gazetawroclawska.pl/policyjny-helikopter-patroluje-miasto-takze-w-swieta/ar/c1-14914162?fbclid=IwAR0ul_sRfmp-WE4RS02uww2Rx0N_WZu5qqwfj7PBFHpN46UJaN-kSJn_F-8
export const a43 = createAction(
  "Rozpocznij patrolowanie miast helikopterami",
  "Policja patroluje plaże, łąki i lasy aby poskromić swawolnych spacerowiczów.",
  (state) => {
    state.budget -= 1;
    state.contactsPerDay *= 0.9;
  },
  { message: "Czujne oko rządu patrzy" }
);

export const a44 = createAction(
  "Rozpocznij patrolowanie miast dronami",
  "Policjanci każdego dnia latają dronami i sprawdzają, czy mieszkańcy przestrzegają obowiązujących przepisów.",
  (state) => {
    state.budget -= 1;
    state.contactsPerDay *= 0.9;
  },
  { message: "Polska technologia gwarantem bezpieczeństwa" }
);

// https://www.youtube.com/watch?v=U6yWljQk9A8
export const a45 = createAction(
  "Nakaż policji pilnowanie ogródków działkowych",
  "Uwaga! Uwaga! Przebywanie na działkach w celach rekreacyjnych jest zabronione!",
  (state) => {
    state.people -= 1;
    state.policeAuthority -= 1;
  },
  { message: "Polacy zadowoleni z pracy policji" }
);

// https://www.apple.com/pl/newsroom/2020/04/apple-and-google-partner-on-covid-19-contact-tracing-technology/
export const a46 = createAction(
  "Rozpocznij współpracę z Apple i Google w celach inwigilacji",
  "Rząd rozpoczyna współpracę z Wielkim Bratem.",
  (state) => {
    state.politics += 3;
    state.people -= 2;
    state.contactsPerDay *= 0.9;
  },
  { message: "Kto nie ma nic do ukrycia, nie ma się czego bać" }
);

export const a47 = createAction(
  "Wprowadź eksperymentalne leczenie chorych na COVID-19 lewoskrętną witaminą C",
  "Jerzy Zięba zostaje głównym doradcą Ministra Zdrowia.",
  (state) => {
    state.people -= 1;
    state.healthcare -= 8;
  },
  { message: "Jerzy Zięba patronem zdrowia Polski" }
);

export const a48 = createAction(
  "Wspomóż kościół bezzwrotną pożyczką",
  "Rząd przeznaczy fundusze na ratowanie ostoi polskości.",
  (state) => {
    state.people -= 2;
    state.politics += 5;
    state.budget -= 3;
  },
  { message: "Program Taca+ wchodzi w życie" }
);

export const a49 = createAction(
  "Mianuj Mariusza Ciarkę rzecznikiem rządu",
  "Bezcenne umiejętności rzecznika policji przydatne w kampanii prezydenckiej.",
  (state) => {
    state.people -= 5;
    state.politics += 5;
  },
  { message: "Obrońca polskości doceniony przez partię" }
);

// https://www.youtube.com/watch?v=81-KOMo6Uzc
export const a50 = createAction(
  "Wprowadź kontrole zamówień jedzenia",
  "Policja pyta - trójka co to jest - a jak nie to mandat!",
  (state) => {
    state.people -= 2;
    state.policeAuthority -= 1;
  },
  { message: "Rząd walczy z niezdrowym jedzeniem" }
);

// https://wroclaw.wyborcza.pl/wroclaw/7,35771,25857966,corka-marszalek-sejmu-prosi-o-pieniadze-w-internecie-pozwola.html
export const a51 = createAction(
  "Wesprzyj córkę Marszałek Sejmu",
  "W aktualniej sytuacji wielu Polaków wymaga pomocy Państwa.",
  (state) => {
    state.budget -= 2;
    state.politics += 1;
  },
  {
    message: "Rząd wspiera potrzebujących w dobie epidemii",
  }
);

// https://www.polsatnews.pl/wiadomosc/2020-04-08/komendant-glowny-policji-w-programie-gosc-wydarzen-transmisja-od-g-1915/
export const a52 = createAction(
  "Zezwól policji na grillowanie",
  "Przeniesienie? To za dużo. Policja za swoje zasługi powinna móć grillować do woli!",
  (state) => {
    state.policeAuthority -= 1;
  },
  { message: "Zziębnięci policjanci musieli się ogrzać" }
);

export const a53 = createAction(
  "Znacjonalizuj prywatne lasy",
  "Koniec spacerowania w prywatnych lasach.",
  (state) => {
    state.people -= 5;
    state.politics -= 5;
  },
  { message: "Las dostępny dla każdego Polaka" }
);

// https://www.youtube.com/watch?v=NI3-r56toRw
export const a54 = createAction(
  "Zacznij bić brawa dla medyków",
  "Ministerstwo właśnie DOFINANSOWAŁO SŁUŻBĘ ZDROWIA TYSIĄCEM BRAW!",
  (state) => {
    state.people -= 5;
    state.politics -= 5;
    state.healthcare -= 1;
  },
  { message: "Służba zdrowia podnosi się z kolan" }
);

// https://businessinsider.com.pl/finanse/makroekonomia/tarcza-finansowana-i-jej-finansowanie-nbp-i-rzad-a-koronawirus/f51v5ev
export const a55 = createAction(
  "Finansuj walkę z COVID-19 karuzelą finansową",
  "Rządowi pomoże Polski Fundusz Rozwoju, który najpierw się zadłuży, by później m.in. Narodowy Bank Polski mógł ten dług skupić.",
  (state) => {
    state.budget += 5;
    state.economy -= 3;
  },
  { message: "Rząd znalazł pieniądze na walkę z wirusem" }
);

// http://300gospodarka.pl/live/2020/04/08/pfr-sfinansuje-90-proc-wartosci-rzadowej-tarczy-finansowej-dzieki-emisji-obligacji-nbp-bedzie-musial-skupic-170-mld-zl-aktywow/
export const a56 = createAction(
  "Emituj obligacje skarbowe",
  "Media komentują - i tak ich nikt nie spłaci!",
  (state) => {
    state.budget += 3;
    state.economy -= 1;
  },
  { message: "Buduj przyszłość Polski razem z nami" }
);

export const a57 = createAction(
  "Zwróć mienie żydowskie",
  "Izrael zostaje bardziej przychylny rządowi.",
  (state) => {
    state.budget -= 7;
    state.politics += 5;
    state.people -= 7;
    state.economy -= 2;
  },
  { message: "Polak i Żyd dwa bratanki" }
);

// https://www.rmf24.pl/ekonomia/news-morawiecki-skierujemy-co-najmniej-100-mld-zl-do-firm-to-tarc,nId,4428742
export const a58 = createAction(
  "Oferuj firmom korzystne kredyty",
  "Przedsiębiorcy dalej obawiają się kontroli skarbowych.",
  (state) => {
    state.budget -= 3;
    state.economy += 3;
  },
  { message: "Prywaciarze na garnuszku państwa" }
);

// https://www.facebook.com/100023844510251/posts/713795756091902/
export const a59 = createAction(
  "Zezwól policji na mycie aut ale dalej karaj zwykłych kierowców",
  "Czystość aut policji ponad wolność obywateli.",
  (state) => {
    state.policeAuthority -= 2;
  },
  { message: "Obowiązki policji niesłusznie oskarżane" }
);

// https://www.rmf24.pl/ekonomia/news-morawiecki-skierujemy-co-najmniej-100-mld-zl-do-firm-to-tarc,nId,4428742
export const a60 = createAction(
  "Wprowadź dodatkowe zasiłki dla bezrobotnych",
  "W dobie kryzysu alkohol i grzywny podstawą funkcjonowania uciśnionej klasy społecznej",
  (state) => {
    state.budget -= 3;
    state.social += 4;
    state.people -= 1;
    state.politics += 2;
  },
  { message: "Bezrobotni przychylni partii rządzącej" }
);

// https://www.rmf24.pl/raporty/raport-koronawirus-z-chin/polska/news-ministerstwo-zdrowia-zakazuje-wywozu-respiratorow-z-polski,nId,4428552
export const a61 = createAction(
  "Wprowadź zakaz wywozu sprzętu medycznego z Polski",
  "Hurtownie farmaceutyczne w rękach spekulantów - rząd ukróca ich reżim.",
  (state) => {
    state.healthcare += 3;
    state.economy -= 1;
  },
  { message: "Sędziowie pobłażliwi wobec mafii lekowej" }
);

export const a62 = createAction(
  "Wesprzyj Patryka Vegę w produkcji kolejnego hitu",
  'Reżyser planuje film "Informatycy w Breslau" pokazujący mafię klubów nocnych.',
  (state) => {
    state.budget -= 1;
  },
  { message: "Rząd wspiera twórców i ludzi kultury" }
);

export const a63 = createAction(
  "Wprowadź regularne testy dla pracowników służby zdrowia",
  "Służba zdrowia dziękuje ministrowi zdrowia.",
  (state) => {
    state.infectionProbability *= 0.8;
    state.budget -= 2;
    state.healthcare += 4;
  },
  { message: "Bogatych lekarzy nie stać na testy?" }
);

// https://www.rmf24.pl/raporty/raport-koronawirus-z-chin/najnowsze-fakty/news-who-w-korei-polnocnej-nie-ma-koronawirusa,nId,4428395
export const a64 = createAction(
  "Ogłoś że TVN kłamie i w Polsce nie ma koronawirusa",
  "TVP: Prywatna komunistyczna stacja kłamie. Została założona przez SB.",
  (state) => {
    state.politics += 3;
    state.people -= 7;
    state.infectionProbability *= 1.2;
    state.contactsPerDay *= 1.1;
  },
  { message: "Koronawirus spiskiem niepolskich mediów" }
);

export const a65 = createAction(
  "Wprowadź cenzurę Internetu",
  "Wykop.pl źródłem wszelkiej dezinformacji. Rząd walczy z hejtem!",
  (state) => {
    state.politics += 8;
    state.people -= 9;
  },
  { message: "Antynarodowy portal wykop.pl zablokowany" }
);

// https://poznan.naszemiasto.pl/poznan-pracownicy-i-wlasciciele-restauracji-klubow-muzeow-i/ar/c1-7640751?fbclid=IwAR2iqdmWlT2qQNxDTDwKFrXS_3AH_Y9_nh0Tevqi7So3oRewElnVIsmP9IY
export const a66 = createAction(
  "Wprowadź zwolnienia z czynszu dla zamkniętych lokali",
  "Nieudolni przedsiębiorcy błagają rząd o pomoc.",
  (state) => {
    state.politics += 1;
    state.people += 2;
    state.economy += 3;
    state.social += 1;
  },
  { message: "Rząd zamiast kopalni wspiera przedsiębiorców" }
);

export const a67 = createAction(
  "Drukuj dodatkowe pieniądze",
  "Na wzór Stanów, NBP drukuje pusty pieniądz.",
  (state) => {
    state.economy -= 5;
    state.budget += 5;
  },
  { message: "Budżet pęka od dodatkowych pieniędzy" }
);

export const a68 = createAction(
  "Wprowadź podwyżki w służbie zdrowia",
  "Bogaci lakarze wymusili podwyżki, mimo to jeżdżą na zagraniczne wakacje.",
  (state) => {
    state.budget -= 5;
    state.healthcare += 5;
  },
  { message: "Lekarze rezydenci wracją z zagranicznych wakacji" }
);

export const a69 = createAction(
  "Ucisz niewygodnych lekarzy",
  "Kaganiec milczenia nałożony na służbę zdrowia.",
  (state) => {
    state.politics += 2;
    state.healthcare -= 2;
  },
  { message: "Oszczerstwa lekarzy w stronę rządu" }
);

export const a70 = createAction(
  "Zwiększ finansowanie służby zdrowia",
  "Rząd przeznaczy dodatkowe miliardy na służbę zdrowia",
  (state) => {
    state.budget -= 3;
    state.healthcare += 5;
  },
  { message: "Dodatkowe miliardy w kasie NFZ" }
);

export const a71 = createAction(
  "Zwiększ liczbę łóżek szpitalnych",
  "Wygodne łóżka szpitalne czekają na chorych.",
  (state) => {
    state.budget -= 2;
    state.healthcare += 2;
  },
  { message: "Chińskie łóżka w drodze do Polski" }
);

export const a72 = createAction(
  "Zabroń wstępu do lasów i parków",
  "W trosce o zdrowie i bezpieczeństwo, w związku ze stanem epidemii oraz dyspozycją Premiera RP, lasy i parki zostają zamknięte.",
  (state) => {
    state.contactsPerDay *= 0.9;
    state.people -= 3;
  },
  { message: "Kleszcze przenoszą koronawirusa" }
);

// https://www.wykop.pl/wpis/48903139/paskigrozy-heheszki-polska-koronawirus-tvpis/
export const a73 = createAction(
  "Znieś zakaz wstępu do lasów i parków",
  "Polacy chwalą decyzję rządu o ponownym otwarciu lasów i parków. 86% Polaków zadowolonych z działań rządu!",
  (state) => {
    state.contactsPerDay *= 1.5;
    state.people += 3;
    state.politics += 1;
  },
  {
    requires: a72,
    message: "Otwarcie lasów kołem zamachowym dla gospodarki",
  }
);

// https://www.wykop.pl/link/5451111/zakonnice-z-krakowa-opanowaly-sytuacje-w-dps-ie-pacjenci-bezpieczni/
export const a74 = createAction(
  "Wyślij zakonnice do walki z COVID-19",
  "Na pomoc ruszyły siostry. Zastąpiły cały personel. Sprzętu już nie brakuje.",
  (state) => {
    state.healthcare += 2;
    state.people += 1;
  },
  { message: "Rząd powierza opiękę nad chorymi Bogu" }
);

export const a75 = createAction(
  "Rozpocznij ogólnopolską akcję szycia maseczek",
  "Polskie krawcowe w akcji. Szyją maseczki i ratują życie!",
  (state) => {
    state.healthcare += 1;
    state.people += 3;
  },
  { message: "Praca u podstaw" }
);

// https://www.wykop.pl/link/5456101/dzien-po-przylocie-antonowa-rydzyk-oglasza-sprzedaz-maseczek-i-przylbic/
export const a76 = createAction(
  "Przekaż sprzęt medyczny Rydzykowi",
  "Rydzyk ogłasza sprzedaż maseczek i przyłbic.",
  (state) => {
    state.healthcare -= 5;
    state.politics += 3;
    state.budget += 2;
  },
  { message: "O. Rydzyk murem za służbą zdrowia" }
);

// https://www.wykop.pl/link/5450571/5-minut-i-odbieraja-glos-tak-potraktowano-projekt-ws-wynagrodzen-nauczycieli/
export const a77 = createAction(
  "Zablokuj obywatelskie projekty ustaw pod przykrywką walki z epidemią",
  "Czasy się zmieniły - tylko projekty rządowe będą procesowane.",
  (state) => {
    state.politics += 3;
    state.people -= 2;
  }
);

// https://www.wykop.pl/link/5453683/odrzucono-glosami-pis-u-testy-dla-wszystkich-pracownikow-sluzby-zdrowia/
export const a78 = createAction(
  "Odrzuć projekt przeprowadzania testów dla pracowników służby zdrowia",
  "Minister Woś, który chorował na COVID-19, głosował przeciwko testom dla medyków.",
  (state) => {
    state.healthcare -= 4;
    state.politics += 1;
    state.detectionRate -= 1;
  },
  { message: "Pracownicy służby zdrowia uodpornieni" }
);

// https://www.wykop.pl/link/5455319/fakty-tvn-grilluja-szumowskiego-za-wysmiewanie-maseczek/
export const a79 = createAction(
  "Ogłoś że noszenie maseczek nie pomaga",
  "Szumowski o koronawirusie: Maseczki nie pomagają.",
  (state) => {
    state.healthcare -= 1;
    state.infectionProbability *= 1.2;
    state.politics += 2;
  },
  { message: "Maseczkowe prowokacje opozycji" }
);

// https://www.wykop.pl/link/5455319/fakty-tvn-grilluja-szumowskiego-za-wysmiewanie-maseczek/
// https://www.wykop.pl/wpis/48753643/paskigrozy-bekazpisu-tvpis-heheszki/
export const a80 = createAction(
  "Pozwij TVN za wyśmiewanie się z Szumowskiego wyśmiewającego się z maseczek",
  "Minister Szumowski obawia się hejtu w sieci.",
  (state) => {
    state.budget += 1;
    state.people -= 1;
    state.politics += 1;
  },
  { requires: a79, message: "W TVN biją Murzynów" }
);

// https://www.wykop.pl/link/5455319/fakty-tvn-grilluja-szumowskiego-za-wysmiewanie-maseczek/
export const a81 = createAction(
  "Wprowadź w życie Deklarację Wiary w medycynie",
  "Aborcja, antykoncepcja, sztuczne zapłodnienie, eutanazja i zapłodnienie in vitro to nie tylko „pogwałcenie Dekalogu”, ale także „odrzucenie samego Stwórcy”.",
  (state) => {
    state.healthcare -= 5;
    state.people -= 5;
    state.politics += 8;
  },
  { message: "Szumowski powierza medycynę Maryji" }
);

export const a82 = createAction(
  "Wprowadź zakaz masturbacji i kontrole w domach",
  "Masturbacja niszczy życie rodzinne. Rząd będzie kontrolował obywateli co robią w domach.",
  (state) => {
    state.people -= 5;
    state.politics += 3;
  },
  { requires: a81, message: "Onaniści pod kontrolą" }
);

export const a83 = createAction(
  "Wprowadź blokadę stron pornograficznych",
  "Dbając o dobro rodziny rząd blokuje dostęp do stron pornograficznych. Usługodawcy VPN odpowiadają za paserstwo!",
  (state) => {
    state.politics += 3;
    state.people -= 9;
  },
  { requires: a65, message: "Koniec z plagą nieczystości" }
);

// https://www.wykop.pl/link/5450567/kuriozalny-wpis-policji-na-twitterze-chwala-sami-siebie-i-cenzuruja-komentarze/
export const a84 = createAction(
  "Rozpocznij akcję wybielania działań Policji",
  "Policja publikuje rzekome wpisy chwalące działania Policji, równocześnie usuwa wszystkie nieprzychylne komentarze.",
  (state) => {
    state.politics += 1;
    state.people -= 2;
    state.policeAuthority -= 1;
  },
  { message: "Policja doceniona przez policję" }
);

export const a85 = createAction(
  "Wprowadź zakaz przemieszczania się rowerami miejskimi",
  "Rządy innych państw zalecają poruszanie się rowerami aby uniknąć kontaktu w przestrzeni publicznej. Kto ma rację?",
  (state) => {
    state.contactsPerDay *= 1.2;
    state.people -= 2;
  },
  { message: "Cykliści powiązani z ruchem LGBT" }
);

export const a86 = createAction(
  "Znieś zakaz przemieszczania się rowerami miejskimi",
  "Cykliści wracają na drogi. Czas na kolejne buspasy?",
  (state) => {
    state.contactsPerDay *= 0.8;
    state.people += 2;
  },
  { requires: a85, message: "Pedały wracają na właściwą drogę" }
);

export const a87 = createAction(
  "Wystosuj rozszczenie o odszkodowanie od Chin",
  "Polska rości sobie 100 mld złotych odszkodowania za straty dla przedsiębiorstw i przemysłu od rządu Chińskiej Republiki Ludowej.",
  (state) => {
    state.politics += 1;
  },
  { message: "Polska dominuje na arenie międzynarodowej" }
);

// https://www.wykop.pl/ramka/5454763/zbigniew-ziobro-zapowiada-wszczecie-sledztw-w-sprawie-lekarzy-w-dps/
export const a88 = createAction(
  "Karaj lekarzy nie stawiających się na wezwanie do przymusowej pracy",
  "Zbigniew Ziobro zapowiada wszczęcie śledztw w sprawie lekarzy niestawiających się na wezwanie do pracy.",
  (state) => {
    state.politics += 1;
    state.healthcare -= 1;
    state.people -= 1;
  },
  { message: "Sabotażyści w służbie zdrowia" }
);

// https://www.wykop.pl/ramka/5454763/zbigniew-ziobro-zapowiada-wszczecie-sledztw-w-sprawie-lekarzy-w-dps/
export const a89 = createAction(
  "Wykorzystaj więźniów do szycia maseczek",
  "Więźniowie szyją miliony maseczek. Zostaną one przekazane dla pracowników medycznych.",
  (state) => {
    state.healthcare += 1;
    state.people += 1;
    state.budget += 2;
  },
  { message: "Resocjalizacja poprzez pracę" }
);

// https://www.wykop.pl/link/5436169/lekcja-wf-w-programie-szkola-z-tvp/
export const a90 = createAction(
  "Zadbaj o tężyznę fizyczną obywateli przez Szkołę z TVP",
  "Do lekcji WF-u wystarczy tylko garsonka i butelki wody!",
  (state) => {
    state.budget -= 1;
    state.people += 1;
  },
  { message: '"Szkoła z TVP" hitem oglądalności' }
);

// https://www.wykop.pl/link/5425661/szkola-tvp-vs-sp33-poznan-2mld-roznicy/
export const a91 = createAction(
  "Zadbaj o rozwój dzieci przez Szkołę z TVP",
  "Tematem głównym - liczby parzyste, średnica i obwód.",
  (state) => {
    state.budget -= 1;
    state.people += 1;
  },
  { message: '"Szkoła z TVP" zdobyła uznanie uczniów' }
);

export const a92 = createAction(
  "Poproś państwo żydowskie o pożyczkę",
  "Szekle zasiliły budżet państwa.",
  (state) => {
    state.budget += 10;
  },
  { requires: a57, message: "Izrael dziękuje Polsce" }
);

let a93;
let a94;

a93 = createAction(
  "Rozpocznij wdrożenie sieci 5G w Polsce",
  'Ludzie panikują widząc sieci Wi-Fi nazwane "TEST 5G MOC 500%".',
  (state) => {
    state.economy += 3;
    state.budget -= 3;
    state.people -= 2;
  },
  { excludes: () => a94, message: "5G szansą rozwoju Polski" }
);

a94 = createAction(
  "Zablokuj wdrożenie sieci 5G w Polsce",
  "Rządowy zespół naukowców dowiódł szkodliwości sieci 5G i wpływu na rozwój koronawirusa!",
  (state) => {
    state.people += 2;
    state.politics += 3;
    state.economy -= 2;
  },
  { excludes: () => a93, message: "Chińskim tedchnologiom zakaz wstępu" }
);

export { a93, a94 };

// https://www.wykop.pl/link/5457433/chociaz-wasalowi-brakuje-kadr-lekarskich-to-jednak-wysyla-seniorowi-lekarzy/
export const a95 = createAction(
  "Wyślij polskich medyków do USA",
  "Polska wysyła wojskową misję medyczną do Chicago.",
  (state) => {
    state.politics += 1;
    state.healthcare -= 2;
  },
  { message: "Ambasador USA nie gniewa się za TVN" }
);

// https://www.wykop.pl/ramka/5449497/czym-sie-dzis-zajmuje-tvpis-probuje-nakrecic-afere-zastepcza-atakujac-wosp/
export const a96 = createAction(
  "Oskarż WOŚP o wykorzystywanie epidemii do swojej promocji",
  "Fundacja okleja maseczki swoim logiem. To grzech!",
  (state) => {
    state.politics += 1;
    state.healthcare -= 1;
  },
  { message: "PiS w przeciwieństwie do Owsiaka chroni Polaków" }
);

// https://www.wykop.pl/ramka/5453501/minister-nauki-brazylii-mamy-lek-na-covid-19-jest-skuteczny-w-94-proc/
export const a97 = createAction(
  "Rozpocznij prace nad polskim lekiem na COVID-19",
  "Rząd rozpoczyna projekt stworzenia leku na koronawirusa.",
  (state) => {
    state.budget -= 5;
    state.social -= 2;
    state.people += 1;
    state.healthcare += 1;
  },
  { message: "Polska pionierem walki z COVID" }
);

export const a98 = createAction(
  "Rozpocznij testy polskiego leku na COVID-19",
  "Badania dotyczące nowego leku będą prowadzone w siedmiu szpitalach naszego kraju na łącznej grupie 500 osób zainfekowanych koronawirusem.",
  (state) => {
    state.budget -= 5;
    state.social -= 1;
    state.healthcare += 2;
  },
  {
    requires: a97,
    message: "Pierwsi pacjenci uleczeni nowym lekiem",
    customFilter: (state) => state.healthcare >= 7,
  }
);

let a137;

export const a100 = createAction(
  "Wdróż powszechne stosowanie polskiego leku na COVID-19",
  "Polacy leczeni nowoczesnym lekiem na koronawirusa. Zaskakująca skuteczność polskiego leku.",
  (state) => {
    state.budget -= 5;
    state.social -= 1;
    state.people += 3;
    state.healthcare += 5;
  },
  {
    requires: () => a137,
    message: "Rząd ogłasza sukces w leczeniu koronawirusa",
  }
);

export const a101 = createAction(
  "Zaopatrz szpitale w sprzęt ochrony osobistej - maseczki i przyłbice",
  "Polski medyk chroniony dzięki wsparciu rządu.",
  (state) => {
    state.infectionProbability *= 0.8;
    state.budget -= 3;
    state.healthcare += 2;
  },
  { message: "Rząd wyciąga rękę do medyków" }
);

export const a102 = createAction(
  "Zaleć pracę zdalną",
  "Informatycy nie odczuli wpływu nowych zaleceń.",
  (state) => {
    state.infectionProbability *= 0.95;
    state.contactsPerDay -= 2;
  },
  { message: "Pierwsze zebranie sejmu jako telekonferencja" }
);

export const a103 = createAction(
  "Wprowadź tarczę antykryzysową 1.0",
  "Ponad 212 mld zł na ochronę miejsc pracy i gospodarki!",
  (state) => {
    state.economy += 3;
    state.social -= 2;
    state.budget -= 1;
    state.people += 1;
  },
  { message: "Tarcza antykryzysowa już chroni Polaków" }
);

export const a104 = createAction(
  "Wprowadź tarczę antykryzysową 2.0",
  'Morawiecki: "Mamy już 1,5 mln wniosków".',
  (state) => {
    state.economy += 4;
    state.social -= 1;
    state.budget -= 1;
    state.people += 2;
  },
  { requires: a103, message: "Morawiecki: Ratujemy miejsca pracy" }
);

export const a105 = createAction(
  "Wprowadź tarczę antykryzysową 3.0",
  "Morawiecki: Nie ma komu wypłacać wsparcia.",
  (state) => {
    state.economy += 5;
    state.social -= 1;
    state.budget -= 1;
    state.people += 2;
  },
  { requires: a104, message: "Unia oskarża Polskę o malwersacje finansowe" }
);

// https://www.wykop.pl/link/5467529/umorzono-sledztwo-ws-wyborow-prezydenckich-w-3-godziny-ha-tfu/
// https://www.wykop.pl/wpis/48968473/bekazpisu-bekazpodludzi-tvpis-wybory-paskigrozy/
export const a106 = createAction(
  "Umórz śledztwo ws. wyborów prezydenckich",
  "Prokuratura Rejonowa Warszawa Mokotów wszczęła śledztwo ws. organizacji wyborów prezydenckich. Chwilę po tym, gdy informacja pojawiła się w mediach, rzecznik Prokuratury Okręgowej poinformowała, że śledztwo zostało umorzone.",
  (state) => {
    state.people -= 3;
    state.politics += 2;
  },
  { message: "Polska prokuratura najszybsza na świecie" }
);

// https://www.wykop.pl/link/5465847/poczta-polska-bezprawnie-prosi-o-wasze-dane-adresowe/
// https://www.wykop.pl/wpis/48951049/odgadujemy-dzisiejsze-paskigrozy-z-glownego-wydani/
export const a107 = createAction(
  "Wymuś przekazanie przez gminy list wyborców Poczcie Polskiej",
  "Zgodnie z oświadczeniem Prezesa UODO ws. pozyskiwania danych osobowych wyborców przez operatora pocztowego gminy mają się podporzadkować.",
  (state) => {
    state.people -= 3;
    state.politics += 1;
  },
  { message: "Samorządowcy z opozycji przeciwko demokracji" }
);

export const a108 = createAction(
  "Rozpocznij nielegalne drukowanie kart wyborczych",
  "Niemieckie drukarnie już drukują karty wyborcze. Co na to prawo?",
  (state) => {
    state.people -= 1;
    state.budget -= 4;
    state.politics += 1;
  },
  { requires: a22, message: "Korespondencyjnie czyli bezpieczniej" }
);

// https://www.wykop.pl/wpis/48581473/%CA%96-paskigrozy-tvpis-humorobrazkowy-heheszki/
export const a109 = createAction(
  "Rozpocznij przygotowania do wyborów",
  "Rząd chce chronić demokrację w Polsce. Prywatne media atakują z nienawiścią!",
  (state) => {
    state.people -= 1;
    state.budget -= 4;
    state.politics += 1;
  },
  {
    requires: a22,
    message: "Wybory w czasie pandemii spotkały się z uznaniem",
  }
);

// https://www.wykop.pl/wpis/48556805/a-w-alternatywnej-rzeczywistosci-odpowiednio-zadan/
export const a110 = createAction(
  "Zdyskredytuj przeciwników przeprowadzenia wyborów",
  "Demokracja w Polsce jest zagrożona! Rząd nie ugnie się pod naciskiem!",
  (state) => {
    state.people -= 1;
    state.politics += 2;
  },
  { message: "Polacy chcą głosowania korespondencyjnego" }
);

export const a111 = createAction(
  "Zwiększ finansowanie TVP",
  "Andrzej Duda podpisał ustawę, która przekazywała prawie 2 miliardy złotych z budżetu na TVP i Polskie Radio.",
  (state) => {
    state.budget -= 9;
    state.politics += 8;
    state.healthcare -= 4;
    state.economy -= 2;
    state.people -= 3;
  },
  { message: "TVP INFO liderem kanałów informacyjnych" }
);

export const a112 = createAction(
  "Przekaż środki z TVP na rzecz walki z koronawirusem",
  "Media publiczne utraciły dofinansowanie. Polski Goebbels traci wpływy.",
  (state) => {
    state.budget += 1;
    state.people += 3;
    state.healthcare += 5;
    state.politics -= 10;
  },
  { message: "Komu przeszkadzają silne media publiczne?" }
);

export const a113 = createAction(
  'Emituj film "Zenek" na antenie TVP',
  'Telewizja Polska odgrywa film "Zenek". Mega hit o 20!',
  (state) => {
    state.budget -= 2;
    state.people -= 1;
    state.politics += 1;
  },
  { message: "Rozrywka z TVP w czasie kwarantanny" }
);

export const a114 = createAction(
  "Inwestuj w produkcję trumień i zakłady pogrzebowe",
  "Rząd spełnia potrzeby obywateli. Zwiększone moce produkcyjne trumień skracają kolejki na cmentarzach!",
  (state) => {
    state.budget -= 2;
    state.economy += 2;
  },
  { message: "Przemysł pogrzebowy podporą polskiej gospodarki" }
);

// https://www.wykop.pl/wpis/48036157/%CA%96-heheszki-tvpis-bekazpisu-paskigrozy/
export const a115 = createAction(
  "Zwiększ produkcję papieru toaletowego",
  "Papier toaletowy wart więcej niż obligacje państwa.",
  (state) => {
    state.budget -= 1;
    state.economy += 1;
    state.people += 3;
  },
  { message: "Polacy gromadzą papiery wartościowe" }
);

// https://www.wykop.pl/link/5417409/wiecie-dlaczego-ceny-paliw-sa-takie-niskie/
export const a116 = createAction(
  "Ogłoś że za spadkiem cen paliw stoi wsparcie rządu",
  "Dlatego, że Orlen jest firmom narodowom i chce pomóc polskim przedsiębiorcom i polskiej gospodarce ceny paliw sukcesywnie spadają.",
  (state) => {
    state.people -= 1;
    state.politics += 2;
  },
  {
    message: "Dzięki PKN Orlen ceny paliw na stacjach spadają",
  }
);

export const a117 = createAction(
  "Zmień lektora w TVP",
  "Dodatkowe pieniądze na TVP pozwoliły na zatrudnienie profesjonalnego lektora. Planowany powrót Studio YaYo na antenę TVP.",
  (state) => {
    state.budget -= 3;
    state.politics += 2;
  },
  {
    message: "Komu przeszkadza nowy lektor w TVP?",
  }
);

export const a118 = createAction(
  "Emituj oszczerstwa na dziennikarzy innych stacji",
  "Rząd wyśmiewa się z postów Kingi Rusin. Nowy lektor sprawia się wyśmienicie!",
  (state) => {
    state.budget -= 3;
    state.politics += 2;
  },
  {
    message: "Medialna burza po wpisie Kingi Rusin",
    requires: a117,
  }
);

export const a119 = createAction(
  "Wprowadź 14-te emerytury",
  "Polscy seniorzy filarem gospodarki. Rząd nie zapomina o wsparciu.",
  (state) => {
    state.budget -= 5;
    state.social += 5;
    state.politics += 5;
    state.economy -= 5;
  },
  {
    message: "Klęska opozycji: Będą 14 emerytury",
  }
);

export const a120 = createAction(
  "Zakaż propagacji weganizmu i wegetarianizmu w Polsce",
  "Zachodnia kultura przyczynia się do upadku rolnictwa. Rząd wspiera polskich hodowców.",
  (state) => {
    state.economy += 1;
    state.people -= 5;
    state.politics += 3;
  },
  {
    message: "Czy ekoterroryści zabiorą nam auta i kotlety?",
  }
);

export const a121 = createAction(
  "Znacjonalizuj oszczędności Polaków",
  "Rząd: brak pieniędzy - brak problemów. Państwo zajmie się wszystkim.",
  (state) => {
    state.budget += 7;
    state.people -= 8;
    state.politics -= 2;
    state.economy -= 3;
  },
  {
    message: "Polska bezgotówkowa w pełnym wdrożeniu",
  }
);

export const a122 = createAction(
  "Odrzuć wszystkie wnioski o pomoc finansową",
  "Tarcza antykryzysowa: Wszystkie wnioski odrzucone. Bo mają błędy.",
  (state) => {
    state.bugdet += 5;
    state.economy -= 3;
    state.people -= 2;
    state.politics += 2;
  },
  { requires: a103, message: "Oszuwstwo na koronawirusa" }
);

export const a123 = createAction(
  "Wprowadź w całej Polsce strefę wolną od LGBT",
  "Homopropaganda zagrożeniem dla wartości rodzinnych.",
  (state) => {
    state.people -= 8;
    state.politics += 10;
  },
  { message: "Polska wolna od propagandy zachodu" }
);

export const a124 = createAction(
  "Zamknij nierentowne kopalnie",
  "Ciężki sprzęt na ulicach Warszawy - górnicy protestują!",
  (state) => {
    state.budget += 5;
    state.economy += 3;
    state.people += 1;
    state.social -= 4;
    state.politics -= 5;
  },
  { message: "Szantaż górników wycelowany w rząd", excludes: a28 }
);

export const a125 = createAction(
  "Rozpocznij dezynfekcję ulic w miastach",
  "Pracownicy w skafandrach dezynfekują ulice polskich miast.",
  (state) => {
    state.budget -= 2;
    state.people += 2;
    state.infectionProbability *= 0.9;
  },
  { message: "Rządz oczyszcza polskie ulice" }
);

export const a126 = createAction(
  "Wprowadź tarczę antykryzysową 3.0",
  "Masowe zwolnienia dotykają tysiące Polaków.",
  (state) => {
    state.economy += 2;
    state.social -= 5;
    state.budget -= 3;
    state.people -= 3;
  },
  { requires: a104, message: "Morawiecki: Mamy plan" }
);

const fakeElection = () =>
  createAction(
    "⭐ Zagłosuj na Andrzeja Dudę",
    "Andrzej Duda wygrywa wybory ze 100% poparciem!",
    (state) => {
      state.people -= 10;
      state.politics += 10;
    },
    {
      message: "Andrzej Duda wygrywa demokratyczne wybory",
      customFilter: (state) => state.day === 73,
      special: true,
      event: "e10",
    }
  );

export const a127 = fakeElection();
export const a128 = fakeElection();
export const a129 = fakeElection();
export const a130 = fakeElection();
export const a131 = fakeElection();
export const a132 = fakeElection();
export const a133 = fakeElection();
export const a134 = fakeElection();
export const a135 = fakeElection();
export const a136 = fakeElection();

a137 = createAction(
  "Opracuj polski lek na COVID-19",
  "Uczestnicy projektów folding@home i rosetta@home pozwolili stworzyć skuteczny lek na koronawirusa.",
  (state) => {
    state.budget -= 5;
    state.economy += 1;
    state.healthcare += 7;
    state.people += 3;
    state.medicine += 1;
  },
  {
    requires: a98,
    message: "Polska najszybciej wygrywa z chorobą",
    event: "e12",
  }
);

export { a137 };

export const a99 = createAction(
  "Rozpocznij masową produkcję polskiego leku na COVID-19",
  "Produkcja polskiego leku na koronawirusa ruszyła. W najbliższym czasie spodziewamy się pełnego zaopatrzenia szpitali.",
  (state) => {
    state.budget -= 5;
    state.economy += 1;
    state.healthcare += 3;
    state.medicine += 1;
  },
  { requires: a137, message: "Polski lek ratuje życie" }
);

export const a138 = createAction(
  "Zwiększ nakłady na farmy troli",
  "W sieci pojawia się coraz więcej postów przychylych rządowi. #duda2020 na topie!",
  (state) => {
    state.budget -= 6;
    state.people -= 2;
    state.politics += 4;
  },
  { requires: a104, message: "Polacy chwalą rząd w social mediach" }
);

export const a139 = createAction(
  "Wprowadź 1500+ na mieszkanie",
  "Rząd chce pomóc najemcom. 1,5 tys. zł na rachunki za mieszkanie.",
  (state) => {
    state.social += 3;
    state.budget -= 3;
    state.economy -= 1;
    state.politics += 2;
  },
  { message: "Po mieszkanie+ pora zadbać o lokatorów" }
);

export const a140 = createAction(
  "Kontroluj czy obywatele noszą maseczki",
  "Ludzie chodzą po ulicach z opuszczonymi maseczkami. Policja bezwględna dla osób niestosujących się do nakazów.",
  (state) => {
    state.budget += 1;
    state.policeAuthority -= 1;
    state.people += 2;
    state.infectionProbability *= 0.95;
  },
  { requires: a4, message: "Kolejny sukces polskiej policji" }
);

export const a141 = createAction(
  "Wprowadź lekcje religii w Szkole z TVP",
  "Codzienna modlitwa na antenie stacji reżimowej.",
  (state) => {
    state.budget -= 1;
    state.politics += 1;
  },
  { message: "W zdrowym ciele zdrowy duch" }
);

export const a142 = createAction(
  "Zakaż wychowania seksualnego w szkołach",
  "Wychowanie seksualne tematem tabu. Rząd ma własną wizję rodziny.",
  (state) => {
    state.budget += 1;
    state.politics += 4;
    state.people -= 3;
  },
  { message: "Homopropaganda zagrożeniem dla dzieci" }
);

export const a143 = createAction(
  "Zakaż manifestacji dewiacji w przestrzeni publicznej",
  "Represje polityczne coraz częściej dotykają środowisk lewicowych.",
  (state) => {
    state.politics += 5;
    state.people -= 6;
  },
  { message: "Prawica razem w walce z multikulti" }
);

export const a144 = createAction(
  "Wprowadź euro",
  "Dewaluacja polskiej waluty przyczyną wprowadzenia euro.",
  (state) => {
    state.budget -= 3;
    state.politics -= 3;
    state.people -= 4;
    state.economy += 2;
  },
  { message: "Bruksela pierwszy raz przychylna rządowi" }
);

export const a145 = createAction(
  "Przekaż dane z rejestru PESEL Poczcie Polskiej",
  "Poczta Polska nie potrzebuje pomocy gmin - dostała bezpośrednio dane wszystkich Polaków.",
  (state) => {
    state.people -= 3;
    state.politics += 1;
  },
  { message: "Przygotowania do wyborów na finiszu" }
);

export const a146 = createAction(
  "Wprowadź kary za głoszenie tez antyszczepionkowców",
  "Tezy antyszczepionkowców klasyfikowane jako zbrodnia przeciw ludzkości. Autorytety środowiska już w więzieniach.",
  (state) => {
    state.politics += 1;
    state.healthcare += 2;
  },
  { message: "Antyszczepionkowcy w więzieniach" }
);

export const a147 = createAction(
  "Przystosuj przedsiębiorstwa do pracy w reżimie sanitarnym",
  "Rząd dostarcza środki ochrony do polskich firm.",
  (state) => {
    state.economy += 1;
    state.infectionProbability *= 0.9;
  },
  { message: "Polski rząd wspiera polskie firmy" }
);

let a187;

export const a148 = createAction(
  "Zamknij miasta powyżej 100 tys. mieszkańców",
  "Totalny blackout polskich miast. Rząd nie panuje nad sytuacją!",
  (state) => {
    state.economy -= 8;
    state.infectionProbability *= 0.9;
    state.people -= 9;
    state.politics -= 3;
    state.contactsPerDay *= 0.5;
  },
  { requires: () => a187, message: "Rząd zbliża ludzi do siebie" }
);

export const a149 = createAction(
  "Wprowadź zwolnienie z podatku dochodowego na 3 miesiące",
  "Janusz Korwin-Mikke pierwszy raz poparł działania władzy.",
  (state) => {
    state.economy += 5;
    state.people += 2;
    state.social -= 4;
    state.budget -= 10;
    state.politics += 1;
  },
  { message: "Wsparcie od rządu kosztuje miliardy" }
);

export const a150 = createAction(
  "Stwórz teledysk wyborczy dla Andrzeja Dudy",
  "Nowy HIT od Super Twins - Pan Duda i wszystko się uda robakiem usznym prawdziwych Polaków.",
  (state) => {
    state.budget -= 4;
    state.politics += 2;
    state.people -= 1;
  },
  { message: "Super Twins nowym Zenkiem sceny muzycznej" }
);

export const a151 = createAction(
  "Obniż akcyzę na paliwo",
  "PKN Orlen ogłasza spadek cen paliw dla dobra Polaków i Polskiej gospodarki.",
  (state) => {
    state.budget -= 7;
    state.economy += 1;
    state.politics += 1;
    state.people += 3;
  },
  { message: "Tańsze paliwo dla wszystkich" }
);

export const a152 = createAction(
  "Przekaż tereny upadłych przedsiębiorstw kościołowi",
  "Powstaną nowe kościoły gotowe pomieścić miliony wiernych. Delegalizacja innych wyznań w planach.",
  (state) => {
    state.budget -= 7;
    state.economy -= 4;
    state.politics += 5;
  },
  { message: "Kościół odzyskuje należne mu tereny" }
);

export const a153 = createAction(
  "Przelej pieniądze z ZUS do kasy państwa",
  "Okazuje się że pieniędzy w ZUS-ie nigdy nie było!",
  (state) => {
    state.budget -= 7;
    state.economy += 1;
    state.politics -= 5;
    state.people -= 5;
  },
  { message: "Tusk okradł Polaków z oszczędności" }
);

export const a154 = createAction(
  "Zamknij podziemne zakłady fryzjerskie",
  "Pudelek prezentuje ranking fryzur męskich 2020!",
  (state) => {
    state.economy -= 1;
    state.politics += 1;
    state.people -= 2;
  },
  { message: "Podziemie walczące" }
);

export const a155 = createAction(
  "Wprowadź zakaz mowy nienawiści",
  "Krytyka rządu penalizowana karnie. Hejt na partię zagrożony karą 10 lat pozbawienia wolności.",
  (state) => {
    state.politics += 5;
    state.people -= 8;
  },
  { message: "Koniec z hejtem" }
);

export const a156 = createAction(
  "Zrównaj wiek emerytalny mężczyzn i kobiet",
  "Rząd chce zrównywać i zarazem podwyższyć wiek przechodzenia na emeryturę kobiet i mężczyzn, aż do 67 roku życia.",
  (state) => {
    state.economy += 4;
    state.budget += 4;
    state.politics -= 6;
    state.people += 2;
    state.social -= 3;
  },
  { message: "Rządy sprawiedliwości społecznej" }
);

export const a157 = createAction(
  "Wprowadź bon oświatowy",
  "Zamiast gotówki, rząd wspiera biedniejszych uczniów bonem oświatowym.",
  (state) => {
    state.economy += 2;
    state.politics -= 6;
    state.people += 2;
    state.social -= 3;
  },
  { message: "Władza wyrównuje nierówności" }
);

export const a158 = createAction(
  "Zdyskredytuj Senat",
  "Kolejny dzień zwłoki Senatu przelał czarę goryczy. PiS odnalazł teczki SB każdego z senatorów.",
  (state) => {
    state.people -= 3;
    state.politics += 3;
  },
  { message: "Zwłoka Senatu zagraża bezpieczeństwu Polaków" }
);

export const a159 = createAction(
  "Wprowadź dobrowolne testy",
  "Każdy obywatel może zrobić test na żądanie. Rząd dofinansuje częściowo koszt zakupu testów.",
  (state) => {
    state.budget -= 8;
    state.people += 3;
    state.politics += 2;
    state.infectionProbability *= 0.8;
    state.detectionRate += 3;
  },
  { message: "Rząd zezwala na testy" }
);

export const a160 = createAction(
  "Wstrzymaj wypłaty zwrotu VAT",
  "Urzędy skarbowe przeprowadzają masowe kontrole podatkowe i wsztrzymują zwroty VAT-u po wszczęciu postępowań podatkowych.",
  (state) => {
    state.budget += 8;
    state.people -= 1;
    state.economy -= 4;
  },
  { message: "Oszuści pod kontrolą rządu" }
);

export const a161 = createAction(
  'Emituj film "Smoleńsk" na antenie TVP',
  "Polacy wspominają zamach na swojego prezydenta.",
  (state) => {
    state.budget -= 2;
    state.people -= 1;
    state.politics += 5;
  },
  { message: "0:46 - słychać strzały" }
);

export const a162 = createAction(
  "Przekaż obiecane pieniądze na onkologię",
  "Obiecane pieniądze trafiają na pomoc chorym na raka.",
  (state) => {
    state.budget -= 6;
    state.people += 3;
    state.healthcare += 2;
    state.politics -= 1;
  },
  { message: "Polska walczy z rakiem" }
);

export const a163 = createAction(
  "Dofinansuj DPS-y i zapewnij im środki ochrony",
  "W domach pomocy społecznej sytuacja powoli się stabilizuje.",
  (state) => {
    state.budget -= 3;
    state.people += 3;
    state.healthcare += 1;
    state.politics += 1;
    state.infectionProbability *= 0.9;
  },
  { message: "Rząd ratuje domy pomocy społecznej" }
);

export const a164 = createAction(
  "Oskarż Brukselę o bezpodstawne ataki na Polskę",
  "Kaczyński: Bruksela uwzięła się na Polaków!",
  (state) => {
    state.people -= 3;
    state.politics += 6;
  },
  { message: "TSUE wykracza poza swoje kompetencje" }
);

export const a165 = createAction(
  "Wyślij wojsko do walki z epidemią",
  "Wojsko na ulicach pilnuje porządku. Medycy wojskowi oddelegowani do pomocy w DPS-ach i szpitalach.",
  (state) => {
    state.budget -= 1;
    state.people -= 3;
    state.politics -= 1;
    state.healthcare += 1;
    state.policeAuthority -= 2;
    state.contactsPerDay *= 0.8;
  },
  { message: "Armia na straży bezpieczeństwa Polaków" }
);

export const a166 = createAction(
  "Wprowadź bezwarunkowy dochód podstawowy",
  "Każdy obywatel głosujący na PiS od dzisiaj ma zagwarantowaną wypłatę niezależnie od warunków.",
  (state) => {
    state.budget -= 10;
    state.economy -= 5;
    state.people += 3;
    state.politics += 5;
    state.social += 10;
  },
  { message: "Rząd równa wszystkich po równo" }
);

export const a167 = createAction(
  "Zdymisjonuj polityków łamiących zasady kwarantanny",
  "Rząd pozbywa się czarnych owiec.",
  (state) => {
    state.people += 3;
    state.politics -= 1;
  },
  { message: "Sabotażyści wydaleni z partii" }
);

export const a168 = createAction(
  "Wstrzymaj dopłaty na walkę ze smogiem",
  "Rząd wsztrzymuje dopłaty do wymiany piecy i wydatki na walkę ze smogiem.",
  (state) => {
    state.economy += 1;
    state.budget += 4;
    state.people -= 1;
  },
  { message: "Nie ma smogu z polskiego węgla" }
);

export const a169 = createAction(
  "Rozdysponuj darmowe maseczki obywatelom",
  "Polacy odbierają ze skrzynek pocztowych darmowe maseczki od rządu.",
  (state) => {
    state.infectionProbability *= 0.9;
    state.people += 5;
    state.budget -= 5;
  },
  { message: "Biało-czerwone maseczki w rękach Polaków" }
);

export const a170 = createAction(
  "Rozpocznij prace nad szczepionką",
  "Naukowcy z całego kraju w zamkniętych laboratoriach poszukują szczepionki.",
  (state) => {
    state.budget -= 5;
    state.people += 1;
    state.social -= 2;
    state.healthcare += 1;
  },
  { message: "Prace nad polską szczepionką rozpoczęte" }
);

export const a171 = createAction(
  "Rozpocznij testy szczepionki",
  "Rząd płaci 2000 złotych za poddanie się testom nowej szczepionki.",
  (state) => {
    state.budget -= 5;
    state.social -= 2;
    state.healthcare += 2;
  },
  {
    requires: a170,
    message: "Śmiertelność szczepionki większa niż wirusa",
    customFilter: (state) => state.healthcare >= 7,
  }
);

export const a172 = createAction(
  "Ukończ pracę nad szczepionką na koronawirusa",
  "Rząd świętuje sukces - udało się pomyślnie stworzyć i przetestować narodową szczepionkę na koronawirusa.",
  (state) => {
    state.budget -= 5;
    state.economy += 1;
    state.healthcare += 7;
    state.people += 3;
    state.social -= 1;
    state.vaccine += 1;
  },
  {
    requires: a171,
    customFilter: (state) => state.healthcare >= 9,
    message: "Polska szczepionka zbawieniem Narodu",
    event: "e11",
  }
);

export const a173 = createAction(
  "Rozpocznij przymusowe szczepienia na koronawirusa",
  "Wszyscy obywatele w najbliższych dniach mają się stawić na przymusowe szczepienie. Gigantyczne kary za unikanie szczepienia!",
  (state) => {
    state.budget -= 5;
    state.people -= 5;
    state.healthcare += 5;
    state.vaccine += 2;
  },
  { requires: a172, message: "Szumowski: Szach-mat antyszczepionkowcy!" }
);

export const a174 = createAction(
  "Wprowadź kary za zatajenie informacji o zakażeniu lub kontaktu z chorym",
  'Akcja "Nie kłam medyka" przyniosła skutki - ostre kary za zatajenie informacji.',
  (state) => {
    state.people += 3;
    state.healthcare += 2;
    state.budget += 1;
  },
  { message: "Nie kłam medyka!" }
);

export const a175 = createAction(
  "Wprowadź totalną izolację w weekendy",
  "Zakaz opuszczania miejsca zamieszkania w weekendy obowiązuje od dziś do odwołania.",
  (state) => {
    state.people -= 6;
    state.healthcare += 1;
    state.contactsPerDay *= 0.7;
  },
  { message: "Niedziela czasem modlitwy" }
);

export const a176 = createAction(
  "Emituj przez MEN film o globalnym ociepleniu",
  "Rząd neguje istnienie zjawiska globalnego ocieplenia - ponadto wskazuje, że wraz z rosnącymi temperaturami Polacy płacą mniej za rosyjski gaz.",
  (state) => {
    state.budget -= 3;
    state.people -= 1;
    state.politics += 5;
  },
  { message: "Globalne ocieplenie spiskiem Bukseli i Rosji" }
);

export const a177 = createAction(
  "Rozwiąż PKW i przejmij jej obowiązki",
  "Rząd wskazując na nieudolność Państwowej Komisji Wyborczej przeprowadził jej demontaż.",
  (state) => {
    state.people -= 5;
    state.politics += 5;
  },
  { message: "Jacek Sasin jedynym członkiem PKW" }
);

export const a178 = createAction(
  "Wprowadź certyfikaty dla osób odpornych na COVID-19",
  "Osoby ozdrowiałe wracają do pracy. Mogą także wyjeżdzać za granicę.",
  (state) => {
    state.people += 3;
    state.healthcare += 1;
    state.economy += 4;
    state.contactsPerDay *= 1.5;
    state.infectionProbability *= 0.9;
  },
  {
    customFilter: (state) =>
      state.recovered >= 2000 &&
      state.recovered / (state.reported || 1) >= 1 / 6,
    message: "Certyfikat życia wskrzesza gospodarkę",
  }
);

export const a179 = createAction(
  "Obniż wynagrodzenia w PLL Lot",
  "LOT obniża wynagrodzenia pilotów i stewardess - zarząd dalej się rozpasa.",
  (state) => {
    state.budget += 4;
    state.economy -= 1;
    state.people -= 1;
  },
  { message: "Lot ku upadkowi" }
);

export const a180 = createAction(
  "Nakaż prace społeczne bezrobotnym",
  "Bezrobotni zangażowani przez powiatowe urzędy pracy razem z urzędnikami pracują na drogach i w państwowych fabrykach. Pierwszy raz, urzędnicy wykonują przydatną pracę.",
  (state) => {
    state.budget += 2;
    state.economy += 2;
    state.people -= 2;
    state.social -= 4;
  },
  { message: "Bogactwo jest produktem pracy" }
);

export const a181 = createAction(
  "Przeprowadź kampanię Andrzeja Dudy",
  "Policja używa systemu LRAD do emisji materiałów propagandowych kandydata na prezydenta.",
  (state) => {
    state.budget -= 8;
    state.politics += 7;
    state.people -= 2;
    state.policeAuthority -= 1;
  },
  { message: "Andrzej Duda czyni cuda" }
);

export const a182 = createAction(
  "Karaj bezdomnych za naruszanie kwarantanny domowej",
  "Policja wraz z sanepidem nakłada wielotysięczne kary administracyjne na bezdomnych. Wezwania przyjdą pocztą.",
  (state) => {
    state.people -= 2;
    state.infectionProbability *= 0.95;
    state.policeAuthority -= 3;
  },
  { message: "Bezdomni notorycznie naruszają kwarantannę" }
);

export const a183 = createAction(
  "Wstrzymaj wypłaty trzynastek",
  "Rząd oskarża opozycję o blokowanie wypłat pieniędzy należnych emerytom i pracownikom administracji.",
  (state) => {
    state.budget += 2;
    state.economy += 5;
    state.social -= 2;
    state.people += 4;
    state.politics -= 6;
  },
  { message: "Opozycja blokuje wypłaty trzynastek" }
);

export const a184 = createAction(
  "Wprowadź obowiązkowe testy dla osób trafiających do szpitali",
  "Od dziś każdy pacjent trafiający na SOR testowany na obecność koronawirusa.",
  (state) => {
    state.budget -= 4;
    state.people += 1;
    state.healthcare += 1;
    state.infectionProbability *= 0.9;
  },
  { message: "Polskie szpitale najbezpieczniejsze dla chorych" }
);

export const a185 = createAction(
  "Zakaż obrotu gotówkowego",
  "NBP tworzy swoją Visę - każdy Polak ma konto w systemie połączone z systemem PESEL.",
  (state) => {
    state.budget -= 5;
    state.people -= 6;
    state.politics += 2;
    state.infectionProbability *= 0.9;
  },
  { message: "Rząd wprowadza polską kartę płatniczą" }
);

export const a186 = createAction(
  "Wprowadź stan epidemii",
  "Minister zdrowia ogłasza w Polsce stan epidemii.",
  (state) => {
    state.contactsPerDay *= 0.9;
    state.economy -= 1;
  },
  { message: "Łamiąca wiadomość: Wprowadzono stan epidemii", event: "e15" }
);

a187 = createAction(
  "Wprowadź stan wyjątkowy",
  "Koronawirus zagrożeniem dla bezpieczeństwa obywateli i porządku publicznego. Rząd wprowadza stan wyjątkowy!",
  (state) => {
    state.contactsPerDay *= 0.5;
    state.economy -= 3;
    state.budget -= 8;
  },
  {
    requires: a186,
    message: "Stan wyjątkowy bo jesteśmy wyjątkowym narodem",
    event: "e16",
  }
);

export { a187 };

export const a188 = createAction(
  "Wprowadź stan wojenny",
  "[Ocenzurowano]",
  (state) => {
    state.contactsPerDay *= 10;
    state.people -= 10;
    state.politics -= 10;
    state.economy -= 7;
    state.social -= 5;
    state.healthcare -= 3;
  },
  {
    requires: a187,
    message: "Komu przeszkadza silna władza w Polsce?",
    event: "e17",
  }
);

export const a189 = createAction(
  "Nakaż policji łapanki wędkarzy",
  "Policja patroluje brzegi rzek i nakłada kary na wędkarzy. PZW dalej nie zarybia wód.",
  (state) => {
    state.budget += 2;
    state.people -= 1;
    state.policeAuthority -= 2;
  },
  { message: "Szczupak jest król wód tak jak lew król dżungli" }
);

export const a190 = createAction(
  "Pacifikuj protesty antyrządowe",
  "Oburzeni ludzie na ulicach skutecznie rozpędzani przez policję. Uwaga międzynarodowych mediów skupiona nad prawami człowieka w Polsce.",
  (state) => {
    state.politics += 4;
    state.people -= 9;
  },
  { message: "Opozycja finansuje demonstracje antyrządowe" }
);

export const a191 = createAction(
  "Wprowadź pierwszy etap znoszenia ograniczeń",
  "Podejmowane są ostrożne działania, których celem jest powrót do normalności Polaków, a także odmrożenie polskiej gospodarki. Rząd apeluje o rozsądne korzystanie z nowych przepisów.",
  (state) => {
    state.politics += 2;
    state.people += 2;
    state.contactsPerDay *= (state.contactsPerDay + 1) * 1.5;
  },
  {
    customFilter: (state) => state.reported >= 2000,
    message: "Wolność Polaków coraz większa",
  }
);

export const a192 = createAction(
  "Wprowadź drugi etap znoszenia ograniczeń",
  "Premier ogłasza drugi etap znoszenia ograniczeń. Wrócą żłobki, hotele i galerie handlowe.",
  (state) => {
    state.politics += 1;
    state.people += 1;
    state.economy += 2;
    state.contactsPerDay *= (state.contactsPerDay + 2) * 2;
  },
  { requires: a191, message: "Morawiecki: Odmrażamy gospodarkę" }
);

export const a193 = createAction(
  "Wprowadź trzeci etap znoszenia ograniczeń",
  "Poluzowanie restrykcji celem rządu dla ratowania polskiej gospodarki. Opozycja pyta czy nie za wcześnie?",
  (state) => {
    state.politics += 2;
    state.people += 3;
    state.economy += 4;
    state.contactsPerDay *= (state.contactsPerDay + 3) * 2.5;
  },
  { requires: a192, message: "Opozycja chciała by trzymać Polaków w domach" }
);

export const a194 = createAction(
  "Wprowadź czwarty etap znoszenia ograniczeń",
  "Większość ograniczeń wprowadzonych w związku z epidemią koronawirusa została zniesiona. Na zauważalne efekty przyjdzie nam poczekać.",
  (state) => {
    state.politics += 3;
    state.people += 6;
    state.economy += 7;
    state.contactsPerDay *= (state.contactsPerDay + 4) * 3;
  },
  { requires: a193, message: "Szumowski: Polacy nie muszą się obawiać" }
);

export const a195 = createAction(
  "Przekształć część szpitali w szpitale zakaźne",
  "Rząd przekształcił szpitale tak aby było gdzie leczyć zakażonych wirusem.",
  (state) => {
    state.budget -= 4;
    state.healthcare += 2;
    state.infectionProbability *= 0.95;
  },
  { message: "Rząd ma plan walki z wirusem" }
);

export const a196 = createAction(
  "Wybuduj szpitale polowe",
  "Ludzie zaniepokojeni pojawieniem się szpitali polowych.",
  (state) => {
    state.budget -= 2;
    state.healthcare += 1;
    state.people -= 1;
    state.infectionProbability *= 0.95;
  },
  { message: "Leczenie pod chmurką" }
);

let a197;
let a198;

a197 = createAction(
  "Zwiększ tymczasowo VAT",
  "Dodatkowe wpływy do budżetu kosztem gospodarki? Przedsiębiorcy rozważają protesty. Nikt nie wierzy obietnicom powrotu do poprzedniej stawki po ustaniu kryzysu.",
  (state) => {
    state.budget += 7;
    state.economy -= 5;
    state.people -= 3;
  },
  { excludes: () => a198, message: "Tusk ponownie zwiększył VAT" }
);

a198 = createAction(
  "Zmniejsz VAT",
  "Zmniejszona stawka VAT tworzy nadzieję na odnowienie polskiej gospodarki.",
  (state) => {
    state.budget -= 10;
    state.economy += 3;
    state.people += 2;
  },
  { excludes: () => a197, message: "Tusk oszukał Polaków" }
);

export { a197, a198 };

export const a199 = createAction(
  "Zamów mszę świętą w intencji o deszcz",
  "Parlamentrzyści Prawa i Sprawiedliwości zamówili mszę świętą w intencji desczu. Kpina z liturgii razi bardzo wielu posłów.",
  (state) => {
    state.politics += 2;
    state.people -= 2;
  },
  { message: "Polacy modlą się o deszcz" }
);

export const a200 = createAction(
  "Opodatkuj serwisy VOD",
  "Rząd wprowadza 1,5-procentowy podatek od przychodów który obejmie ok. 150 serwisów, w tym Netflix, Ipla, Player.pl, Cda.pl, Amazon, czy Apple+. Ze względu na misję, VOD TVP zwolnione zostało od opłaty.",
  (state) => {
    state.budget += 3;
    state.people -= 4;
    state.politics += 1;
  },
  { message: "Polacy wybierają VOD TVP zamiast Netflixa" }
);

export const a201 = createAction(
  "Wprowadź aplikację do śledzenia kontaktów",
  "Aplikacja ProteGO Safe mająca śledzić kontakt z zakażonymi, pełna luk bezpieczeństwa i zagrożeń dla prywatności, wykorzystywana przez rząd do śledzenia obywateli i nielegalnych manifestacji antyrządowych. Ministerstwo Cyfryzacji atakuje Niebezpiecznika za ujawnienie prawdy!",
  (state) => {
    state.budget -= 7;
    state.people -= 4;
    state.politics += 3;
    state.contactsPerDay *= 0.95;
  },
  { message: "Dziury w aplikacji mniejsze niż w budżecie" }
);

export const a202 = createAction(
  "Zorganizuj koncert Kasi Kowalskiej",
  "Po wcześniejszym apelu do młodych aby nie wychodzili w domu, dziś pojawiły się tłumy na koncercie w trakcie epidemii.",
  (state) => {
    state.budget -= 1;
    state.people += 2;
    state.contactsPerDay *= 1.1;
    state.infectionProbability *= 1.1;
  },
  { message: "Muzyka łączy ludzi i wirusa" }
);

export const a203 = createAction(
  "Zamontuj skrzynkę na listy przy posiadłości Prezesa",
  "Po szumie w sieci, przy domu Jarosława Kaczyńskiego pojawiła się skrzynka pocztowa. Za jej brak grozi wysoka kara. Zarzuty postawione demaskatorom.",
  (state) => {
    state.budget -= 2;
    state.people += 1;
  },
  { message: "Opozycja ukradła skrzynkę prezesowi Kaczyńskiemu" }
);

export const a204 = createAction(
  "Wyślij policję aby pilnowała skrzynkę na listy Prezesa",
  "Policja na służbie pilnuje najcenniejszej skrzynki na listy. Polski podatnik funduje prywatną ochronę willi prezesa PiS.",
  (state) => {
    state.people -= 1;
    state.politics += 1;
    state.policeAuthority -= 2;
  },
  {
    requires: a203,
    message: "Zmiana warty przy skrzynce u Prezesa co 15 minut",
  }
);

export const a205 = createAction(
  "Obniż pensje w polityków",
  "Rząd wyraża solidarność z narodem obniżając politykom wynagrodzenia. Koniec niejasnych premii.",
  (state) => {
    state.people += 4;
    state.politics -= 5;
    state.economy += 1;
    state.budget += 3;
  },
  {
    message: "Komu przeszkadzają bogaci politycy?",
  }
);

export const a206 = createAction(
  "Zabroń wypowiedzi publicznych lekarzom i listonoszom",
  "Nieprzychylne wypowiedzi lekarzy i listonoszy skutecznie wycinane przez aparat cenzury rządu.",
  (state) => {
    state.people -= 2;
    state.politics += 2;
  },
  {
    message: "Lekarze i listonosze roznoszą hejt",
  }
);

export const a207 = createAction(
  "Zdelegalizuj ZAiKS i znacjonalizuj jego majątek",
  "Polski Eric Clapton bez środków do życia, mimo iż od dawna niczego nie wydał.",
  (state) => {
    state.budget += 2;
    state.people += 5;
    state.economy -= 2;
  },
  {
    message: "Muzyka dobrem kultury dostępna dla Polaków",
  }
);

export const a208 = createAction(
  "Wprowadź nowoczesne systemy zliczania klientów w sklepach",
  "Pracownicy ochrony od dziś zliczają klientów na liczydłach.",
  (state) => {
    state.people += 1;
    state.infectionProbability *= 0.999;
  },
  {
    message: "Szkoła z TVP uczy matematyki",
  }
);

export const a209 = createAction(
  "Obniż pensje pielęgniarkom",
  "Kaganiec milczenia przerwany - pielęgniarki dzielą się informacjami na prywatnych grupach w sieci.",
  (state) => {
    state.people -= 1;
    state.budget += 2;
    state.healthcare -= 3;
  },
  {
    message: "Pielęgniarki zamiast pracować żalą się w sieci",
  }
);

export const a210 = createAction(
  "Wprowadź podwyżki w ZUS",
  "Dyrekcja ZUS rozesłała maile do swoich podopiecznych z zapowiedzią podwyżek i z prośbą o dyskrecję.",
  (state) => {
    state.people -= 1;
    state.budget -= 2;
    state.healthcare -= 2;
    state.politics += 3;
  },
  {
    message: "ZUS kochany przez Polaków",
  }
);

export const a211 = createAction(
  "Wprowadź monitoring kamerami termowizyjnymi",
  "Kamery monitoringów miejskich wyposażane są w czujniki termowizyjne w celu wykrycia chorych osób w tłumie.",
  (state) => {
    state.people -= 2;
    state.budget -= 4;
    state.infectionProbability *= 0.95;
    state.contactsPerDay *= 0.95;
    state.detectionRate += 2;
  },
  {
    message: "Mamy wszystko pod kontrolą",
  }
);

export const a212 = createAction(
  "Podnieś kwotę wolną od podatku",
  "Kwota wolna od podatku zwiększona do 12-krotności miesięcznej płacy minimalnej. Konfederacja zaskoczona działaniem rządu!",
  (state) => {
    state.people += 4;
    state.budget -= 7;
    state.economy += 5;
    state.social -= 2;
  },
  {
    message: "Rząd o krok do przodu przed opozycją",
  }
);

export const a213 = createAction(
  "Przekaż środki ochrony osobistej do Watykanu",
  "W momencie gdy w polskich szpitalach brakuje sprzętu i środków ochrony osobistej, PKN Orlen przekazał środki ochronne do Watykanu w postaci ponad 705 tys. masek jednorazowych, 30 tys. masek polskiej firmy Brubeck, 3,6 tys. sztuk płynu do dezynfekcji rąk o pojemności 5 litrów, 3,2 tys. sztuk płynu do dezynfekcji powierzchni o pojemności 5 litrów oraz 10 tys. kombinezonów ochronnych.",
  (state) => {
    state.people -= 2;
    state.budget -= 3;
    state.healthcare -= 2;
    state.politics += 5;
  },
  {
    message: "Jak trwoga, to do Boga",
  }
);

export const a214 = createAction(
  "Nagraj #hot16challenge2 Andrzeja Dudy",
  "Media komentują: Zamiast kompromitacji w sieci, należało by przekazać fundusze z TVP na służbę zdrowia.",
  (state) => {
    state.people -= 1;
    state.politics += 1;
  },
  {
    message: "Nie pytają o imię, walczą z ostrym cieniem mgły",
  }
);

export const a215 = createAction(
  "Powołaj zespół do walki z hejtem w policji",
  "Policyjne psy będą od dziś tropić hejterów w sieci.",
  (state) => {
    state.people -= 2;
    state.politics += 2;
    state.policeAuthority -= 2;
  },
  {
    message: "Prawda jest nową mową nienawiści",
  }
);
