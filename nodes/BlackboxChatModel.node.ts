import {
    NodeConnectionTypes,
    INodeType,
    INodeTypeDescription,
    ISupplyDataFunctions,
    SupplyData,
} from 'n8n-workflow';
import { ChatOpenAI } from '@langchain/openai';

export class BlackboxChatModel implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Blackbox Chat Model',
        name: 'blackboxChatModel',
        icon: 'file:blackbox.svg',
        group: ['transform'],
        version: 1,
        description: 'Use Blackbox AI models for chat completions',
        defaults: {
            name: 'Blackbox Chat Model',
        },
        codex: {
            categories: ['AI'],
            subcategories: {
                AI: ['Language Models', 'Root Nodes'],
            },
            resources: {
                primaryDocumentation: [
                    {
                        url: 'https://docs.blackbox.ai/',
                    },
                ],
            },
        },
        inputs: [],
        outputs: [NodeConnectionTypes.AiLanguageModel],
        outputNames: ['Model'],
        credentials: [
            {
                name: 'blackboxApi',
                required: true,
            },
        ],
        properties: [
            {
                displayName: 'Model',
                name: 'model',
                type: 'options',
                default: 'blackboxai/openai/gpt-4o',
                description: 'The model to use for generating responses',
                options: [
                    // OpenAI Models
                    { name: 'OpenAI: GPT-4o', value: 'blackboxai/openai/gpt-4o' },
                    { name: 'OpenAI: GPT-4o Mini', value: 'blackboxai/openai/gpt-4o-mini' },
                    { name: 'OpenAI: GPT-4 Turbo', value: 'blackboxai/openai/gpt-4-turbo' },
                    { name: 'OpenAI: GPT-4', value: 'blackboxai/openai/gpt-4' },
                    { name: 'OpenAI: GPT-4.1', value: 'blackboxai/openai/gpt-4.1' },
                    { name: 'OpenAI: GPT-4.1 Mini', value: 'blackboxai/openai/gpt-4.1-mini' },
                    { name: 'OpenAI: GPT-4.1 Nano', value: 'blackboxai/openai/gpt-4.1-nano' },
                    { name: 'OpenAI: GPT-5', value: 'blackboxai/openai/gpt-5' },
                    { name: 'OpenAI: GPT-5 Pro', value: 'blackboxai/openai/gpt-5-pro' },
                    { name: 'OpenAI: GPT-5 Mini', value: 'blackboxai/openai/gpt-5-mini' },
                    { name: 'OpenAI: GPT-5 Nano', value: 'blackboxai/openai/gpt-5-nano' },
                    { name: 'OpenAI: GPT-5.1', value: 'blackboxai/openai/gpt-5.1' },
                    { name: 'OpenAI: GPT-5.1 Codex', value: 'blackboxai/openai/gpt-5.1-codex' },
                    { name: 'OpenAI: GPT-5.2', value: 'blackboxai/openai/gpt-5.2' },
                    { name: 'OpenAI: GPT-5.2 Codex', value: 'blackboxai/openai/gpt-5.2-codex' },
                    { name: 'OpenAI: GPT-3.5 Turbo', value: 'blackboxai/openai/gpt-3.5-turbo' },
                    { name: 'OpenAI: O1', value: 'blackboxai/openai/o1' },
                    { name: 'OpenAI: O1 Pro', value: 'blackboxai/openai/o1-pro' },
                    { name: 'OpenAI: O3', value: 'blackboxai/openai/o3' },
                    { name: 'OpenAI: O3 Mini', value: 'blackboxai/openai/o3-mini' },
                    { name: 'OpenAI: O3 Pro', value: 'blackboxai/openai/o3-pro' },
                    { name: 'OpenAI: O4 Mini', value: 'blackboxai/openai/o4-mini' },
                    { name: 'OpenAI: ChatGPT-4o Latest', value: 'blackboxai/openai/chatgpt-4o-latest' },
                    // Anthropic Claude Models
                    { name: 'Anthropic: Claude Sonnet 4.5', value: 'blackboxai/anthropic/claude-sonnet-4.5' },
                    { name: 'Anthropic: Claude Opus 4.5', value: 'blackboxai/anthropic/claude-opus-4.5' },
                    { name: 'Anthropic: Claude Opus 4.1', value: 'blackboxai/anthropic/claude-opus-4.1' },
                    { name: 'Anthropic: Claude Opus 4', value: 'blackboxai/anthropic/claude-opus-4' },
                    { name: 'Anthropic: Claude Sonnet 4', value: 'blackboxai/anthropic/claude-sonnet-4' },
                    { name: 'Anthropic: Claude 3.7 Sonnet', value: 'blackboxai/anthropic/claude-3.7-sonnet' },
                    { name: 'Anthropic: Claude 3.7 Sonnet (Thinking)', value: 'blackboxai/anthropic/claude-3.7-sonnet:thinking' },
                    { name: 'Anthropic: Claude 3.5 Haiku', value: 'blackboxai/anthropic/claude-3.5-haiku' },
                    { name: 'Anthropic: Claude 3 Haiku', value: 'blackboxai/anthropic/claude-3-haiku' },
                    { name: 'Anthropic: Claude Haiku 4.5', value: 'blackboxai/anthropic/claude-haiku-4.5' },
                    // Google Gemini Models
                    { name: 'Google: Gemini 3 Pro Preview', value: 'blackboxai/google/gemini-3-pro-preview' },
                    { name: 'Google: Gemini 2.5 Pro', value: 'blackboxai/google/gemini-2.5-pro' },
                    { name: 'Google: Gemini 2.5 Pro Preview', value: 'blackboxai/google/gemini-2.5-pro-preview' },
                    { name: 'Google: Gemini 2.5 Flash', value: 'blackboxai/google/gemini-2.5-flash' },
                    { name: 'Google: Gemini 2.5 Flash Lite', value: 'blackboxai/google/gemini-2.5-flash-lite' },
                    { name: 'Google: Gemini 2.0 Flash', value: 'blackboxai/google/gemini-2.0-flash-001' },
                    { name: 'Google: Gemini 2.0 Flash Lite', value: 'blackboxai/google/gemini-2.0-flash-lite-001' },
                    { name: 'Google: Gemini 3 Flash Preview', value: 'blackboxai/google/gemini-3-flash-preview' },
                    { name: 'Google: Gemma 3 12B', value: 'blackboxai/google/gemma-3-12b-it' },
                    { name: 'Google: Gemma 3 4B', value: 'blackboxai/google/gemma-3-4b-it' },
                    { name: 'Google: Gemma 2 27B', value: 'blackboxai/google/gemma-2-27b-it' },
                    // DeepSeek Models
                    { name: 'DeepSeek: V3.2', value: 'blackboxai/deepseek/deepseek-v3.2' },
                    { name: 'DeepSeek: V3.1', value: 'blackboxai/deepseek/deepseek-chat-v3.1' },
                    { name: 'DeepSeek: Chat', value: 'blackboxai/deepseek/deepseek-chat' },
                    { name: 'DeepSeek: R1', value: 'blackboxai/deepseek/deepseek-r1' },
                    { name: 'DeepSeek: R1 0528', value: 'blackboxai/deepseek/deepseek-r1-0528' },
                    { name: 'DeepSeek: R1 Distill Qwen 32B', value: 'blackboxai/deepseek/deepseek-r1-distill-qwen-32b' },
                    // Meta Llama Models
                    { name: 'Meta: Llama 4 Maverick', value: 'blackboxai/meta-llama/llama-4-maverick' },
                    { name: 'Meta: Llama 4 Scout', value: 'blackboxai/meta-llama/llama-4-scout' },
                    { name: 'Meta: Llama 3.3 70B Instruct', value: 'blackboxai/meta-llama/llama-3.3-70b-instruct' },
                    { name: 'Meta: Llama 3.1 405B Instruct', value: 'blackboxai/meta-llama/llama-3.1-405b-instruct' },
                    { name: 'Meta: Llama 3.1 70B Instruct', value: 'blackboxai/meta-llama/llama-3.1-70b-instruct' },
                    { name: 'Meta: Llama 3.1 8B Instruct', value: 'blackboxai/meta-llama/llama-3.1-8b-instruct' },
                    { name: 'Meta: Llama 3.2 11B Vision', value: 'blackboxai/meta-llama/llama-3.2-11b-vision-instruct' },
                    { name: 'Meta: Llama 3.2 3B Instruct', value: 'blackboxai/meta-llama/llama-3.2-3b-instruct' },
                    // Qwen Models
                    { name: 'Qwen: Qwen3 Max', value: 'blackboxai/qwen/qwen3-max' },
                    { name: 'Qwen: Qwen3 Coder', value: 'blackboxai/qwen/qwen3-coder' },
                    { name: 'Qwen: Qwen3 Coder Plus', value: 'blackboxai/qwen/qwen3-coder-plus' },
                    { name: 'Qwen: Qwen3 235B A22B', value: 'blackboxai/qwen/qwen3-235b-a22b' },
                    { name: 'Qwen: Qwen3 32B', value: 'blackboxai/qwen/qwen3-32b' },
                    { name: 'Qwen: Qwen3 8B', value: 'blackboxai/qwen/qwen3-8b' },
                    { name: 'Qwen: Qwen Max', value: 'blackboxai/qwen/qwen-max' },
                    { name: 'Qwen: Qwen Plus', value: 'blackboxai/qwen/qwen-plus' },
                    { name: 'Qwen: Qwen Turbo', value: 'blackboxai/qwen/qwen-turbo' },
                    { name: 'Qwen: QwQ 32B', value: 'blackboxai/qwen/qwq-32b' },
                    // Mistral Models
                    { name: 'Mistral: Large 2512', value: 'blackboxai/mistralai/mistral-large-2512' },
                    { name: 'Mistral: Large 2411', value: 'blackboxai/mistralai/mistral-large-2411' },
                    { name: 'Mistral: Large', value: 'blackboxai/mistralai/mistral-large' },
                    { name: 'Mistral: Medium 3.1', value: 'blackboxai/mistralai/mistral-medium-3.1' },
                    { name: 'Mistral: Medium 3', value: 'blackboxai/mistralai/mistral-medium-3' },
                    { name: 'Mistral: Small 3.2 24B', value: 'blackboxai/mistralai/mistral-small-3.2-24b-instruct' },
                    { name: 'Mistral: Nemo', value: 'blackboxai/mistralai/mistral-nemo' },
                    { name: 'Mistral: Mixtral 8x22B', value: 'blackboxai/mistralai/mixtral-8x22b-instruct' },
                    { name: 'Mistral: Mixtral 8x7B', value: 'blackboxai/mistralai/mixtral-8x7b-instruct' },
                    { name: 'Mistral: Codestral 2508', value: 'blackboxai/mistralai/codestral-2508' },
                    { name: 'Mistral: Devstral Medium', value: 'blackboxai/mistralai/devstral-medium' },
                    { name: 'Mistral: Devstral Small', value: 'blackboxai/mistralai/devstral-small' },
                    { name: 'Mistral: Pixtral Large', value: 'blackboxai/mistralai/pixtral-large-2411' },
                    // xAI Grok Models
                    { name: 'xAI: Grok 4', value: 'blackboxai/x-ai/grok-4' },
                    { name: 'xAI: Grok 4 Fast', value: 'blackboxai/x-ai/grok-4-fast' },
                    { name: 'xAI: Grok 4.1 Fast', value: 'blackboxai/x-ai/grok-4.1-fast' },
                    { name: 'xAI: Grok 3', value: 'blackboxai/x-ai/grok-3' },
                    { name: 'xAI: Grok 3 Mini', value: 'blackboxai/x-ai/grok-3-mini' },
                    { name: 'xAI: Grok Code Fast', value: 'blackboxai/x-ai/grok-code-fast-1' },
                    // Cohere Models
                    { name: 'Cohere: Command A', value: 'blackboxai/cohere/command-a' },
                    { name: 'Cohere: Command R Plus', value: 'blackboxai/cohere/command-r-plus-08-2024' },
                    { name: 'Cohere: Command R', value: 'blackboxai/cohere/command-r-08-2024' },
                    // Perplexity Models
                    { name: 'Perplexity: Sonar Pro', value: 'blackboxai/perplexity/sonar-pro' },
                    { name: 'Perplexity: Sonar', value: 'blackboxai/perplexity/sonar' },
                    { name: 'Perplexity: Sonar Deep Research', value: 'blackboxai/perplexity/sonar-deep-research' },
                    { name: 'Perplexity: Sonar Reasoning Pro', value: 'blackboxai/perplexity/sonar-reasoning-pro' },
                    // Amazon Nova Models
                    { name: 'Amazon: Nova Premier', value: 'blackboxai/amazon/nova-premier-v1' },
                    { name: 'Amazon: Nova Pro', value: 'blackboxai/amazon/nova-pro-v1' },
                    { name: 'Amazon: Nova Lite', value: 'blackboxai/amazon/nova-lite-v1' },
                    { name: 'Amazon: Nova Micro', value: 'blackboxai/amazon/nova-micro-v1' },
                    // Microsoft Models
                    { name: 'Microsoft: Phi-4', value: 'blackboxai/microsoft/phi-4' },
                    { name: 'Microsoft: WizardLM 2 8x22B', value: 'blackboxai/microsoft/wizardlm-2-8x22b' },
                    // NVIDIA Models
                    { name: 'NVIDIA: Nemotron 3 Nano 30B', value: 'blackboxai/nvidia/nemotron-3-nano-30b-a3b' },
                    { name: 'NVIDIA: Nemotron Nano 9B V2', value: 'blackboxai/nvidia/nemotron-nano-9b-v2' },
                    { name: 'NVIDIA: Llama 3.1 Nemotron 70B', value: 'blackboxai/nvidia/llama-3.1-nemotron-70b-instruct' },
                    { name: 'NVIDIA: Llama 3.3 Nemotron Super 49B', value: 'blackboxai/nvidia/llama-3.3-nemotron-super-49b-v1.5' },
                    // Minimax Models
                    { name: 'Minimax: M2.1', value: 'blackboxai/minimax/minimax-m2.1' },
                    { name: 'Minimax: M2', value: 'blackboxai/minimax/minimax-m2' },
                    { name: 'Minimax: M1', value: 'blackboxai/minimax/minimax-m1' },
                    { name: 'Minimax: 01', value: 'blackboxai/minimax/minimax-01' },
                    // AI21 Models
                    { name: 'AI21: Jamba Large 1.7', value: 'blackboxai/ai21/jamba-large-1.7' },
                    { name: 'AI21: Jamba Mini 1.7', value: 'blackboxai/ai21/jamba-mini-1.7' },
                    // Moonshot Kimi Models
                    { name: 'Moonshot: Kimi K2.5', value: 'blackboxai/moonshotai/kimi-k2.5' },
                    { name: 'Moonshot: Kimi K2', value: 'blackboxai/moonshotai/kimi-k2' },
                    { name: 'Moonshot: Kimi K2 Thinking', value: 'blackboxai/moonshotai/kimi-k2-thinking' },
                    { name: 'Moonshot: Kimi Dev 72B', value: 'blackboxai/moonshotai/kimi-dev-72b' },
                    // Z-AI GLM Models
                    { name: 'Z-AI: GLM 4.7', value: 'blackboxai/z-ai/glm-4.7' },
                    { name: 'Z-AI: GLM 4.6', value: 'blackboxai/z-ai/glm-4.6' },
                    { name: 'Z-AI: GLM 4.5', value: 'blackboxai/z-ai/glm-4.5' },
                    { name: 'Z-AI: GLM 4 32B', value: 'blackboxai/z-ai/glm-4-32b' },
                    // Arcee AI Models
                    { name: 'Arcee: Virtuoso Large', value: 'blackboxai/arcee-ai/virtuoso-large' },
                    { name: 'Arcee: Coder Large', value: 'blackboxai/arcee-ai/coder-large' },
                    { name: 'Arcee: Maestro Reasoning', value: 'blackboxai/arcee-ai/maestro-reasoning' },
                    // Inflection Models
                    { name: 'Inflection: Inflection 3 Productivity', value: 'blackboxai/inflection/inflection-3-productivity' },
                    { name: 'Inflection: Inflection 3 Pi', value: 'blackboxai/inflection/inflection-3-pi' },
                    // Blackbox Native Models
                    { name: 'Blackbox: Search', value: 'blackboxai/blackbox-search' },
                    { name: 'Blackbox: Qwen3 Coder', value: 'blackboxai/qwen3-coder' },
                    { name: 'Blackbox: Qwen3 Max', value: 'blackboxai/qwen3-max' },
                    // Other Models
                    { name: 'Writer: Palmyra X5', value: 'blackboxai/writer/palmyra-x5' },
                    { name: 'Inception: Mercury', value: 'blackboxai/inception/mercury' },
                    { name: 'Inception: Mercury Coder', value: 'blackboxai/inception/mercury-coder' },
                    { name: 'ByteDance: Seed 1.6', value: 'blackboxai/bytedance-seed/seed-1.6' },
                    { name: 'StepFun: Step3', value: 'blackboxai/stepfun-ai/step3' },
                    { name: 'Prime Intellect: Intellect 3', value: 'blackboxai/prime-intellect/intellect-3' },
                ],
            },
            {
                displayName: 'Options',
                name: 'options',
                type: 'collection',
                placeholder: 'Add Option',
                default: {},
                options: [
                    {
                        displayName: 'Temperature',
                        name: 'temperature',
                        type: 'number',
                        default: 0.7,
                        typeOptions: {
                            minValue: 0,
                            maxValue: 2,
                            numberStepSize: 0.1,
                        },
                        description: 'Controls randomness. Lower values make responses more focused and deterministic.',
                    },
                    {
                        displayName: 'Max Tokens',
                        name: 'maxTokens',
                        type: 'number',
                        default: 1024,
                        typeOptions: {
                            minValue: 1,
                        },
                        description: 'Maximum number of tokens to generate',
                    },
                    {
                        displayName: 'Top P',
                        name: 'topP',
                        type: 'number',
                        default: 1,
                        typeOptions: {
                            minValue: 0,
                            maxValue: 1,
                            numberStepSize: 0.1,
                        },
                        description: 'Nucleus sampling parameter. Only consider tokens with top_p probability mass.',
                    },
                    {
                        displayName: 'Frequency Penalty',
                        name: 'frequencyPenalty',
                        type: 'number',
                        default: 0,
                        typeOptions: {
                            minValue: -2,
                            maxValue: 2,
                            numberStepSize: 0.1,
                        },
                        description: 'Penalize new tokens based on their frequency in the text so far',
                    },
                    {
                        displayName: 'Presence Penalty',
                        name: 'presencePenalty',
                        type: 'number',
                        default: 0,
                        typeOptions: {
                            minValue: -2,
                            maxValue: 2,
                            numberStepSize: 0.1,
                        },
                        description: 'Penalize new tokens based on whether they appear in the text so far',
                    },
                ],
            },
        ],
    };

    async supplyData(this: ISupplyDataFunctions): Promise<SupplyData> {
        const credentials = await this.getCredentials('blackboxApi');
        const modelName = this.getNodeParameter('model', 0) as string;
        const options = this.getNodeParameter('options', 0, {}) as {
            temperature?: number;
            maxTokens?: number;
            topP?: number;
            frequencyPenalty?: number;
            presencePenalty?: number;
        };

        const model = new ChatOpenAI({
            openAIApiKey: credentials.apiKey as string,
            modelName: modelName,
            temperature: options.temperature ?? 0.7,
            maxTokens: options.maxTokens,
            topP: options.topP,
            frequencyPenalty: options.frequencyPenalty,
            presencePenalty: options.presencePenalty,
            configuration: {
                baseURL: 'https://api.blackbox.ai',
            },
        });

        return {
            response: model,
        };
    }
}