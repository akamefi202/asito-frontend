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
  academy: "ISSUER",
  organization: "CLIENT",
};


export const DEFAULT_PAGE_SIZE = 10;
