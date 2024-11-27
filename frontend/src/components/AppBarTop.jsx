import { PiList } from "react-icons/pi";

const AppBarTop = () => {
  return (
    <div className="py-3 px-3 bg-slate-50  max-w-4xl mx-auto border-b">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-1 items-baseline gap-6">
        <h1 className="text-xl text-purple-500 font-black">D.</h1>
        <ul className="flex flex-row items-center gap-3">
            <li className="text-sm font-bold">Home</li>
        </ul>
        </div>
        <div>
          <button className="bg-purple-100 py-1 px-3 mx-1 rounded">
            <PiList />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppBarTop;
