<h1 align="center">Welcome to tp-ionic 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
</p>

> Tp Ionic : Documentation :

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
