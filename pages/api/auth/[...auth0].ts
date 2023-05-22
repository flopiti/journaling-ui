import {handleAuth, handleCallback, handleLogin } from "@auth0/nextjs-auth0";
import axios from "axios";
import getConfig from "next/config";

const {serverRuntimeConfig } = getConfig();

export default handleAuth(
    {
        async login(req,res){
            try {
                await handleLogin(req, res, {
                    authorizationParams: {
                        audience: serverRuntimeConfig.auth0Audience,
                        scope : 'offline_access openid profile email',
                        redirect_uri: serverRuntimeConfig.auth0RedirectUri, // Add this line
                    },
                    returnTo: process.env.NEXT_PUBLIC_AUTH0_RETURN_TO, // Add this line
                })
            }
            catch(error:any){

            }
        },
        async callback(req, res) {
          console.log("here is is")
            try {
              console.log('here')
              await handleCallback(req, res, {
                afterCallback: async (req, res, session, state) => {
                  try {
                    const userExist = await checkIfUserExistInDB(session.user.sub, session.accessToken);
                    if(!userExist){
                      createUser(session.user, session.accessToken)
                   }
                   return session;
                  } 
                  catch (error) {
                    console.log('Error in callback:', error)
                    return session;
                  }
                },
              });
            } catch (error) {
                console.log('Error in callback:', error)
            }
          },
    },
);

export async function checkIfUserExistInDB(userId: string, accessToken : any) {

    try {
      const response = await axios.get(`${process.env.BACKEND_URL}/users/${userId.split('|')[1]}`, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Authorization': `Bearer ${accessToken}`
        }
    });
    return response.status === 200;
    } catch (error) {
      console.log('Error checking if user exists in DB:', error)
      return false;
    }
  }

export async function createUser(user: any, accessToken : any) {
    try {
     const response = await axios.post(`${process.env.BACKEND_URL}/users`, {auth0Id: user.sub.split('|')[1], name: user.name, email: user.email}, {
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Authorization': `Bearer ${accessToken}`
      }
  });
     return response.status === 200;
    } catch (error) {
      console.log('Error creating User in DB:', error)
      return false;
    }
  }