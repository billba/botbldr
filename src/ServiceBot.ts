import { BotFrameworkAdapter, Storage, MemoryStorage } from 'botbuilder';
import { StateBot, StateContext } from './botbldr';
import * as restify from 'restify';

export class ServiceBot <Conversation, User> extends StateBot<Conversation, User> {
    adapter: BotFrameworkAdapter;

    constructor(storage: Storage) {
        super(storage);
        
        this.adapter = new BotFrameworkAdapter({ 
            appId: process.env.MICROSOFT_APP_ID, 
            appPassword: process.env.MICROSOFT_APP_PASSWORD 
        })
            .use(this.conversationState)
            .use(this.userState);
    }

    onRequest(
        handler: (
            context: StateContext<Conversation, User>,
        ) => Promise<void>
    ) {
        this.adapter.use(... this.middlewares);

        const server = restify.createServer();

        server.post('/api/messages', (req, res) => {
           this.do(handler);
        });

        server.listen(process.env.port || process.env.PORT || 3978, () => {
            console.log(`${server.name} listening to ${server.url}`);
        });

        return Promise.resolve();
    }
}

export class StarterServiceBot <Conversation, User> extends ServiceBot <Conversation, User> {
    constructor() {
        super(new MemoryStorage());
    }
}
