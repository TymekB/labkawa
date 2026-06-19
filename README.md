# LabKawa 🩸☕

Aplikacja webowa niepublicznego zakładu opieki zdrowotnej — **laboratorium diagnostyczne**.
Klon funkcjonalny serwisu typu ALAB, zbudowany w **Angular 18** (standalone + signals).

Kolor przewodni: `#53B2E4`.

## Stack

- **Angular 18** — standalone components, brak NgModule
- **Signals** — stan reaktywny (`signal`, `computed`, `effect`, signal inputs)
- **Nowa składnia szablonów** — `@if`, `@for`
- **Lazy loading** — każdy widok ładowany przez `loadComponent`
- **SCSS** — design system na CSS custom properties (theming jednym kolorem)
- **OnPush** wszędzie — wydajne wykrywanie zmian

## Funkcjonalności

| Widok | Ścieżka | Opis |
|-------|---------|------|
| Strona główna | `/` | Hero z wyszukiwarką, kategorie, popularne badania, „jak to działa", pakiety, statystyki |
| Katalog badań | `/badania` | Wyszukiwanie + filtr po kategorii (stan w query params) |
| Szczegóły badania | `/badania/:slug` | Opis, przygotowanie, specyfikacja, dodanie do koszyka, podobne badania |
| Pakiety | `/pakiety` | Lista pakietów profilaktycznych |
| Szczegóły pakietu | `/pakiety/:slug` | Skład pakietu, kalkulacja oszczędności względem badań osobno |
| Punkty pobrań | `/punkty-pobran` | Filtrowanie po mieście, pobranie w domu, soboty |
| Wyniki online | `/wyniki-online` | Logowanie (mock) + panel pacjenta z wynikami |
| Dla pacjenta | `/dla-pacjenta` | Przygotowanie do badań + FAQ (akordeon) |
| Koszyk | `/koszyk` | Pozycje, podsumowanie, checkout (mock), trwałość w localStorage |
| Kontakt | `/kontakt` | Formularz z walidacją (template-driven) |

## Architektura

```
src/app/
├── core/
│   ├── models/        # interfejsy domenowe (LabTest, TestPackage, CollectionPoint…)
│   └── services/      # CatalogService (dane mock), CartService (signals + localStorage)
├── shared/
│   ├── components/    # logo, header, footer, test-card, package-card
│   └── pipes/         # PricePipe (Intl PLN)
└── features/          # lazy-loaded widoki (home, tests, packages, points, results, patient, cart, contact)
```

- **CatalogService** — single source of truth dla katalogu, eksponuje sygnały i metody wyszukiwania.
- **CartService** — koszyk oparty o `signal`, `computed` dla liczby pozycji i sumy, persystencja w `localStorage`.

## Uruchomienie

> Wymaga **Node 18+** (projekt rozwijany na `18.20.7`).

```bash
nvm use 18.20.7
npm install
npm start            # ng serve → http://localhost:4200
npm run build        # build produkcyjny → dist/labkawa
```

## Dane

Wszystkie dane (badania, pakiety, punkty pobrań, wyniki) są **mockowane** w `CatalogService`.
Logowanie do wyników i płatność w koszyku są symulowane — to demo front-endowe gotowe do
podpięcia pod realne API (wystarczy podmienić implementację serwisów na HTTP).
