export interface Company {
  identification: string;

  name: string;

  address?: string;

  phone?: string;

  email: string;

  taxId: string;
}

export interface CompanySettings {
  commonAreas: string[];
  currency: string;
  timezone: string;
  notificationPreferences: NotificationPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  inApp: boolean;
}

export interface APICompany {
  _id: string;
  name: string;
  taxId: string;
  address: string;
  phone?: string | null;
  email?: string | null;
  logo?: string | null;
  settings?: CompanySettings | null;
  tenant: string;
  createdAt: string;
  updatedAt: string;
}
