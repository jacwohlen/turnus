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

Current stack: npm, node, nuxt, vuejs, vuex, vuetify

Backend: firebase

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
# Install dependencies
$ npm install

# Serve with hot reload at localhost:3000
$ npm run dev

# Build for production and launch server
$ npm run build
$ npm run start

# Generate static project
$ npm run generate
```

For detailed explanation on how it works, check out [Nuxt.js docs](https://nuxtjs.org).

## Troubleshooting

1) Check NPM version and Node version (
```
npm --version
6.14.14

node --version
v14.17.5
```
Tip use `nvm install --lts` to install long term support version of `node`.

2) Check missing peer dependency `npm list` and install them manually
```
...
│ └── stylelint-config-recommended@3.0.0
└─┬ vuedraggable@2.24.3
  └── sortablejs@1.10.2

npm ERR! peer dep missing: jquery@1.9.1 - 3, required by bootstrap@4.6.0
npm ERR! peer dep missing: eslint@^5.0.0 || ^6.0.0, required by eslint-plugin-vue@6.2.2
npm ERR! peer dep missing: jquery@1.9.1 - 3, required by bootstrap@4.6.0
npm ERR! peer dep missing: eslint@^5.0.0 || ^6.0.0, required by eslint-plugin-vue@6.2.2
```
