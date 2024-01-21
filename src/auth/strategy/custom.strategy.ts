import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-strategy';

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy, 'custom') {
    constructor() {
        super();
    }

    authenticate(req: Request, options?: any) {
        // Extract and validate credentials from the request
        const credentials = this.extractCredentials(req);

        if (!credentials) {
            return this.fail('Missing credentials', 401);
        }

        // Implement your validation logic
        const isValid = this.validateCredentials(credentials);
        if (!isValid) {
            return this.fail('Invalid credentials', 401);
        }

        const user = this.createUserObject(credentials);
        return this.success(user);
    }

    extractCredentials(req: Request): any {
        // Implement logic to extract credentials from the request
        // e.g., API keys, custom headers, tokens, etc.
        return req.headers['authorization'];
    }

    validateCredentials(credentials: any): boolean {
        // Implement your custom validation logic
        // e.g., check credentials against a database, an API, etc.
        return true; // return true if valid, false otherwise
    }

    createUserObject(credentials: any): any {
        // Create and return the user object that will be attached to the request
        // This object is usually constructed based on validated credentials
        return { id: 'user-id', name: 'User Name' };
    }
}
