import { BotContext, ConversationReference, Middleware, Storage, ConversationState, UserState } from 'botbuilder';
import { BaseBot } from './BaseBot';
import { StateContext } from './StateContext';

export abstract class StateBot <Conversation, User> extends BaseBot<StateContext<Conversation, User>> {
    conversationState: ConversationState<Conversation>;
    userState: UserState<User>;

    constructor (storage: Storage) {
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
