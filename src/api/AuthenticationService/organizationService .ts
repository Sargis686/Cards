import api  from "../apiClientConfig";

export const getCompanyById = async (id: string): Promise<Company | null> => {
  try {
    const response = await api.get(`/companies/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting company info:", error);
    return null;
  }
};

export const deleteCompany = async (companyId: string): Promise<unknown> => {
  try {
    const response = await api.delete(`/companies/${companyId}`);
    if (response.status === 200) {
      console.log("Company successfully deleted");
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Error deleting company:", error);
    throw error;
  }
};


type CompanyUpdateData = {
  name: string;
  shortName: string;
  businessEntity: string;
  contract: {
    no: string;
    issue_date: string;
  };
  type: string[];
};
export const updateCompany = async (
  id: string,
  updatedData:CompanyUpdateData
) => {
  try {
    const response = await api.patch(
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
