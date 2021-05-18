const PUBLIC_INDEX = "/public";
export const PATHS = {
  PUBLIC: {
    INDEX: PUBLIC_INDEX,
    AUTH: {
      SIGN_IN: "/sign-in",
      FORGOT: "/forgot-password",
      SIGN_UP: "/sign-up/:role",
      VERIFICATION: "/verification",
      CHANGE_PASSWORD: "/reset"
    },
    VALIDATION: `${PUBLIC_INDEX}/validation/:id`,
  },
  OPERATORS: {
    INDEX: "/operators",
    CREATE: "/operators/create",
    SHOW: "/operators/show/:id",
    EDIT: "/operators/edit/:id",
  },
  CERTIFICATES: {
    INDEX: "/certificates",
    CREATE: "/certificates/create",
    SHOW: "/certificates/show/:id",
    EDIT: "/certificates/edit/:id",
  },
  NOTIFICATIONS: {
    INDEX: "/notifications",
  },
  CLIENTS: {
    INDEX: "/clients",
    CREATE: "/clients/create",
    SHOW: "/clients/show/:id",
    EDIT: "/clients/edit/:id",
  },
  SITES: {
    INDEX: "/sites",
    CREATE: "/sites/create",
    SHOW: "/sites/show/:id",
    EDIT: "/sites/edit/:id",
  },
  MYCOMPANY: {
    INDEX: "/mycompany",
    EDIT: "/mycompany/edit",
  },
  PREFERENCES: "/preferences",
  HOME: "/",
};

export const ROLE_URL = {
  academy: "ISSUER",
  organization: "CLIENT",
};

export const MESSAGE_TYPES = {
  TEXT: "TEXT",
  IMAGE: "IMAGE",
  CALL: "CALL",
  ORDER: "ORDER",
};

export const TIME_UNITS = {
  YEARS: "years",
  MONTHS: "months",
  DAYS: "days",
  HOURS: "hours",
  MINUTES: "minutes",
};

export const PERMISSIONS = {
  READ: "read",
  WRITE: "write",
};

export const COLORS = {
  C_PRIMARY: "#E60127",
  C_WHITE: "#FFFFFF",
  C_GREY_F3: "#E8EBF3",
  C_GREY_A8: "#A8A8A8",
  C_GREY_6C: "#6C6C6C",
  C_GREY_9C: "#9C9C9C",
  C_GREY_86: "#6F6F86",
  C_GREY_FB: "#FBFBFB",
  C_GREY_35: "#010035",
  C_WARNING: "#FFAA00",
  C_PINK: "#FF7070",
};

export const CAROUSEL_BREAK_POINTS = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 3 },
];
export const CAROUSEL_BREAK_POINTS_4 = [
  { width: 1, itemsToShow: 1 },
  { width: 800, itemsToShow: 2 },
  { width: 1250, itemsToShow: 3 },
  { width: 1500, itemsToShow: 3 },
];

export const POSITIONS = {
  HOZIRONTAL_TOP_LEFT: "HOZIRONTAL_TOP_LEFT",
  HOZIRONTAL_TOP_RIGHT: "HOZIRONTAL_TOP_RIGHT",
  HOZIRONTAL_BOTTOM_LEFT: "HOZIRONTAL_BOTTOM_LEFT",
  HOZIRONTAL_BOTTOM_RIGHT: "HOZIRONTAL_BOTTOM_RIGHT",
  VERTICAL_BOTTOM_LEFT: "VERTICAL_BOTTOM_LEFT",
  VERTICAL_TOP_RIGHT: "VERTICAL_TOP_RIGHT",
  FIRST_DIAGONAL: "FIRST_DIAGONAL",
  SECOND_DIAGONAL: "SECOND_DIAGONAL",
};

export const MAX_NUMBER_TO_SELECT = 4;

export const INITIAL_VALUES = {
  skip: 0,
  take: 5,
};

export const DEFAULT_PAGE_SIZE = 10;
