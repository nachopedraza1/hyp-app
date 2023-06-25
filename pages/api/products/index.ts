import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database';
import { Product } from '@/models';
import { IProduct } from '@/interfaces';

type Data =
    | { message: string }
    | IProduct[]

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getAllProducts(req, res);

        default:
            res.status(200).json({ message: 'El método no es válido.' });
    }

}

async function getAllProducts(req: NextApiRequest, res: NextApiResponse<Data>) {

    await db.connect();
    const products = await Product.find().select('title description inStock price images slug -_id').lean();
    await db.disconnect();

    return res.status(200).json(products);
}
