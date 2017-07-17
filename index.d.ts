declare var csrf: {
    create(secret: string, saltLength?: number = 8): Promise<string>
    create(secret: string, saltLength?: number = 8, callback: (token: string) => void): void
    createSync(secret: string, saltLength?: number = 8): string
    verify(secret: string, token: string): Promise<boolean>
    verify(secret: string, token: string, callback: (matches: boolean) => void): void
    verifySync(secret: string, token: string): boolean
}

export = csrf

module "csrf-token" {
    export = csrf
}