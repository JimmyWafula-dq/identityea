import { useState } from "react";
import { Helmet } from "react-helmet"; // For schema (install: npm i react-helmet)

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What are custom event wristbands and how do they work?",
      answer: `Custom event wristbands are durable, adjustable bands used for secure access control at festivals, concerts, conferences, and corporate events. They replace tickets or badges, allowing quick scanning or visual verification at entry points.

Made from materials like Tyvek (waterproof paper) or fabric (cloth/silicone), they can include RFID chips for cashless payments or printed logos for branding. To use: Print your design, apply to wrist, and scan/tear at gates. They're cost-effective (starting at $0.10 each) and eco-friendly options available. Perfect for multi-day events to prevent fraud. Learn more about [Tyvek wristbands here](/products/tyvek).`,
    },
    {
      question:
        "What types of event wristbands are available for festivals and concerts?",
      answer: `We offer four main types: 
- **Tyvek Wristbands**: Lightweight, waterproof, tear-resistant—ideal for outdoor festivals ($0.10-$0.25 each).
- **Fabric Wristbands**: Comfortable cloth with secure closures for multi-day concerts ($0.50-$1.50).
- **Silicone Wristbands**: Stretchy, reusable for charity runs or sports events ($0.75-$2).
- **Plastic VIP Wristbands**: Premium, tamper-proof for exclusive access ($1-$3).

Choose based on event duration, weather, and budget. Bulk orders get free design proofs. See our [festival wristband guide](/blog/festival-wristbands).`,
    },
    {
      question: "How do I order custom ID cards or badges for events?",
      answer: `Ordering custom ID cards is simple: 
1. Select type (PVC plastic, magnetic stripe, or RFID).
2. Upload artwork (logo, QR code, attendee info) via our online designer.
3. Choose quantity (min. 100) and add-ons like lanyards or clips.
4. Get free digital proof within 24 hours.
5. Approve and ship in 5-7 days (rush available).

Our ID cards ensure secure credentialing for conferences or trade shows. Prices start at $0.50 each. Compatible with printers for on-site issuance. Check [ID card templates](/products/id-cards).`,
    },
    {
      question:
        "What is the difference between Tyvek and fabric event wristbands?",
      answer: `**Tyvek**: Synthetic paper-like material—affordable, disposable, waterproof, and hard to duplicate. Best for single-use events like one-day festivals. Not reusable.
**Fabric**: Soft woven cloth with plastic closures—comfortable for wrists, reusable, customizable with embroidery. Ideal for multi-day concerts or VIP access.

Tyvek is cheaper for large volumes; fabric offers premium feel. Both are customizable with colors/logos. Not sure? Use our [material comparison tool](/quiz).`,
    },
    {
      question:
        "Can I get custom event wristbands with RFID for cashless payments?",
      answer: `Yes! Our RFID wristbands integrate NFC chips for seamless cashless payments, access control, or loyalty tracking at events. Compatible with Apple Pay/Google Wallet.

Setup: Embed chip during printing, link to your POS system. Secure and contactless—perfect for music festivals or corporate galas. Prices: $1.50-$5 each (volume discounts). We handle encoding. Explore [RFID options](/products/rfid-wristbands).`,
    },
    {
      question:
        "What are the shipping times and costs for bulk event bands and ID cards?",
      answer: `Standard shipping: 5-7 business days (free on orders over $500). Rush: 2-3 days (+20% fee). Costs: $10-$50 flat rate based on weight/location (worldwide).

Track orders via our dashboard. Eco-packaging included. For events, we offer express proofs (24h). Bulk minimum: 100 units. Get a [shipping quote](/quote).`,
    },
    {
      question:
        "Are your event wristbands and ID cards eco-friendly and customizable?",
      answer: `Absolutely—sustainable options include recycled Tyvek (from post-consumer waste) and biodegradable fabric bands. No PVC in eco-lines.

Customization: Full-color printing, sequential numbering, barcodes, or holograms for security. Free design templates and revisions. Aligns with green event standards (e.g., LEED-certified venues). See [sustainable products](/eco).`,
    },
  ];

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      {/* SEO Schema */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <title>
          Event Wristbands FAQ: Custom Tyvek, Fabric & ID Cards | YourSite
        </title>
        <meta
          name="description"
          content="Answers to common questions about custom event wristbands, ID cards, Tyvek vs fabric, RFID options, shipping, and eco-friendly bands for festivals and conferences."
        />
      </Helmet>

      <div className="max-w-5xl md:py-10 mx-auto flex flex-col md:flex-row items-start justify-center gap-8 px-4 md:px-0">
        <img
          className="max-w-sm w-full rounded-xl h-auto"
          src="/images/band1.jpeg"
          alt="Custom event wristbands and ID cards for festivals and conferences"
        />
        <div>
          <h1 className="text-3xl font-semibold">Looking for answers?</h1>

          {faqs.map((faq, index) => (
            <div
              className="border-b border-slate-200 py-4 cursor-pointer"
              key={index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-center justify-between">
                <p className="text-base text-sm">{faq.question}</p>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${
                    openIndex === index ? "rotate-180" : ""
                  } transition-all duration-500 ease-in-out`}
                >
                  <path
                    d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                    stroke="#1D293D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p
                className={`text-xs text-slate-500 transition-all duration-500 ease-in-out max-w-md ${
                  openIndex === index
                    ? "opacity-100 max-h-[300px] translate-y-0 pt-4"
                    : "opacity-0 max-h-0 -translate-y-2"
                }`}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
