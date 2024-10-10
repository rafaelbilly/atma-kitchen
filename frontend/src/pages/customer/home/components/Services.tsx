import ServiceItem from "./ServiceItem";

import { CalendarClock, CircleDollarSign, Truck } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: Truck,
      title: "Delivery",
      description:
        "Get your favourite treats delivered to your doorstep in a jiffy, so you can enjoy them fully fresh and warm.",
      details: [
        "Two types of delivery: in-store and third-party delivery services",
        "Delivery with third-party must be arranged by the customer",
        "Delivery fees and time vary depending on location and distance",
        "Real-time tracking available to monitor delivery status",
      ],
    },
    {
      icon: CalendarClock,
      title: "Pre-Order",
      description:
        "Order your favourite treats in advance and have them ready for pick-up or delivery at your convenience.",
      details: [
        "Pre-ordering available for all products",
        "Pre-ordering must be done at least 2 days in advance",
        "Pre-ordering available for pick-up and delivery",
        "Real-time tracking available to monitor order status",
      ],
    },
    {
      icon: CircleDollarSign,
      title: "Promo Points",
      description:
        "Earn points with every purchase and redeem them for discounts on your next order, making every purchase more rewarding.",
      details: [
        "Earn point with every purchase with minimum purchase of Rp10.000",
        "Points can be redeemed for discounts on next purchase",
        "Double points for every purchase on your birthday",
      ],
    },
  ];
  return (
    <div className="max-w-7xl mx-auto text-center my-20 px-4 sm:px-8 lg:px-24">
      <h5 className="font-serif text-3xl text-black font-medium">
        AWESOME SERVICES
      </h5>
      <p className="text-sm md:text-lg font-light text-gray-500">
        Elevating convenience to extraordinary heights with our stellar
        services, simplifying your life one step at a time.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-4">
        {services.map((service, index) => (
          <ServiceItem key={index} {...service} />
        ))}
      </div>
    </div>
  );
}
