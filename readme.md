# Fronta
## Instalace
- po státhnutí repozitáře je potřeba nainstalovat dependencies
- postup v příkazové řádce z kořenového adresáře (DVOP-API):
`cd client`
`npm i`
`cd ..`
`cd server`
`npm i`

## Spuštění
### Server
- před spuštěním backendu je potřeba definovat PORT, na kterém bude server běžet
    - v adresáři 'server' je potřeba vytvořit soubor .env, do kterého je třeba vložit variable BACKEND_PORT={váš port}, např. BACKEND_PORT=8080

- poté pokud již jsme v adresáři 'server', stačí spustit příkaz `npm run dev` v terminálu

### Client
- pro spuštění klienta je potřeba být v adresáři 'client' a spustit příkaz `npm run dev`

## Navigace u clineta
### Základní informace
- na hlavní stránce se nachází link na admin panel, ve kterém se dají přidávat, odebírat objednávky (také upravit status objednávky) a lokace
- data v admin panelu a vyvolávacích tabulích se automaticky refreshují (každých 5 sekund)
### Přidávání lokace a objednávky
- vedle nadpisu 'Locations' a 'Orders' se nachází ikonka '+', která po stisknutí otevře okno, kde se dají jednoduše vyplnit informace a odeslat požadavek
### Objednávka
- Nachází se zde pořadí (pouze informační), adresa lokace, ikonka šipky vpravo a ikonka pomlčky (nebo mínusu)
    - po kliknutí na ikonku šipky vpravo se dostanete na vyvolávací tabuli na této lokaci
    - po kliknutí na ikonku pomlčky (nebo mínusu) odstraníte lokaci (lokace jde smazat pouze pokud jsou všechny objednávky odstraněny, žádné objednávky nemá nebo jsou označené jako 'completed')
### Lokace
- Nachází se zde číslo objednávky, popis objednávky, status, ikonka šipky vpravo a ikonka pomlčky (mínusu)
    - status se dá měnit, po vybrání jiného statusu se pošle požadavek
    - po kliknutí na ikonku šipky vpravo se dostanete na detaily objednávky
    - po kliknutí na ikonku pomlčky (mínusu) odstraníte objednávku
### Vyvolávací tabulka
- Ukazuje čísla objednávek, které jsou buď zpracovávané nebo připravené, nikoliv vyřízené
### Stránka objednávky
- Ukazuje číslo objednávky (Order {číslo objednávky}), popis objednávky, status objednávky a lokaci, na které bude objednávka připravena
