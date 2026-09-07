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

---

### Testning

Projektet använder **Cypress** för end-to-end-tester.

Testerna används för att kontrollera att webbshoppen fungerar som den ska och att projektets krav uppfylls.

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

### Krav för Godkänt

- [ ] Git & GitHub har använts
- [ ] Projektmappen innehåller en README.md fil - (läs ovan för mer info)
- [ ] Uppgiften lämnas in i tid!
- [ ] Ett designsystem/komponentbibliotek används nästintill helt uteslutande för att bygga sidan (ex: MUI, ChakraUI, Mantine, etc).

**Home**

- [ ] Ska ha en övergripande layout med header, main & footer.
- [ ] Startsidan ska lista samtliga produkter.
- [ ] Det ska gå att lägga till produkter i kundvagnen (header + toast + ls).
- [ ] Det ska gå att klicka på en produkt och komma till en detaljsida.
- [ ] Sidan ska vara responsiv och gå att använda på mobil, tablet & desktop.

**Produkt**

- [ ] Ska ha en övergripande layout med header, main & footer.
- [ ] Detaljsidan ska visa all info om en produkt.
- [ ] Det ska gå att lägga till produkten i kundvagnen (header + toast + ls).
- [ ] Sidan ska vara responsiv och gå att använda på mobil, tablet & desktop.

**Kundvagn & Checkout**

- [ ] Ska ha en övergripande layout med header, main & footer.
- [ ] Det ska gå att gå till checkoutsidan och se innehållet i kundvagnen (knapp & url).
- [ ] Det ska gå att se det totala priset i kundvagnen.
- [ ] Det ska gå att ändra produkterna i kundvagnen (header + vyn + pris + ls).
- [ ] Det ska gå att ange leveransuppgifter i ett formulär.
- [ ] Samtliga fält för checkoutsidans formulär ska ha valideringsregler.
- [ ] Formulären vid utcheckningen ska gå att automatiskt fyllas i.
- [ ] Bekräftelsesidan ska visa orderdetaljer och leveransuppgifter

**Admin**

- [ ] Det finns en admin-sida för produkthantering
- [ ] Det ska gå att se alla produkter på admin sidan
- [ ] Det går att lägga till produkter via admin sidan + ls
- [ ] Det går att ta bort produkter via admin sidan + ls
- [ ] Det går att redigera produkter via admin sidan + ls
- [ ] Samtliga fält för adminsidans formulär ska ha valideringsregler

## Glajjan – Your next pair of Glajjan.

### Tack för oss! 🔥
