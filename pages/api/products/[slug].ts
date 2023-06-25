import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
    | { message: string }
    | IProduct

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProductBySlug(req, res);

        default:
            res.status(200).json({ message: 'Example' })
    }

}

async function getProductBySlug(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { slug } = req.query;

    if (slug?.length === 0) {
        return res.status(400).json({ message: 'No se especifico el query de busqueda.' })
    }

    await db.connect();
    const product = await Product.findOne({ slug }).select('title description inStock price images slug -_id').lean()
    await db.disconnect();

    if (!product) {
        return res.status(400).json({ message: 'No se encontro ningun producto.' })
    }

    return res.status(200).json(product)
}
