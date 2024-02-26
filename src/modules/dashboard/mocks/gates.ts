import { fakerTH as faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import { range, sample } from 'lodash-es'

import { Gate } from '../models'
import { GateState } from '../models/state'

export const MOCK_GATES: Gate[] = range(10).map((num) => ({
    id: num + 1,
    displayName: `Gate #${num + 1}`,
    state: sample([GateState.Free, GateState.Occupied]),
    orderId: faker.string.numeric({ length: 10 }),
    updatedAt: faker.date
        .between({
            from: dayjs().subtract(2, 'hour').format(),
            to: dayjs().format(),
        })
        .toISOString(),
    staffName: faker.person.fullName(),
    supervisorName: faker.person.fullName(),
}))
