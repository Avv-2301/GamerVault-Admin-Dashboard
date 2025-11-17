// API Configuration
// Gateway is at localhost:3000, routes are proxied to respective services
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 30000,
  endpoints: {
    // Auth endpoints - proxied through gateway: /admin/users/* -> /admin/* (user-service)
    auth: {
      login: '/admin/login',
      logout: '/admin/logout',
      refresh: '/admin/users/refresh',
      me: '/admin/users/me',
      loginHistory: (userId: string) => `/admin/login-history/${userId}`,
      changePassword: (userId: string) => `/admin/change-password/${userId}`,
    },
    // User endpoints - proxied through gateway: /admin/users/* -> /admin/* (user-service)
    users: {
      list: '/admin/users',
      detail: (id: string) => `/admin/users/${id}`,
      create: '/admin/users',
      update: (id: string) => `/admin/users/${id}`,
      delete: (id: string) => `/admin/users/${id}`,
      search: '/admin/users/search',
    },
    // Game/Product endpoints - proxied through gateway: /admin/products/* -> /admin/* (product-service)
    games: {
      list: '/admin/products',
      detail: (id: string) => `/admin/products/${id}`,
      create: '/admin/products',
      update: (id: string) => `/admin/products/${id}`,
      delete: (id: string) => `/admin/products/${id}`,
      search: '/admin/products/search',
    },
    // Discount endpoints - proxied through gateway
    discounts: {
      list: '/admin/discounts',
      detail: (id: string) => `/admin/discounts/${id}`,
      create: '/admin/discounts',
      update: (id: string) => `/admin/discounts/${id}`,
      delete: (id: string) => `/admin/discounts/${id}`,
    },
    // Support/Ticket endpoints - proxied through gateway
    tickets: {
      list: '/admin/tickets',
      detail: (id: string) => `/admin/tickets/${id}`,
      create: '/admin/tickets',
      update: (id: string) => `/admin/tickets/${id}`,
      delete: (id: string) => `/admin/tickets/${id}`,
      reply: (id: string) => `/admin/tickets/${id}/reply`,
      status: (id: string) => `/admin/tickets/${id}/status`,
    },
    // Review endpoints - proxied through gateway
    reviews: {
      list: '/admin/reviews',
      detail: (id: string) => `/admin/reviews/${id}`,
      update: (id: string) => `/admin/reviews/${id}`,
      delete: (id: string) => `/admin/reviews/${id}`,
      approve: (id: string) => `/admin/reviews/${id}/approve`,
      flag: (id: string) => `/admin/reviews/${id}/flag`,
    },
    // Banner endpoints - proxied through gateway
    banners: {
      list: '/admin/banners',
      detail: (id: string) => `/admin/banners/${id}`,
      create: '/admin/banners',
      update: (id: string) => `/admin/banners/${id}`,
      delete: (id: string) => `/admin/banners/${id}`,
      upload: '/admin/banners/upload',
    },
    // Role endpoints - proxied through gateway: /admin/users/* -> /admin/* (user-service)
    roles: {
      list: '/admin/users/roles',
      detail: (id: string) => `/admin/users/roles/${id}`,
      create: '/admin/users/roles',
      update: (id: string) => `/admin/users/roles/${id}`,
      delete: (id: string) => `/admin/users/roles/${id}`,
      assign: '/admin/users/roles/assign',
      remove: '/admin/users/roles/remove',
    },
    // Dashboard endpoints - proxied through gateway
    dashboard: {
      stats: '/admin/dashboard/stats',
      revenue: '/admin/dashboard/revenue',
      users: '/admin/dashboard/users',
      topGames: '/admin/dashboard/top-games',
      recentActivity: '/admin/dashboard/recent-activity',
    },
    // Admin Permissions endpoints - proxied through gateway
    permissions: {
      list: '/admin/permissions',
      detail: (id: string) => `/admin/permissions/${id}`,
      update: (id: string) => `/admin/permissions/${id}`,
      delete: (id: string) => `/admin/permissions/${id}`,
      grant: '/admin/permissions/grant',
      revoke: '/admin/permissions/revoke',
    },
    // Audit Logs endpoints - proxied through gateway
    auditLogs: {
      list: '/admin/audit-logs',
      detail: (id: string) => `/admin/audit-logs/${id}`,
    },
  },
} as const;

