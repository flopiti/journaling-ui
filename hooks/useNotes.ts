import axios from "axios";

export const useNotes = () => {
    const makeRequest = async (options:any) => {  
        try {
          if (options.authenticated) {
            options.config.headers = {
              ...options.config.headers,
            };
          }
          const response = await axios(options.config);
          const { data } = response;
          return data;
        } catch (error:any) {
          if (axios.isAxiosError(error) && error.response) {
            console.log('error')
            return error.response.data;
          }
          return error.message;
        }
        };

        const deleteNote = async (id:any) => {
            const response = await makeRequest({
                config: {
                    method: "DELETE",
                    url: `/api/notes/${id}`,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    },
                },
            });
            return response;
        }

        const getNotes = async () => {
            const response = await makeRequest({
                config: {
                    method: "GET",
                    url: `api/notes`,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    },
                },
            });
            return response;
        }

        const createNote = async (note:any) => {
            const response = await makeRequest({
                config: {
                    method: "POST",
                    url: `/api/notes`,
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    },
                    data: note,
                },
            });
            return response;
        }
        return { getNotes, createNote , deleteNote};
    }
    