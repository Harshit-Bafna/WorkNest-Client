export default {
    SignIn: '/sign-in',
    ForgotPassword: '/sign-in/forgot-password',
    ResetPassword: '/reset-password/:token',

    SignUp_Individual: '/sign-up/individual',
    SignUp_Organization: '/sign-up/organization',
    EmailVerificationSent: '/sign-up/email-verification-sent',
    Email_Verification: '/confirmation/:token',

    Dashboard: '/',
    Projects: '/projects',
    Tasks: '/tasks',
    Analytics: '/analytics',
    Notifications: '/notifications',
    
    OrganizationDetails: '/organization/details',
    OrganizationManagementTool: '/organization/management-tool',

    BasicProfile: '/user-profile/basic-info',
    ProfessionalProfile: '/user-profile/professional-info',
    SocialProfile: '/user-profile/basic-social',
    EducationProfile: '/user-profile/education-info',

    GeneralSettings: '/settings/general',
    SessionSettings: '/settings/session',
    ChangePasswordSettings: '/settings/change-passsword',

    Logout: '/logout'
}
