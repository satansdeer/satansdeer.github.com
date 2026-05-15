---
title: How To Localize React Application Using `react-intl`
date: 2019-02-28T01:58:45.284Z
categories: React
image: thumb.jpg
---

In this tutorial we'll localize React application from start to finish using [react-intl](https://github.com/yahoo/react-intl) made by Yahoo.

We'll use `create-react-app` to generate a new application and then we'll go through the whole set of steps needed to localize it using `react-intl`.

> In this tutorial I assume that you have modern `node` version installed.

## 1. Create New Application

First let's generate our boilerplate, run `create-react-app`:

```bash
npx create-react-app react-intl-example
```

I'm using `npx` here, but you can just run `create-react-app` if you have it installed globally.

## 2. Install `react-intl`

After `create-react-app` finishes installation - `cd` to your app folder and install `react-intl`.

```bash
cd react-intl-example
yarn add react-intl
```

## 3. Wrap App Into `IntlProvider`

Go to `index.js`, import `IntlProvider` from `react-intl`, and wrap `<App/>` element.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { IntlProvider } from "react-intl";

ReactDOM.render(
  <IntlProvider>
    <App />
  </IntlProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
```

## 4. Wrap Texts Into `FormatMessage` Components

Open `App.js`, import `FormattedMessage` and wrap each text into `FormattedMessage` component. You need to provide `id` and `defaultMessage` for each element:

```jsx
import React, { Component } from "react";
import { FormattedMessage} from 'react-intl'
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <FormattedMessage
              id="add.edit"
              defaultMessage="Edit {code} and save to reload."
              values={{
                  code: <code>src/App.js</code>
              }}
            />
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FormattedMessage id="app.learn" defaultMessage="Learn React" />
          </a>
        </header>
      </div>
    );
  }
}

export default App;
```

> Note that we used `values` field to pass the named placeholder `code`, that contained some markup (the `<code>` tags).

## 5. Extract Messages

Sometimes this step is performed manually, just by adding id's and with text values to the translation files.

It can, and I think it should, be automated. We'll use `react-intl-cra`. It is a package that is pre-configured to work with `create-react-app` generated applications. Install this script:

```bash
yarn add react-intl-cra
```

Add it to `scripts` section in package.json:

```json
"extract:messages": "react-intl-cra 'src/**/*.{js,jsx}' -o 'src/i18n/messages/messages.json'",
```

Run the script:

```bash
yarn extract:messages
```

It will generate a new file `src/i18n/messages/messages.json`. This file will contain all the found texts from your source code.

## 6. Generate The Locales

Now we'll need another package `react-intl-translations-manager` to generate the locale files from the messages file.

Install the package:

```bash
yarn add react-intl-translations-manager
```

This package only has programmatic interface so you'll need to create the script file. Create `translationRunner.js` file with the following contents:

```js
// translationRunner.js
const manageTranslations = require('react-intl-translations-manager').default;

manageTranslations({
  messagesDirectory: 'src/i18n/messages/',
  translationsDirectory: 'src/i18n/locales/',
  languages: ['en','sv', 'es'] // any language you need
});
```

And add the command to run this script to your `package.json`:

```json
{
  "scripts": {
    "manage:translations": "node ./translationRunner.js"
  }
}
```

Run the script:

```bash
yarn manage:translations
```

It will generate locales ready to be used in the `src/translations/locales` folder.

## 7. Translate The Locales

Now you can translate your locales manually, or use one of the translation services to do that. Here are a few examples of Translation Management Systems:

* [Zanata](http://zanata.org/)
* [Pontoon](http://pontoon.mozilla.org/)
* [Weblate](https://weblate.org/en/)
* [Translate5](https://www.translate5.net/)
* [Jabylon](http://jabylon.org/)

You have to upload your translations there, translate the messages and then download translated locales.

## 8. Load Translation Through Intl Provider

Create `index.js` in `src/translations/locales` and export all the translations from it:

```js
import en from "./en.json";
import es from "./es.json";
import sv from "./sv.json";

export default { en, es, sv }
```

Add locale data to `react-intl`:

```jsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { IntlProvider, addLocaleData} from "react-intl";
import esLocaleData from "react-intl/locale-data/es";
import svLocaleData from "react-intl/locale-data/sv";
import translations from './i18n/locales'

addLocaleData(esLocaleData);
addLocaleData(svLocaleData);

const locale = window.location.search.replace("?locale=","") || "en"
const messages = translations[locale];

ReactDOM.render(
  <IntlProvider locale={locale} messages={messages}>
    <App />
  </IntlProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
```

## 9. Run Your Application

Now you can run your app, try adding different locale codes to your url.

Here is the [code for the app in this tutorial](https://github.com/satansdeer/react-intl-example).