
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      password: hashedPassword,
      name: 'Demo User',
    },
  });

  console.log('Created user:', user);

  // Create sample invoices
  const invoices = [
    {
      vendorName: 'Amazon Services',
      amount: 299.99,
      dueDate: new Date('2024-01-31'),
      description: 'AWS Cloud Services',
      paid: true,
      userId: user.id,
    },
    {
      vendorName: 'Sysco Corporation',
      amount: 228.75,
      dueDate: new Date('2024-02-15'),
      description: 'Food Supplies',
      paid: false,
      userId: user.id,
    },
    {
      vendorName: 'US Foods Inc',
      amount: 445.20,
      dueDate: new Date('2024-02-28'),
      description: 'Catering Services',
      paid: true,
      userId: user.id,
    },
    {
      vendorName: 'Office Depot Inc',
      amount: 67.89,
      dueDate: new Date('2024-03-15'),
      description: 'Office Supplies',
      paid: false,
      userId: user.id,
    },
    {
      vendorName: 'IKEA Group',
      amount: 89.99,
      dueDate: new Date('2024-03-31'),
      description: 'Furniture',
      paid: true,
      userId: user.id,
    },
  ];

  for (const invoice of invoices) {
    await prisma.invoice.create({
      data: invoice,
    });
  }

  console.log('Seeded invoices successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
