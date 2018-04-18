
import { TurnContext, ConversationState, UserState } from 'botbuilder';

export class StateContext <Conversation, User> extends TurnContext {
    // instead of adding things here, add them in `from()`
    private constructor(context: TurnContext) {
        super(context);
    }

    // define the properties and methods to add to BotContext
    conversationState!: Conversation;
    userState!: User;

    // "from" adds any properties or methods that depend on arguments or async calls or both
    // think of it as an async constructor
    static async from <Conversation = any, User = any> (
        context: TurnContext,
        conversationState: ConversationState<Conversation>,
        userState: UserState<User>, 
    ) {
        const stateContext = new StateContext<Conversation, User>(context);
        stateContext.conversationState = await conversationState.read(context);
        stateContext.userState = await userState.read(context);
        return stateContext;
    }
}
