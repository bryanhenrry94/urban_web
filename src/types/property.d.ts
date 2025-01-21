import { UrbanizationAPI } from "./urbanization";

export type Property = {
  urbanizationId: string;
  unitType: string;
  unitNumber: string;
  electronicInvoiceEnabled: boolean;
  residents: {
    name: string;
    subname: string;
    identification: string;
    email: string;
    phoneNumber?: string;
    emergencyContact?: string;
    notes?: string;
  }[];
  ownerBillingInfo?: {
    nameOrBusinessName?: string;
    taxId?: string;
    billingAddress?: string;
    email?: string;
    phoneNumber?: string;
  };
};

export interface PropertyAPI {
  _id: string;
  urbanizationId: UrbanizationAPI;
  unitType: string;
  unitNumber: string;
  electronicInvoiceEnabled: boolean;
  residents: {
    name: string;
    subname: string;
    identification: string;
    email: string;
    phoneNumber?: string;
    emergencyContact?: string;
    notes?: string;
  }[];
  ownerBillingInfo?: {
    nameOrBusinessName?: string;
    taxId?: string;
    billingAddress?: string;
    email?: string;
    phoneNumber?: string;
  };
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}
