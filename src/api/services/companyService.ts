import axiosInstance from "../axiosConfig";

export const getCompanyById = async (id: string): Promise<Company | null> => {
  try {
    const response = await axiosInstance.get(`/companies/${id}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении информации об организации:", error);
    return null;
  }
};

export const deleteCompany = async (companyId: string) => {
  try {
    const response = await axiosInstance.delete(`/companies/${companyId}`);
    if (response.status === 200) {
      console.log("Компания успешно удалена");
      return response.data;
    }
  } catch (error) {
    console.error("Ошибка при удалении компании:", error);
    throw error;
  }
};

export const updateCompany = async (
  id: string,
  updatedData: {
    name: string;
    shortName: string;
    businessEntity: string;
    contract: {
      no: string;
      issue_date: string;
    };
    type: string[];
  }
) => {
  try {
    const response = await axiosInstance.patch(
      `/companies/${id}`,
      updatedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("Данные компании успешно обновлены");
      return response.data;
    }
  } catch (error) {
    console.error("Ошибка при обновлении данных компании:", error);
    throw error;
  }
};
