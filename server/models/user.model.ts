import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface UserInput extends Document {
   username: string;
   email: string;
   password: string;
   avatar: string;
}

export interface UserDocument extends UserInput, Document {
   createdAt: Date;
   updatedAt: Date;
   getJWTToken(): string;
   comparePassword(candidatePassword: string): Promise<Boolean>;
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

userSchema.pre('save', async function (next) {
   let user = this as UserDocument;

   if (!user.isModified('password')) {
      return next();
   }
   const saltWorkFactor = process.env.SALT_WORK_FACTOR;
   const salt = await bcrypt.genSalt(Number(saltWorkFactor));

   const hash = await bcrypt.hashSync(user.password, salt);

   user.password = hash;

   return next();
});

userSchema.methods.comparePassword = async function (
   candidatePassword: string,
): Promise<boolean> {
   const user = this as UserDocument;

   return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

userSchema.methods.getJWTToken = function () {
   return jwt.sign(
      {
         userId: this._id,
      },
      process.env.JWT_SECRET as string,
      {
         expiresIn: '1d',
      },
   );
};

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
