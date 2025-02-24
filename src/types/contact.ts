export interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

export interface CreateContactDto {
  name: string;
  email: string;
  phone?: string;
}

export interface UpdateContactDto {
  name?: string;
  email?: string;
  phone?: string;
} 