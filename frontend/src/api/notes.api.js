import axiosInstance from "./axios";

export const createNote = async(noteData)=>{
    const response = await axiosInstance.post('/note',noteData)
    return response.data
}

export const getNotes = async(params)=>{
    const response = await axiosInstance.get('/note',{params})
    return response.data;
}

export const getNoteById = async(id)=>{
    const response =await axiosInstance.get(`/note/${id}`)
    return response.data;
}

export const updateNote = async(id,noteData)=>{
    const response = await axiosInstance.patch(`/note/${id}`,noteData);
    return response.data;
}

export const deleteNote = async(id)=>{
    const response = await axiosInstance.delete(`/note/${id}`)
    return response.data;
}
