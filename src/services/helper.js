/**
 * @description Formats a date and time for display, or returns N/A for invalid input.
 * @param {string|Date} dateString - Date to format.
 * @returns {string} Display date and time.
 */
export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * @description Formats a calendar date without its time.
 * @param {string|Date} value - Date to format.
 * @param {string} fallback - Text used for missing or invalid dates.
 * @returns {string} Display date or fallback.
 */
export const formatDateOnly = (value, fallback = "N/A") => {
  if (!value) return fallback;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? fallback
    : date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
};

/**
 * @description Calculates generated, redeemed, and available gift card counts.
 * @param {object} card - Gift card batch details.
 * @returns {object} Gift card inventory counts.
 */
export const getGiftCardInventory = (card) => {
  const generated = Number(card?.quantity ?? card?.generatedQuantity ?? 1);
  const redeemed = Number(
    card?.redeemedQuantity ?? (card?.status === "redeemed" ? 1 : 0)
  );
  return { generated, redeemed, available: Math.max(0, generated - redeemed) };
};

/**
 * @description Selects the label, icon, and style for a gift card status.
 * @param {string} status - Gift card status.
 * @returns {object} Status presentation settings.
 */
export const getGiftCardStatusPresentation = (status) => {
  const presentation = {
    active: {
      className: "bg-[rgba(16,185,129,0.2)] text-[#10b981] border-[#10b981]",
      label: "Active",
      icon: "check",
    },
    redeemed: {
      className: "bg-[rgba(59,130,246,0.2)] text-[#3b82f6] border-[#3b82f6]",
      label: "Redeemed",
      icon: "check",
    },
    expired: {
      className: "bg-[rgba(107,114,128,0.2)] text-[#6b7280] border-[#6b7280]",
      label: "Expired",
      icon: "expired",
    },
  };
  return presentation[status] || presentation.expired;
};

/**
 * @description Generates a sample gift card code for the form preview.
 * @param {string} prefix - Code prefix.
 * @returns {string} Preview code.
 */
export const generateGiftCardPreviewCode = (prefix = "GAMER2024") => {
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix.toUpperCase()}-${randomSuffix}`;
};

/**
 * @description Formats a compact date and time for the admin interface.
 * @param {string|Date} value - Date to format.
 * @param {string} fallback - Text used for missing or invalid dates.
 * @returns {string} Display date and time or fallback.
 */
export const formatDateTime = (value, fallback = "N/A") => {
  if (!value) return fallback;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? fallback
    : date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
};

/**
 * @description Formats a date and time with a full month name.
 * @param {string|Date} value - Date to format.
 * @param {string} fallback - Text used for missing or invalid dates.
 * @returns {string} Long display date and time or fallback.
 */
export const formatLongDateTime = (value, fallback = "N/A") => {
  if (!value) return fallback;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? fallback
    : date.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
};

/**
 * @description Formats a calendar date using the browser's locale.
 * @param {string|Date} value - Date to format.
 * @param {string} fallback - Text used for missing or invalid dates.
 * @returns {string} Local date or fallback.
 */
export const formatLocalDate = (value, fallback = "Not set") => {
  if (!value) return fallback;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date.toLocaleDateString();
};

/**
 * @description Formats a long calendar date using the browser's locale.
 * @param {string|Date} value - Date to format.
 * @param {string} fallback - Text used for missing or invalid dates.
 * @returns {string} Local long date or fallback.
 */
export const formatLocalLongDate = (value, fallback = "Not set") => {
  if (!value) return fallback;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? fallback
    : date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
};

/**
 * @description Displays recent login times relatively and older logins as dates.
 * @param {string|Date} timestamp - Login time.
 * @returns {string} Relative time, formatted date, or Unknown.
 */
export const formatLoginTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "Unknown";
  const now = new Date();
  const diffMs = now - date;
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  const hours = Math.floor(diffMs / 3600000);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(diffMs / 86400000);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * @description Formats a calendar date with a full month name.
 * @param {string|Date} value - Date to format.
 * @param {string} fallback - Text used for missing or invalid dates.
 * @returns {string} Long date or fallback.
 */
export const formatLongDate = (value, fallback = "Not set") => {
  if (!value) return fallback;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? fallback
    : date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
};

/**
 * @description Formats a date's time with hours, minutes, and seconds for the clock.
 * @param {Date} date - Clock time.
 * @returns {string} Formatted time.
 */
export const formatClockTime = (date) =>
  date.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
/**
 * @description Formats the weekday and date for the clock.
 * @param {Date} date - Clock date.
 * @returns {string} Formatted weekday and date.
 */
export const formatClockDate = (date) =>
  date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
/**
 * @description Converts a numeric value to a compact dollar-thousands label.
 * @param {number} value - Currency amount.
 * @returns {string} Compact currency label.
 */
export const formatCompactCurrency = (value) => `$${value / 1000}K`;

/**
 * @description Converts a value to its string representation.
 * @param {number|string} value - Value to format.
 * @returns {string} String value.
 */
export const formatNumber = (value) => `${value}`;

/**
 * @description Formats a numeric amount as Indian rupees.
 * @param {number|string} value - Currency amount.
 * @returns {string} INR currency label.
 */
export const formatReportCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

/**
 * @description Formats a number with Indian digit grouping.
 * @param {number|string} value - Number to format.
 * @returns {string} Grouped number.
 */
export const formatReportNumber = (value) =>
  new Intl.NumberFormat("en-IN").format(Number(value) || 0);

/**
 * @description Converts report sections to CSV and starts a browser download.
 * @param {string} type - Report type used in the filename.
 * @param {object} report - Report summary, series, games, and payment method data.
 * @returns {void} Triggers the CSV download.
 */
export const downloadReportCsv = (type, report) => {
  const rows = [
    ["Report", type],
    ["Range", report.range],
    ["Payment method", report.paymentMethod],
  ];
  rows.push([], ["Metric", "Value"]);
  Object.entries(report.summary || {}).forEach(([key, value]) =>
    rows.push([key, value ?? ""])
  );
  if (report.series?.length) {
    const columns = Object.keys(report.series[0]);
    rows.push([], columns);
    report.series.forEach((entry) =>
      rows.push(columns.map((column) => entry[column]))
    );
  }
  if (report.topGames?.length) {
    rows.push([], ["Game", "Units sold", "Revenue", "Rating"]);
    report.topGames.forEach((game) =>
      rows.push([game.name, game.unitsSold, game.revenue, game.rating])
    );
  }
  if (report.paymentMethods?.length) {
    rows.push([], ["Payment method", "Amount", "Orders"]);
    report.paymentMethods.forEach((method) =>
      rows.push([method.method, method.amount, method.orders])
    );
  }
  const csv = rows
    .map((row) =>
      row
        .map((value) => {
          const safe = String(value ?? "")
            .replace(/^[=+@-]/, "'$&")
            .replaceAll('"', '""');
          return `"${safe}"`;
        })
        .join(",")
    )
    .join("\r\n");
  const url = URL.createObjectURL(
    new Blob([csv], { type: "text/csv;charset=utf-8" })
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = `${type}-report.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

/**
 * @description Derives avatar initials from a user's initials, name, or email.
 * @param {object} user - User details.
 * @returns {string} Avatar initials or question marks.
 */
export const getUserInitials = (user) => {
  if (!user) return "??";
  if (user.initials) return user.initials;
  if (user.name) {
    const names = user.name.split(" ");
    if (names.length >= 2) return (names[0][0] + names[1][0]).toUpperCase();
    return names[0][0].toUpperCase();
  }
  if (user.email) return user.email.substring(0, 2).toUpperCase();
  return "??";
};

/**
 * @description Gets the readable label for a banner placement.
 * @param {string} position - Banner placement key.
 * @returns {string} Placement label.
 */
export const getBannerPositionLabel = (position) =>
  ({
    "homepage-hero": "Homepage Hero",
    "homepage-featured": "Homepage Featured",
    "homepage-sidebar": "Homepage Sidebar",
    "category-header": "Category Header",
    "game-page": "Game Page",
  }[position] || position);

/**
 * @description Gets explanatory text for a banner placement.
 * @param {string} position - Banner placement key.
 * @returns {string} Placement description.
 */
export const getBannerPositionDescription = (position) =>
  ({
    "homepage-hero": "Large banner displayed at the top of the homepage",
    "homepage-featured": "Featured banner in the homepage content area",
    "homepage-sidebar": "Banner displayed in the homepage sidebar",
    "category-header": "Banner displayed at the top of category pages",
    "game-page": "Banner displayed on individual game pages",
  }[position] || "");

/**
 * @description Finds the selected filter option, defaulting to the first option.
 * @param {object[]} options - Available filter options.
 * @param {string} selectedValue - Selected option value.
 * @returns {object} Matching or default option.
 */
export const getSelectedFilter = (options, selectedValue) =>
  options.find((option) => option.value === selectedValue) || options[0];

/**
 * @description Gets a readable source label for a user's game.
 * @param {string} source - Game source key.
 * @returns {string} Source label.
 */
export const getGameSourceLabel = (source) =>
  ({
    purchase: "Purchase",
    free: "Free",
    admin: "Admin Grant",
  }[source] || source);

/**
 * @description Gets a readable support ticket category label.
 * @param {string} category - Category key.
 * @returns {string} Category label.
 */
export const getSupportCategoryLabel = (category) =>
  ({
    payment: "Payment",
    game: "Game",
    account: "Account",
    technical: "Technical",
    billing: "Billing",
    other: "Other",
  }[category] || category);

/**
 * @description Calculates analog clock hand angles from a date's local time.
 * @param {Date} date - Clock time.
 * @returns {object} Hour, minute, and second angles in degrees.
 */
export const getClockHands = (date) => {
  const totalSeconds = date.getSeconds() + date.getMilliseconds() / 1000;
  const totalMinutes = date.getMinutes() + totalSeconds / 60;
  const totalHours = (date.getHours() % 12) + totalMinutes / 60;
  return {
    hourAngle: totalHours * 30,
    minuteAngle: totalMinutes * 6,
    secondAngle: totalSeconds * 6,
  };
};

/**
 * @description Gets today's date in YYYY-MM-DD format for a date input.
 * @returns {string} Date input value.
 */
export const getTodayDateInput = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.toISOString().split("T")[0];
};

/**
 * @description Gets the earliest allowed schedule date from a chosen start or today.
 * @param {string} startDate - Selected start date, if any.
 * @returns {string} Minimum date input value.
 */
export const getMinScheduleDate = (startDate) =>
  startDate || new Date().toISOString().split("T")[0];

/**
 * @description Converts a preset or custom date range into ISO API parameters.
 * @param {string} range - Preset range or custom selection.
 * @param {object} customDates - Custom startDate and endDate input values.
 * @returns {object} ISO startDate/endDate values, or an empty object.
 */
export const getDateRangeParams = (range = "30D", customDates = {}) => {
  if (!range || range === "all") return {};
  let startDate;
  let endDate;
  if (range === "custom") {
    if (!customDates.startDate || !customDates.endDate) return {};
    startDate = new Date(`${customDates.startDate}T00:00:00`);
    endDate = new Date(`${customDates.endDate}T23:59:59.999`);
  } else {
    const days = Number.parseInt(range, 10);
    if (!Number.isFinite(days) || days <= 0) return {};
    endDate = new Date();
    startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - days);
  }
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()))
    return {};
  return { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
};

/**
 * @description Converts transaction pagination and UI filters to API query parameters.
 * @param {object} pagination - Current page and page size.
 * @param {object} filters - Search, type, amount, status, and date selections.
 * @returns {object} Transaction API filter parameters.
 */
export const buildTransactionApiFilters = (pagination, filters) => {
  const apiFilters = {
    page: pagination.currentPage,
    limit: pagination.itemsPerPage,
  };
  if (filters.search) apiFilters.search = filters.search;
  if (filters.spentType !== "all") apiFilters.spentType = filters.spentType;
  if (filters.transactionType !== "all")
    apiFilters.transactionType = filters.transactionType;
  if (filters.status !== "all") apiFilters.status = filters.status;
  if (filters.paymentMethod !== "all")
    apiFilters.paymentMethod = filters.paymentMethod;
  if (filters.amountRange.min)
    apiFilters.minAmount = parseFloat(filters.amountRange.min);
  if (filters.amountRange.max)
    apiFilters.maxAmount = parseFloat(filters.amountRange.max);
  if (filters.dateRange !== "all") {
    const now = new Date();
    let cutoffDate;
    switch (filters.dateRange) {
      case "today":
        cutoffDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case "week":
        cutoffDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case "month":
        cutoffDate = new Date(now.setDate(now.getDate() - 30));
        break;
      case "quarter":
        cutoffDate = new Date(now.setDate(now.getDate() - 90));
        break;
      case "year":
        cutoffDate = new Date(now.setDate(now.getDate() - 365));
        break;
      default:
        cutoffDate = null;
    }
    if (cutoffDate) apiFilters.startDate = cutoffDate.toISOString();
  }
  return apiFilters;
};

/**
 * @description Converts an audit log day range into an ISO start date filter.
 * @param {string|number} dateRange - Number of days or all.
 * @returns {object} Audit log startDate parameter, or an empty object.
 */
export const getAuditDateParams = (dateRange) => {
  if (dateRange === "all") return {};
  const days = Number(dateRange);
  if (!Number.isFinite(days)) return {};
  return {
    startDate: new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString(),
  };
};

/**
 * @description Maps an audit log API record to display fields and status.
 * @param {object} log - Raw audit log record.
 * @returns {object} Audit log display data.
 */
export const mapAuditLog = (log) => {
  const resourceTypeByPath = [
    ["settings", /settings|config/i],
    ["security", /security|roles?|permissions?|auth/i],
    ["users", /users?|profiles?/i],
    ["games", /games?/i],
    ["transactions", /transactions?|balance|wallet/i],
    ["discounts", /discounts?/i],
    ["banners", /banners?/i],
    ["system", /system|health|reports?/i],
  ];
  const endpoint = log.endpoint || log.fullUrl || "Unknown endpoint";
  const resourceType =
    resourceTypeByPath.find(([, pattern]) => pattern.test(endpoint))?.[0] ||
    "system";
  const method = (log.method || "").toUpperCase();
  const user = log.userId && typeof log.userId === "object" ? log.userId : null;
  const responseStatus = Number(log.responseStatus || 0);
  return {
    ...log,
    id: log._id,
    timestamp: log.createdAt,
    user: {
      name: user?.name || (log.userId ? "Admin" : "System / Unknown"),
      email: user?.email || "",
      role: log.userRole || "Unknown",
    },
    action:
      method === "POST"
        ? "create"
        : ["PUT", "PATCH"].includes(method)
        ? "update"
        : method === "DELETE"
        ? "delete"
        : method.toLowerCase(),
    resourceType,
    resource: endpoint,
    resourceId: log._id,
    status:
      responseStatus >= 500
        ? "warning"
        : responseStatus >= 400
        ? "failed"
        : "success",
    details: `${method} ${endpoint} · HTTP ${responseStatus}${
      Number.isFinite(log.duration) ? ` · ${log.duration} ms` : ""
    }`,
  };
};

/**
 * @description Converts a game name to a lowercase URL slug.
 * @param {string} name - Game name.
 * @returns {string} URL slug.
 */
export const generateSlug = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
/**
 * @description Converts a date to a local YYYY-MM-DD date input value.
 * @param {string|Date} value - Date to convert.
 * @returns {string} Date input value or an empty string.
 */
export const toDateInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 10);
};

/**
 * @description Formats a Date's local year, month, and day for a date input.
 * @param {Date} date - Date to format.
 * @returns {string} YYYY-MM-DD value.
 */
export const formatDateInputPart = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
/**
 * @description Formats a Date's local hours and minutes for a time input.
 * @param {Date} date - Date to format.
 * @returns {string} HH:mm value.
 */
export const formatTimeInputPart = (date) =>
  `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;

/**
 * @description Converts a saved discount into editable form values and target options.
 * @param {object} discount - Discount API record.
 * @returns {object} Discount form data.
 */
export const discountToFormData = (discount) => {
  const start = new Date(discount.startDate);
  const end = new Date(discount.endDate);
  return {
    name: discount.name || "",
    scope: discount.scope,
    scopeDetails: "",
    selectedGames: (discount.selectedGames || [])
      .filter(Boolean)
      .map((game) => ({
        id: String(game._id || game.id || game),
        name: game.name || String(game._id || game.id || game),
      })),
    selectedCategories: (discount.selectedCategories || []).map((name) => ({
      id: name,
      name,
    })),
    startDate: toDateInput(start),
    startTime: formatTimeInputPart(start),
    endDate: toDateInput(end),
    endTime: formatTimeInputPart(end),
  };
};
/**
 * @description Checks whether a link is an absolute URL or a site-relative path.
 * @param {string} value - Link to validate.
 * @returns {boolean} Whether the link is accepted.
 */
export const isValidUrl = (value) => {
  try {
    if (value.startsWith("/")) return true;
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

/**
 * @description Checks that a form's end date and time follow its start.
 * @param {object} formData - Schedule date and time fields.
 * @returns {boolean} Whether the schedule order is valid.
 */
const hasValidSchedule = (formData) => {
  const start = new Date(
    `${formData.startDate}T${formData.startTime || "00:00"}`
  );
  const end = new Date(`${formData.endDate}T${formData.endTime || "23:59"}`);
  return end > start;
};

/**
 * @description Validates banner form content, placement, link, and schedule.
 * @param {object} formData - Banner form values.
 * @returns {object} Field-specific validation errors.
 */
export const validateBannerForm = (formData) => {
  const errors = {};
  if (!formData.title.trim()) errors.title = "Banner title is required";
  else if (formData.title.length > 100)
    errors.title = "Banner title must be less than 100 characters";
  if (!formData.image && !formData.imagePreview)
    errors.image = "Banner image is required";
  if (!formData.position) errors.position = "Banner position is required";
  if (formData.link && !isValidUrl(formData.link))
    errors.link = "Please enter a valid URL";
  if (formData.deviceTypes.length === 0)
    errors.deviceTypes = "At least one device type must be selected";
  if (!formData.startDate) errors.startDate = "Start date is required";
  if (!formData.endDate) errors.endDate = "End date is required";
  else if (formData.startDate && !hasValidSchedule(formData))
    errors.endDate = "End date must be after start date";
  if (formData.priority < 1 || formData.priority > 10)
    errors.priority = "Priority must be between 1 and 10";
  return errors;
};

/**
 * @description Validates a discount form's scope, targets, value, and schedule.
 * @param {object} formData - Discount form values.
 * @returns {object} Field-specific validation errors.
 */
export const validateDiscountForm = (formData) => {
  const errors = {};
  if (!formData.name.trim()) errors.name = "Discount name is required";
  else if (formData.name.length > 100)
    errors.name = "Discount name must be less than 100 characters";
  if (!formData.scope) errors.scope = "Discount scope is required";
  else if (formData.scope === "game" && formData.selectedGames.length === 0)
    errors.scope = "Please select at least one game";
  else if (
    formData.scope === "category" &&
    formData.selectedCategories.length === 0
  )
    errors.scope = "Please select at least one category";
  if (!formData.startDate) errors.startDate = "Start date is required";
  if (!formData.endDate) errors.endDate = "End date is required";
  else if (formData.startDate && !hasValidSchedule(formData))
    errors.endDate = "End date must be after start date";
  else if (
    new Date(`${formData.endDate}T${formData.endTime || "23:59"}:59`) <=
    new Date()
  )
    errors.endDate = "End date must be in the future";
  return errors;
};

/**
 * @description Validates new user account fields and password confirmation.
 * @param {object} formData - User form values.
 * @returns {object} Field-specific validation errors.
 */
export const validateUserForm = (formData) => {
  const errors = {};
  if (!formData.name.trim()) errors.name = "Name is required";
  else if (formData.name.length > 100)
    errors.name = "Name must be less than 100 characters";
  if (!formData.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
    errors.email = "Please enter a valid email address";
  else if (formData.email.length > 100)
    errors.email = "Email must be less than 100 characters";
  if (!formData.password) errors.password = "Password is required";
  else if (formData.password.length < 8)
    errors.password = "Password must be at least 8 characters long";
  else if (formData.password.length > 100)
    errors.password = "Password must be less than 100 characters";
  if (!formData.confirmPassword)
    errors.confirmPassword = "Please confirm your password";
  else if (formData.password !== formData.confirmPassword)
    errors.confirmPassword = "Passwords do not match";
  if (!formData.role) errors.role = "Role is required";
  if (!formData.status) errors.status = "Status is required";
  return errors;
};

/**
 * @description Validates the user, subject, description, category, and priority of a support ticket.
 * @param {object} formData - Support ticket form values.
 * @returns {object} Field-specific validation errors.
 */
export const validateSupportTicketForm = (formData) => {
  const errors = {};
  if (!formData.userId && !formData.userEmail)
    errors.user = "User ID or Email is required";
  if (!formData.subject.trim()) errors.subject = "Subject is required";
  else if (formData.subject.length > 200)
    errors.subject = "Subject must be less than 200 characters";
  if (!formData.description.trim())
    errors.description = "Description is required";
  else if (formData.description.length < 10)
    errors.description = "Description must be at least 10 characters";
  else if (formData.description.length > 5000)
    errors.description = "Description must be less than 5000 characters";
  if (!formData.category) errors.category = "Category is required";
  if (!formData.priority) errors.priority = "Priority is required";
  return errors;
};

/**
 * @description Requires a reason and admin password for a user block action.
 * @param {object} blockData - Block action form values.
 * @returns {object} Field-specific validation errors.
 */
export const validateBlockForm = (blockData) => {
  const errors = {};
  if (!blockData.reason?.trim()) errors.reason = "Reason is required";
  if (!blockData.adminPassword?.trim())
    errors.adminPassword = "Admin password is required";
  return errors;
};

/**
 * @description Validates a new password, confirmation, and current admin password.
 * @param {object} passwordData - Password form values.
 * @returns {object} Field-specific validation errors.
 */
export const validatePasswordForm = (passwordData) => {
  const errors = {};
  if (!passwordData.newPassword)
    errors.newPassword = "New password is required";
  else if (passwordData.newPassword.length < 8)
    errors.newPassword = "Password must be at least 8 characters";
  if (!passwordData.confirmPassword)
    errors.confirmPassword = "Please confirm the password";
  else if (passwordData.newPassword !== passwordData.confirmPassword)
    errors.confirmPassword = "Passwords do not match";
  if (!passwordData.adminPassword)
    errors.adminPassword = "Admin password is required";
  return errors;
};

/**
 * @description Validates a gift card redemption code and selected user.
 * @param {object} formData - Redemption form values.
 * @param {object|null} giftCardInfo - Matched gift card details.
 * @param {object|null} userInfo - Matched user details.
 * @returns {object} Field-specific validation errors.
 */
export const validateRedeemGiftCardForm = (
  formData,
  giftCardInfo,
  userInfo
) => {
  const errors = {};
  if (!formData.code?.trim()) errors.code = "Gift card code is required";
  else if (!giftCardInfo) errors.code = "Invalid or expired gift card code";
  if (!formData.userId?.trim()) errors.userId = "User is required";
  else if (!userInfo) errors.userId = "Please select a valid user";
  return errors;
};

/**
 * @description Extracts the best available message from an API or JavaScript error.
 * @param {Error|object} error - Error to inspect.
 * @param {string} fallback - Message used when the error has none.
 * @returns {string} Error message.
 */
export const getMessage = (error, fallback) =>
  error?.response?.data?.meta?.message ||
  error?.response?.data?.message ||
  error?.message ||
  fallback;

/**
 * @description Classifies a video value as an upload, supported embed, or external link.
 * @param {string} value - Video data URL or remote URL.
 * @returns {object|null} Display type and source, or null for empty input.
 */
export const getVideoDisplay = (value) => {
  if (typeof value !== "string" || !value.trim()) return null;
  const url = value.trim();
  if (url.startsWith("data:video/")) return { type: "file", src: url };
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "").toLowerCase();
    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1);
      if (id)
        return {
          type: "embed",
          src: `https://www.youtube-nocookie.com/embed/${id}`,
        };
    }
    if (
      ["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)
    ) {
      const id =
        parsed.searchParams.get("v") ||
        parsed.pathname.match(/\/(?:embed|shorts)\/([^/]+)/)?.[1];
      if (id)
        return {
          type: "embed",
          src: `https://www.youtube-nocookie.com/embed/${id}`,
        };
    }
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const id = parsed.pathname.match(/\d+/)?.[0];
      if (id)
        return { type: "embed", src: `https://player.vimeo.com/video/${id}` };
    }
    if (/\.(mp4|webm|ogg|mov)(?:$|\?)/i.test(parsed.pathname + parsed.search))
      return { type: "file", src: url };
  } catch {
    return null;
  }
  return { type: "link", src: url };
};

/**
 * @description Displays a recent timestamp relatively and an older timestamp as a date.
 * @param {string|Date} timestamp - Time to format.
 * @returns {string} Relative time, formatted date, or Unknown.
 */
export const formatRelativeTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "Unknown";
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  return formatDateTime(date);
};

/**
 * @description Loads an image file as a bitmap, falling back to an HTML image element.
 * @param {File} file - Image file to load.
 * @returns {Promise<ImageBitmap|HTMLImageElement>} Decoded image.
 */
const loadImageBitmap = async (file) => {
  if (typeof createImageBitmap === "function") return createImageBitmap(file);
  const objectUrl = URL.createObjectURL(file);
  try {
    return await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () =>
        reject(new Error("The selected image could not be read."));
      image.src = objectUrl;
    });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
};
/**
 * @description Encodes a canvas as a WebP blob at the requested quality.
 * @param {HTMLCanvasElement} canvas - Canvas to encode.
 * @param {number} quality - WebP quality setting.
 * @returns {Promise<Blob>} Encoded WebP blob.
 */
const canvasToBlob = (canvas, quality) =>
  new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) =>
        blob
          ? resolve(blob)
          : reject(new Error("The selected image could not be compressed.")),
      "image/webp",
      quality
    )
  );
/**
 * @description Resizes and compresses an image to a WebP blob.
 * @param {Blob} blob - Blob to read.
 * @returns {Promise<Blob>} Compressed image blob.
 */
/**
 * @description Resizes and recompresses an image to a WebP blob under a byte limit.
 * @param {File} file - Image file to compress.
 * @param {object} options - Size, byte, quality, and input limits.
 * @returns {Promise<Blob>} Compressed WebP blob.
 */
export const compressImageToBlob = async (
  file,
  {
    maxWidth,
    maxHeight,
    maxBytes,
    quality = 0.84,
    maxInputBytes = 25 * 1024 * 1024,
  }
) => {
  if (!file?.type?.startsWith("image/"))
    throw new Error("Choose a valid image file.");
  if (file.type === "image/gif")
    throw new Error(
      "GIF files are not supported. Choose a JPEG, PNG, or WebP image."
    );
  if (file.size > maxInputBytes)
    throw new Error("The selected image must be 25 MB or smaller.");
  const bitmap = await loadImageBitmap(file);
  try {
    const scale = Math.min(
      1,
      maxWidth / bitmap.width,
      maxHeight / bitmap.height
    );
    let width = Math.max(1, Math.round(bitmap.width * scale));
    let height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context)
      throw new Error("Image compression is not available in this browser.");
    let currentQuality = quality;
    for (let attempt = 0; attempt < 16; attempt += 1) {
      canvas.width = width;
      canvas.height = height;
      context.clearRect(0, 0, width, height);
      context.drawImage(bitmap, 0, 0, width, height);
      const compressedBlob = await canvasToBlob(canvas, currentQuality);
      if (compressedBlob.size <= maxBytes) return compressedBlob;
      if (currentQuality > 0.56)
        currentQuality = Math.max(0.56, currentQuality - 0.08);
      else {
        width = Math.max(1, Math.round(width * 0.85));
        height = Math.max(1, Math.round(height * 0.85));
        currentQuality = quality;
      }
    }
    throw new Error(
      "Could not compress this image enough. Try a smaller image."
    );
  } finally {
    bitmap.close?.();
  }
};
