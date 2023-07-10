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

export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {

    await db.connect();

    const user = await User.findOne({ email: oAuthEmail });

    if (user) {
        await db.disconnect();
        const { _id, name, email, role } = user;
        return { _id, name, email, role }
    }

    const newUser = new User({ name: oAuthName, email: oAuthEmail, password: '@' });
    newUser.save();
    await db.disconnect();

    const { _id, name, email, role } = newUser;
    return { _id, name, email, role }
}
