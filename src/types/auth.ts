export interface User {
  id: number;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  first_name?: string;
  last_name?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface ApiError {
  detail: string | Array<{ msg: string; loc: string[]; type: string }>;
}
