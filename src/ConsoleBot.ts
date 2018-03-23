import { ConsoleAdapter, Storage, MemoryStorage } from 'botbuilder';
import { StateBot, StateContext } from './botbldr';

export class ConsoleBot <Conversation, User> extends StateBot<Conversation, User> {
    adapter: ConsoleAdapter;

    constructor(storage: Storage) {
        super(storage);
        this.adapter = new ConsoleAdapter()
            .use(this.conversationState)
            .use(this.userState);
    }

    onRequest(
        handler: (
            context: StateContext<Conversation, User>,
        ) => Promise<void>
    ) {
        this.adapter.use(... this.middlewares).listen(this.do(handler));
        return Promise.resolve();
    }
}

export class StarterConsoleBot <Conversation, User> extends ConsoleBot <Conversation, User> {
    constructor() {
        super(new MemoryStorage());
    }
}
