import axios from "axios";

export const axiosFactory = (subsidiaryId?: number) => {
  return axios.create({
    baseURL: "https://www.openstreetmap.org",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
