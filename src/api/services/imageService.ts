import axiosInstance from "../axiosConfig";

type DeleteImageResponse = {
  message?: string;
};

type AddImageResponse = {
  name: string;
  filepath: string;
  thumbpath: string;
  createdAt: string;
};

export const addImage = async (
  companyId: number,
  file: File
): Promise<AddImageResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post<AddImageResponse>(
      `/companies/${companyId}/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Image added successfully:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error adding image:", err);
    throw err;
  }
};

export const deleteImage = async (
  companyId: number,
  imageName: string
): Promise<DeleteImageResponse> => {
  try {
    const response = await axiosInstance.delete<DeleteImageResponse>(
      `/companies/${companyId}/image/${imageName}`
    );
    console.log("Image deleted successfully:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error deleting image:", err);
    throw err;
  }
};
