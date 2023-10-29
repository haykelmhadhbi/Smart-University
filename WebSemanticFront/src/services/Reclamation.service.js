import { ReclamationAPI } from "../constants/api";
import { axiosPublic } from "../utils/axios";

const queryAllReclamations = async () => {
  const response = await axiosPublic.get(ReclamationAPI.GET_ALL);
  return response.data;
};

const reclamationServices = {
  queryAllReclamations,
};
export default reclamationServices;
