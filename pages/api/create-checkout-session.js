import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "AI Cover Letter Pack (3 uses)",
                        },
                        unit_amount: 500, // $5.00 in cents
                    },
                    quantity: 1,
                },
            ],
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/pricing`,
        });

        res.status(200).json({ url: session.url });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Unable to create session" });
    }
}