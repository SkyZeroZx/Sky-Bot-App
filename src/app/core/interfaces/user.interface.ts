export interface User {
  id?: number;
  username: string;
  role: string;
  createdAt?: Date;
  updateAt?: Date;
  name: string;
  fatherLastName: string;
  motherLastName: string;
  status?: string;
  firstLogin?: boolean;
  photo?: string;
  phone?: string;
  dni?: string;
}

export type CreateUser = Omit<
  User,
  'id' | 'createdAt' | 'updateAt' | 'firstLogin' | 'photo'
>;

export type UpdateUser = Omit<User, 'createdAt' | 'updateAt' | 'firstLogin' | 'photo'>;

export type Roles = 'admin' | 'employee' | 'student';

export interface UserReport {
  id: number;
  username: string;
  chargue: string;
  schedule: string;
  role: Roles;
  createdAt: string;
  updateAt: string;
  nombre: string;
  fatherLastName: string;
  motherLastName: string;
  status: string;
}
