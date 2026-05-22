// src/types/index.ts

// ─── Primitives ──────────────────────────────────────────────────────────────

/** ISO 8601 date-time string, e.g. "2024-01-15T10:30:00.000Z" */
export type ISODateTime = string;

/** ISO 4217 currency code, e.g. "EUR" */
export type CurrencyCode = string;

/** UUID v4 string */
export type UUID = string;

// ─── Shared value objects ─────────────────────────────────────────────────────

/** Monetary amount with currency */
export interface Money {
  /** Amount in cents (e.g. 10050 = €100.50) */
  value: number;
  currency: CurrencyCode;
}

/** Postal address */
export interface Address {
  street_address?: string;
  city?: string;
  zip_code?: string;
  country?: string;
  state?: string;
}

/** Bank account identifiers */
export interface BankAccountDetails {
  iban?: string;
  bic?: string;
  account_number?: string;
  sort_code?: string;
  routing_number?: string;
}

// ─── Pagination ───────────────────────────────────────────────────────────────

/** Pagination metadata returned on list endpoints */
export interface PaginationMeta {
  current_page: number;
  next_page: number | null;
  prev_page: number | null;
  total_pages: number;
  total_count: number;
  per_page: number;
}

/** Generic paginated list response */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/** Generic single-resource response */
export interface SingleResponse<T> {
  data: T;
}

/** Standard API error shape */
export interface ApiError {
  errors: Array<{
    code: string;
    detail: string;
    source?: { pointer?: string; parameter?: string };
  }>;
}

// ─── Common list params ───────────────────────────────────────────────────────

export interface PaginationParams {
  page?: number;
  per_page?: number;
}

// ─── Organization ─────────────────────────────────────────────────────────────

export interface Organization {
  id: UUID;
  slug: string;
  name: string;
  legal_name: string;
  legal_number: string;
  legal_country: string;
  legal_form?: string;
  address?: Address;
  bank_accounts?: BankAccount[];
}

export interface ListOrganizationParams {
  include_external_accounts?: boolean;
}

// ─── Bank Account ─────────────────────────────────────────────────────────────

export type BankAccountStatus = "active" | "closed" | "pending";
export type BankAccountType = "current" | "savings" | "external";

export interface BankAccount {
  id: UUID;
  slug: string;
  name: string;
  iban: string;
  bic: string;
  currency: CurrencyCode;
  balance: number;
  balance_cents: number;
  authorized_balance: number;
  authorized_balance_cents: number;
  status: BankAccountStatus;
  account_type: BankAccountType;
  updated_at: ISODateTime;
  main: boolean;
}

export interface ListBankAccountsParams extends PaginationParams {
  status?: BankAccountStatus;
}

// ─── Membership ───────────────────────────────────────────────────────────────

export type MembershipRole = "owner" | "admin" | "manager" | "employee" | "accountant";

export interface Membership {
  id: UUID;
  first_name: string;
  last_name: string;
  email: string;
  role: MembershipRole;
  status: string;
  avatar_url?: string;
  team_id?: UUID;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface ListMembershipsParams extends PaginationParams {}

export interface CreateMembershipBody {
  first_name: string;
  last_name: string;
  email: string;
  role: MembershipRole;
  team_id?: UUID;
}

// ─── Transaction ──────────────────────────────────────────────────────────────

export type TransactionSide = "credit" | "debit";
export type TransactionStatus = "pending" | "reversed" | "declined" | "completed" | "processing";
export type TransactionOperationType =
  | "transfer"
  | "card"
  | "direct_debit"
  | "income"
  | "qonto_fee"
  | "cheque"
  | "recall";

export interface Transaction {
  id: UUID;
  transaction_id: string;
  amount: number;
  amount_cents: number;
  local_amount: number;
  local_amount_cents: number;
  side: TransactionSide;
  operation_type: TransactionOperationType;
  currency: CurrencyCode;
  local_currency: CurrencyCode;
  label: string;
  settled_at?: ISODateTime;
  emitted_at: ISODateTime;
  updated_at: ISODateTime;
  status: TransactionStatus;
  note?: string;
  reference?: string;
  vat_amount?: number;
  vat_amount_cents?: number;
  vat_rate?: number;
  initiator_id?: UUID;
  card_last_four?: string;
  category?: string;
  attachment_ids: UUID[];
  label_ids: UUID[];
  settled_balance: number
  settled_balance_cents: number
  attachment_lost: boolean
  attachment_required: boolean
  card_last_digits: string
  cashflow_category: CashflowCategory
  cashflow_subcategory: CashflowSubcategory
  subject_type: string
  transfer: Transfer;
  bank_account_id: string;
  is_external_transaction: boolean;
  income?: Income;
  clean_counterparty_name?: any;
  logo?: Logo;
  created_at?: string;
}

export interface Income {
  counterparty_account_number: string
  counterparty_bank_identifier_format: string
  counterparty_account_number_format: string
  counterparty_bank_identifier: string
}

export interface CashflowCategory {
  name: string
}

export interface Logo {}

export interface CashflowSubcategory {
  name: any
}

export interface CashflowCategory {
  name: string
}

export interface Transfer {
  counterparty_account_number: string
  counterparty_account_number_format: string
  counterparty_bank_identifier: string
  counterparty_bank_identifier_format: string
}

export interface ListTransactionsParams extends PaginationParams {
  bank_account_id?: UUID;
  status?: TransactionStatus | TransactionStatus[];
  side?: TransactionSide;
  operation_type?: TransactionOperationType | TransactionOperationType[];
  settled_at_from?: ISODateTime;
  settled_at_to?: ISODateTime;
  emitted_at_from?: ISODateTime;
  emitted_at_to?: ISODateTime;
  sort_by?: string;
  with_attachments?: boolean;
}

// ─── Attachment ───────────────────────────────────────────────────────────────

export type AttachmentType = "invoice" | "receipt" | "other";

export interface Attachment {
  id: UUID;
  created_at: ISODateTime;
  file_name: string;
  file_size: number;
  file_content_type: string;
  url: string;
  type?: AttachmentType;
  probative_attachment?: {
    status: string;
    reason?: string;
  };
}

export interface ListAttachmentsParams extends PaginationParams {}

// ─── Statement ────────────────────────────────────────────────────────────────

export interface Statement {
  id: UUID;
  bank_account_id: UUID;
  iban: string;
  period: string;
  url?: string;
  created_at: ISODateTime;
}

export interface ListStatementsParams extends PaginationParams {
  bank_account_ids?: UUID[];
  ibans?: string[];
  period_from?: string;
  period_to?: string;
  sort_by?: string;
}

// ─── Card ─────────────────────────────────────────────────────────────────────

export type CardStatus = "live" | "paused" | "stolen" | "lost" | "blocked" | "pending_renewal" | "renewed";
export type CardType = "virtual" | "physical" | "flash";

export interface Card {
  id: UUID;
  status: CardStatus;
  card_type: CardType;
  last_four: string;
  expiration_date: string;
  holder_id: UUID;
  holder_name: string;
  bank_account_id: UUID;
  spending_limit?: { amount: number; period: string };
  atm_daily_limit?: number;
  online_payment: boolean;
  international_payments: boolean;
  nfc: boolean;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface ListCardsParams extends PaginationParams {
  holder_id?: UUID;
  status?: CardStatus;
  card_type?: CardType;
}

export interface CreateCardBody {
  card_type: CardType;
  holder_id: UUID;
  bank_account_id: UUID;
  spending_limit?: { amount: number; period: string };
  online_payment?: boolean;
  international_payments?: boolean;
  nfc?: boolean;
}

export interface UpdateCardBody {
  status?: CardStatus;
  spending_limit?: { amount: number; period: string };
  online_payment?: boolean;
  international_payments?: boolean;
  nfc?: boolean;
}

// ─── SEPA Transfer ────────────────────────────────────────────────────────────

export type TransferStatus = "pending" | "processing" | "completed" | "canceled" | "declined";

export interface SepaTransfer {
  id: UUID;
  amount: number;
  amount_cents: number;
  currency: CurrencyCode;
  local_amount: number;
  local_amount_cents: number;
  status: TransferStatus;
  reference?: string;
  beneficiary: {
    id: UUID;
    name: string;
    iban: string;
    bic?: string;
  };
  bank_account_id: UUID;
  emitted_at?: ISODateTime;
  settled_at?: ISODateTime;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface CreateSepaTransferBody {
  amount: number;
  currency?: CurrencyCode;
  reference?: string;
  beneficiary_id?: UUID;
  beneficiary?: {
    name: string;
    iban: string;
    bic?: string;
  };
  bank_account_id: UUID;
  scheduled_date?: string;
}

export interface ListSepaTransfersParams extends PaginationParams {
  status?: TransferStatus;
  bank_account_id?: UUID;
  sort_by?: string;
}

// ─── Internal Transfer ────────────────────────────────────────────────────────

export interface InternalTransfer {
  id: UUID;
  amount: number;
  amount_cents: number;
  currency: CurrencyCode;
  status: TransferStatus;
  debit_bank_account_id: UUID;
  credit_bank_account_id: UUID;
  reference?: string;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface CreateInternalTransferBody {
  amount: number;
  currency?: CurrencyCode;
  debit_bank_account_id: UUID;
  credit_bank_account_id: UUID;
  reference?: string;
}

// ─── International Transfer ───────────────────────────────────────────────────

export interface InternationalTransfer {
  id: UUID;
  amount: number;
  currency: CurrencyCode;
  target_currency: CurrencyCode;
  target_amount: number;
  exchange_rate: number;
  status: TransferStatus;
  reference?: string;
  beneficiary: {
    name: string;
    account_number: string;
    routing_number?: string;
    iban?: string;
    bic?: string;
    address?: Address;
    country: string;
  };
  bank_account_id: UUID;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface CreateInternationalTransferBody {
  amount: number;
  currency: CurrencyCode;
  target_currency: CurrencyCode;
  reference?: string;
  bank_account_id: UUID;
  beneficiary: {
    name: string;
    account_number: string;
    routing_number?: string;
    iban?: string;
    bic?: string;
    address?: Address;
    country: string;
  };
}

// ─── Beneficiary ──────────────────────────────────────────────────────────────

export interface Beneficiary {
  id: UUID;
  name: string;
  iban: string;
  bic?: string;
  currency?: CurrencyCode;
  trusted: boolean;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface CreateBeneficiaryBody {
  name: string;
  iban: string;
  bic?: string;
  currency?: CurrencyCode;
}

export interface ListBeneficiariesParams extends PaginationParams {
  trusted?: boolean;
}

// ─── SEPA Direct Debit ────────────────────────────────────────────────────────

export type DirectDebitStatus = "pending" | "completed" | "failed" | "canceled";

export interface SepaDirectDebitMandate {
  id: UUID;
  unique_mandate_reference: string;
  debtor_name: string;
  debtor_iban: string;
  creditor_name: string;
  creditor_identifier: string;
  status: string;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface SepaDirectDebitCollection {
  id: UUID;
  mandate_id: UUID;
  amount: number;
  amount_cents: number;
  currency: CurrencyCode;
  status: DirectDebitStatus;
  reference?: string;
  collection_date: string;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface CreateDirectDebitCollectionBody {
  mandate_id: UUID;
  amount: number;
  currency?: CurrencyCode;
  reference?: string;
  collection_date: string;
}

// ─── Payment Link ─────────────────────────────────────────────────────────────

export type PaymentLinkStatus = "active" | "expired" | "completed" | "canceled";

export interface PaymentLink {
  id: UUID;
  url: string;
  status: PaymentLinkStatus;
  amount: number;
  amount_cents: number;
  currency: CurrencyCode;
  description?: string;
  reference?: string;
  expires_at?: ISODateTime;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface CreatePaymentLinkBody {
  amount: number;
  currency?: CurrencyCode;
  description?: string;
  reference?: string;
  expires_at?: ISODateTime;
}

export interface ListPaymentLinksParams extends PaginationParams {
  status?: PaymentLinkStatus;
}

// ─── Webhook ──────────────────────────────────────────────────────────────────

export type WebhookStatus = "active" | "inactive";

export interface Webhook {
  id: UUID;
  url: string;
  status: WebhookStatus;
  secret?: string;
  events: string[];
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface CreateWebhookBody {
  url: string;
  events: string[];
  secret?: string;
}

export interface UpdateWebhookBody {
  url?: string;
  events?: string[];
  status?: WebhookStatus;
}

export interface ListWebhooksParams extends PaginationParams {
  status?: WebhookStatus;
}

// ─── Client Invoice ───────────────────────────────────────────────────────────

export type InvoiceStatus = "draft" | "pending" | "paid" | "canceled" | "overdue";

export interface ClientInvoice {
  id: UUID;
  number: string;
  status: InvoiceStatus;
  client_id: UUID;
  issue_date: string;
  due_date?: string;
  amount: number;
  amount_cents: number;
  currency: CurrencyCode;
  vat_amount?: number;
  vat_rate?: number;
  items: InvoiceItem[];
  pdf_url?: string;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface InvoiceItem {
  id?: UUID;
  title: string;
  description?: string;
  quantity: number;
  unit_price: number;
  vat_rate?: number;
  total_amount: number;
}

export interface CreateClientInvoiceBody {
  client_id: UUID;
  issue_date: string;
  due_date?: string;
  currency?: CurrencyCode;
  items: Omit<InvoiceItem, "id" | "total_amount">[];
  vat_rate?: number;
}

export interface ListClientInvoicesParams extends PaginationParams {
  status?: InvoiceStatus;
  client_id?: UUID;
  sort_by?: string;
}

// ─── Supplier Invoice ─────────────────────────────────────────────────────────

export interface SupplierInvoice {
  id: UUID;
  status: InvoiceStatus;
  supplier_name: string;
  amount: number;
  amount_cents: number;
  currency: CurrencyCode;
  due_date?: string;
  issue_date?: string;
  reference?: string;
  attachment_id?: UUID;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface CreateSupplierInvoiceBody {
  supplier_name: string;
  amount: number;
  currency?: CurrencyCode;
  due_date?: string;
  issue_date?: string;
  reference?: string;
  attachment_id?: UUID;
}

export interface ListSupplierInvoicesParams extends PaginationParams {
  status?: InvoiceStatus;
}

// ─── Credit Note ──────────────────────────────────────────────────────────────

export interface CreditNote {
  id: UUID;
  number: string;
  client_id: UUID;
  invoice_id?: UUID;
  amount: number;
  amount_cents: number;
  currency: CurrencyCode;
  issue_date: string;
  status: string;
  pdf_url?: string;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface CreateCreditNoteBody {
  client_id: UUID;
  invoice_id?: UUID;
  amount: number;
  currency?: CurrencyCode;
  issue_date: string;
}

// ─── Client ───────────────────────────────────────────────────────────────────

export type ClientType = "individual" | "company";

export interface Client {
  id: UUID;
  name: string;
  type: ClientType;
  email?: string;
  phone?: string;
  vat_number?: string;
  address?: Address;
  billing_address?: Address;
  currency?: CurrencyCode;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface CreateClientBody {
  name: string;
  type: ClientType;
  email?: string;
  phone?: string;
  vat_number?: string;
  address?: Address;
  currency?: CurrencyCode;
}

export interface ListClientsParams extends PaginationParams {
  type?: ClientType;
}

// ─── Product ──────────────────────────────────────────────────────────────────

export interface Product {
  id: UUID;
  name: string;
  description?: string;
  unit_price: number;
  currency: CurrencyCode;
  vat_rate?: number;
  unit?: string;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface CreateProductBody {
  name: string;
  description?: string;
  unit_price: number;
  currency?: CurrencyCode;
  vat_rate?: number;
  unit?: string;
}

// ─── Quote ────────────────────────────────────────────────────────────────────

export type QuoteStatus = "draft" | "pending" | "accepted" | "rejected" | "expired";

export interface Quote {
  id: UUID;
  number: string;
  status: QuoteStatus;
  client_id: UUID;
  issue_date: string;
  expiry_date?: string;
  amount: number;
  amount_cents: number;
  currency: CurrencyCode;
  items: InvoiceItem[];
  pdf_url?: string;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface CreateQuoteBody {
  client_id: UUID;
  issue_date: string;
  expiry_date?: string;
  currency?: CurrencyCode;
  items: Omit<InvoiceItem, "id" | "total_amount">[];
}

export interface ListQuotesParams extends PaginationParams {
  status?: QuoteStatus;
  client_id?: UUID;
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export interface Team {
  id: UUID;
  name: string;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface CreateTeamBody {
  name: string;
}

// ─── Label ────────────────────────────────────────────────────────────────────

export interface Label {
  id: UUID;
  name: string;
  color?: string;
  parent_id?: UUID;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface CreateLabelBody {
  name: string;
  color?: string;
  parent_id?: UUID;
}

// ─── Insurance Contract ───────────────────────────────────────────────────────

export interface InsuranceContract {
  id: UUID;
  status: string;
  insurance_type: string;
  provider: string;
  premium_amount: number;
  currency: CurrencyCode;
  start_date: string;
  end_date?: string;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

// ─── Request (approval workflow) ─────────────────────────────────────────────

export type RequestStatus = "pending" | "approved" | "declined" | "canceled";
export type RequestType = "transfer" | "card_authorization" | "mileage" | "expense";

export interface ApprovalRequest {
  id: UUID;
  type: RequestType;
  status: RequestStatus;
  requester_id: UUID;
  approver_id?: UUID;
  amount: number;
  amount_cents: number;
  currency: CurrencyCode;
  note?: string;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

export interface ListRequestsParams extends PaginationParams {
  status?: RequestStatus;
  type?: RequestType;
}

// ─── SCA (Strong Customer Authentication) ────────────────────────────────────

export interface ScaChallenge {
  id: UUID;
  status: string;
  expires_at: ISODateTime;
  created_at: ISODateTime;
}

// ─── OAuth 2.0 ────────────────────────────────────────────────────────────────

export interface OAuthTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
}

export interface OAuthTokenBody {
  grant_type: "authorization_code" | "refresh_token" | "client_credentials";
  code?: string;
  redirect_uri?: string;
  refresh_token?: string;
  client_id: string;
  client_secret: string;
}

// ─── E-invoicing ─────────────────────────────────────────────────────────────

export interface EInvoice {
  id: UUID;
  status: string;
  format: string;
  file_url?: string;
  created_at: ISODateTime;
  updated_at: ISODateTime;
}

// ─── Embed Auth Link ─────────────────────────────────────────────────────────

export interface EmbedAuthLink {
  url: string;
  expires_at: ISODateTime;
}