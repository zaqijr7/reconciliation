export type Branch = {
  branchId: string;
  branchName: string;
};

// Define the structure of the API response
export type GetListBranchType = {
  message: string;
  payload: Branch[];
  result: number;
};
