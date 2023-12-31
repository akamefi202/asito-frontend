import {PATHS} from "../../utils/constants";

const {EMPLOYEES, CERTIFICATES, NOTIFICATIONS, DEPARTMENTS, ROLES, PREFERENCES, MYCOMPANY} = PATHS

export const USER_ROLES = {
    TEST: {
        key: 'TEST',
        access: [
            EMPLOYEES.INDEX, EMPLOYEES.CREATE, EMPLOYEES.EDIT, EMPLOYEES.SHOW,
            CERTIFICATES.INDEX, CERTIFICATES.CREATE, CERTIFICATES.EDIT, CERTIFICATES.SHOW,
            DEPARTMENTS.INDEX, DEPARTMENTS.CREATE, DEPARTMENTS.EDIT, DEPARTMENTS.SHOW,
            ROLES.INDEX, ROLES.CREATE, ROLES.EDIT, ROLES.SHOW,
            NOTIFICATIONS.INDEX,
            MYCOMPANY.INDEX, MYCOMPANY.EDIT,
            PREFERENCES
        ]
    },
    PLANER: {
        key: 'PLANER',
        access: [
            EMPLOYEES.INDEX, EMPLOYEES.CREATE, EMPLOYEES.EDIT, EMPLOYEES.SHOW,
            NOTIFICATIONS.INDEX,
            CERTIFICATES.INDEX, CERTIFICATES.SHOW,
            DEPARTMENTS.INDEX, DEPARTMENTS.SHOW,
            ROLES.INDEX, ROLES.SHOW,
            PREFERENCES
        ]
    },
    CLIENT: {
        key: 'CLIENT',
        access: [
            ROLES.INDEX, ROLES.CREATE, ROLES.EDIT, ROLES.SHOW,
            DEPARTMENTS.INDEX, DEPARTMENTS.CREATE, DEPARTMENTS.EDIT, DEPARTMENTS.SHOW,
            CERTIFICATES.INDEX, CERTIFICATES.CREATE, CERTIFICATES.EDIT, CERTIFICATES.SHOW,
            EMPLOYEES.INDEX, EMPLOYEES.SHOW,
            NOTIFICATIONS.INDEX,
            MYCOMPANY.INDEX, MYCOMPANY.EDIT,
            PREFERENCES
        ]
    },
    EMPLOYEE: {
        key: 'EMPLOYEE',
        access: [
            EMPLOYEES.SHOW
        ]
    }
    // ISSUER: {
    //     key: 'ISSUER',
    //     access: [
    //         CERTIFICATES.INDEX, CERTIFICATES.CREATE, CERTIFICATES.EDIT, CERTIFICATES.SHOW,
    //         NOTIFICATIONS.INDEX,
    //         MYCOMPANY.INDEX, MYCOMPANY.EDIT,
    //         PREFERENCES
    //     ]
    // }
}
