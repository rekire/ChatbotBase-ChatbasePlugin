import { Input, Output, TrackingProvider } from 'chatbotbase';
export declare class Chatbase implements TrackingProvider {
    private chatbase;
    private messageSet;
    private version;
    name: string;
    constructor(apiKey: string, appVersion: string);
    trackInput(input: Input): Promise<never>;
    trackOutput(output: Output): Promise<never>;
}
