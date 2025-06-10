
import { Invoice } from '@/types/invoice';

// Mock data for development
const mockInvoices: Invoice[] = [
  {
    id: '1',
    date: '09/11/23',
    payee: 'Amazon',
    description: 'Rental',
    dueDate: '10/31/2023',
    amount: 299.99,
    status: 'paid',
    vendorName: 'Amazon Services',
    userId: 'user1'
  },
  {
    id: '2',
    date: '09/11/23',
    payee: 'Sysco',
    description: 'Rental',
    dueDate: '10/31/2023',
    amount: 228.75,
    status: 'open',
    vendorName: 'Sysco Corporation',
    userId: 'user1'
  },
  {
    id: '3',
    date: '09/11/23',
    payee: 'US Foods',
    description: 'Rental',
    dueDate: '10/31/2023',
    amount: 445.20,
    status: 'paid',
    vendorName: 'US Foods Inc',
    userId: 'user1'
  },
  {
    id: '4',
    date: '09/11/23',
    payee: 'Retail Inc',
    description: 'Rental',
    dueDate: '10/31/2023',
    amount: 156.50,
    status: 'paid',
    vendorName: 'Retail Incorporated',
    userId: 'user1'
  },
  {
    id: '5',
    date: '09/11/23',
    payee: 'Fiber Optics',
    description: 'Rental',
    dueDate: '10/31/2023',
    amount: 150.00,
    status: 'open',
    vendorName: 'Fiber Optics Ltd',
    userId: 'user1'
  },
  {
    id: '6',
    date: '09/11/23',
    payee: 'Ikea',
    description: 'Rental',
    dueDate: '10/31/2023',
    amount: 89.99,
    status: 'paid',
    vendorName: 'IKEA Group',
    userId: 'user1'
  },
  {
    id: '7',
    date: '09/11/23',
    payee: 'Costco',
    description: 'Rental',
    dueDate: '10/31/2023',
    amount: 234.67,
    status: 'paid',
    vendorName: 'Costco Wholesale',
    userId: 'user1'
  },
  {
    id: '8',
    date: '09/11/23',
    payee: 'Office Depot',
    description: 'Rental',
    dueDate: '10/31/2023',
    amount: 67.89,
    status: 'paid',
    vendorName: 'Office Depot Inc',
    userId: 'user1'
  },
  {
    id: '9',
    date: '09/11/23',
    payee: 'Sysco',
    description: 'Rental',
    dueDate: '10/31/2023',
    amount: 350.00,
    status: 'open',
    vendorName: 'Sysco Corporation',
    userId: 'user1'
  }
];

export const fetchInvoices = async (): Promise<Invoice[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockInvoices;
};

export const fetchInvoiceById = async (id: string): Promise<Invoice | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockInvoices.find(invoice => invoice.id === id) || null;
};

export const updateInvoiceStatus = async (id: string, status: Invoice['status']): Promise<Invoice> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const invoiceIndex = mockInvoices.findIndex(invoice => invoice.id === id);
  if (invoiceIndex === -1) {
    throw new Error('Invoice not found');
  }
  mockInvoices[invoiceIndex].status = status;
  return mockInvoices[invoiceIndex];
};
