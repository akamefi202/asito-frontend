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
  EMPLOYEES: {
    INDEX: "/employees",
    CREATE: "/employees/create",
    SHOW: "/employees/show/:id",
    EDIT: "/employees/edit/:id",
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
  DEPARTMENTS: {
    INDEX: "/departments",
    CREATE: "/departments/create",
    SHOW: "/departments/show/:id",
    EDIT: "/departments/edit/:id",
  },
  ROLES: {
    INDEX: "/roles",
    CREATE: "/roles/create",
    SHOW: "/roles/show/:id",
    EDIT: "/roles/edit/:id",
  },
  MYCOMPANY: {
    INDEX: "/mycompany",
    EDIT: "/mycompany/edit",
  },
  PREFERENCES: "/preferences",
  HOME: "/",
};

export const ROLE_URL = {
  planer: "PLANER",
  client: "CLIENT",
};


export const DEFAULT_PAGE_SIZE = 10;

export const MAX_FILE_SIZE_MB = 10;

export const REQUIRED_FIELD_SYMBOL = String.fromCodePoint(parseInt('002A', 16));
