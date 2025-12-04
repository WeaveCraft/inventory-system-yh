# Inventory Management System – Backend (Node.js + Express + PostgreSQL)

Detta projekt är ett enkelt lagerhanteringssystem (Inventory Management System) byggt med:

- **Node.js**
- **Express**
- **PostgreSQL**
- **pgAdmin 4**
- **Bruno (för API-testning)**

Systemet hanterar produkter i ett lager med full CRUD-funktionalitet via REST API.

---

## Installation & Körning

Följ stegen nedan för att starta projektet lokalt.

---

### Klona projektet


git clone <repo-url>
cd inventory-system

## Installera beroenden

```npm install```

## Konfigurera miljövariabler (.env)

Projektet använder .env, men själva .env-filen är gitignored.
I repot finns en fil som heter .envPlaceholder som ser ut så här:

PORT={PORT_NUMBER_HERE}
DATABASE_URL=postgres://postgres:{PASSWORD_HERE}@localhost:5432/{DB_NAME_HERE}

//Replace curly brackets and everything inside of it "{}" with actual value.

Gör så här:

    Skapa en ny fil: .env

    Kopiera innehållet från .envPlaceholder

    Byt ut allt inom {} till riktiga värden:

    {PORT_NUMBER_HERE} → t.ex. 3000

    {PASSWORD_HERE} → ditt PostgreSQL-lösenord

    {DB_NAME_HERE} → din databas (t.ex. inventory_db)

Exempel:

PORT=3000
DATABASE_URL=postgres://postgres:myPassword@localhost:5432/inventory_db

## PostgreSQL – Databasinstallation

Detta projekt kräver att PostgreSQL redan är installerat.
 Starta pgAdmin 4

Öppna pgAdmin och logga in.
 Skapa databas

    Högerklicka på Databases → Create → Database

    Namn: inventory_db

    Spara

## Kör SQL-skriptet för att skapa tabellen

I projektet finns en fil:

/migrations/create_products.sql

Gör så här:

    Högerklicka på inventory_db i pgAdmin

    Välj Query Tool

    Klistra in eller öppna innehållet från schema.sql

    Tryck F5 för att köra skriptet

Det skapar tabellen products som används av API:et.

## Starta servern

När .env är klar och databasen finns:

Kör följande kommandos via VS Code terminal.

node server.js

Servern startar på porten du angivit i .env.
## Testa API:et i Bruno

I repot finns en mapp:

Inventory Bruno/

Den innehåller alla färdiga request-filer för Bruno (GET, POST, PUT, DELETE).

Så här testar du API:et:

    Öppna Bruno

    Importera mappen Inventory Bruno

    Kör alla endpoints för att testa CRUD-funktionalitet

## Tillgängliga Endpoints
Produkter
Metod	Endpoint	Beskrivning
GET	/products	Hämta alla produkter
GET	/products/:id	Hämta en specifik produkt
POST	/products	Skapa en ny produkt
PUT	/products/:id	Uppdatera en produkt
DELETE	/products/:id	Ta bort en produkt
