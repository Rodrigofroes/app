export interface LoginGateway {
    login(email: string, password: string): void;
    logout(): void;
}
