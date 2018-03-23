import { BotContext, ConversationReference, Middleware, Storage, ConversationState, UserState, MemoryStorage } from 'botbuilder';
import { BaseBot } from './BaseBot';
import { StateContext } from './StateContext';

export abstract class StateBot <Conversation = any, User = any> extends BaseBot<StateContext<Conversation, User>> {
    conversationState: ConversationState<Conversation>;
    userState: UserState<User>;

    constructor (storage: Storage = new MemoryStorage()) {
        super();
        this.conversationState = new ConversationState<Conversation>(storage);
        this.userState = new UserState<User>(storage);
    }

    getContext(
        context: BotContext,
    ) {
        return StateContext.from(context, this.conversationState, this.userState)
    }
}
