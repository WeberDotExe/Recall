import useAxiosPrivate from "./useAxiosPrivate";

const useNotesApi = () => {
  const axiosPrivate = useAxiosPrivate();

  const createNote = async (noteData) => {
    const response = await axiosPrivate.post("/notes", noteData);
    return response.data;
  };

  const getNotes = async (params) => {
    const response = await axiosPrivate.get("/notes", { params });
    return response.data;
  };

  const getNoteById = async (id) => {
    const response = await axiosPrivate.get(`/notes/${id}`);
    return response.data;
  };

  const updateNote = async (id, noteData) => {
    const response = await axiosPrivate.patch(`/notes/${id}`, noteData);
    return response.data;
  };

  const deleteNote = async (id) => {
    const response = await axiosPrivate.delete(`/notes/${id}`);
    return response.data;
  };

  return {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote,
  };
};

export default useNotesApi;