import { db } from '@/database';
import { Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'
import { disconnect } from '../../../database/db';
import { IProduct } from '@/models/product';

type Data =
    | { message: string }
    | IProduct[]
    | IProduct

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProducts(req, res);
        case 'POST':
            return insertProduct(req, res);

        default:
            res.status(400).json({ message: 'Metodo no existe.' })
    }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    try {
        await db.connect();
        const products: IProduct[] = await Product.find();
        await db.disconnect();

        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Algo salio mal, por favor revise los logs del servidor.' });
    }

}


const insertProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

}