// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retriveData, retriveDataById } from '@/lib/firebase/services';

import type { NextApiRequest, NextApiResponse } from 'next'


type Data = {
    status: boolean,
    statusCode: number,
    data: any, //any yaitu : ini data kosongankan
    
    // data:{
    //     id: number,
    //     name: string,
    //     price: number,
    //     size: string
    // }[]; //[] ini ubah menjadi array basic dari typescript
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  
    //ini bikin sendiri
    // const data = [
    //     {
    //         id: 1,
    //         name: "Jaket",
    //         price: 100000,
    //         size: "M",
    //     },
    //     {
    //         id: 2,
    //         name: "Baju",
    //         price: 200000,
    //         size: "L",
    //     },
    // ]

    
    if (req.query.product![1]) {
      const data = await retriveDataById("products", req.query.product![1]);  //ini untuk panggil data API dari firebase/service
      res.status(200).json({ status: true, statusCode: 200, data})
    } else {
      const data = await retriveData("products"); //ini untuk panggil data API
      res.status(200).json({ status: true, statusCode: 200, data})
    }
}
