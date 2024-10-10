type BadgeProps = {
  status: string;
};

export function TransactionStatusBadge({ status }: BadgeProps) {
  if (status === "Completed" || status === "Ready" || status === "Delivered")
    return (
      <span className="badge bg-primary-lighter text-primary rounded-sm px-1 font-medium text-xs">
        {status}
      </span>
    );
  else if (status === "Rejected" || status === "Cancelled")
    return (
      <span className="badge bg-red-100 text-red-950 rounded-sm px-1 font-medium text-xs">
        {status}
      </span>
    );
  else
    return (
      <span className="badge bg-secondary-light text-secondary rounded-sm px-1 font-medium text-xs">
        {status}
      </span>
    );
}
