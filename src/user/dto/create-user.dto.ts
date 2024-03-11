export class UserDto {
    readonly fullname: string;
    readonly email: string;
    readonly password: string;
    readonly apiKey: string;

    constructor(fullname: string, email: string, password: string, apiKey: string) {
        this.fullname = fullname;
        this.email = email;
        this.password = password;
        this.apiKey = apiKey;
    }

    static fromInput(input: any) {
        return new UserDto(
            input.fullname,
            input.email,
            input.password,
            input.apiKey
        )
    }
}