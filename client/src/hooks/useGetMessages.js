
const useGetMessages = () => {

  const getMessages = async (id) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      return data
    } catch (error) {
      console.log(error.getMessages, "Error in useGetMessages");
    }
  };
  return { getMessages };
};

export default useGetMessages;
