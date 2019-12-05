# Nuxt.js + TypeScript + Vuex + Jest の環境構築

## セットアップ

```bash

$ node -v
v13.2.0
$ yarn -v
1.19.2

$ yarn create nuxt-app nuxt-typescript
yarn create v1.19.2
[1/4] 🔍 Resolving packages...
[2/4] 🚚 Fetching packages...
[3/4] 🔗 Linking dependencies...
[4/4] 🔨 Building fresh packages...

success Installed "create-nuxt-app@2.12.0" with binaries: - create-nuxt-app

create-nuxt-app v2.12.0
✨ Generating Nuxt.js project in nuxt-typescript
? Project name nuxt-typescript
? Project description My geometric Nuxt.js project
? Author name
? Choose the package manager Yarn
? Choose UI framework None
? Choose custom server framework None (Recommended)
? Choose Nuxt.js modules Axios
? Choose linting tools ESLint, Prettier
? Choose test framework Jest
? Choose rendering mode Single Page App
? Choose development tools
...
🎉 Successfully created project nuxt-typescript

To get started:

    cd nuxt-typescript
    yarn dev

To build & start for production:

    cd nuxt-typescript
    yarn build
    yarn start

To test:

    cd nuxt-typescript
    yarn test

✨ Done in 110.26s.

$ cd nuxt-typescript
$ yarn dev
=> http://localhost:3000/ で画面が開ける
```

## TypeScript の導入

https://nuxtjs.org/guide/typescript/
https://typescript.nuxtjs.org/

### Runtime のインストール

Rumtime は、nuxt.config.ts、modules および serverMiddlewares といった Webpack でコンパイルされていないファイルのために必要です。

```bash
$ yarn add @nuxt/typescript-runtime
# nuxt.config.js ファイルをts に変換する
$ mv nuxt.config.js nuxt.config.ts
```

#### Configuration に型付け

```diff
--- a/nuxt.config.js
+++ b/nuxt.config.ts
@@ -1,4 +1,6 @@
-export default {
+import { Configuration } from '@nuxt/types'
+
+const config: Configuration = {
   mode: 'spa',
   /*
    ** Headers of the page
@@ -57,3 +59,5 @@ export default {
     extend(config, ctx) {}
   }
 }
+
+export default config
```

package.json

```diff
   "scripts": {
-    "dev": "nuxt",
-    "build": "nuxt build",
-    "start": "nuxt start",
-    "generate": "nuxt generate",
+    "dev": "nuxt-ts",
+    "build": "nuxt-ts build",
+    "start": "nuxt-ts start",
+    "generate": "nuxt-ts generate",
     "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
     "test": "jest"
   },
```

### TypeScript モジュールのインストール

```bash
$ yarn add --dev @nuxt/typescript-build
```

#### 設定

```json
// nuxt.config.ts
const config: Configuration = {
  buildModules: ['@nuxt/typescript-build']
}
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "lib": ["esnext", "esnext.asynciterable", "dom"],
    "esModuleInterop": true,
    "allowJs": true,
    "sourceMap": true,
    "strict": true,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["./*"],
      "@/*": ["./*"]
    },
    "types": ["@types/node", "@nuxt/types"]
  },
  "exclude": ["node_modules"]
}
```

### Lint

```bash
$ yarn add -D @nuxtjs/eslint-config-typescript
```

```json
// .eslintrc.js
(module.exports = {
  "extends": ["@nuxtjs/eslint-config-typescript"]
})
```

```json
// package.json
"lint": "eslint --ext .js,.ts,.vue --ignore-path .gitignore ."
```

```diff
// .eslintrc.js
  parserOptions: {
-   parser: 'babel-eslint'
  },
  extends: [
-   '@nuxtjs',
+   '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
```

## コンポーネント作成

https://github.com/kaorun343/vue-property-decorator

```bash
$ yarn add -D vuex-module-decorators
```

```diff
// tsconfig.json
{
  "compilerOptions": {
+   "experimentalDecorators": true,
  }
}
```

- @Prop
- @PropSync
- @Model
- @Watch
- @Provide
- @Inject
- @ProvideReactive
- @InjectReactive
- @Emit
- @Ref
- @Component (provided by vue-class-component)
- Mixins (the helper function named mixins provided by vue-class-component)

### @Component

```

```

## Vuex with TypeScript

https://github.com/championswimmer/vuex-module-decorators
https://championswimmer.in/vuex-module-decorators/
https://github.com/michaelolof/vuex-class-component
https://github.com/ktsn/vuex-class/

```bash
$ yarn add -D vuex-module-decorators
```

## Jest

### ts-jest で TypeScript でテストを書く

```bash
$ yarn add -D jest ts-jest vue-jest babel-jest @vue/test-utils @types/jest
```

````json
// tsconfig.json
--- a/tsconfig.json
+++ b/tsconfig.json
@@ -15,7 +15,7 @@
       "~/*": ["./*"],
       "@/*": ["./*"]
     },
-    "types": ["@types/node", "@nuxt/types"]
+    "types": ["@types/node", "@nuxt/types", "@types/jest"]
   },
   "exclude": ["node_modules"]
 }
```

```diff
--- a/jest.config.js
+++ b/jest.config.js
@@ -1,12 +1,19 @@
 module.exports = {
+  preset: 'ts-jest',
+  globals: {
+    'ts-jest': {
+      tsConfig: 'tsconfig.json',
+    },
+  },
   moduleNameMapper: {
     '^@/(.*)$': '<rootDir>/$1',
     '^~/(.*)$': '<rootDir>/$1',
     '^vue$': 'vue/dist/vue.common.js',
   },
-  moduleFileExtensions: ['js', 'vue', 'json'],
+  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
   transform: {
     '^.+\\.js$': 'babel-jest',
+    '^.+\\.ts$': 'ts-jest',
     '.*\\.(vue)$': 'vue-jest',
   },
   collectCoverage: true,
```

### vue-jest の依存関係を解決

babel core 7 から @babel/core になった。bridge が必要

```bash
$ yarn add @babel/core
$ yarn add -D babel-core@bridge
````

### 必要なモジュールをインストール

```bash
$ yarn add -D pug node-sass sass-loader
```

### 詰まったところ

ts-jest でモジュール解決できない

```bash
$ yarn test
yarn run v1.19.2
$ jest
 FAIL  test/Logo.spec.ts
  ● Test suite failed to run

    TypeScript diagnostics (customize using `[jest-config].globals.ts-jest.diagnostics` option):
    test/Logo.spec.ts:2:18 - error TS2307: Cannot find module '@/components/Logo.vue'.

    2 import Logo from '@/components/Logo.vue'
                       ~~~~~~~~~~~~~~~~~~~~~~~
```

```javascript
// @types/vue-shim.d.ts
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
```

本当にこれ必要なのか…
