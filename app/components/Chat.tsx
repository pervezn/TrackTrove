import ChatBubble from "./ChatBubble";
import { useChat } from 'ai/react';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col w-full max-w-md pt-24 mx-auto">
      <h4 className="text-xl font-bold md:text-xl pb-4 text-white">
        Chat Example
      </h4>
      
      <div className="flex-1 overflow-y-auto max-h-[300px] pb-8 scrollbar-hide">
        {messages.map((m) => (
          <ChatBubble
            key={m.id}
            role={m.role === 'user' ? 'User' : 'AI'}
            content={m.content}
          />
        ))}
      </div>

      {/* Input area that stays at the bottom */}
      <form onSubmit={handleSubmit} className="w-full">
        <input
          className="w-full p-2 mb-8 border border-gray-300 rounded shadow-xl text-white"
          value={input}
          placeholder="What kind of playlist should we curate??"
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
