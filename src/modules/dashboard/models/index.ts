import { Id } from './common'

export interface CompanyEntity {}

export interface Vehicle {}

export interface Entry {
    id: Id
    vehicle?: Vehicle
    reasonOfVisit: string
    transactionType: string
}

export interface Order {
    id: Id
    orderId: string
    staffName: string
    supervisorName: string
    customerName: string
    vehicleType: string
    updatedAt: string // timestamp
}

export interface Gate {
    id: Id
    displayName: string
    orderId: string
    staffName: string
    supervisorName: string
    updatedAt: string // timestamp
}
