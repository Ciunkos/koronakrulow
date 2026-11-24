# Korona Krulów

Satyryczna gra o koronawirusie, polskiej polityce i propagandzie TVPiS. Poczuj się jak Prezes i pokieruj Polską w dobie pandemii!

Gra dostępna online na https://koronakrulow.pl/

Od gracza zależy decyzja czy będzie walczył z epidemią, skupi się na aborcji czy nasyłaniem policji na ludzi. W każdej turze w grze wyświetlane są paski grozy - nie musiałem wymyślać wielu nowych, ponieważ aktualnie samo TVPiS generuje tyle tragikomicznych wiadomości, że ciężko odróżnić prawdę od fałszu. Wątek wyborów przewija się przez całą grę - od gracza zależy przebieg kampanii Dudy.

Wygrasz wybory? Ocalisz ludzi? Opracujesz szczepionkę? - Sprawdź grając w Koronę Krulów!

PS. W grze można zaprzestać finansowania WHO, wprowadzić stan wyjątkowy (a nawet wojenny dla wytrwałych). Niestety, jeśli dojdzie do wyborów to nie ma szans by wygrał kto inny niż Duda ( ͡° ͜ʖ ͡°)

# Instrukcja uruchomienia

Gra jest budowana przez [Vite](https://vite.dev/). Zainstaluj zależności:

```sh
npm install
```

Potem aby uruchomić grę w trybie deweloperskim (http://localhost:3000):

```sh
npm start
```

Testy (Vitest) i lint (ESLint):

```sh
npm test
npm run lint
```

## Budowanie na produkcję

```sh
npm run build
```

Gra posiada kilka skryptów ściągających paski na podstawie tekstów w akcjach. Aby zbudować pełną paczkę należy uruchomić:

```sh
npm run package
```

Po ukończeniu katalog `build` nadaje się do statycznego serwowania przez serwer HTTP, na przykład `npm run preview`.

Build targets the browsers in Vite's default `baseline-widely-available` set (Chrome and Edge 111+, Firefox 114+, Safari 16.4+). Create React App targeted `>0.2%, not dead, not op_mini all`, which also covered older browsers; add `@vitejs/plugin-legacy` if those matter again.

## Overrides

`package.json` `overrides` pin a transitive package to a patched version that the code using it still works with. Remove an entry when its reason no longer holds.

| Package | Override | Why                                                                                                                                                                      | Evidence                                                                                                                  |
| ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `zod`   | `^4.6.7` | GHSA-mrhx-c7xc-m3w5 (zod < 4.6.6) under `jimp` 1.6.1 (`paski.js`, `random.js`). Drop it when `jimp` ^1.7.0 (which moved to zod 4 itself) is past the 7-day npm cooldown. | jimp only uses zod APIs that zod 4 keeps; the download scripts' image pipeline gives byte-identical JPEGs on zod 3 and 4. |

# Licencje

Kod udostępniam do domeny publicznej. Część obrazków i zasobów podlega własnym ograniczeniom licencyjnym. Obrazek [banknotu 500+ autorstwa Goorsky'iego](http://goorsky.pl/nowy-banknot-500/) na indywidualnej licencji - proszę o kontakt z autorem.

Gra zawiera elementy mogące podlegagać prawom autorskim. Użycie na warunkach dozwolonego użytku publiczego w celu uświadomienia społeczeństwa na zagrożenia propagandy uprawianej przez państwową telewizję i rząd.

Strona nie ma związku z tvp, celem jest parodia, pastisz i karykatura propagandy. Część wydarzeń w grze jest fikcją - wszelkie podobieństwo do żyjących postaci jest przypadkowe.

Zapoznaj się z licencją gry na stronie głównej gry lub w pliku `/src/Menu.jsx`.

# Kontakt

Kontakt: koronakrulow@ciunkos.com
