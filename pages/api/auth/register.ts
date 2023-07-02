import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/database';
import { User } from '@/models';
import { isEmail } from '@/utils';

import bcrypt from 'bcryptjs';

type Data =
    | { message: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return registerUser(req, res);

        default:
            break;
    }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { name = '', password = '', email = '' } = req.body as { name: string, password: string, email: string }

    if (name.length < 3) {
        return res.status(400).json({ message: 'El nombre no es válido.' })
    }

    if (password.length < 5) {
        return res.status(400).json({ message: 'La contraseña debe tener mas de 5 digitos.' })
    }

    if (isEmail(email)) {
        return res.status(400).json({ message: 'El email no es válido.' })
    }

    await db.connect();
    const isExistEmail = await User.findOne({ email });

    if (!isExistEmail) {
        await db.disconnect();
        return res.status(400).json({ message: 'El email ya esta en uso.' })
    }

    const newUser = new User({
        name,
        email,
        password: 
    })

}
