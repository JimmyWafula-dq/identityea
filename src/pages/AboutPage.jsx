// import Loader from "@/components/kokonutui/loader";
// import Promotional from "@/components/Promotional";
// import Testimonials from "@/components/Testimonials";
// import AppLayout from "@/layout/AppLayout";
// import React from "react";

// const AboutPage = () => {
//   return (
//     <div>
//       <AppLayout>
//         <div className="w-full mx-auto max-w-7xl sm:px-16 px-6 sm:py-8 py-4">
//           <div className="w-full grid grid-cols-2 gap-4">
//             <div className="w-full h-full">
//               <img
//                 src="./images/identityea1.jpg"
//                 className="w-full h-ful rounded-tr-3xl rounded-bl-3xl"
//                 alt=""
//               />
//             </div>
//             <div className="w-full h-full space-y-6">
//               <p className="text-2xl font-semibold">
//                 About Identity<span className="text-red-500">ea</span>{" "}
//               </p>
//               <p className="text-sm text-gray-800">
//                 Lorem, ipsum dolor sit amet consectetur adipisicing elit.
//                 Pariatur soluta assumenda explicabo illo at, distinctio dolore
//                 illum fuga consectetur sint ratione animi? Possimus, ipsam porro
//                 praesentium debitis molestiae expedita a?
//               </p>
//               <p className="text-sm text-gray-800">
//                 Lorem, ipsum dolor sit amet consectetur adipisicing elit.
//                 Pariatur soluta assumenda explicabo illo at, distinctio dolore
//                 illum fuga consectetur sint ratione animi? Possimus, ipsam porro
//                 praesentium debitis molestiae expedita a?
//               </p>
//             </div>
//           </div>

//           {/* testimonials */}
//           <Testimonials />
//           <Promotional />
//         </div>
//       </AppLayout>
//     </div>
//   );
// };

// export default AboutPage;

// src/components/AboutUs.jsx
import React from "react";
import { CheckCircle2, MapPin, Clock, Shield, Users, Zap } from "lucide-react";
import AppLayout from "@/layout/AppLayout";

export default function AboutUs() {
  return (
    <AppLayout>
      <section className="bg-gradient-to-b from-white to-red-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              About <span className="text-red-600">IdentityEA</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Kenya's #1 provider of premium event wristbands, badges, and
              access solutions since 2018.
            </p>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
            {[
              { value: "50K+", label: "Events Powered" },
              { value: "1M+", label: "Wristbands Delivered" },
              { value: "24hr", label: "Express Printing" },
              { value: "4.9★", label: "Customer Rating" },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow"
              >
                <p className="text-3xl md:text-4xl font-bold text-red-600">
                  {stat.value}
                </p>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                From Nairobi with Passion
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in the heart of Nairobi in 2018, IdentityEA was born
                from a simple observation:
                <strong> events in Kenya deserved better access control</strong>
                . Too many organizers struggled with counterfeit tickets, long
                queues, and unreliable wristbands.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We started with one goal:{" "}
                <strong>
                  deliver secure, beautiful, and affordable wristbands
                </strong>
                to every concert, conference, festival, and corporate event
                across East Africa.
              </p>

              <div className="space-y-3">
                {[
                  "Same-day printing in Nairobi",
                  "Nationwide delivery within 48hrs",
                  "Tamper-proof Tyvek & fabric materials",
                  "Custom branding for VIP & sponsors",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/identityea1.jpg"
                  alt="IdentityEA team in Nairobi"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold">Nairobi, Kenya</span>
                  </div>
                  <p className="text-sm opacity-90">Proudly East African</p>
                </div>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
              Our Core Values
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Zap className="w-8 h-8 text-red-600" />,
                  title: "Speed",
                  desc: "24-hour express printing and nationwide delivery. Your event, our urgency.",
                },
                {
                  icon: <Shield className="w-8 h-8 text-red-600" />,
                  title: "Security",
                  desc: "Tamper-evident seals, QR codes, and serialized wristbands to stop fakes.",
                },
                {
                  icon: <Users className="w-8 h-8 text-red-600" />,
                  title: "Partnership",
                  desc: "We work with you — from design to delivery — to make your event shine.",
                },
              ].map((value, i) => (
                <div
                  key={i}
                  className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {value.title}
                  </h4>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Secure Your Next Event?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of event organizers across Kenya who trust
              IdentityEA for seamless access control and stunning branding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="px-8 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition shadow-lg"
              >
                Explore Wristbands
              </a>
              <a
                href="/contact"
                className="px-8 py-3 bg-white text-red-600 font-semibold rounded-full border-2 border-red-600 hover:bg-red-50 transition"
              >
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
