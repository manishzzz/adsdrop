import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendPayoutConfirmation, sendDealClosedToBrand } from '@/lib/resend';

/**
 * Cashfree Webhook Handler
 * Receives payment events and updates deal status in Supabase
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    console.log('[Cashfree Webhook]', type, data?.order?.order_id);

    // Handle successful payment
    if (type === 'PAYMENT_SUCCESS_WEBHOOK') {
      const orderId = data?.order?.order_id;
      const amount = data?.payment?.payment_amount;

      // Update deal status in Supabase
      const { data: deal, error } = await supabase
        .from('deals')
        .update({
          escrow_payment_id: orderId,
          status: 'content_pending',
        })
        .eq('escrow_payment_id', orderId)
        .select('*, match:matches(*, creator:creators(*), campaign:campaigns(*, brand:brands(*)))')
        .single();

      if (error) {
        console.error('[Webhook] Supabase update error:', error);
      }

      return NextResponse.json({ received: true, dealt: deal?.id });
    }

    // Handle payout success (creator paid)
    if (type === 'TRANSFER_SUCCESS') {
      const transferId = data?.transfer_id;
      // Update deal status to paid
      await supabase
        .from('deals')
        .update({ status: 'paid', completed_at: new Date().toISOString() })
        .eq('escrow_payment_id', transferId);

      return NextResponse.json({ received: true });
    }

    return NextResponse.json({ received: true, unhandled: type });
  } catch (error: any) {
    console.error('[Cashfree Webhook Error]', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
