export interface User {
  id: string;
  name: string;
  email: string;
}

export interface WithAuthType {
  user: User | null;
  setUser: (data: User | null) => void;
  loading: boolean;
}
