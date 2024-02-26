import { HydrationBoundary } from '@tanstack/react-query'

import { usePrefetchGatesQuery } from '../queries/gates'

import GateList from './GateList'

const RightPanel = async () => {
    const { state } = await usePrefetchGatesQuery()

    return (
        <HydrationBoundary state={state}>
            <GateList />
        </HydrationBoundary>
    )
}

export default RightPanel
