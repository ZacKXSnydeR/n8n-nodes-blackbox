# n8n-nodes-blackbox

An n8n community node that integrates [Blackbox AI](https://www.blackbox.ai/) chat models into your n8n workflows.

![npm](https://img.shields.io/npm/v/n8n-nodes-blackbox)
![License](https://img.shields.io/badge/license-MIT-blue)

## Installation

### Community Nodes (Recommended)

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-blackbox`
4. Agree to the risks and click **Install**

### Manual Installation

```bash
npm install n8n-nodes-blackbox
```

## Credentials

1. Get your API key from the [Blackbox AI Dashboard](https://app.blackbox.ai/dashboard)
2. In n8n, go to **Credentials > Add Credential**
3. Search for "Blackbox AI API"
4. Enter your API key and save

## Supported Models

This node provides access to 100+ AI models through the Blackbox API:

| Provider | Models |
|----------|--------|
| OpenAI | GPT-4o, GPT-5, O3, O4-mini, ChatGPT-4o |
| Anthropic | Claude Sonnet 4.5, Claude Opus 4.5, Claude 3.7 |
| Google | Gemini 3 Pro, Gemini 2.5, Gemma 3 |
| DeepSeek | V3.2, R1, Chat |
| Meta | Llama 4 Maverick/Scout, Llama 3.3 70B |
| Qwen | Qwen3 Max, Qwen3 Coder, QwQ 32B |
| Mistral | Large 2512, Medium 3.1, Codestral, Devstral |
| xAI | Grok 4, Grok 3, Grok Code Fast |
| Cohere | Command A, Command R+ |
| Perplexity | Sonar Pro, Sonar Deep Research |
| Amazon | Nova Premier, Nova Pro |
| And more... | NVIDIA, Minimax, AI21, Moonshot, Z-AI, Arcee, Inflection |

**Note on Tool Calling:** Not all models support tool/function calling. When using this node with AI Agents that require tools, use models known to support function calling such as GPT-4o, Claude 3.5+, Gemini 2.0+, or Llama 3.1+. Models without tool support will work for basic chat but may fail in agent workflows.

## Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| Temperature | Controls randomness (0-2) | 0.7 |
| Max Tokens | Maximum tokens to generate | 1024 |
| Top P | Nucleus sampling (0-1) | 1 |
| Frequency Penalty | Penalize repeated tokens (-2 to 2) | 0 |
| Presence Penalty | Penalize similar tokens (-2 to 2) | 0 |

## Usage

1. Add the **Blackbox Chat Model** node to your workflow
2. Connect it to an AI Agent or Chain node's **Model** input
3. Select your preferred model from the dropdown
4. Configure additional options as needed

## Technical Details

- Built using `@langchain/openai` for LangChain compatibility
- Uses Blackbox API endpoint: `https://api.blackbox.ai`
- Implements `INodeType` with `NodeConnectionTypes.AiLanguageModel` output
- Credential test validates API key on save

## Links

- [npm Package](https://www.npmjs.com/package/n8n-nodes-blackbox)
- [Blackbox AI Documentation](https://docs.blackbox.ai/)
- [n8n Community Nodes Guide](https://docs.n8n.io/integrations/community-nodes/)

## License

MIT
