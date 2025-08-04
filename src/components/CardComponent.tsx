// CardComponent.jsx
import Image from "next/image";


interface CardComponentProps {
  imageSrc: string | null;  // Accepts either a string, a static import, or null
  heading?: string;
  iconSrc?: string | null;
}
export default function CardComponent({
  imageSrc,
  heading,
  iconSrc,

}: CardComponentProps) {


  return (
    <div className="relative rounded-lg shadow-md bg-white overflow-hidden">



      {
        imageSrc && <Image
          className="w-full h-[227px] object-cover object-center rounded-lg sm:h-[250px]"
          src={imageSrc }
          alt={heading || "card image"}
          width={500}
          height={500}
        />

      }


      <div className="absolute inset-0 flex items-end p-3 bg-gradient-to-b from-transparent via-transparent to-black/40 rounded-lg">
        <div className="relative w-full p-2 rounded-lg backdrop-blur-[9.3px] bg-white/20">
          <span className="pointer-events-none absolute -top-1.5 -left-1.5 -right-1.5 -bottom-1.5 border-2 border-yellow-400 rounded-lg"></span>
          <div className="flex items-center justify-between">
            <h3 className="text-white m-0 font-mulish font-medium">{heading}</h3>
            {/* Desktop Icon */}
            {iconSrc && (
              <Image
                className="hidden lg:block relative -top-7 right-2 w-9 h-11"
                src={iconSrc }
                alt="Desktop Icon"
                width={36}
                height={45}
              />
             )}
          </div>
        </div>
      </div>
    </div>
  );
}