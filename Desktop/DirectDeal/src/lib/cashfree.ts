/**
 * Cashfree Payment Integration
 * Handles escrow order creation and payout to creators
 */

const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID || '';
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY || '';
const CASHFREE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'sandbox';

const CASHFREE_BASE_URL =
  CASHFREE_ENV === 'production'
    ? 'https://api.cashfree.com/pg'
    : 'https://sandbox.cashfree.com/pg';

function getCashfreeHeaders() {
  return {
    'x-client-id': CASHFREE_APP_ID,
    'x-client-secret': CASHFREE_SECRET_KEY,
    'x-api-version': '2023-08-01',
    'Content-Type': 'application/json',
  };
}

/**
 * Create a Cashfree order for brand payment into escrow
 */
export async function createEscrowOrder({
  orderId,
  amount,
  customerName,
  customerPhone,
  customerEmail,
  returnUrl,
}: {
  orderId: string;
  amount: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  returnUrl: string;
}) {
  const payload = {
    order_id: orderId,
    order_amount: amount,
    order_currency: 'INR',
    order_note: 'DirectDeal Campaign Payment - Escrow Hold',
    customer_details: {
      customer_id: orderId,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail,
    },
    order_meta: {
      return_url: returnUrl,
      notify_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://directdeal.in'}/api/cashfree/webhook`,
    },
  };

  const res = await fetch(`${CASHFREE_BASE_URL}/orders`, {
    method: 'POST',
    headers: getCashfreeHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Cashfree order creation failed: ${JSON.stringify(err)}`);
  }

  return res.json();
}

/**
 * Initiate a payout to creator's bank account (after brand approves content)
 * Platform keeps 10% commission automatically.
 */
export async function initiateCreatorPayout({
  transferId,
  creatorName,
  creatorPhone,
  bankAccount,
  ifsc,
  grossAmount,
}: {
  transferId: string;
  creatorName: string;
  creatorPhone: string;
  bankAccount: string;
  ifsc: string;
  grossAmount: number;
}) {
  const COMMISSION_RATE = 0.10;
  const commission = Math.round(grossAmount * COMMISSION_RATE);
  const creatorPayout = grossAmount - commission;

  const payload = {
    transfer_id: transferId,
    transfer_amount: creatorPayout,
    transfer_currency: 'INR',
    transfer_desc: `DirectDeal Creator Payout - Commission Deducted`,
    beneficiary_details: {
      beneficiary_name: creatorName,
      beneficiary_phone: creatorPhone,
      bank_account_number: bankAccount,
      bank_ifsc: ifsc,
    },
  };

  const res = await fetch(`${CASHFREE_BASE_URL}/payouts/transfers`, {
    method: 'POST',
    headers: getCashfreeHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Cashfree payout failed: ${JSON.stringify(err)}`);
  }

  return { ...(await res.json()), commission, creatorPayout };
}

/**
 * Fetch order status from Cashfree
 */
export async function getOrderStatus(orderId: string) {
  const res = await fetch(`${CASHFREE_BASE_URL}/orders/${orderId}`, {
    method: 'GET',
    headers: getCashfreeHeaders(),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch order status');
  }

  return res.json();
}
