document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  const sendButton = document.querySelector(".bi-send-fill");
  const contentDiv = document.querySelector(".content");
  const textDiv = document.getElementById("text");
  const roll = document.getElementById("roll");

  const API_KEY =
    "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";

  function rollDice() {
    let myRoll = Math.floor(Math.random() * 20) + 1;
    roll.innerText = `You rolled a dice and got ${myRoll}`;
    return myRoll;
  }

  let CharacterCreated = false;

  let firstLineSaid = false;

  if (firstLineSaid == false) {
    textToSpeech(`Start your journey by describing your character.`);
    firstLineSaid = true;
  }

  // Conversation history to maintain context
  const conversationHistory = [
    {
      role: "system",
      content: `
            You are a Dungeon Master for a Dungeons & Dragons game.  
            Follow these rules strictly:  
            - Always provide a vivid and detailed description of the player's surroundings, including the environment, objects, and any notable features.  
            - Clearly explain what actions the player can take or explore based on their surroundings.  
            - Track the player's character type (e.g., mage, warrior, rogue) and enforce limitations. Non-mage characters cannot use magic.  
            - Track the player's inventory. If the player acquires, uses, loses, or destroys an item, update their inventory accordingly.  
            - Always ask the player "What do you do next?" after every prompt.  
            - Continuously create new encounters or adventures, such as enemy ambushes, mysterious discoveries, or puzzles.  
            - Reward the player for defeating enemies or making significant discoveries by adding items, gold, or experience to their inventory.  
            - Allow the player to use their inventory items but remember to remove destroyed or lost items from the inventory.  
            - Keep responses concise and focused to avoid being cut off.  
        `,
    },
  ];

  // Function to make OpenAI API request
  async function getAIResponse(conversation) {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: conversation,
            max_tokens: 500,
          }),
        }
      );

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return null;
    }
  }

  // Function to convert text to speech
  async function textToSpeech(text) {
    try {
      const response = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "tts-1",
          input: text,
          voice: "echo",
        }),
      });

      const blob = await response.blob();
      const audioURL = URL.createObjectURL(blob);
      const audio = new Audio(audioURL);
      textDiv.innerText = `${text}`;
      audio.play();
    } catch (error) {
      console.error("Error generating speech:", error);
    }
  }

  // Function to generate an image based on description
  async function generateImage(description) {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            prompt: `Generate an aesthetically pleasing image based on the following description:
        "${description}"
        Style: High-quality fantasy art, vibrant colors, dramatic lighting, and detailed textures.`,
            n: 1,
            size: "512x512",
          }),
        }
      );

      const data = await response.json();
      return data.data[0].url;
    } catch (error) {
      console.error("Error generating image:", error);
      return null;
    }
  }

  // Function to handle user interaction
  async function handleInput() {
    const userInput = inputField.value.trim();
    // Clear input field
    inputField.value = "";
    if (!userInput) return;

    textDiv.innerText = `Dungeon Master is thinking...`;

    const diceRoll = rollDice();

    let message = `I'm attempting to: "${userInput}". I rolled ${diceRoll}. Please narrate the outcome, based on the dice roll. If i rolled less than 10 tell me that I failed and make an excuse why I failed. Don't mention what number I rolled. Give me a choice to do something, and ask me what do i want to do. Respond Briefly.`;

    if (CharacterCreated == false) {
      message = `Here's a description of my character: ${userInput}, briefly describe the scene to me.`;
      CharacterCreated = true;
    }

    // Add user input to the conversation history
    conversationHistory.push({
      role: "user",
      content: message,
    });

    // Get AI response
    const aiResponse = await getAIResponse(conversationHistory);

    if (aiResponse) {
      console.log("AI Response:", aiResponse);

      //textDiv.innerHTML = `<p>${aiResponse}</p>`;

      // Add AI response to the conversation history
      conversationHistory.push({ role: "assistant", content: aiResponse });

      // Play the response as speech
      textToSpeech(aiResponse);

      // Copy conversation history array
      const conversationCopy = [...conversationHistory];
      conversationCopy.push({
        role: "system",
        content: `
        Describe the environment or objects in detail based on the current context and player's actions:  
- If the player discovers or interacts with a significant object (e.g., a chest, an enemy, or a unique item), focus the description on that object. Include details about its appearance, textures, and any noticeable features.  
- If no significant discovery or interaction occurs, focus on the broader environment. Highlight the lighting, ambiance, and unique features of the scene to set the mood.    
`,
      });

      // Generate and display image
      const imageUrl = await generateImage(conversationCopy);
      if (imageUrl) {
        contentDiv.innerHTML = `<img width="50%" src="${imageUrl}" alt="Generated Image" style="max-width: 100%; border-radius: 15px;">`;
      }
    } else {
      console.error("No AI response received.");
    }
  }

  // Add event listeners
  sendButton.addEventListener("click", handleInput);
  inputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter") handleInput();
  });
});
