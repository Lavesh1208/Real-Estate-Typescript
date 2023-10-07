import mongoose, { Document, Schema } from 'mongoose';

export interface UserInput extends Document {
   username: string;
   email: string;
   password: string;
   avatar: string;
}

export interface UserDocument extends UserInput, Document {
   createdAt: Date;
   updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
   {
      username: {
         type: String,
         required: true,
         unique: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      avatar: {
         type: String,
         default:
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      },
   },
   {
      timestamps: true,
   },
);

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
