import { BotFrameworkAdapter, Storage, MemoryStorage, ConversationReference } from 'botbuilder';
import { StateBot, StateContext } from './botbldr';
import { createServer } from 'restify';

export class ServiceBot <Conversation = any, User = any> extends StateBot<Conversation, User> {
    adapter: BotFrameworkAdapter;

    constructor(storage?: Storage) {
        super(storage);
        
        this.adapter = new BotFrameworkAdapter({
            appId: process.env.MICROSOFT_APP_ID,
            appPassword: process.env.MICROSOFT_APP_PASSWORD
        })
            .use(this.conversationState)
            .use(this.userState);
    }

    onTurn(
        handler: (
            context: StateContext<Conversation, User>,
        ) => Promise<void>
    ) {
        this.adapter.use(... this.middlewares);

        const server = createServer();

        server.post('/api/messages', (req, res) => {
            this.adapter.processActivity(req, res, this.do(handler));
        });

        server.listen(process.env.port || process.env.PORT || 3978, () => {
            console.log(`${server.name} listening to ${server.url}`);
        });
    }

    startConversation(
        reference: Partial<ConversationReference>,
        handler: (
            appContext: StateContext<Conversation, User>,
        ) => Promise<void>
    ): Promise<void> {
        return this.adapter.createConversation(reference, this.do(handler));
    }

    continueConversation(
        reference: ConversationReference,
        handler: (
            appContext: StateContext<Conversation, User>,
        ) => Promise<void>
    ): Promise<void> {
        return this.adapter.continueConversation(reference, this.do(handler));
    }
}

export class StarterServiceBot <Conversation = any, User = any> extends ServiceBot <Conversation, User> {
    constructor() {
        super(new MemoryStorage());
    }
}
