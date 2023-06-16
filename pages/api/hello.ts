import { db } from '@/database'
import { products } from '@/database/insert-data';
import { Product } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: 'No tiene acceso a este servicio' });
  }

  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(products);
  await db.disconnect();

  return res.status(200).json({ message: 'Proceso realizado correctamente.' })
}
