export enum State {
    Initial = 'INITIAL',
    OfficeAcceptStart = 'OFFICE_ACCEPT_START',
    OfficeAcceptEnd = 'OFFICE_ACCEPT_END',
    ForemanAcceptStart = 'FOREMAN_ACCEPT_START',
    ForemanAcceptEnd = 'FOREMAN_ACCEPT_END',
    CheckerAcceptStart = 'CHECKER_ACCEPT_START',
    CheckerAcceptEnd = 'CHECKER_ACCEPT_END',
    ForkliftWithdrawStart = 'FORKLIFT_WITHDRAW_START',
    ForkliftWithdrawEnd = 'FORKLIFT_WITHDRAW_END',
    CheckerApproveStart = 'CHECKER_APPROVE_START',
    CheckerApproveEnd = 'CHECKER_APPROVE_END',
    ForemanApproveStart = 'FOREMAN_APPROVE_START',
    ForemanApproveEnd = 'FOREMAN_APPROVE_END',
    OfficeApproveStart = 'OFFICE_APPROVE_START',
    OfficeApproveEnd = 'OFFICE_APPROVE_END',
    Done = 'DONE',
}

export enum GateState {
    Free = 'FREE',
    Occupied = 'OCCUPIED',
    OutOfService = 'OUT_OF_SERVICE',
}
