interface CompanyContract  {
  no: string;
  issue_date: string;
}

  export interface CompanyPhoto  {
  url: string | undefined;
  name: string;
  filepath: string;
  thumbpath: string;
  createdAt: string;
}

interface Organization  {
  id: string;
  contactId: string;
  name: string;
  shortName: string;
  businessEntity: string;
  contract: Contract;
  type: string[];
  status: string;
  photos: Photo[];
  createdAt: string;
  updatedAt: string;
}

interface OrganizationContact  {
  createdAt: string;
  email: string;
  firstname: string;
  id: string;
  lastname: string;
  phone: string;
  updatedAt: string;
}

 interface DropdownOption  {
  name: string;
  id: number;
}
