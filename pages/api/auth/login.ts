import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/database';
import { User } from '@/models';
import { signToken } from '@/utils';
import { IUser } from '@/interfaces';

import bcrypt from 'bcryptjs';

interface DataUser extends IUser {
    token: string
}

type Data =
    | { message: string }
    | DataUser

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return loginUser(req, res);

        default:
            break;
    }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { email = '', password = '' } = req.body as { email: string, password: string }

    await db.connect();
    const user = await User.findOne({ email })

    if (!user) {
        return res.status(400).json({ message: 'El email ingresado es inválido.' })
    }

    if (!bcrypt.compareSync(password, user.password!)) {
        return res.status(400).json({ message: 'El password ingresado no es válido.' })
    }

    const { _id, role, name } = user;

    const token = signToken(_id, email);

    res.status(200).json({
        email,
        token,
        name,
        role,
    })

}
