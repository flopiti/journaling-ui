import { getAccessToken } from "@auth0/nextjs-auth0";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handleDeleteMethod = async (req: NextApiRequest, res: NextApiResponse) => {
    const {accessToken} = await getAccessToken(req, res)
    console.log(req.query.noteId)
    console.log(`${process.env.BACKEND_URL}/api/notes/${req.query.noteId}`)
    const response = await axios.delete(`${process.env.BACKEND_URL}/api/notes/${req.query.noteId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Authorization': `Bearer ${accessToken}`
        }
    })
    return res.status(200).json(response?.data);
}

const handler = (req: NextApiRequest, res: NextApiResponse<any[]>) => {
    switch(req.method) {
        case 'DELETE':
            return handleDeleteMethod(req, res);
        default:
            return res.status(405).end()
    }
}
export default handler;

