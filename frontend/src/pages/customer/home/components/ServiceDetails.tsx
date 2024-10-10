type ServiceDetailsProps = {
  title: string;
  description: string[];
};

export default function ServiceDetails(props: ServiceDetailsProps) {
  return (
    <div tabIndex={0} className="collapse collapse-arrow bg-secondary-light">
      <input type="checkbox" />
      <div className="collapse-title text-sm font-normal flex flex-row-reverse items-center py-0">
        <p className="text-gray-500 text-xs">{props.title}</p>
      </div>
      <div className="mt-3 collapse-content text-left">
        <p className="font-medium text-sm ">Details:</p>
        <ul className="list-disc px-4">
          {props.description.map((desc, index) => (
            <li key={index} className="text-gray-500 text-xs text-left">
              {desc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
