
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InvoiceTable } from './InvoiceTable';
import { InvoiceFilters } from './InvoiceFilters';
import { formatCurrency } from '@/utils/formatters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, FileText, Clock, CheckCircle } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { fetchInvoices, updateInvoiceStatus } from '@/store/slices/invoiceSlice';
import { RootState, AppDispatch } from '@/store/store';

export const InvoiceDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { invoices, isLoading, error } = useSelector((state: RootState) => state.invoices);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ status: 'all', dateRange: 'all' });

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesSearch = !searchQuery || 
        invoice.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = filters.status === 'all' || 
        (filters.status === 'paid' && invoice.paid) ||
        (filters.status === 'open' && !invoice.paid);

      return matchesSearch && matchesStatus;
    });
  }, [invoices, searchQuery, filters]);

  const stats = useMemo(() => {
    const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const paidAmount = invoices
      .filter(inv => inv.paid)
      .reduce((sum, inv) => sum + inv.amount, 0);
    const openAmount = invoices
      .filter(inv => !inv.paid)
      .reduce((sum, inv) => sum + inv.amount, 0);

    return {
      total: { count: invoices.length, amount: totalAmount },
      paid: { count: invoices.filter(inv => inv.paid).length, amount: paidAmount },
      open: { count: invoices.filter(inv => !inv.paid).length, amount: openAmount },
      overdue: { count: 0, amount: 0 },
    };
  }, [invoices]);

  const handleStatusUpdate = (id: string, paid: boolean) => {
    dispatch(updateInvoiceStatus({ id, paid }));
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-destructive">Error loading invoices: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AppHeader title="Invoices" onSearch={setSearchQuery} />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total.count}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(stats.total.amount)} total value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.paid.count}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(stats.paid.amount)} received
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.open.count}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(stats.open.amount)} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <DollarSign className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.overdue.count}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(stats.overdue.amount)} overdue
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="px-6">
        <InvoiceFilters onFilterChange={setFilters} />
      </div>

      {/* Invoice Table */}
      <div className="px-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <InvoiceTable
            invoices={filteredInvoices}
            onStatusUpdate={handleStatusUpdate}
          />
        )}
      </div>
    </div>
  );
};
