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

// Define the structure for a payment source
export interface PaymentSource {
  paymentMethodId: string;
  paymentName: string;
}

// Define the structure for each payment type
export interface PaymentType {
  paymentSources: PaymentSource[];
  paymentType: string;
}

// Define the payload structure
export interface PaymentPayload {
  listPayment: PaymentType[];
}

// Define the main API response type
export interface GetListPaymentMehtodType {
  message: string;
  payload: PaymentPayload;
  result: number;
}

// Define the structure for a single transaction
export interface Transaction {
  amount: number;
  paymentId: string;
  statusRecon: boolean;
  transactionSource: string;
  fileName: string;
}

// Define the payload structure
export interface PaymentTransactionPayload {
  branchId: string;
  statusRecon: boolean;
  submitStatus: number;
  transactionDate: string;
  transactionList: Transaction[];
}

// Define the main API response type
export interface PaymentTransactionResponse {
  message: string;
  payload: PaymentTransactionPayload;
  result: number;
}

export interface PostReportDto {
  amountPos: number;
  branch: string;
  inAggregator: string;
  paymentMethod: string;
  statusInBank: string;
  transDate: string; // Format tanggal: YYYY-MM-DD
  transId: string;
  transTime: string; // Format waktu: HH:mm:ss
}

export interface PostReportDtoPayload {
  diff: number;
  postReportDtos: PostReportDto[];
  totalAgg: number;
  totalData: number;
  totalPos: number;
}

export interface ReportResponseType {
  message: string;
  payload: PostReportDtoPayload;
  result: number;
}

export interface LoginResponse {
  token: string;
  status: number;
  user: string;
  result: string;
}

// Transaction Interface
export interface DashboardTransaction {
  transactionSource: string;
  amount: number;
  paymentId: string;
}

// Payload Interface
export interface DashboardPayload {
  branchId: string;
  transactionList: DashboardTransaction[];
  allGross: number;
  allNet: number;
}

// Main Response Interface
export interface DashboardResponseApi {
  result: number;
  message: string;
  payload: DashboardPayload;
}
