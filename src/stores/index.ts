/**
 * Centralized store exports
 * 
 * This file exports all Zustand stores for easy importing
 * 
 * @example
 * import { useAuthStore, useUIStore } from '@/stores';
 */

export { useAuthStore } from './authStore';
export type { User } from './authStore';

export { useUIStore } from './uiStore';

