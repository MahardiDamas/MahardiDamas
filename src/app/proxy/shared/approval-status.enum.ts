export enum ApprovalStatus {
  AskApproval = 0,
  Approved = 1,
  Rejected = 2,
}

export function approvalStatus() {
  return Object.keys(ApprovalStatus).filter(
    (type) => isNaN(<any>type) && type !== 'values'
  );
}
