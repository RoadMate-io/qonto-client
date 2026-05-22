# qonto-client 🚀

A modern, fully-typed TypeScript client library tailored for the [Qonto Business API](https://developers.qonto.com/). 

This package provides a seamless and intuitive way to integrate Qonto's banking features directly into your Node.js applications, covering everything from fetching bank accounts, managing beneficiaries, interacting with transactions, virtual limits/cards rules, to generating invoices.

## Features ✨

*   **Fully Typed:** Leverage extensive TypeScript definitions to benefit from excellent editor autocompletion and structural confidence.
*   **Promise-based API:** Utilizes standard JavaScript `async/await` patterns driven by `axios`.
*   **Comprehensive Coverage:** Supports nearly the full spectrum of endpoints available in the Qonto API V2 (Organizations, Transactions, Cards, Invoices, Beneficiaries, etc.).
*   **Error Handling:** Bundled `QontoApiError` wrapper cleanly intercepts and details API rejection states.

## Installation 📦

Using npm:
```bash
npm install @roadmate-io/qonto-client
```

Using yarn:
```bash
yarn add @roadmate-io/qonto-client
```

Using pnpm:
```bash
pnpm add @roadmate-io/qonto-client
```

*Note: Environment strictly requires **Node.js >= 20.0.0**.*

## Getting Started 🛠️

To start interacting with Qonto, supply your credentials (login slug and secret key). You can generate these credentials through your Qonto web application in `Settings > Integrations > API`.

```typescript
import { QontoClient } from '@roadmate-io/qonto-client';

const client = new QontoClient({
  login: 'your-organization-slug',
  secretKey: 'your-secret-key'
});

// Fetch current organization details
async function getOrgInfo() {
  try {
    const { organization } = await client.organizations.getCurrent();
    // Knowing your organization 
    console.log(`Connected to: ${organization.name}`);
  } catch (error) {
    console.error(error);
  }
}

getOrgInfo();
```

## Usage Examples 💡

**List Transactions for a Specific Account**
```typescript
const bank_account_id = organization.bank_accounts[0].id;
// You might want to have this bank_account_id in your environments var so you don't have to query organizations
const { transactions, meta } = await client.transactions.list({
  bank_account_id,
  // other filters go here
});

console.log(`Successfully fetched ${transactions.length} transactions!`);
```

**Creating a SEPA Beneficiary**
```typescript
const newBeneficiary = await client.beneficiaries.create({
  beneficiary: {
    name: 'John Doe',
    iban: 'FR7612345678901234567890123',
    bic: 'ABCDEF12'
  }
});
console.log('Beneficiary created:', newBeneficiary);
```

**Locking a Physical/Virtual Card**
```typescript
const suspendedCard = await client.cards.lock('card_uuid_123');
console.log('Card is now temporarily locked.');
```

## Available Resources 📚

The `QontoClient` exposes numerous specific instance resources directly modeled after the API docs.

| Resource | Accessed via | Purpose |
| :--- | :--- | :--- |
| **Organizations** | `client.organizations` | Organization profiles and details. |
| **Bank Accounts** | `client.bankAccounts` | Account retrieving and tracking balances. |
| **Transactions**  | `client.transactions` | Fetch bank operations and transaction details. |
| **Cards** | `client.cards` | Modifying card limits, restrictions, names, pinning, blocking. |
| **Beneficiaries** | `client.beneficiaries`| Managing trusted payees. |
| **SEPA Transfers** | `client.sepaTransfers`| Instantiating outward transfers. |
| **Client Invoices** | `client.clientInvoices`| Generate, fetch, or mark invoices as paid. |
| **Webhooks** | `client.webhooks` | Handle API event notification configurations. |
| **Attachments** | `client.attachments` | Document attachment and invoice receipt linking. |
| ...and more! | _(statements, internalTransfers, etc)_ | Explore `QontoClient` intellisense. |

## Error Handling 🛡️

All non-200 responses are automatically caught and thrown as a `QontoApiError`.

```typescript
import { QontoApiError } from 'qonto-client';

try {
  await client.bankAccounts.retrieve('invalid_id');
} catch (error) {
  if (error instanceof QontoApiError) {
    console.log(`Qonto Error [${error.statusCode}]:`, error.message);
    // Log additional API failure specifics if provided:
    console.log('Details:', error.details); 
  }
}
```

## Contributing 🤝

Contributions, issues, and feature requests are highly welcome! Whether you're adding new API endpoints, fixing bugs, or improving documentation, we appreciate your help in making this library better for everyone.

If you'd like to contribute, please feel free to fork the repository, open an issue, or submit a Pull Request.

**Local Development Setup:**
1. Clone the repository.
2. Ensure you have the right Node version (using `nvm use`).
3. Install dependencies: `npm install`
4. Run tests powered by vitest: `npm run test`
5. Compile TS to JS: `npm run build`

## License
MIT License

## GitHub
You can browse [the code here](https://www.github.com/) 

## Home Page
Visit our [RoadMate](https://roadmate.io) home page 
