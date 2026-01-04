export interface User {
  id: number;
  email: string;
  is_active: boolean;
  is_super: boolean;
  full_name?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
}

export interface ApiError {
  detail: string | Array<{ msg: string; loc: string[]; type: string }>;
}
