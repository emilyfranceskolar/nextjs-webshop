## Webbshop med React, Next.js & TypeScript

### Rebrand av Worn Stories → Glajjan 🕶️

Glajjan är en rebrand av det tidigare projektet Worn Stories, där vi har gått från kläder till glasögon.

Webbshoppen är byggd med Next.js, React, TypeScript och Shadcn och innehåller både ett kundflöde och en admin-del.

Som kund kan man bläddra bland produkter, filtrera efter kategori, lägga produkter i kundvagnen och genomföra ett köp. Det går även att skapa ett konto och se sina tidigare beställningar.

Admin-delen är skyddad och kräver att man är inloggad som administratör. Administratören kan bland annat lägga till, redigera och ta bort produkter, hantera lagersaldo och se genomförda beställningar.

Frontend och backend är byggda med Next.js och applikationen använder en SQLite-databas via Prisma för att lagra projektets data.

---

### Startsida

- Visar produkter
- Möjlighet att filtrera produkter efter kategori
- Navigering till produktsida
- Möjlighet att lägga produkter i kundvagnen
- Kategorier för bland annat Bestseller, Reading Glasses, Sunglasses och Sale

---

### Produktsida

- Visar detaljerad information om en produkt
- Visar produktbild, pris och beskrivning
- Visar tillgängligt lagersaldo
- Möjlighet att lägga produkten i kundvagnen

---

### Kundkonto

- Skapa konto
- Logga in
- Logga ut
- Se tidigare beställningar
- Se information om genomförda köp

---

### Admin

Admin-panelen är skyddad och kan endast nås av användare med admin-behörighet.

- Lista alla produkter
- Skapa nya produkter
- Redigera produkter
- Ta bort produkter
- Hantera lagersaldo
- Se alla beställningar
- Markera beställningar som skickade

---

### Kundvagn & Checkout

- Lista produkter i kundvagnen
- Uppdatera antal
- Ta bort produkter
- Visar totalpris
- Kundvagnen sparas i `localStorage`
- Formulär för kunduppgifter
- Validering av formulär
- Kontroll av lagersaldo vid beställning
- Lagret minskas när ordern skapas. Om någon produkt inte räcker till avbryts hela beställningen utan att lagret ändras.
- Orderbekräftelse med unikt ordernummer

---

### Tekniker

- **Next.js**
- **React**
- **TypeScript**
- **SQLite**
- **Prisma**
- **React Hook Form**
- **Better Auth**
- **Zod**
- **Tailwind CSS**
- **Shadcn/ui**
- **Cypress**

---

### Databas

Projektet använder Prisma som ORM och SQLite som SQL-databas.

Databasen används bland annat för att lagra:

- Användare
- Produkter
- Kategorier
- Lagersaldo
- Beställningar
- Orderrader

---

### Produktkategorier

En produkt kan tillhöra en eller flera kategorier.

Exempel på kategorier:

- Bestseller
- Reading Glasses
- Sunglasses
- Sale

Detta hanteras genom en relation mellan produkter och kategorier i databasen.

När en produkt skapas eller redigeras väljer admin en eller flera kategorier med
checkboxar: Bestseller, Reading Glasses, Sunglasses och Sale. Befintliga giltiga
kategorier är förvalda i **Edit product**. Gamla testkategorier visas inte som val.
Om en produkt har en sådan kategori visas en förklaring innan admin sparar nya kategorival.
När **Sale** är markerat visas **Regular price (kr)** och **Sale price (kr)**. Reapriset måste vara
större än noll och lägre än ordinarie pris. Reapriset visas rött och ordinarie pris
svart och överstruket bredvid, tillsammans med en **Sale**-markering. Detta visas
även i produktlistan, Sale-kategorin och på produktens detaljsida.
Kundvagn och nya orders använder reapriset.
När Sale avmarkeras och produkten sparas tas reapriset bort. Övriga valda kategorier behålls.

Efter att ha hämtat ändringen för reapriser, stoppa utvecklingsservern och kör:

```bash
npx prisma db push
npx prisma generate
npm run dev
```

Befintliga produkter behåller sina priser. För produkter som redan har kategorin
Sale behöver admin fylla i både det riktiga ordinarie priset och reapriset.
Sale-listan visar bara produkter med ett giltigt reapris. Admin visar länkar till
Sale-produkter som saknar detta. De finns fortfarande kvar under alla produkter.
Ingen seedning behövs. Om ett pris ändras medan en produkt ligger i kundvagnen
behöver kunden ta bort produkten och lägga till den igen före beställning.

Kör tester för reapriser och kategorival med `npm run test:sale`.

---

### Testkonton

##### Kund

Epost: test@glajjan.se
Lösenord: Testglajjan1234!

```bash
make-admin -- test@glajjan.se
```

---

### Designspråk

Vi har valt en enkel och modern design för Glajjan med fokus på produkterna.

Projektet använder:

- **Tailwind CSS** för styling
- **Shadcn/ui** för återanvändbara komponenter
- Ett neutralt färgschema med gröna accenter
- Responsiv design för mobil, surfplatta och desktop

---

#### Kom igång

Installera dependencies: `npm install`
Skapa databasen: `npx prisma db push `
Kör seed: `npm run seed`
Starta utvecklingsservern: `npm run dev`
Sedan klicka dig in på: http://localhost:3000

---

#### Kravspecifikation på projektet: ✅

• Alla sidor skall vara responsiva. (G)
• Arbetet ska implementeras med NextJS. (G)
• Backenden ska ha validering på samtliga endpoints (även Server Actions). (G)
• Skapa ett ER diagram som ska ha visats vid idégodkännandet (G)
• Beskriv er företagsidé i en kort textuell presentation, detta ska ha visats vid
idégodkännandet (G)
• All data som programmet utnyttjar ska vara sparat i en SQL databas (produkter,
beställningar, konton, mm) med undantaget av bilder. (G)
• Man ska kunna logga in som administratör i systemet (G)
• Inga Lösenord får sparas i klartext i databasen (G)
• En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i
databasen (G)
• Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan
(G)
• Administratörer ska kunna se en lista på alla gjorda beställningar (G)
• Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori,
men kan tillhöra flera (G)
• Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista
bara dom produkter som tillhör en kategori (G)
• Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på
klienten (G)
• En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in
och måste vara inloggad som kund innan beställningen skapas (G)
• Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G)
• När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är
skickade eller inte (G)
• Administratörer ska kunna redigera produkt (G)
• Administratörer ska kunna lägga till och ta bort produkter (G)
• Administratörer ska kunna markera beställningar som skickade (G)

## Glajjan – Your next pair of Glajjan.

### Tack för oss! 🔥
