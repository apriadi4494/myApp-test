import { ClientsModule, RmqOptions, Transport } from '@nestjs/microservices';
import { QUEUE_NAME, RABBIT_URL } from '../env/env-config';

export const RmqOptionConfigs: RmqOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [RABBIT_URL],
    queue: QUEUE_NAME,
    noAck: false,
    queueOptions: {
      durable: false,
    },
  },
};

export const RmqClientConfigModule = ClientsModule.register([
  {
    name: 'PUBLISHER',
    transport: Transport.RMQ,
    options: {
      urls: [RABBIT_URL],
      queue: QUEUE_NAME,
      queueOptions: {
        durable: false,
      },
    },
  },
]);
