import { db } from '@/database';
import { User } from '@/models';
import bcrypt from 'bcryptjs';

export const findUser = async (email: string, password: string) => {

    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    if (!user) {
        return null
    }

    if (!bcrypt.compareSync(password, user.password!)) {
        return null
    }

    const { _id, name, role } = user;

    return {
        _id,
        name,
        email: email.toLowerCase(),
        role
    };

}
