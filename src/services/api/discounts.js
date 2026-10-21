import api from '../axios'
import { ENDPOINTS } from '../apiRoutes/endPoints'
import { getMessage } from '../helper'
import { showError, showSuccess } from '../toast'

export const createDiscount = async (payload) => {
  try {
    const response = await api.post(ENDPOINTS.CREATEDISCOUNT, payload)
    if (Number(response?.data?.meta?.code) !== 201) throw new Error(response?.data?.meta?.message || 'Failed to create discount')
    showSuccess(response?.data?.meta?.message || 'Discount created successfully')
    return response.data?.data
  } catch (error) {
    showError(getMessage(error, 'Failed to create discount'))
    throw error
  }
}

export const getAllDiscounts = async () => {
  try {
    const response = await api.get(ENDPOINTS.GETALLDISCOUNTS)
    if (Number(response?.data?.meta?.code) !== 200) throw new Error(response?.data?.meta?.message || 'Failed to load discounts')
    return response.data?.data || { discounts: [] }
  } catch (error) {
    showError(getMessage(error, 'Failed to load discounts'))
    throw error
  }
}

export const getDiscountById = async (discountId) => {
  const response = await api.get(ENDPOINTS.GETDISCOUNTBYID(discountId))
  if (Number(response?.data?.meta?.code) !== 200) throw new Error(response?.data?.meta?.message || 'Failed to load discount')
  return response.data?.data
}

export const updateDiscount = async (discountId, payload) => {
  try {
    const response = await api.put(ENDPOINTS.UPDATEDISCOUNT(discountId), payload)
    if (Number(response?.data?.meta?.code) !== 200) throw new Error(response?.data?.meta?.message || 'Failed to update discount')
    showSuccess(response?.data?.meta?.message || 'Discount updated successfully')
    return response.data?.data
  } catch (error) {
    showError(getMessage(error, 'Failed to update discount'))
    throw error
  }
}

export const getDiscountOptions = async () => {
  const response = await api.get(ENDPOINTS.GETDISCOUNTOPTIONS)
  if (Number(response?.data?.meta?.code) !== 200) throw new Error(response?.data?.meta?.message || 'Failed to load discount options')
  return response.data?.data || { games: [], categories: [] }
}

export const setDiscountPaused = async (discountId, paused, password) => {
  const response = await api.put(ENDPOINTS.PAUSEDISCOUNT(discountId), { paused, password })
  if (Number(response?.data?.meta?.code) !== 200) throw new Error(response?.data?.meta?.message || 'Failed to update discount')
  showSuccess(response?.data?.meta?.message || (paused ? 'Discount paused' : 'Discount resumed'))
  return response.data?.data
}

export const deleteDiscount = async (discountId, password) => {
  const response = await api.delete(ENDPOINTS.DELETEDISCOUNT(discountId), { data: { password } })
  if (Number(response?.data?.meta?.code) !== 200) throw new Error(response?.data?.meta?.message || 'Failed to delete discount')
  showSuccess(response?.data?.meta?.message || 'Discount deleted')
  return response.data?.data
}

export const bulkDiscountAction = async (ids, action, password) => {
  const response = await api.post(ENDPOINTS.BULKDISCOUNTACTION, { ids, action, password })
  if (Number(response?.data?.meta?.code) !== 200) throw new Error(response?.data?.meta?.message || 'Failed to update discounts')
  showSuccess(response?.data?.meta?.message || 'Discounts updated')
  return response.data?.data
}
