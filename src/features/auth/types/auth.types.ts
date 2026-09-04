export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export interface SecurityAnswers {
  companyName: string;
  role: string;
}

export interface VerificationTokenResponse {
  verificationToken: string;
}

export interface ResetPasswordCredentials {
  verificationToken: string;
  password: string;
  confirmPassword: string;
}