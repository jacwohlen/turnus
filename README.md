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

## Testing

```
# Install firebase emulator
npm install -g firebase-tools
apt install openjdk-16-jdk-headless

# Start emulator
firebase emulators:start

# Run tests
npm run tests
or
npm run test -- --silent=false --runInBand --forceExit
```

Outlook
TODO: run docker container instead
docker pull andreysenov/firebase-tools
=> https://github.com/AndreySenov/firebase-tools-docker/blob/main/doc/guide/running_firebase_emulators.md
docker run -p 9199:9199 -p 9099:9099 -p 9005:9005 -p 9000:9000 -p 8085:8085 -p 8080:8080 -p 5001:5001 -p 5000:5000 -p 4000:4000 -v /path/to/project:/home/node --name firebase-tools andreysenov/firebase-tools

## Known Issues:

[ ] Tests are do not support execution in parallel. All tests share the same firebase emulator. Run `npm run test -- --silent=false --runInBand` to execute in sequence.
[ ] Tests execution with `--forceExit`, as some async function do not proberly return... might be a jest issue

## Troubleshooting

1. Check NPM version and Node version (

```
npm --version
6.14.14

node --version
v14.17.5
```

Tip use `nvm install --lts` to install long term support version of `node`.

2. Check missing peer dependency `npm list` and install them manually

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
