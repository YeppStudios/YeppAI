export const documentation = [
    {
        type: "post",
        id: "create-conversation",
        path: "/createConversation",
        description: "This endpoint is used to create a new conversation.",
        url: "https://asystentai.herokuapp.com/createConversation",
        code: 'curl -X POST "https://asystentai.herokuapp.com/createConversation" \\\n' +
        '-H "Authorization: your_token_here" \\\n' +
        '-H "Content-Type: application/json" \\\n' +
        '-d \'{' + '\n' +
        '   "assistant_id": "your_assistant_id_here",\n' +
        '}\'' +
        '\n',
        headers: [
            {title: "Authorization", description: "Your API key obtained within a platform after creating new Assistant"},
            {title: "Content-Type", description: "Type of the content being sent. In this case, it should be application/json"}
        ],
        body: [
            {title: "assistant_id", paramType: "string, required", description: "The unique ID of the assistant to be used. If not provided, the default assistant is used."}
        ],
        urlParams: [],
        response: [
            {title: "conversation", paramType: "object", description: "The conversation object with its properties: user, assistant, startTime, messages, lastUpdated and title."},
        ]
    },
    {
        type: "get",
        id: "get-conversation",
        path: "/getConversation/:id",
        description: "This endpoint returns the conversation by the given ID, if it exists and belongs to the current authenticated user.",
        url: "https://asystentai.herokuapp.com/getConversation/:id",
        code: 'curl -X POST "https://asystentai.herokuapp.com/getConversation/:id" \\\n' +
        '-H "Authorization: your_token_here"\n',
        headers: [
            {title: "Authorization", description: "Your API key obtained within a platform after creating new Assistant"}
        ],
        urlParams: [
            {title: "id", paramType: "string", description: "The unique ID of the conversation to retrieve."}
        ],
        body: [],
        response: [
            {title: "conversation", paramType: "object", description: "The conversation object with its properties: user, assistant, startTime, messages, lastUpdated and title."},
        ]
    },
    {
        type: "post",
        id: "send-message",
        path: "/message",
        description: "This endpoint is used to initiate or continue a conversation with an Assistant AI.",
        url: "https://asystentai.herokuapp.com/message",
        code: 'curl -X POST "https://asystentai.herokuapp.com/message" \\\n' +
              '-H "Authorization: your_token_here" \\\n' +
              '-H "Content-Type: application/json" \\\n' +
              '-d \'{' + '\n' +
              '   "query": "What is the weather like today?",\n' +
              '   "assistant_id": "your_assistant_id_here",\n' +
              '   "conversation_id": "your_conversation_id_here",\n' +
              '   "llm": "gpt-4"\n' +
              '}\'' +
              '\n',
        headers: [
            {title: "Authorization", description: "Your API key obtained within a platform after creating new Assistant"},
            {title: "Content-Type", description: "Type of the content being sent. In this case, it should be application/json"}
        ],
        urlParams: [],
        body: [
            {title: "query", paramType: "string, required", description: "The text input to the assistant from the user."},
            {title: "assistant_id", paramType: "string", description: "The unique ID of the assistant to be used. If not provided, the default assistant is used."},
            {title: "conversation_id", paramType: "string", description: "The unique ID of the ongoing conversation. If not provided, a new conversation is created."},
            {title: "llm", paramType: "string", description: "The large language model to be used. If not provided, the default model gpt-4 is used."}
        ],
        response: [
            {title: "response", paramType: "string", description: "The assistant's response to the user's query."},
            {title: "elixir_used", paramType: "number", description: "The total number of elixir used to generate the response."},
            {title: "based_on", paramType: "array", description: "The titles of the documents on which the response is based (only when knowledge_based is set to true)."},
            {title: "assistant", paramType: "string", description: "The name of the assistant."}
        ]
    },
    {
        type: "post",
        id: "send-message-stream",
        path: "/message-stream",
        description: "This endpoint is used to initiate or continue a conversation with an Assistant AI. Resopnse is being streamed in real time.",
        url: "https://asystentai.herokuapp.com/message",
        code: 'curl -X POST "https://asystentai.herokuapp.com/message-stream" \\\n' +
              '-H "Authorization: your_token_here" \\\n' +
              '-H "Content-Type: application/json" \\\n' +
              '-d \'{' + '\n' +
              '   "query": "What is the weather like today?",\n' +
              '   "assistant_id": "your_assistant_id_here",\n' +
              '   "conversation_id": "your_conversation_id_here",\n' +
              '   "llm": "gpt-4"\n' +
              '}\'' +
              '\n',
        headers: [
            {title: "Authorization", description: "Your API key obtained within a platform after creating new Assistant"},
            {title: "Content-Type", description: "Type of the content being sent. In this case, it should be application/json"}
        ],
        urlParams: [],
        body: [
            {title: "query", paramType: "string, required", description: "The text input to the assistant from the user."},
            {title: "assistant_id", paramType: "string", description: "The unique ID of the assistant to be used. If not provided, the default assistant is used."},
            {title: "conversation_id", paramType: "string", description: "The unique ID of the ongoing conversation. If not provided, a new conversation is created."},
            {title: "llm", paramType: "string", description: "The large language model to be used. If not provided, the default model gpt-4 is used."}
        ],
        response: [
            {title: "response is in form of stream", paramType: "stream", description: ""},
        ]
    }
]