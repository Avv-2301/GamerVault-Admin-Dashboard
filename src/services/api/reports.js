import api from '../axios'
import { ENDPOINTS } from '../apiRoutes/endPoints'
import { getMessage } from '../helper'
import { showError } from '../toast'

export const getReport = async (type, range, customDates, paymentMethod) => {
  try {
    const params = { range, paymentMethod }
    if (range === 'custom' && customDates) {
      params.startDate = new Date(`${customDates.startDate}T00:00:00`).toISOString()
      params.endDate = new Date(`${customDates.endDate}T23:59:59.999`).toISOString()
    }
    const response = await api.get(ENDPOINTS.GETREPORT(type), { params })
    if (Number(response?.data?.meta?.code) !== 200) throw new Error(response?.data?.meta?.message || 'Failed to load report')
    return response.data?.data
  } catch (error) {
    showError(getMessage(error, 'Failed to load report'))
    throw error
  }
}
