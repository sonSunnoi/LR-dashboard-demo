import { fakerTH as faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import { range } from 'lodash-es'

import { Order } from '../models'

export const MOCK_ORDERS: Order[] = range(4)
    .map((num) => ({
        id: num + 1,
        orderId: faker.string.numeric({ length: 10 }),
        customerName: faker.person.fullName(),
        staffName: faker.person.fullName(),
        supervisorName: faker.person.fullName(),
        updatedAt: faker.date
            .between({
                from: dayjs().subtract(2, 'hour').format(),
                to: dayjs().format(),
            })
            .toISOString(),
        vehicleType: faker.vehicle.type(),
    }))
    .sort((item1, item2) =>
        dayjs(item1.updatedAt).isSame(dayjs(item2.updatedAt))
            ? 0
            : dayjs(item1.updatedAt).isBefore(dayjs(item2.updatedAt))
              ? 1
              : -1,
    )
