import { ConsoleAdapter, Storage, MemoryStorage, ConversationReference } from 'botbuilder';
import { StateBot, StateContext } from './botbldr';

export class ConsoleBot <Conversation = any, User = any> extends StateBot<Conversation, User> {
    adapter: ConsoleAdapter;

    constructor(storage?: Storage) {
        super(storage);
        this.adapter = new ConsoleAdapter()
            .use(this.conversationState)
            .use(this.userState);
    }

    onTurn(
        handler: (
            context: StateContext<Conversation, User>,
        ) => Promise<void>
    ) {
        this.adapter
            .use(... this.middlewares)
            .listen(this.do(handler));
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
