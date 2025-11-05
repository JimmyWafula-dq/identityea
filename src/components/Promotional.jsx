import { ArrowRight } from "lucide-react";

export default function Promotional() {
  return (
    <div className="flex flex-col w-full md:flex-row items-center justify-around text-sm border border-gray-300 rounded-md m-2 max-w-7xl w-full bg-white">
      <div className="flex flex-col text-center md:text-left items-center md:items-start pt-14 md:p-10">
        <h2 className="md:text-4xl text-2xl font-semibold text-gray-800">
          Don't miss out on the latest trends
        </h2>
        <p className="text-gray-700 mt-2 w-3/4">
          Limited quantities. Once they’re gone, they’re gone.
        </p>

        <div className="flex items-center gap-4 mt-6">
          <button
            aria-label="googlePlayBtn"
            className="active:scale-95 text-white flex flex-row items-center space-x-5 transition-all bg-black rounded-full overflow-hidden p-3"
            type="button"
          >
            Shop Wristbands Now
            <ArrowRight className="w-6 h-6 text-red-500" />
          </button>
        </div>
      </div>

      <img
        className="max-w-[375px] pt-10 md:p-0"
        src="../images/identityea5.png"
        alt="excitedWomenImage"
      />
    </div>
  );
}
