"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chatbase_1 = require("@google/chatbase");
class Chatbase {
    constructor(apiKey, appVersion) {
        this.name = "Chatbase";
        this.logging = false;
        this.chatbase = chatbase_1.default.setApiKey(apiKey);
        this.messageSet = this.chatbase.newMessageSet().setApiKey(apiKey);
        this.version = appVersion;
    }
    trackInput(input) {
        return new Promise((resolve, reject) => {
            this.messageSet.newMessage()
                .setPlatform(input.platform)
                .setAsTypeUser()
                .setTimestamp(input.time.getTime().toString())
                .setMessage(input.message)
                .setIntent(input.intent)
                .setVersion(this.version)
                .setUserId(input.userId)
                .setAsNotFeedback()
                .setMessageId(input.id);
            resolve();
        });
    }
    trackOutput(output) {
        return new Promise((resolve, reject) => {
            this.messageSet.newMessage()
                .setPlatform(output.platform)
                .setAsTypeAgent()
                .setTimestamp(new Date().getTime().toString())
                .setMessage(output.message)
                .setIntent(output.intent)
                .setVersion(this.version)
                .setUserId(output.userId)
                .setAsNotFeedback()
                .setMessageId(output.id);
            //console.log("TRACKING", this.messageSet);
            if (process.env.testing) {
                this.messageSet.messages.forEach(msg => msg.exportCreatePayload());
                return;
            }
            this.messageSet
                .sendMessageSet()
                .then((r) => resolve(r))
                .catch((e) => reject(e));
        });
    }
}
exports.Chatbase = Chatbase;
//# sourceMappingURL=Chatbase.js.map