import choose from "../../../assets/images/Choose.png";
import payment from "../../../assets/images/Payment.png";
import placeorder from "../../../assets/images/Place Your Order.png";
import register from "../../../assets/images/register.png";
import { NavWrapper } from "../../../components/Wrapper";

export default function HowToOrder() {
  return (
    <NavWrapper>
      <div className="max-w-7xl mx-auto my-20 px-4">
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
          <li>
            <div className="timeline-start text-end mb-10 mr-20">
              <div className="text-2xl font-black text-primary">
                Register Now to Start Order Items
              </div>
              Lorem ipsum dolor sit amet, sed an dicat sententiae, in has quis
              patrioque mnesarchum, ei fabulas apeirian vel. Vix veniam
              necessitatibus ad.
            </div>
            <div className="timeline-end mb-10 ml-20">
              <img src={register} alt="bakery-1" className="w-96" />
            </div>
          </li>
          <li>
            <div className="timeline-end mb-10 ml-20">
              <div className="text-2xl font-black text-primary">
                Choose Your Favorite Items and Select The Date
              </div>
              Lorem ipsum dolor sit amet, sed an dicat sententiae, in has quis
              patrioque mnesarchum, ei fabulas apeirian vel. Vix veniam
              necessitatibus ad.
            </div>
            <div className="timeline-start mb-10 mr-20">
              <img src={choose} alt="bakery-1" className="w-96" />
            </div>
          </li>
          <li>
            <div className="timeline-start md:text-end mb-10 mr-20">
              <div className="text-2xl font-black text-primary">
                Place Your Order in The Cart or Buy Now
              </div>
              Lorem ipsum dolor sit amet, sed an dicat sententiae, in has quis
              patrioque mnesarchum, ei fabulas apeirian vel. Vix veniam
              necessitatibus ad.
            </div>
            <div className="timeline-end mb-10 ml-20">
              <img src={placeorder} alt="bakery-1" className="w-96" />
            </div>
          </li>
          <li>
            <div className="timeline-end mb-10 ml-20">
              <div className="text-2xl font-black text-primary">
                Go to Checkout Page and Proceed to the Payment
              </div>
              Lorem ipsum dolor sit amet, sed an dicat sententiae, in has quis
              patrioque mnesarchum, ei fabulas apeirian vel. Vix veniam
              necessitatibus ad.
            </div>
            <div className="timeline-start mb-10 mr-20">
              <img src={payment} alt="bakery-1" className="w-96" />
            </div>
          </li>
        </ul>
      </div>
    </NavWrapper>
  );
}
