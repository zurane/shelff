const DelModal = (props) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className=" bg-slate-100  rounded p-7 flex items-center justify-center">
        <div>
          <div className="leading-8">
          <h4 className="text-md font-semibold">Delete the recipe item?</h4>
          <p className="text-sm">This action is irreversable</p>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={props.delete} className="bg-red-500 hover:bg-red-600 text-white px-10 py-1 rounded-full">
              Delete
            </button>
            <button onClick={props.cancel} className="bg-gray-500 hover:bg-gray-600 text-white px-10 py-1 rounded-full">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DelModal;
