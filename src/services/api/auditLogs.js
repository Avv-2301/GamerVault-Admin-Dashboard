import api from "../axios";
import { ENDPOINTS } from "../apiRoutes/endPoints";

export const getAuditLogs = async (params) => {
  const response = await api.get(ENDPOINTS.GETAUDITLOGS, { params });
  return response.data;
};

export const getAuditLogStats = async (params) => {
  const response = await api.get(ENDPOINTS.GETAUDITLOGSTATS, { params });
  return response.data;
};
