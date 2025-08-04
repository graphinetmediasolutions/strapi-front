import Image from "next/image";
import { query } from "@/lib/ApolloClient";
import { HOME_PAGE_QUERY_NEW } from "@/graphql/homepage";
import {Locale} from 'next-intl';
// import whatDoyouSeekSection from "@/components/WhatDoYouSeekSection";
import WhatDoYouSeekSection from "@/components/WhatDoYouSeekSection";
import AccordionSection from "@/components/Accordion";

type Props = {
  params: Promise<{locale: Locale}>;
};

type Localization = {
  locale: string;
  // add other properties if needed, e.g.:
  title?: string;
  slug?: string;
};



type Image = {
  url: string;
};

type SeekCard = {
  icon: Image;
  image: Image;
  title: string;
  description: string;
};

type Section = {
  __typename: "ComponentComponentsSectionWhatYouSeek";
  id: string;
  mainHeading: string;
  leftSubHeading: string;
  rightSubHeading: string;
  SeekCard: SeekCard[];
};

type Banner = {
  title: string;
  image: Image;
};

type HomePageLocalization = {
  locale: string;
  banner: Banner;
  sections: Section[];
};

type HomePageData = {
  locale: string;
  banner: Banner;
  localizations: HomePageLocalization[];
  sections: Section[];
};

export default async function Home({ params }: Props) {

  const { locale } = await params;
  const { data } = await query({
    query: HOME_PAGE_QUERY_NEW,
    variables: { locale: locale },
    fetchPolicy: "no-cache",
  });

  console.log("Home Page Data:", data);

 // --- Fallback Logic ---
  // 1. Get the English data, which is always the main entry.
  const englishData: HomePageData | undefined = data?.homePage;

  // 2. Find the data for the requested locale in the 'localizations' array.
const localizedData: HomePageLocalization | undefined = englishData?.localizations.find(
  (localization: Localization) => localization.locale === locale
);

console.log("Localized Data:", localizedData);

  // 3. Use the localized data if it exists, otherwise fall back to English.
  const finalData = localizedData || englishData;



  // Now use `finalData` for all your rendering.
  const banner = finalData?.banner;

const sections = finalData?.sections || [];

console.log("section" , sections);


  return (
    <div>
      <section className="relative w-full h-[400px] flex items-center justify-center bg-gray-900 overflow-hidden">
        {/* Banner Image */}
        {banner?.image?.url && (
          <Image
            src={banner?.image?.url}
            alt={banner.title}
            fill
            className="object-cover opacity-70 z-10"
            priority
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Banner Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {banner?.title}
          </h1>
          {/* {banner?.video?.url && (
            <a
              href={banner.video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
            >
              Watch Video
            </a>
          )} */}
        </div>
      </section>
      {
        sections[0] &&  <WhatDoYouSeekSection section={sections[0]} />
      }
     
      <AccordionSection />
    </div>
  );
}