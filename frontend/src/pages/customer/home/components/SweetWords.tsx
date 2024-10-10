import Stars from "./Stars";

type SweetWordsProps = {
  content: string;
  author?: string;
};

export default function SweetWords(props: SweetWordsProps) {
  const author = props.author || "TOM TALLY";
  return (
    <div className="bg-cover bg-texture h-72 flex flex-col items-center justify-between py-8 xl:py-12 px-6 xl:px-72 text-center text-white ">
      <Stars count={5} />
      <h6 className="font-serif text-4xl italic">"{props.content}"</h6>
      <p className="text-sm font-extralight uppercase">- {author}</p>
    </div>
  );
}
