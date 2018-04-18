# botbldr

Get up and running quickly with BotBuilder v4 with bot classes that add features to `context` and hide the messy plumbing.

You can use predefine classes for console and service bots, or bake your own.

**This is an experimental project subject to change without notice. Use at your own risk. Not an officially supported Microsoft product.**

## How do I use it?

```
npm install --save botbuilder-botbldr
```

## What does it look like?

Here's an echobot using the predefined `ConsoleBot`:

```ts
import { ConsoleBot } from 'botbuilder-botbldr';

const bot = new ConsoleBot();

bot.onTurn(async context => {
    context.conversationState.count = context.conversationState.count === undefined ? 0 : context.conversationState.count + 1;
    await context.sendActivity(`${context.conversationState.count}: You said "${context.request.text}"`);
});
```

Swap out `ConsoleBot` for `ServiceBot` to test your bot with Emulator then run it in the cloud in the Azure Bot Service.

Both use an extended version of `BotContext` called `StateContext` which adds `.conversationState` and `.userState` properties to `context`. Any changes you make to either of these are automatically persisted at the end of each turn. By default they use `MemoryStorage` as a state storage provider, but you can pass in any you like, e.g.

```ts
const bot = new ConsoleBot(new FileStorage("path_to_your_file"));
```

If you use TypeScript you can define types for these properties:

```ts
import { ConsoleBot } from 'botbuilder-botbldr';

interface MyConversationState {
    count: number;
}

interface MyUserState {
    name: string;
}

const bot = new ConsoleBot<MyConversationState, MyUserState>();

bot.onTurn(async context => {
    context.conversationState.count = context.conversationState.count === undefined ? 0 : context.conversationState.count + 1;
    await context.sendActivity(`${context.conversationState.count}: You said "${context.request.text}"`);
});
```

## I don't like how you extended `context` (or I want to extend it more)

No problem, you can make your own extended context following the recipe used in [/src/StateContext.ts](/src/StateContext.ts). Then extend `BaseBot` following the recipe used in [/src/StateBot.ts](/src/StateBot.ts) and [/src/ConsoleBot.ts](/src/ConsoleBot.ts)

## Can I add my own middleware?

Sure, just add:

```ts
bot.use(new BestMiddlewareEver())
```

before your call to `bot.onRequest`

## Can I use proactive messages?

Yes!

```ts
const calledBySomeEventSomewhere = async (activity: Activity) => {
    await bot.continueConversation(activity, async context => {
        await context.sendActivity(`Something happened!`);
    });
}
```
