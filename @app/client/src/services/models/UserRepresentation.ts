export default interface UserRepresentation {
    userId: number;
    username: string;
    password: string;
    salt: string;
    email: string;
}