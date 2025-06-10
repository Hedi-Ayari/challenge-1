
import { useState } from 'react';
import { Invoice } from '@/types/invoice';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { InvoiceDetailsModal } from './InvoiceDetailsModal';

interface InvoiceTableProps {
  invoices: Invoice[];
  onStatusUpdate?: (id: string, status: Invoice['status']) => void;
}

export const InvoiceTable = ({ invoices, onStatusUpdate }: InvoiceTableProps) => {
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    setSelectedInvoices(checked ? invoices.map(inv => inv.id) : []);
  };

  const handleSelectInvoice = (invoiceId: string, checked: boolean) => {
    setSelectedInvoices(prev =>
      checked
        ? [...prev, invoiceId]
        : prev.filter(id => id !== invoiceId)
    );
  };

  const handleRowClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleStatusChange = (invoiceId: string, newStatus: Invoice['paid']) => {
    onStatusUpdate?.(invoiceId, newStatus);
  };

  return (
    <>
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedInvoices.length === invoices.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="font-medium">
                <Button variant="ghost" className="h-auto p-0 font-medium">
                  Date
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="font-medium">Payee</TableHead>
              <TableHead className="font-medium">Description</TableHead>
              <TableHead className="font-medium">Due Date</TableHead>
              <TableHead className="font-medium text-right">
                <Button variant="ghost" className="h-auto p-0 font-medium">
                  Amount
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow
                key={invoice.id}
                className="cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => handleRowClick(invoice)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedInvoices.includes(invoice.id)}
                    onCheckedChange={(checked) =>
                      handleSelectInvoice(invoice.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {formatDate(invoice.createdAt)}
                </TableCell>
                <TableCell className="font-medium">{invoice.vendorName}</TableCell>
                <TableCell className="text-muted-foreground">
                  {invoice.description}
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {formatDate(invoice.dueDate)}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {formatCurrency(invoice.amount)}
                </TableCell>
                <TableCell>
                  <StatusBadge status={invoice.paid} />
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(invoice.id, true)}
                        disabled={invoice.paid === true}
                      >
                        Mark as Paid
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(invoice.id, false)}
                        disabled={invoice.paid === false}
                      >
                        Mark as Open
                      </DropdownMenuItem>
                     
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <InvoiceDetailsModal
        invoice={selectedInvoice}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedInvoice(null);
        }}
        onStatusUpdate={onStatusUpdate}
      />
    </>
  );
};
