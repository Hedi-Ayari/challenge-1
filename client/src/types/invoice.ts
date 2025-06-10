
export interface Invoice {
  id: string;
  createdAt: string;
  paid: boolean;
  description: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'open' | 'overdue';
  vendorName?: string;
  userId?: string;
}

export interface InvoiceFilters {
  status?: 'all' | 'paid' | 'open' | 'overdue';
  search?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}
