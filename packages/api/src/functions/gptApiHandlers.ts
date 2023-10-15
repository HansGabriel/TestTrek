const gptApiEndpoint = "https://api.openai.com/v1/chat/completions";
const apiKey = process.env.GPT_KEY;

export async function fetchGPT(promptText: string) {
  const prompt = {
    role: "user",
    content: promptText,
  };

  const apiRequestBody = {
    model: "gpt-3.5-turbo",
    messages: [prompt],
  };

  const response = await fetch(gptApiEndpoint, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiRequestBody),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
