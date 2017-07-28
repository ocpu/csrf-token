declare var csrf: {
    /**
     * Create a CSRF token asynchronously.
     * 
     * @param secret The secret to encrypt.
     * @param saltLength The length of the generated salt.
     * @returns Returns a promise with the generated token.
     */
    create(secret: string, saltLength?: number = 8): Promise<string>
    /**
     * Create a CSRF token asynchronously.
     * 
     * @param secret The secret to encrypt.
     * @param saltLength The length of the generated salt.
     * @param callback A function with the generated token.
     */
    create(secret: string, saltLength?: number = 8, callback: (error: Error, token: string) => void): void
    /**
     * Create a CSRF token synchronously.
     * 
     * @param secret The secret to encrypt.
     * @param saltLength The length of the generated salt.
     * @returns Returns the generated token.
     */
    createSync(secret: string, saltLength?: number = 8): string
    /**
     * Verify CSRF token asynchronously.
     * 
     * @param secret The secret that was supposadly encrypted.
     * @param token The token that hopefully is the secret in a encrypted form.
     * @returns Returns a promise with the result of the verification.
     */
    verify(secret: string, token: string): Promise<boolean>
    /**
     * Verify CSRF token asynchronously.
     * 
     * @param secret The secret that was supposadly encrypted.
     * @param token The token that hopefully is the secret in a encrypted form.
     * @param callback A function with the result of the verification.
     */
    verify(secret: string, token: string, callback: (matches: boolean) => void): void
    /**
     * Verify CSRF token synchronously.
     * 
     * @param secret The secret that was supposadly encrypted.
     * @param token The token that hopefully is the secret in a encrypted form.
     * @returns Returns a boolean if they match or not.
     */
    verifySync(secret: string, token: string): boolean
    /**
     * A express middleware.
     * @param secret The secret to encrypt.
     * @param options Middleware options.
     * @param options.cookie The cookie that gets created.
     * @param options.saltLength The length of the generated salt.
     * @returns The express middleware function
     */
    express(secret: string, options?: { cookie?: { key: string, path: string }, saltLength?: number }): () => void
}

interface Response {
    /**
     * The routes that has the express middleware has this method.
     * 
     * Basicly creates a csrf token.
     * @returns The csrf token
     */
    csrfToken(): string
}

export = csrf

module "csrf-token" {
    export = csrf
}