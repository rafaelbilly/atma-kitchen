type StarsProps = {
  count: number;
};

export default function Stars(props: StarsProps) {
  return (
    <div className="rating rating-sm">
      {[...Array(props.count)].map((_) => (
        <input
          type="radio"
          name="rating-6"
          className="mask mask-star-2 bg-secondary"
          disabled
        />
      ))}
    </div>
  );
}
