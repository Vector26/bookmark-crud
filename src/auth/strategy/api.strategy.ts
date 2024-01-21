import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-strategy';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
    constructor() {
        super();
    }

    authenticate(req: Request, options?: any) {
        const apiKey = req.header('X-API-KEY');
        if (!apiKey) {
            return this.fail({ message: 'API Key is missing' }, 401);
        }

        // Here, validate the API key
        const isValid = this.validateApiKey(apiKey);
        if (!isValid) {
            return this.fail({ message: 'Invalid API Key' }, 401);
        }

        const user = { apiKey }; // You can attach more user information here
        this.success(user);
    }

    validateApiKey(apiKey: string): boolean {
        // Implement your logic to validate the API key
        // For example, you could check the key against a list of keys in your database
        return true; // return true if valid, false otherwise
    }
}
