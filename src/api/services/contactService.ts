import axiosInstance from "../axiosConfig";

export const getContactById = async (contactId: string): Promise<Contact> => {
  try {
    const response = await axiosInstance.get<Contact>(`/contacts/${contactId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contact:", error);
    throw error;
  }
};

export const updateContactById = async (
  contactId: string,
  updatedData: {
    lastname?: string;
    firstname?: string;
    phone?: string;
    email?: string;
  }
): Promise<Contact> => {
  try {
    const response = await axiosInstance.patch<Contact>(
      `/contacts/${contactId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
};
