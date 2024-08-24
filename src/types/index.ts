export interface IUserDocument extends IUser, Document{
    generateJWT():Promise<string>;
    comparePassword(password:string):Promise<boolean>;
}

export interface customError extends Error{
    statusCode?:number;
}


export interface IUser{
    name:string;
    email:string;
    surname:string;
    password:string;
    isAdmin:boolean;
    avatar:string;
    team:string;
}