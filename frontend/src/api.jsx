import axios from "axios";

//My python code is running in this port so, to go to api end port 
//change this if your code is running in differnt port
const api_url = "http://127.0.0.1:8000/api/todos/"

//get from the url
export const getTodos = async () => {
    const response = await axios.get(api_url);
    return response.data;
};

export const addTodo = async (todo) => {
    const response = await axios.post(api_url, todo);
    return response.data;
};

export const updateTodo = async (id, todo) =>  {
    const response = await axios.put(`${api_url}${id}/`,todo);
    return response.data;
};

export const deleteTodo = async (id) => {
    await axios.delete(`${api_url}${id}/`);
};