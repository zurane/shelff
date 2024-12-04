import { PiList } from "react-icons/pi";

const AppBarTop = () => {
  return (
    <div className="py-3 px-2 max-w-4xl mx-auto">
      <div className="flex flex-row justify-between items-center ">
        <div className="flex flex-1 items-baseline gap-6">
        <h1 className="text-xl text-purple-500 font-black">D.</h1>
        </div>
        <div>
          <button className="bg-monsoon-200 py-1 px-3 mx-1 rounded">
            <PiList />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppBarTop;
