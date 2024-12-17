import React, { useState } from "react";

const Terms = () => {
  const [terms, setTerms] = useState("terms");

  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row gap-5 lg:w-[80%] items-start justify-center  md:p-0 text-[#213454] ">
        <div className="lg:w-[40%] lg:flex flex-col p-5  py-10 w-full pt-28 md:pt-36  md:space-y-7 bg-black space-y-5">
          <div className="flex md:justify-center">
            <img
              src="https://ik.imagekit.io/cjureug40/Saran%20castle%20%20logo.png?updatedAt=1733905567440"
              className="md:w-36 w-24"
              alt="Saran Castle"
            />
          </div>
          <div className="space-y-2 md:space-y-5 md:text-base text-sm flex flex-col font-medium text-white lg:h-screen ">
            <h1
              className={`cursor-pointer p-3 rounded-md border border-primary ${
                terms === "terms"
                  ? "opacity-100   bg-primary    "
                  : "opacity-65  border-primary  "
              }`}
              onClick={() => setTerms("terms")}
            >
              Terms and Conditions
            </h1>
            <h1
              className={`cursor-pointer p-3 rounded-md border  border-primary ${
                terms === "privacy"
                  ? "opacity-100 bg-primary     "
                  : "opacity-65 border border-primary "
              }`}
              onClick={() => setTerms("privacy")}
            >
              Privacy Policy
            </h1>
            <h1
              className={`cursor-pointer p-3 rounded-md border border-primary ${
                terms === "refund"
                  ? "opacity-100 bg-primary   "
                  : "opacity-65 border border-primary "
              }`}
              onClick={() => setTerms("refund")}
            >
              Cancellation/Refund Policy
            </h1>
          </div>
        </div>

        {/* Conditionally render the content */}
        <div className="lg:w-[60%] lg:mx-0 w-[90%] mx-auto  space-y-5 flex justify-center items-center py-10 md:mt-32">
          {terms === "terms" && (
            <div className="space-y-5">
              {/* <div className="md:text-2xl text-lg   space-y-2  ">
                <h1 className="font-medium">Terms and Conditions</h1>
                <hr className="border-[0.2rem] border-[#213454] w-[10%] ml-1" />
                <p className="opacity-75 md:text-base text-sm">
                  At Saran Castle, we offer high-quality miniature clay resin
                  products and online workshops on crafting these products. By
                  purchasing from our website or enrolling in our workshops, you
                  agree to the following terms:
                </p>
              </div>
              <div className="space-y-5">
                <div className="space-y-1">
                  <h1 className="md:text-xl text-lg font-medium">Payment</h1>
                  <p className="md:text-base text-sm opacity-75">
                    Full payment is required at the time of purchase for both
                    products and workshops. For workshops, a confirmation email
                    with details will be sent after payment.
                  </p>
                </div>
                <div className="space-y-1">
                  <h1 className="md:text-xl text-lg font-medium">
                    Maintenance
                  </h1>
                  <p className="md:text-base text-sm opacity-75">
                    Our products are carefully crafted, and proper care is
                    essential to maintain their quality. Follow the provided
                    instructions for best results. Workshop support is available
                    during sessions, with materials accessible for a limited
                    time after the session.
                  </p>
                </div>
                <div className="space-y-1">
                  <h1 className="md:text-xl text-lg font-medium">
                    Client Responsibilities
                  </h1>
                  <p className="md:text-base text-sm opacity-75">
                    Customers must provide accurate shipping and contact details
                    to ensure timely delivery of products. Handle all products
                    with care and notify us immediately of any delivery issues.
                    For workshops, participants should join on time, ensure they
                    have all necessary tools and materials, and check their
                    devices and internet connection to participate fully.
                  </p>
                </div>
                <div className="space-y-1">
                  <h1 className="md:text-xl text-lg font-medium">Ownership</h1>
                  <p className="md:text-base text-sm opacity-75">
                    Ownership of purchased products transfers to the customer
                    upon delivery and is strictly for personal use. Any
                    reproduction, replication, or resale of designs without
                    written consent from Saran Castle is prohibited. All
                    workshop materials, including recordings, instructions, and
                    techniques, remain the intellectual property of Saran Castle
                    and cannot be shared, distributed, or used for commercial
                    purposes without prior approval.
                  </p>
                </div>
              </div> */}

<h2 class="font-medium text-xl sm:text-lg md:text-2xl lg:text-3xl">Terms and Conditions</h2>

<div>
<h3 class="font-medium text-lg sm:text-base md:text-xl ">Payment Confirmation</h3>
<p class="text-base sm:text-sm md:text-base">Once payment is made, it is confirmed, and no refunds will be given.</p>
</div>
<div>

<h3 class="font-medium text-lg sm:text-base md:text-xl">Class Access</h3>
<p class="text-base sm:text-sm md:text-base">A link to access the class will be shared after payment. Keep the link private and do not share it with others.</p>
</div>

<div>
<h3 class="font-medium text-lg sm:text-base md:text-xl ">Non-Transferable</h3>
<p class="text-base sm:text-sm md:text-base">Your payment and class access cannot be transferred to someone else.</p>
</div>

<div>
<h3 class="font-medium text-lg sm:text-base md:text-xl">Class Rules</h3>
<p class="text-base sm:text-sm md:text-base">You must follow all the instructions during the class. Misbehavior can result in removal without a refund.</p>
</div>

            </div>
          )}

          {terms === "privacy" && (
            // <div className="space-y-5">
            //   <div className="md:text-xl text-lg space-y-2">
            //     <h1 className="font-medium">Privacy Policy</h1>
            //     <hr className="border-[0.2rem] border-[#213454] w-[10%] ml-1" />
            //     <p className="opacity-75 md:text-base text-sm">
            //       At Saran Castle, your privacy is our priority. We collect your
            //       personal details (such as name, email, address, and payment
            //       information) to process your orders, provide workshop access,
            //       and deliver our services effectively.
            //     </p>
            //   </div>
            //   <div className="space-y-5">
            //     <div className="space-y-1">
            //       <h1 className="md:text-xl text-lg font-medium">
            //         Data Security
            //       </h1>
            //       <p className="md:text-base text-sm opacity-75">
            //         We take data protection seriously. Your information is
            //         stored securely on a dedicated server and protected with
            //         advanced security measures to prevent unauthorized access.
            //       </p>
            //     </div>
            //     <div className="space-y-1">
            //       <h1 className="md:text-xl text-lg font-medium">Data Use</h1>
            //       <p className="md:text-base text-sm opacity-75">
            //         Your personal information is used solely to complete your
            //         transactions and provide services, such as shipping products
            //         and hosting workshops. We do not sell, rent, or share your
            //         data with third parties, except when necessary (e.g.,
            //         payment processors or delivery services)..
            //       </p>
            //     </div>
            //     <div className="space-y-1">
            //       <h1 className="md:text-xl text-lg font-medium">Retention</h1>
            //       <p className="md:text-base text-sm opacity-75">
            //         We retain your data for as long as needed to fulfill orders,
            //         conduct workshops, and comply with legal requirements. Once
            //         your data is no longer required, it will be securely
            //         deleted.
            //       </p>
            //     </div>
            //     <div className="space-y-1">
            //       <h1 className="md:text-xl text-lg font-medium">
            //         User Rights
            //       </h1>
            //       <p className="md:text-base text-sm opacity-75">
            //         You have the right to access, update, or request the
            //         deletion of your personal information at any time.
            //       </p>
            //     </div>
            //   </div>
            // </div>
            <div className="space-y-5">
              <h2 class="font-medium text-xl sm:text-lg md:text-2xl lg:text-3xl">Privacy Policy</h2>

<div>
<h3 class="font-medium text-lg sm:text-base md:text-xl ">Data Collection</h3>
<p class="text-base sm:text-sm md:text-base">We collect only basic details like your name, email, and payment information.</p>
</div>
<div>

<h3 class="font-medium text-lg sm:text-base md:text-xl">Data Security</h3>
<p class="text-base sm:text-sm md:text-base">We keep your personal information safe and secure.</p>
</div>

<div>
<h3 class="font-medium text-lg sm:text-base md:text-xl ">Data Usage</h3>
<p class="text-base sm:text-sm md:text-base">Your information is used to share class links and updates only.</p>
</div>


            </div>
          )}

          {terms === "refund" && (
            // <div className="space-y-5">
            //   <div className="md:text-xl text-lg space-y-2">
            //     <h1 className="font-medium">Cancellation/Refund Policy</h1>
            //     <hr className="border-[0.2rem] border-[#213454] w-[10%] ml-1" />
            //     <p className="opacity-75 md:text-base text-sm">
            //       At Saran Castle, we strive to provide the best products and
            //       workshops. However, we understand that cancellations may occur
            //       under certain circumstances.
            //     </p>
            //   </div>
            //   <div className="space-y-5">
            //     <div className="space-y-1">
            //       <h1 className="md:text-xl text-lg font-medium">
            //         Cancellation
            //       </h1>
            //       <p className="md:text-base text-sm opacity-75">
            //         Cancellations for products are allowed only before shipping.
            //         For workshops, cancellations can be made up to 48 hours
            //         before the session. Once products are shipped or the
            //         workshop cancellation period has passed, no cancellations or
            //         rescheduling will be accepted.
            //       </p>
            //     </div>
            //     <div className="space-y-1">
            //       <h1 className="md:text-xl text-lg font-medium">Refunds</h1>
            //       <p className="md:text-base text-sm opacity-75">
            //         Refunds for eligible product cancellations will be processed
            //         within 3-4 working days, provided the product has not been
            //         shipped. For workshops, refunds will be issued for
            //         cancellations made within the permitted timeframe. No
            //         refunds will be provided for delivered products, damaged
            //         items excluded, or for workshop no-shows or late
            //         cancellations..
            //       </p>
            //     </div>
            //   </div>
            // </div>
            <div className="space-y-5">
            <h2 class="font-medium text-xl sm:text-lg md:text-2xl lg:text-3xl">Cancellation and Refund Policy</h2>

<div>
<h3 class="font-medium text-lg sm:text-base md:text-xl ">No Refund</h3>
<p class="text-base sm:text-sm md:text-base">Once you make the payment, no refund will be provided</p>
</div>
<div>

<h3 class="font-medium text-lg sm:text-base md:text-xl">Class Cancellation</h3>
<p class="text-base sm:text-sm md:text-base">If we cancel the class, we will reschedule it or provide alternate arrangements.</p>
</div>

<div>
<h3 class="font-medium text-lg sm:text-base md:text-xl ">No Attendance</h3>
<p class="text-base sm:text-sm md:text-base">If you miss the class, no refund or reschedule will be given.</p>
</div>
<div>
<h3 class="font-medium text-lg sm:text-base md:text-xl ">Payment Issues</h3>
<p class="text-base sm:text-sm md:text-base">If there is a payment issue, contact us, and we will help resolve it.</p>
</div>


          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terms;
