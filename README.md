# gitbook-raw-cli

## Installation

```js
// - With NPM
npm install gitbook gitbook-raw-cli --save-dev

// - With Yarn
yarn add gitbook gitbook-raw-cli --dev
```

## Usage

In your `package.json`:

```json
{
    "scripts": {
        "build" : "gitbook-raw-cli build . dist",
        "serve" : "gitbook-raw-cli serve . dist",
    }
}
```
