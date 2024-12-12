import { RotatingLines } from "react-loader-spinner";

export default function Spinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-5 z-50">
      <RotatingLines
        strokeColor="green"
        strokeWidth="2"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
}
