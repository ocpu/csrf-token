declare var csrf: {
  /**
   * Create a CSRF token asynchronously.
   * 
   * @param secret The secret to encrypt.
   * @param saltLength The length of the generated salt.
   * @returns Returns a promise with the generated token.
   */
  create(secret: string, saltLength?: number): Promise<string>
  /**
   * Create a CSRF token asynchronously.
   * 
   * @param secret The secret to encrypt.
   * @param saltLength The length of the generated salt.
   * @param callback A function with the generated token.
   */
  create(secret: string, saltLength: number, callback: (error: Error, token: string) => void): void
  /**
   * Create a CSRF token asynchronously.
   * 
   * @param secret The secret to encrypt.
   * @param callback A function with the generated token.
   */
  create(secret: string, callback: (error: Error, token: string) => void): void
  /**
   * Create a CSRF token synchronously.
   * 
   * @param secret The secret to encrypt.
   * @param saltLength The length of the generated salt.
   * @returns Returns the generated token.
   */
  createSync(secret: string, saltLength?: number): string
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
}

export = csrf

declare module "csrf-token" {
  export = csrf
}
