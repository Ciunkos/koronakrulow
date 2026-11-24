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

The project stays on Create React App (`react-scripts` 5), which pins old toolchain packages. `package.json` `overrides` replace some of them. Each entry is either a patched version that the calling code works with, a local stub (in `stubs/`) for code that never runs in this project, or a pin that holds a version back until it is reviewed. Remove an entry when its reason no longer holds.

| Package                   | Override                             | Why                                                                                                                                                                                                                                                                                     | Evidence                                                                                                                                                                                                                                                 |
| ------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `zod`                     | `^4.6.7`                             | GHSA-mrhx-c7xc-m3w5 (zod < 4.6.6) under `jimp` 1.6.1 (`paski.js`, `random.js`). Drop it when `jimp` ^1.7.0 (which moved to zod 4 itself) is past the 7-day npm cooldown.                                                                                                                | jimp only uses zod APIs that zod 4 keeps; the download scripts' image pipeline gives byte-identical JPEGs on zod 3 and 4.                                                                                                                                |
| `resolve-url-loader`      | `^5.0.0`                             | Version 4 (pinned by react-scripts) bundles postcss 7, which has several advisories.                                                                                                                                                                                                    | v5 only removed the `engine` and `keepQuery` options; react-scripts passes `sourceMap` and `root`. The build output is byte-identical.                                                                                                                   |
| `serialize-javascript`    | `^7.1.4`                             | Advisories in < 7.1.3, used by `css-minimizer-webpack-plugin`.                                                                                                                                                                                                                          | Same `serialize(obj, options)` export; the build output is byte-identical.                                                                                                                                                                               |
| `@tootallnate/once`       | `^2.0.1`                             | Advisory in < 2.0.1, used by jsdom's `http-proxy-agent` (tests only).                                                                                                                                                                                                                   | v2 still exports `default`, which `http-proxy-agent` 4 calls; the tests pass.                                                                                                                                                                            |
| `@svgr/plugin-svgo`       | stub, `stubs/svgr-plugin-svgo`       | Pulls in svgo 1, css-select 2 and nth-check 1 (advisories).                                                                                                                                                                                                                             | react-scripts runs `@svgr/webpack` with `svgo: false`, and the real plugin returns the code unchanged in that case. The stub does the same and throws if svgo is ever turned on. `src/map.svg` still builds to the same file.                            |
| `workbox-webpack-plugin`  | stub, `stubs/workbox-webpack-plugin` | Pulls in workbox-build, rollup and rollup-plugin-terser (advisories).                                                                                                                                                                                                                   | react-scripts only creates `InjectManifest` when `src/service-worker.js` exists. This project has no service worker: `src/index.js` calls `unregister()`. The stub throws if it is ever used. To add a service worker, remove the stub and the override. |
| `postcss-selector-parser` | `6.0.10` (pin)                       | Holds the version from before this update. `npm audit fix` moved it to 6.1.6, which fixes a moderate advisory, but 6.1.4 to 6.1.6 were published by a different maintainer account than earlier releases, and the dependency review holds publisher changes until a person checks them. | Remove the pin once the publisher is confirmed; `npm install` then picks 6.1.6 again.                                                                                                                                                                    |

The stubs are wired as `devDependencies` (`file:stubs/...`) and referenced from `overrides` with `$name`, because a `file:` path written directly in `overrides` resolves relative to the dependent package.

# Licencje

Kod udostępniam do domeny publicznej. Część obrazków i zasobów podlega własnym ograniczeniom licencyjnym. Obrazek [banknotu 500+ autorstwa Goorsky'iego](http://goorsky.pl/nowy-banknot-500/) na indywidualnej licencji - proszę o kontakt z autorem.

Gra zawiera elementy mogące podlegagać prawom autorskim. Użycie na warunkach dozwolonego użytku publiczego w celu uświadomienia społeczeństwa na zagrożenia propagandy uprawianej przez państwową telewizję i rząd.

Strona nie ma związku z tvp, celem jest parodia, pastisz i karykatura propagandy. Część wydarzeń w grze jest fikcją - wszelkie podobieństwo do żyjących postaci jest przypadkowe.

Zapoznaj się z licencją gry na stronie głównej gry lub w pliku `/src/Menu.js`.

# Kontakt

Kontakt: koronakrulow@ciunkos.com
