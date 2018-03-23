
import { BotContext, ConversationState, UserState } from 'botbuilder';

export class StateContext <Conversation, User> extends BotContext {
    // instead of adding things here, add them in `from()`
    private constructor(context: BotContext) {
        super(context);
    }

    // define the properties and methods to add to BotContext
    conversationState!: Conversation;
    userState!: User;

    // "from" adds any properties or methods that depend on arguments or async calls or both
    // think of it as an async constructor
    static async from <Conversation = any, User = any> (
        context: BotContext,
        conversationState: ConversationState<Conversation>,
        userState: UserState<User>, 
    ) {
        const appContext = new StateContext<Conversation, User>(context);
        appContext.conversationState = await conversationState.read(context);
        appContext.userState = await userState.read(context);
        return appContext;
    }
}
