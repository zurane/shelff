import { PiArrowLeftThin } from "react-icons/pi";

const BackButton = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mt-5">
        <button
          className="flex items-center gap-1 bg-green-200 shadow-sm py-2 px-3 rounded-full"
          onClick={() => window.history.back()}
        >
          <PiArrowLeftThin className="text-xl text-black rounded" />
          <span className="text-md font-semibold">Back to recipes</span>
        </button>
      </div>
    </div>
  );
};

export default BackButton;
