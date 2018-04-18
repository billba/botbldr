import { TurnContext, ConversationReference, Middleware, MiddlewareHandler } from 'botbuilder';

export abstract class BaseBot <AppContext> {
    protected middlewares: (Middleware | MiddlewareHandler)[] = [];

    protected do (
        handler: (appContext: AppContext,
    ) => Promise<void>) {
        return (context: TurnContext) => this
            .getContext(context)
            .then(appContext => handler(appContext));
    }
    
    use(
        middleware: Middleware | MiddlewareHandler
    ): this {
        this.middlewares.push();
        return this;
    }

    abstract getContext(
        context: TurnContext
    ): Promise<AppContext>;

    abstract onTurn(
        handler: (
            appContext: AppContext,
        ) => Promise<void>
    ): void;

    // when startConversation moves into Adapter, this can be implemented here
    startConversation(
        reference: Partial<ConversationReference>,
        handler: (
            appContext: AppContext,
        ) => Promise<void>
    ): Promise<void> {
        throw "not implemented";
    }

    // when startConversation moves into Adapter, this can be implemented here
    continueConversation(
        reference: ConversationReference,
        handler: (
            appContext: AppContext,
        ) => Promise<void>
    ): Promise<void> {
        throw "not implemented";
    }
}
