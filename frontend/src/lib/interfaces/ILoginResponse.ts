import { IUser } from "./IUsers";

export type ILoginResponse = {
    token: string;
    user: IUser;
}
