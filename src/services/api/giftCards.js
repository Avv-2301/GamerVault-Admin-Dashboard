import api from '../axios'
import { ENDPOINTS } from '../apiRoutes/endPoints'
import { getMessage } from '../helper'
import { showError, showLoading, showSuccess } from '../toast'
import toast from 'react-hot-toast'

export const getAllGiftCards = async () => {
  const loadingToastId = showLoading('Getting gift cards...')
  try {
    const response = await api.get(ENDPOINTS.GETALLGIFTCARDS)
    if (Number(response?.data?.meta?.code) !== 200) throw new Error(response?.data?.meta?.message || 'Failed to load gift cards')
    showSuccess('Gift cards fetched successfully')
    return response.data?.data?.giftCards || []
  } catch (error) {
    showError(getMessage(error, 'Failed to load gift cards'))
    throw error
  } finally {
    toast.dismiss(loadingToastId)
  }
}

export const getGiftCardById = async (giftCardId) => {
  try {
    const response = await api.get(ENDPOINTS.GETGIFTCARDBYID(giftCardId))
    if (Number(response?.data?.meta?.code) !== 200) throw new Error(response?.data?.meta?.message || 'Failed to load gift card')
    return response.data?.data
  } catch (error) {
    showError(getMessage(error, 'Failed to load gift card'))
    throw error
  }
}

export const createGiftCard = async (payload) => {
  try {
    const response = await api.post(ENDPOINTS.CREATEGIFTCARD, payload)
    if (Number(response?.data?.meta?.code) !== 201) throw new Error(response?.data?.meta?.message || 'Failed to create gift cards')
    showSuccess(response?.data?.meta?.message || 'Gift cards created successfully')
    return response.data?.data
  } catch (error) {
    showError(getMessage(error, 'Failed to create gift cards'))
    throw error
  }
}

export const updateGiftCard = async (giftCardId, payload) => {
  try {
    const response = await api.put(ENDPOINTS.UPDATEGIFTCARD(giftCardId), payload)
    if (Number(response?.data?.meta?.code) !== 200) throw new Error(response?.data?.meta?.message || 'Failed to update gift cards')
    showSuccess(response?.data?.meta?.message || 'Gift cards updated successfully')
    return response.data?.data
  } catch (error) {
    showError(getMessage(error, 'Failed to update gift cards'))
    throw error
  }
}

export const deleteGiftCard = async (giftCardId, password) => {
  try {
    const response = await api.delete(ENDPOINTS.DELETEGIFTCARD(giftCardId), { data: { password } })
    if (Number(response?.data?.meta?.code) !== 200) throw new Error(response?.data?.meta?.message || 'Failed to delete gift cards')
    showSuccess(response?.data?.meta?.message || 'Gift cards deleted successfully')
    return response.data?.data
  } catch (error) {
    showError(getMessage(error, 'Failed to delete gift cards'))
    throw error
  }
}
