import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SCERET_KEY as string);

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    console.log(paymentIntent.client_secret);

    return NextResponse.json({ clientScrete: paymentIntent.client_secret });
  } catch (error: any) {
    console.error(error, "intrenal error");
    // On error, log and return the error message.

    return NextResponse.json(
      { message: `Internal Server Error: ${error}` },
      { status: 500 },
    );
  }
}
