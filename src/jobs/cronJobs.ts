import cron from 'node-cron';
import { AppDataSource } from '../config/data-source';
import { Employee } from '../entities/Employee';

AppDataSource.initialize().then(() => {
  console.log('Cron Job: Database connected');

  cron.schedule('*/30 * * * *', async () => {
    console.log('Fetching admin users...');

    try {
      const employeeRepo = AppDataSource.getRepository(Employee);
      const admins = await employeeRepo.find({ where: { role: 'admin' } });

      if (admins.length > 0) {
        console.log(`Found ${admins.length} admin(s):`);
        admins.forEach(admin => {
          console.log(`- ${admin.name} (${admin.email})`);
        });
      } else {
        console.log('No admin users found.');
      }
    } catch (error) {
      console.error('Error in cron job:', error);
    }
  });

  console.log('Admin cron job initialized.');
}).catch(error => console.error('Error connecting to database for cron jobs:', error));
