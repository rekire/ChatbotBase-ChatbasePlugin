import {Input, Output, TrackingProvider} from 'chatbotbase';
import chatbase from '@google/chatbase';
declare var process: NodeCompat.Process;

declare namespace NodeCompat {
    interface Process {
        env: ProcessEnv
    }
    interface ProcessEnv {
        [key: string]: string | undefined;
    }
}

export class Chatbase implements TrackingProvider {
    private chatbase: any;
    private messageSet: any;
    private version: string;
    name: string = "Chatbase";

    constructor(apiKey: string, appVersion: string) {
        this.chatbase = chatbase.setApiKey(apiKey);
        this.messageSet = this.chatbase.newMessageSet().setApiKey(apiKey);
        this.version = appVersion;
    }

    trackInput(input: Input): Promise<never> {
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

    trackOutput(output: Output): Promise<never> {
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