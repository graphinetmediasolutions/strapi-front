import CardComponent from "@/components/CardComponent";

type Media = {
  url: string;
};

type SeekCardItem = {
  icon: Media;
  image: Media;
  title: string;
  description: string | null;
};

type Section = {
  id: string;
  mainHeading: string;
  leftSubHeading: string;
  rightSubHeading: string;
  SeekCard: SeekCardItem[];
};

type Props = {
  section: Section;
};

export default function WhatDoYouSeekSection({ section }: Props) {

    console.log("WhatDoYouSeekSection Data:", section);
  return (
    <section className="py-8 max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-2">{section.mainHeading}</h2>
        <div className="flex justify-between mb-6">
          <span className="font-semibold text-gray-700">{section.leftSubHeading}</span>
          <span className="font-semibold text-gray-700">{section.rightSubHeading}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {section.SeekCard.map((card , index) => (
            <CardComponent
              // keyValue={index}
              key={index}
              imageSrc={card.image?.url}
              heading={card.title}
              iconSrc={card.icon?.url}
              // Add content/handleShow if needed
            />
          ))}
        </div>
      </div>
    </section>
  );
}