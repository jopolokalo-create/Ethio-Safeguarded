
import { User, RegistrationStatus, TruckStatus } from './types.ts';
import { store } from './store.ts';

const createTestUsers = () => {
  const users: User[] = [
    {
      id: 'sender-1',
      name: 'Red Cross',
      email: 'sender@example.com',
      role: 'SENDER',
      status: RegistrationStatus.APPROVED,
      organizationDetails: {
        name: 'Red Cross',
        type: 'NGO'
      }
    },
    {
      id: 'driver-1',
      name: 'John Doe',
      email: 'driver@example.com',
      role: 'DRIVER',
      status: RegistrationStatus.APPROVED,
      truckDetails: {
        licensePlate: 'ETH 1234',
        model: 'Ford F-150',
        currentStatus: TruckStatus.READY,
        location: {
          lat: 9.03,
          lng: 38.74
        }
      }
    }
  ];

  store.saveUsers(users);
};

createTestUsers();
