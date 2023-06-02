import { getAccessToken } from "@auth0/nextjs-auth0";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handleGetMethod = async (req: NextApiRequest, res: NextApiResponse) => {
    const {accessToken} = await getAccessToken(req, res)
    const response = await axios.get(`${process.env.BACKEND_URL}/api/notes`, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Authorization': `Bearer ${accessToken}`
        }
    })
    return res.status(200).json(response?.data);
}

const handleDeleteMethod = async (req: NextApiRequest, res: NextApiResponse) => {
    const {accessToken} = await getAccessToken(req, res)
    const response = await axios.delete(`${process.env.BACKEND_URL}/api/notes`, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Authorization': `Bearer ${accessToken}`
        }
    })
    return res.status(200).json(response?.data);
}

const handlePostMethod = async (req: NextApiRequest, res: NextApiResponse) => { 
    const {accessToken} = await getAccessToken(req, res)
    const response = await axios.post(`${process.env.BACKEND_URL}/api/notes`, req.body, {
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
        case 'GET':
            return handleGetMethod(req, res);
        case 'POST':
            return handlePostMethod(req, res);
        case 'DELETE':
            return handleDeleteMethod(req, res);
        default:
            return res.status(405).end()
    }
}
export default handler;