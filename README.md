# Turnus - A Judo Tournament Webapp

Turnus is an realtime web application to organize a judo tournament.
This project is at the beginning but the vision / mission is ambitious.

## Features

- Registration of judo fighters
- Checkin at the tournament (weight in)
- Automatically creates categories
- Creates matches list based on `bresil` and `round robin`
- Scoring Screen for the Audience
- Operator Dashboard to control the fight
- ...

## Technical Aspects

Current stack: nuxt, vuejs, vuex, vuetify
Still missing: backend and database

## Contribution

More than welcome, I am looking for a productve partnership... 
I believe this product has high potential and we could ease a lot of lives in the judo world.
As I am a busy man I invested little time. I can bring a network of customers for this idea.
In case you see the potential and also believe in open source please drop me a line. 

## Development Setup

1. Create Firebase account
2. Source environment with data from firebase account

```
export FIREBASE_API_KEY=
export FIREBASE_AUTH_DOMAIN=
export FIREBASE_DATABASE_URL=
export FIREBASE_PROJECT_ID=
export FIREBASE_STORAGE_BUCKET=
export FIREBASE_MESSAGING_SENDER_ID=
export FIREBASE_APP_ID=
```

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how it works, check out [Nuxt.js docs](https://nuxtjs.org).
