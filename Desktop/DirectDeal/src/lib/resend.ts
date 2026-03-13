import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'noreply@directdeal.in';
const FROM_NAME = 'DirectDeal';

/**
 * Email: Brand → Creator match notification
 */
export async function sendMatchNotification({
  creatorEmail,
  creatorName,
  brandName,
  campaignTitle,
  budget,
  expiresAt,
  dealUrl,
}: {
  creatorEmail: string;
  creatorName: string;
  brandName: string;
  campaignTitle: string;
  budget: number;
  expiresAt: string;
  dealUrl: string;
}) {
  const expiry = new Date(expiresAt).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return resend.emails.send({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: [creatorEmail],
    subject: `🔥 New ₹${budget.toLocaleString('en-IN')} deal waiting for you — ${campaignTitle}`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; border-radius: 16px; overflow: hidden;">
        <div style="background: #1A1A2E; padding: 40px; text-align: center;">
          <h1 style="color: white; font-size: 28px; font-weight: 900; margin: 0; letter-spacing: -0.5px;">
            Direct<span style="color: #005B99;">Deal</span>
          </h1>
          <p style="color: #9ca3af; margin: 8px 0 0; font-size: 14px;">India's First 48-Hour Creator Marketplace</p>
        </div>

        <div style="padding: 40px; background: white;">
          <h2 style="font-size: 22px; font-weight: 900; color: #111827; margin: 0 0 8px;">
            Hi ${creatorName}, you have a new match! 🎯
          </h2>
          <p style="color: #6b7280; margin: 0 0 32px; font-size: 16px;">
            <strong>${brandName}</strong> wants to work with you on their campaign.
          </p>

          <div style="background: #f0f7ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
            <p style="margin: 0; font-size: 13px; font-weight: 700; color: #3b82f6; text-transform: uppercase; letter-spacing: 0.1em;">Campaign Details</p>
            <h3 style="margin: 8px 0; font-size: 20px; font-weight: 900; color: #111827;">${campaignTitle}</h3>
            <p style="margin: 0; font-size: 18px; font-weight: 900; color: #005B99;">Budget: ₹${budget.toLocaleString('en-IN')}</p>
          </div>

          <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 12px; padding: 16px; margin-bottom: 32px; display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 24px;">⏰</span>
            <div>
              <p style="margin: 0; font-size: 13px; font-weight: 700; color: #92400e; text-transform: uppercase;">48-Hour Deadline</p>
              <p style="margin: 4px 0 0; font-size: 15px; font-weight: 600; color: #78350f;">Expires: ${expiry}</p>
            </div>
          </div>

          <a href="${dealUrl}" style="display: block; background: #005B99; color: white; text-align: center; padding: 18px 32px; border-radius: 50px; font-weight: 900; font-size: 16px; text-decoration: none; letter-spacing: 0.5px;">
            VIEW DEAL &amp; ACCEPT →
          </a>
        </div>

        <div style="padding: 24px; text-align: center; background: #f9fafb; border-top: 1px solid #f3f4f6;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">You're receiving this because you're on DirectDeal as a creator.</p>
        </div>
      </div>
    `,
  });
}

/**
 * Email: Creator payout confirmation
 */
export async function sendPayoutConfirmation({
  creatorEmail,
  creatorName,
  amount,
  commissionDeducted,
  campaignTitle,
}: {
  creatorEmail: string;
  creatorName: string;
  amount: number;
  commissionDeducted: number;
  campaignTitle: string;
}) {
  return resend.emails.send({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: [creatorEmail],
    subject: `✅ Payment sent! ₹${amount.toLocaleString('en-IN')} is on its way`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; border-radius: 16px; overflow: hidden;">
        <div style="background: #1A1A2E; padding: 40px; text-align: center;">
          <h1 style="color: white; font-size: 28px; font-weight: 900; margin: 0;">Direct<span style="color:#005B99;">Deal</span></h1>
        </div>
        <div style="padding: 40px; background: white; text-align: center;">
          <div style="width: 80px; height: 80px; background: #d1fae5; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; font-size: 40px;">✅</div>
          <h2 style="font-size: 24px; font-weight: 900; color: #111827;">Payment Released, ${creatorName}!</h2>
          <p style="color: #6b7280;">For your work on: <strong>${campaignTitle}</strong></p>
          <div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 24px 0;">
            <p style="margin: 0; font-size: 13px; font-weight: 700; color: #16a34a; text-transform: uppercase;">You Receive</p>
            <p style="font-size: 36px; font-weight: 900; color: #15803d; margin: 8px 0;">₹${amount.toLocaleString('en-IN')}</p>
            <p style="margin: 0; font-size: 13px; color: #6b7280;">Platform commission deducted: ₹${commissionDeducted.toLocaleString('en-IN')} (10%)</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">Funds should arrive in your bank account within 1-2 business days.</p>
        </div>
      </div>
    `,
  });
}

/**
 * Email: Brand deal closed confirmation
 */
export async function sendDealClosedToBrand({
  brandEmail,
  brandName,
  creatorName,
  campaignTitle,
  amount,
}: {
  brandEmail: string;
  brandName: string;
  creatorName: string;
  campaignTitle: string;
  amount: number;
}) {
  return resend.emails.send({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: [brandEmail],
    subject: `🎉 Deal Closed! ${creatorName} delivered your campaign`,
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; border-radius: 16px; overflow: hidden;">
        <div style="background: #1A1A2E; padding: 40px; text-align: center;">
          <h1 style="color: white; font-size: 28px; font-weight: 900; margin: 0;">Direct<span style="color:#005B99;">Deal</span></h1>
        </div>
        <div style="padding: 40px; background: white;">
          <h2 style="font-size: 24px; font-weight: 900; color: #111827;">Deal Complete, ${brandName}!</h2>
          <p style="color: #6b7280; font-size: 16px;">Your campaign <strong>${campaignTitle}</strong> with <strong>${creatorName}</strong> has been successfully closed.</p>
          <div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 24px 0;">
            <p style="margin: 0; color: #1e40af; font-weight: 700;">Total Campaign Spend: ₹${amount.toLocaleString('en-IN')}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px;">Ready to run your next campaign? The creator pool is waiting.</p>
          <a href="https://directdeal.in/brand/campaigns/new" style="display: block; background: #FF6B2B; color: white; text-align: center; padding: 18px 32px; border-radius: 50px; font-weight: 900; font-size: 16px; text-decoration: none; margin-top: 24px;">
            POST NEXT CAMPAIGN →
          </a>
        </div>
      </div>
    `,
  });
}
