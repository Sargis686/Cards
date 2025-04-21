import api  from "../apiClientConfig";

type ContactUpdatePayload = Partial<{
  lastname: string;
  firstname: string;
  phone: string;
  email: string;
}>;

export const getContactById = async (contactId: string): Promise<Contact> => {
  try {
    const { data } = await api.get<Contact>(`/contacts/${contactId}`);
    return data;
  } catch (err) {
    console.error("Could not retrieve contact information:", err);
    throw err;
  }
};

export const updateContactById = async (
  contactId: string,
  updatedData:ContactUpdatePayload
): Promise<Contact> => {
  try {
    const { data } = await api.patch<Contact>(`/contacts/${contactId}`, updatedData);
    return data;
  } catch (err) {
    console.error("Failed to update contact data:", err);
    throw err;
  }
};
