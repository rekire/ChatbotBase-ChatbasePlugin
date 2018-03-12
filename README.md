# Chatbase tracking plugin for ChatbotBase
A tracking plugin for [ChatbotBase][chatbotbase] to support tracking mesages to Chatbase

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
  
## Features
 - Track input and output messages
 
## Usage
Use this sample code to add this tracking provider. Don't forget the specify your apikey and the app version.

```typescript
loadTracker(): TrackingProvider[] {
    return [new Chatbase('<your-api-key>', '<your-app-version>')];
}
```
  
## License
  [Apache 2.0](LICENSE)

[chatbotbase]: https://github.com/rekire/ChatbotBase
[npm-image]: https://img.shields.io/npm/v/chatbotbase-chatbaseplugin.svg
[npm-url]: https://npmjs.org/package/chatbotbase-chatbaseplugin
[downloads-image]: https://img.shields.io/npm/dm/chatbotbase-chatbaseplugin.svg
[downloads-url]: https://npmjs.org/package/chatbotbase-chatbaseplugin
