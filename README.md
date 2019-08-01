# Chatbase tracking plugin for ChatbotBase
A tracking plugin for [ChatbotBase][chatbotbase] to support tracking messages to Chatbase.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

## Features
 - Track input and output messages

## Usage
This Plugin allows you to track the input of the user to chatbase. To use just just import the chatbaseplugin and
overwrite the `loadTracker()` method like this:

```typescript
loadTracker(): TrackingProvider[] {
    return [new Chatbase('<your-api-key>', '<your-app-version>')];
}
```

## License
[Apache 2.0](LICENSE)

[chatbotbase]: https://github.com/rekire/ChatbotBase
[npm-image]: https://img.shields.io/npm/v/chatbotbase-alexaplatform.svg
[npm-url]: https://npmjs.org/package/chatbotbase-alexaplatform
[downloads-image]: https://img.shields.io/npm/dm/chatbotbase-alexaplatform.svg
[downloads-url]: https://npmjs.org/package/chatbotbase-alexaplatform