interface Contract {
  no: string;
  issue_date: string;
}

interface Photo {
  name: string;
  filepath: string;
  thumbpath: string;
  createdAt: string;
}

interface Company {
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

interface Contact {
  createdAt: string;
  email: string;
  firstname: string;
  id: string;
  lastname: string;
  phone: string;
  updatedAt: string;
}

interface Option {
  name: string;
  id: number;
}
