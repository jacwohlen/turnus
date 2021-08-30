# turnus

## Build Setup

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

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
