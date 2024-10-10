import { LucideIcon } from "lucide-react";
import ServiceDetails from "./ServiceDetails";

type ServiceItemProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
};

export default function (props: ServiceItemProps) {
  return (
    <div className="py-4 flex flex-col gap-3 bg-secondary-light rounded-md shadow-sm h-fit w-full">
      <props.icon size={50} className="mx-auto text-secondary" />
      <p className="text-black text-xl capitalize font-bold">{props.title}</p>
      <ServiceDetails title={props.description} description={props.details} />
    </div>
  );
}
