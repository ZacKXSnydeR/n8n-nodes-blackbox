import {
    IAuthenticateGeneric,
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
}