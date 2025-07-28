import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology, index) => (
        <div
          key={technology.name}
          className="w-28 h-28 group cursor-pointer"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Performance-optimized tech icon display */}
          <div className="relative w-full h-full">
            {/* Background circle with hover effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#915EFF]/20 to-transparent rounded-full group-hover:from-[#915EFF]/40 transition-all duration-300 animate-pulse"></div>

            {/* Icon container */}
            <div className="relative z-10 w-full h-full flex items-center justify-center bg-tertiary rounded-full border border-[#915EFF]/30 group-hover:border-[#915EFF] transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6">
              <img
                src={technology.icon}
                alt={technology.name}
                className="w-16 h-16 object-contain filter group-hover:brightness-110 transition-all duration-300"
                loading="lazy"
              />
            </div>

            {/* Glowing effect on hover */}
            <div className="absolute inset-0 rounded-full bg-[#915EFF]/0 group-hover:bg-[#915EFF]/10 transition-all duration-300 blur-sm"></div>

            {/* Name tooltip */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs text-gray-300 bg-black/50 px-2 py-1 rounded whitespace-nowrap">
                {technology.name}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
