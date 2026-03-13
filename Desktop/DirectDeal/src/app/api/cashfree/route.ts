import { NextRequest, NextResponse } from 'next/server';
import { createEscrowOrder } from '@/lib/cashfree';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, amount, customerName, customerPhone, customerEmail, dealId } = body;

    if (!orderId || !amount) {
      return NextResponse.json({ error: 'orderId and amount are required' }, { status: 400 });
    }

    const returnUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://directdeal.in'}/deals/${dealId}?payment=success`;

    const order = await createEscrowOrder({
      orderId,
      amount,
      customerName: customerName || 'DirectDeal User',
      customerPhone: customerPhone || '9999999999',
      customerEmail: customerEmail || 'user@directdeal.in',
      returnUrl,
    });

    return NextResponse.json({
      orderId: order.order_id,
      orderToken: order.payment_session_id,
      paymentUrl: order.payment_link,
    });
  } catch (error: any) {
    console.error('[Cashfree Create Order]', error);
    return NextResponse.json({ error: error.message || 'Failed to create order' }, { status: 500 });
  }
}
