# Deploy till Heroku

## Uppdatera app

I `backend/prisma/schema.prisma`, ersätt `generator client`-stycket med följande:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
  binaryTargets = ["native", "debian-openssl-3.0.x"]
}
```

Skapa `.gitignore` i roten av repot och skriv `node_modules` i den filen.

Kör `npm i -D env-cmd` i roten av repot.

Ersätt `"scripts"` i `package.json` i **roten** av repot med:

```json
  "scripts": {
    "install": "cd backend && npm install --include=dev && cd ../frontend && npm install --include=dev",
    "build": "env-cmd --silent bash build.sh",
    "start": "cd backend && npx prisma db seed && npm start"
  },
```

Skapa `build.sh` i roten av repot och klistra in innehållet från följande gist: <https://gist.github.com/drblue/c33a048986a2f79562fff52eb955a3c9>

Pusha och be till högre makter 🧎.

## Heroku

Skapa app på Heroku. Ange samma namn som ert GitHub team men i kebab-case, t.ex. "fed25-api-grupp-1337". Välj "Europe" som region.

Connect:a ert repo genom att välja "GitHub" under "Deploy"-fliken, välj "the-hive-resistance" som username och sök efter ert repo.

Gå in under Settings > Config Vars och välj "Reveal Config Vars". Lägg till "DATABASE_URL" och som värde klistrar ni in det som finns i er `.env`, dock utan dubbelfnuttar (NO DOUBLE-FNUTTS!).

Logga in i MongoDB Atlas och under "Security > Database & Network Access", välj "IP Access List", lägg till en IP-adress och klicka på "Allow Access from Anywhere". Glöm inte **avmarkera** att den är temporär!

Testa deploy:a genom att under fliken "Deploy" längst ner välja "Manual Deploy".
