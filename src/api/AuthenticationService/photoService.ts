import api  from "../apiClientConfig";


type ImageUploadResult  = {
  name: string;
  filepath: string;
  thumbpath: string;
  createdAt: string;
  url:string;
};


type ImageDeleteResult  = {
  message?: string;
};

export const uploadCompanyImage  = async (
  companyId: number,
  file: File
): Promise<ImageUploadResult> => {
  const formData = new FormData();
  formData.append("file", file);


 
  try {
    const { data } = await api.post<ImageUploadResult>(
      `/companies/${companyId}/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Uploaded company image:", data);
    return data;
  } catch (error) {
    console.error("Failed to upload image:", error);
    throw error;
  }


};

export const removeCompanyImage = async (
  companyId: number,
  imageName: string
): Promise<ImageDeleteResult> => {
  try {
    const { data } = await api.delete<ImageDeleteResult>(
      `/companies/${companyId}/image/${imageName}`
    );
    console.log("Deleted company image:", data);
    return data;
  } catch (error) {
    console.error("Failed to delete image:", error);
    throw error;
  }
};
