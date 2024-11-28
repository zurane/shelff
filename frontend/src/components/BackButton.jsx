import { PiArrowLeftThin } from "react-icons/pi";

const BackButton = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mt-5">
        <button
          className="flex items-center gap-1 bg-purple-100 shadow-sm py-1 px-3 rounded"
          onClick={() => window.history.back()}
        >
          <PiArrowLeftThin className="text-xl text-purple-950 rounded" />
          <span className="text-md font-semibold">Back to recipes</span>
        </button>
      </div>
    </div>
  );
};

export default BackButton;
