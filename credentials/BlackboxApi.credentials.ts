import {
    IAuthenticateGeneric,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class BlackboxApi implements ICredentialType {
    name = 'blackboxApi';
    displayName = 'Blackbox AI API';
    documentationUrl = 'https://docs.blackbox.ai/';
    properties: INodeProperties[] = [
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
            typeOptions: { password: true },
            default: '',
            required: true,
            description: 'Get your API key from <a href="https://app.blackbox.ai/dashboard" target="_blank">Blackbox AI Dashboard</a>',
        },
    ];

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                Authorization: 'Bearer {{$credentials.apiKey}}',
            },
        },
    };

    test: ICredentialTestRequest = {
        request: {
            baseURL: 'https://api.blackbox.ai',
            url: '/chat/completions',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                model: 'blackboxai/openai/gpt-4o-mini',
                messages: [{ role: 'user', content: 'test' }],
                max_tokens: 1,
            },
        },
    };
}