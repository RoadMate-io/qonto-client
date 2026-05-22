/**
 * @file src/index.ts
 * Main entry point for the Qonto TypeScript client library.
 *
 * @example
 * ```ts
 * const client = new QontoClient({ login: 'your-login', secretKey: 'your-secret-key' });
 * const { organization } = await client.organizations.getCurrent();
 * const { transactions } = await client.transactions.list({ bank_account_id: '...' });
 * ```
 */

import { createHttpClient, QontoClientConfig } from './client';

import { OrganizationsResource } from './resources/organizations';
import { MembershipsResource } from './resources/memberships';
import { TransactionsResource } from './resources/transactions';
import { AttachmentsResource } from './resources/attachments';
import { StatementsResource } from './resources/statements';
import { BankAccountsResource } from './resources/bankAccounts';
import { CardsResource } from './resources/cards';
import { SepaTransfersResource } from './resources/sepaTransfers';
import { BeneficiariesResource } from './resources/beneficiaries';
import { SepaDirectDebitResource } from './resources/sepaDirectDebit';
import { InternalTransfersResource } from './resources/internalTransfers';
import { InternationalTransfersResource } from './resources/internationalTransfers';
import { PaymentLinksResource } from './resources/paymentLinks';
import { WebhooksResource } from './resources/webhooks';
import { ClientsResource } from './resources/clients';
import { ClientInvoicesResource } from './resources/clientInvoices';
import { SupplierInvoicesResource } from './resources/supplierInvoices';
import { CreditNotesResource } from './resources/creditNotes';
import { QuotesResource } from './resources/quotes';
import { ProductsResource } from './resources/products';
import { TeamsResource } from './resources/teams';
import { LabelsResource } from './resources/labels';
import { InsuranceContractsResource } from './resources/insuranceContracts';
import { RequestsResource } from './resources/requests';
import { OAuthResource } from './resources/oauth';

// Re-export all types and utilities for single-import convenience
export * from './types';
export * from './client';

// Re-export resource classes for advanced use cases
export {
  OrganizationsResource, MembershipsResource, TransactionsResource,
  AttachmentsResource, StatementsResource, BankAccountsResource,
  CardsResource, SepaTransfersResource, BeneficiariesResource,
  SepaDirectDebitResource, InternalTransfersResource, InternationalTransfersResource,
  PaymentLinksResource, WebhooksResource, ClientsResource,
  ClientInvoicesResource, SupplierInvoicesResource, CreditNotesResource,
  QuotesResource, ProductsResource, TeamsResource, LabelsResource,
  InsuranceContractsResource, RequestsResource, OAuthResource,
};

/**
 * The main Qonto API client.
 * Instantiate once and reuse across your application.
 */
export class QontoClient {
  public readonly organizations: OrganizationsResource;
  public readonly memberships: MembershipsResource;
  public readonly transactions: TransactionsResource;
  public readonly attachments: AttachmentsResource;
  public readonly statements: StatementsResource;
  public readonly bankAccounts: BankAccountsResource;
  public readonly cards: CardsResource;
  public readonly sepaTransfers: SepaTransfersResource;
  public readonly beneficiaries: BeneficiariesResource;
  public readonly sepaDirectDebit: SepaDirectDebitResource;
  public readonly internalTransfers: InternalTransfersResource;
  public readonly internationalTransfers: InternationalTransfersResource;
  public readonly paymentLinks: PaymentLinksResource;
  public readonly webhooks: WebhooksResource;
  public readonly clients: ClientsResource;
  public readonly clientInvoices: ClientInvoicesResource;
  public readonly supplierInvoices: SupplierInvoicesResource;
  public readonly creditNotes: CreditNotesResource;
  public readonly quotes: QuotesResource;
  public readonly products: ProductsResource;
  public readonly teams: TeamsResource;
  public readonly labels: LabelsResource;
  public readonly insuranceContracts: InsuranceContractsResource;
  public readonly requests: RequestsResource;
  public readonly oauth: OAuthResource;

  constructor(config: QontoClientConfig) {
    const http = createHttpClient(config.login, config.secretKey, config.baseURL);
    this.organizations        = new OrganizationsResource(http);
    this.memberships          = new MembershipsResource(http);
    this.transactions         = new TransactionsResource(http);
    this.attachments          = new AttachmentsResource(http);
    this.statements           = new StatementsResource(http);
    this.bankAccounts         = new BankAccountsResource(http);
    this.cards                = new CardsResource(http);
    this.sepaTransfers        = new SepaTransfersResource(http);
    this.beneficiaries        = new BeneficiariesResource(http);
    this.sepaDirectDebit      = new SepaDirectDebitResource(http);
    this.internalTransfers    = new InternalTransfersResource(http);
    this.internationalTransfers = new InternationalTransfersResource(http);
    this.paymentLinks         = new PaymentLinksResource(http);
    this.webhooks             = new WebhooksResource(http);
    this.clients              = new ClientsResource(http);
    this.clientInvoices       = new ClientInvoicesResource(http);
    this.supplierInvoices     = new SupplierInvoicesResource(http);
    this.creditNotes          = new CreditNotesResource(http);
    this.quotes               = new QuotesResource(http);
    this.products             = new ProductsResource(http);
    this.teams                = new TeamsResource(http);
    this.labels               = new LabelsResource(http);
    this.insuranceContracts   = new InsuranceContractsResource(http);
    this.requests             = new RequestsResource(http);
    this.oauth                = new OAuthResource(http);
  }
}

export default QontoClient;