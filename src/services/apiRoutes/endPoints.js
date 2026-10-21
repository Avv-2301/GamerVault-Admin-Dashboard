export const ENDPOINTS = {
  //endpoints related to authentication
  LOGIN: "/admin/login",
  LOGOUT: "/admin/logout",
  LOGINHISTORY: (userId) => `/admin/login-history/${userId}`,
  FORCELOGOUTUSER: (userId) => `/admin/users/${userId}/logout`,
  CHANGEPASSWORD: (userId) => `/admin/change-password/${userId}`,

  //endpoints related to game controller 3 Left
  UPLOADIMAGE: "/admin/upload-image",
  CREATEGAME: "/admin/games",
  GETALLGAME: "/admin/games",
  GETGAMEBYID: (gameId) => `/admin/games/${gameId}`,
  GETGAMEBYSLUG: (slug) => `/admin/games/slug/${encodeURIComponent(slug)}`,
  UPDATEGAMEVISIBILITY: (gameId) => `/admin/game-visibility/${gameId}`,
  UPDATEGAMEBYID: (gameId) => `/admin/games/${gameId}`,
  DELETEGAMEBYID: (gameId) => `/admin/games/${gameId}`,

  // Banner management
  GETALLBANNERS: "/admin/banners",
  GETBANNERBYID: (bannerId) => `/admin/banners/${bannerId}`,
  CREATEBANNER: "/admin/banners",
  UPDATEBANNER: (bannerId) => `/admin/banners/${bannerId}`,
  PAUSEBANNER: (bannerId) => `/admin/banners/${bannerId}/pause`,
  RESUMEBANNER: (bannerId) => `/admin/banners/${bannerId}/resume`,
  DELETEBANNER: (bannerId) => `/admin/banners/${bannerId}`,

  // Gift card batches
  GETALLGIFTCARDS: "/admin/gift-cards",
  GETGIFTCARDBYID: (giftCardId) => `/admin/gift-cards/${giftCardId}`,
  CREATEGIFTCARD: "/admin/gift-cards",
  UPDATEGIFTCARD: (giftCardId) => `/admin/gift-cards/${giftCardId}`,
  DELETEGIFTCARD: (giftCardId) => `/admin/gift-cards/${giftCardId}`,

  // Discounts
  CREATEDISCOUNT: "/admin/discounts",
  GETALLDISCOUNTS: "/admin/discounts",
  GETDISCOUNTBYID: (discountId) => `/admin/discounts/${discountId}`,
  UPDATEDISCOUNT: (discountId) => `/admin/discounts/${discountId}`,
  GETDISCOUNTOPTIONS: "/admin/discounts/options",
  PAUSEDISCOUNT: (discountId) => `/admin/discounts/${discountId}/pause`,
  DELETEDISCOUNT: (discountId) => `/admin/discounts/${discountId}`,
  BULKDISCOUNTACTION: "/admin/discounts/bulk-action",

  //endpoints related to users controller
  GETUSERS: "/admin/get-users",
  GETUSERSBYID: (userId) => `/admin/get-user/${userId}`,
  GETUSERGAMES: (userId) => `/admin/get-user/${userId}/games`,
  GETUSERWALLET: (userId) => `/admin/get-user/${userId}/wallet`,
  RESETUSERPASSWORD: (userId) => `/admin/users/${userId}/password`,
  GETUSERTRANSACTION: (userId) => `/admin/transaction/${userId}`,

  //endpoints related to transactions
  ADDWALLETBALNCE: (userId) => `/admin/add-balance/${userId}`,
  DEDUCTWALLETBALANCE: (userId) => `/admin/deduct-balance/${userId}`,
  GETALLTRANSACTIONS: "/admin/transactions",
  GETDASHBOARDSTATS: "/admin/dashboard/stats",
  SEARCHDASHBOARD: "/admin/dashboard/search",
  GETREPORT: (type) => `/admin/reports/${type}`,

  //endpoints related to notifications
  GETNOTIFICATIONS: "/admin/notifications",
  MARKNOTIFICATIONREAD: (notificationId) => `/admin/notifications/${notificationId}/read`,
  MARKALLNOTIFICATIONSREAD: "/admin/notifications/read-all",
  DELETENOTIFICATION: (notificationId) => `/admin/notifications/${notificationId}`,

  // Audit trail
  GETAUDITLOGS: "/admin/audit-logs",
  GETAUDITLOGSTATS: "/admin/audit-logs/stats",
};
