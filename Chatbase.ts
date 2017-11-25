import {Input, Output, TrackingProvider} from 'chatbotbase';
declare function require(path: string): any;

export class Chatbase implements TrackingProvider {
    private chatbase: any;
    private messageSet: any;
    private version: string;
    name: string = "Chatbase";
    logging: boolean = false;

    constructor(apiKey: string, appVersion: string) {
        this.chatbase = require('@google/chatbase').setApiKey(apiKey);
        this.messageSet = this.chatbase.newMessageSet().setApiKey(apiKey);
        this.version = appVersion;
    }

    trackInput(input: Input): Promise<any> {
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
        })
    }

    trackOutput(output: Output): Promise<any> {
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
            if(process.env.testing) {
                this.messageSet.messages.forEach(msg => msg.exportCreatePayload());
                return;
            }
            this.messageSet
                .sendMessageSet()
                .then((r) => resolve(r))
                .catch((e) => reject(e));
        })
    }
}