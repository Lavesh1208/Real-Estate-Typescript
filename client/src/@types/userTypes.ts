export interface IUser {
   _id: string;
   username: string;
   email: string;
   avatar: string;
   createdAt: string;
   updatedAt: string;
}

export interface IGoogleSignin {
   username: string;
   email: string;
   avatar: string;
}
