<h1 align="center">Welcome to tp-ionic 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <img alt="Dependencies" src="https://img.shields.io/depfu/raphagoo/tp-ionic-fo" />
</p>

> Tp Ionic - How to use : https://github.com/raphagoo/tp-ionic-fo/wiki/Wiki

## Technologies

Vue.JS + Node.JS + Genius API

API Repo : https://github.com/raphagoo/tp-ionic-api

API is hosted on heroku at : https://tp-ionic-api.herokuapp.com/


## Native functionnalities

- Keychain fingerprint

- Social Sharing

- ~~Audio/Streaming~~ Spotify and YouTube made it too hard 😔

## Install

```sh
npm install
```

```sh
npm install -g @ionic/cli
```

## Serve through browser

```sh
ionic serve
```

## In case android folder doesn't work

```sh
ionic cap remove android
```

```sh
ionic cap add android
```

Add in androidManifest.xml


```xml
<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="https" android:host="tp-ionic-api.herokuapp.com" />
</intent-filter>
```

Update Icons and splashscreens

```sh
npm run resources
```

You can now build the project through Android Studio

## Author

👤 **Raphaël Agostini**

* Github: [@raphagoo](https://github.com/raphagoo)
