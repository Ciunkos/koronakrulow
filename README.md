# Korona Krulów

Satyryczna gra o koronawirusie, polskiej polityce i propagandzie TVPiS. Poczuj się jak Prezes i pokieruj Polską w dobie pandemii!

Gra dostępna online na https://koronakrulow.pl/

Od gracza zależy decyzja czy będzie walczył z epidemią, skupi się na aborcji czy nasyłaniem policji na ludzi. W każdej turze w grze wyświetlane są paski grozy - nie musiałem wymyślać wielu nowych, ponieważ aktualnie samo TVPiS generuje tyle tragikomicznych wiadomości, że ciężko odróżnić prawdę od fałszu. Wątek wyborów przewija się przez całą grę - od gracza zależy przebieg kampanii Dudy.

Wygrasz wybory? Ocalisz ludzi? Opracujesz szczepionkę? - Sprawdź grając w Koronę Krulów!

PS. W grze można zaprzestać finansowania WHO, wprowadzić stan wyjątkowy (a nawet wojenny dla wytrwałych). Niestety, jeśli dojdzie do wyborów to nie ma szans by wygrał kto inny niż Duda ( ͡° ͜ʖ ͡°)

# Instrukcja uruchomienia

Zainstaluj zależności:

```sh
npm install
```

Potem aby uruchomić grę w trybie deweloperskim:

```
npm start
```

## Budowanie na produkcję

Gra posiada kilka skryptów ściągających paski na podstawie tekstów w akcjach. Aby zbudować pełną paczkę należy uruchomić:

```
npm run package
```

Po ukończreniu katolog `build` nadaje się do statycznego serwowania przez serwer HTTP lub ręcznego odpalenia.

## Overrides

The project stays on Create React App (`react-scripts` 5), which pins old toolchain packages. `package.json` `overrides` replace some of them. Each entry is either a patched version that the calling code works with or a local stub (in `stubs/`) for code that never runs in this project. Remove an entry when its reason no longer holds.

| Package                     | Override                             | Why                                                                                                                                                                         | Evidence                                                                                                                                                                                                                                                 |
| --------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `zod`                       | `^4.6.7`                             | GHSA-mrhx-c7xc-m3w5 (zod < 4.6.6) under `jimp` 1.6.1 (`paski.js`, `random.js`). Drop it when `jimp` ^1.7.0 (which moved to zod 4 itself) is past the 7-day npm cooldown.    | jimp only uses zod APIs that zod 4 keeps; the download scripts' image pipeline gives byte-identical JPEGs on zod 3 and 4.                                                                                                                                |
| `resolve-url-loader`        | `^5.0.0`                             | Version 4 (pinned by react-scripts) bundles postcss 7, which has several advisories.                                                                                        | v5 only removed the `engine` and `keepQuery` options; react-scripts passes `sourceMap` and `root`. The build output is byte-identical.                                                                                                                   |
| `serialize-javascript`      | `^7.1.4`                             | Advisories in < 7.1.3, used by `css-minimizer-webpack-plugin`.                                                                                                              | Same `serialize(obj, options)` export; the build output is byte-identical.                                                                                                                                                                               |
| `@tootallnate/once`         | `^2.0.1`                             | Advisory in < 2.0.1, used by jsdom's `http-proxy-agent` (tests only).                                                                                                       | v2 still exports `default`, which `http-proxy-agent` 4 calls; the tests pass.                                                                                                                                                                            |
| `@svgr/plugin-svgo`         | stub, `stubs/svgr-plugin-svgo`       | Pulls in svgo 1, css-select 2 and nth-check 1 (advisories).                                                                                                                 | react-scripts runs `@svgr/webpack` with `svgo: false`, and the real plugin returns the code unchanged in that case. The stub does the same and throws if svgo is ever turned on. `src/map.svg` still builds to the same file.                            |
| `workbox-webpack-plugin`    | stub, `stubs/workbox-webpack-plugin` | Pulls in workbox-build, rollup and rollup-plugin-terser (advisories).                                                                                                       | react-scripts only creates `InjectManifest` when `src/service-worker.js` exists. This project has no service worker: `src/index.js` calls `unregister()`. The stub throws if it is ever used. To add a service worker, remove the stub and the override. |
| `uuid`                      | `^11.1.1`                            | Advisory in < 11.1.1, used by `sockjs` (webpack-dev-server, `npm start` only). The owner accepted the new `prepare` script flagged by the dependency review (2026-11-24).   | `sockjs` only calls `require("uuid").v4()`, which uuid 11 still exports for CommonJS; the dev server starts and serves the app.                                                                                                                          |
| `react-is` under `recharts` | `$react-is` (19.3.1)                 | recharts 2.15 depends on react-is 18, which does not recognise React 19 elements (React 19 changed the element type symbol). recharts documents this override for React 19. | recharts uses react-is to read chart children; with the override the statistics chart renders its three lines, axes and legend under React 19 (checked in a jsdom render).                                                                               |

The stubs are wired as `devDependencies` (`file:stubs/...`) and referenced from `overrides` with `$name`, because a `file:` path written directly in `overrides` resolves relative to the dependent package.

# Licencje

Kod udostępniam do domeny publicznej. Część obrazków i zasobów podlega własnym ograniczeniom licencyjnym. Obrazek [banknotu 500+ autorstwa Goorsky'iego](http://goorsky.pl/nowy-banknot-500/) na indywidualnej licencji - proszę o kontakt z autorem.

Gra zawiera elementy mogące podlegagać prawom autorskim. Użycie na warunkach dozwolonego użytku publiczego w celu uświadomienia społeczeństwa na zagrożenia propagandy uprawianej przez państwową telewizję i rząd.

Strona nie ma związku z tvp, celem jest parodia, pastisz i karykatura propagandy. Część wydarzeń w grze jest fikcją - wszelkie podobieństwo do żyjących postaci jest przypadkowe.

Zapoznaj się z licencją gry na stronie głównej gry lub w pliku `/src/Menu.js`.

# Kontakt

Kontakt: koronakrulow@ciunkos.com
