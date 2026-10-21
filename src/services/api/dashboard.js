import api from '../axios'
import { ENDPOINTS } from '../apiRoutes/endPoints'
import { getMessage } from '../helper'
import { showError } from '../toast'

export const getDashboardStats = async (range, customDates) => {
  try {
    const params = { range }
    if (range === 'custom' && customDates) {
      params.startDate = new Date(`${customDates.startDate}T00:00:00`).toISOString()
      params.endDate = new Date(`${customDates.endDate}T23:59:59.999`).toISOString()
    }
    const response = await api.get(ENDPOINTS.GETDASHBOARDSTATS, { params })
    if (Number(response?.data?.meta?.code) !== 200) throw new Error(response?.data?.meta?.message || 'Failed to load dashboard')
    return response.data?.data
  } catch (error) {
    showError(getMessage(error, 'Failed to load dashboard'))
    throw error
  }
}

export const searchDashboard = async (query) => {
  const response = await api.get(ENDPOINTS.SEARCHDASHBOARD, { params: { q: query } })
  if (Number(response?.data?.meta?.code) !== 200) throw new Error(response?.data?.meta?.message || 'Search failed')
  return response.data?.data || []
}
