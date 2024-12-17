import { useState } from "react";
import { IoMdClose,IoMdAdd } from "react-icons/io";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: " How do I order a product?",
      answer:
        "Browse our collection, select your preferred product, upload necessary details (like photos), and complete the payment to confirm your order",
    },
    {
      question: " How can I book a session?",
      answer:
        "Select your desired session, provide your details, choose a time slot, upload any required materials, and confirm your booking by completing the payment",
    },
    {
      question: " Is Cash on Delivery (COD) available?",
      answer:
        "No, we currently do not offer COD",
    },
    {
      question: "Can I return a product?",
      answer: "Yes, it has inside pockets for added convenience.",
    },
    {
      question: "Are refunds available?",
      answer: "Refunds are processed only for eligible returns. For custom-made products, refunds are not applicable unless the item is damaged.",
    },
    {
      question: "What should I do if I don't receive my order?",
      answer: "Please contact us immediately at +91 87485 87956, and we will assist you in resolving the issue.",
    },
    {
      question: "How long does it take to deliver a product?",
      answer: "Orders are typically delivered within 7 to 10 business days.",
    },
    {
      question: "Are the sessions recorded?",
      answer: "Yes, for online sessions, recorded access is provided for lifetime use.",
    },
    {
      question: "What materials are included in the session kits?",
      answer: "All required materials are delivered to your doorstep prior to the session, along with vendor details for future purchases.",
    },
    {
      question: "Can I request a custom theme for my order?",
      answer: "Absolutely! If you don’t find the theme you’re looking for, we can create a customized miniature based on your preferences.",
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach us via WhatsApp at 98748 87458 or call +91 87485 87956 for assistance.",
    },
    
        
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto">
      <div className="lg:w-[90%] w-full mx-auto mt-10 p-5 lg:p-0">
        <h2 className="lg:text-3xl text-lg font-bold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-center md:text-base text-sm text-gray-600 mb-8">
        Everything you need to know about our services
        </p>
        {/* Main FAQ Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          // style={{ gridAutoRows: "minmax(50px, auto)" }} // Base height for each FAQ item
        >
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-lg lg:p-5 p-3 transition-all duration-300 ${
                    openIndex === index ? "bg-gray-50" : "bg-white"
              }`}
              style={{
                gridRow: openIndex === index ? "span 2 " : "auto", // Dynamically span 2 rows for the selected FAQ
              }}
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="font-medium md:text-base text-sm">{faq.question}</h3>
                <button className="md:text-2xl text-xl font-bold">
                  {openIndex === index ? <IoMdClose/> : <IoMdAdd/>}
                </button>
              </div>
              {openIndex === index && (
                <div className="lg:mt-4 mt-1 md:text-sm text-xs ">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;