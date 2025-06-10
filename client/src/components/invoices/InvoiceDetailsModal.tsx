
import { Invoice } from '@/types/invoice';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { FileText, Calendar, Building } from 'lucide-react';

interface InvoiceDetailsModalProps {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate?: (id: string, status: Invoice['paid']) => void;
}

export const InvoiceDetailsModal = ({
  invoice,
  isOpen,
  onClose,
  onStatusUpdate,
}: InvoiceDetailsModalProps) => {
  if (!invoice) return null;

  const handleStatusChange = (newStatus: string) => {
    onStatusUpdate?.(invoice.id, newStatus as Invoice['paid']);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Invoice Details - #{invoice.id}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Amount Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <StatusBadge status={invoice.paid} />
              <div className="text-2xl font-bold">
                {formatCurrency(invoice.amount)}
              </div>
            </div>
           
          </div>

          <Separator />

          {/* Invoice Information Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Building className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Payee</p>
                  <p className="text-lg">{invoice.paid}</p>
                  {invoice.vendorName && (
                    <p className="text-sm text-muted-foreground">
                      {invoice.vendorName}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Description</p>
                  <p className="text-lg">{invoice.description}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Invoice Date</p>
                  <p className="text-lg font-mono">{formatDate(invoice.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Due Date</p>
                  <p className="text-lg font-mono">{formatDate(invoice.dueDate)}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Amount Breakdown */}
          <div className="space-y-3">
            <h3 className="font-medium">Amount Breakdown</h3>
            <div className="bg-muted/30 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono">{formatCurrency(invoice.amount * 0.9)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Tax (10%):</span>
                <span className="font-mono">{formatCurrency(invoice.amount * 0.1)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium text-lg">
                <span>Total:</span>
                <span className="font-mono">{formatCurrency(invoice.amount)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={(e)=>alert("maybe later i can add it but not now ")}>
              Download PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
