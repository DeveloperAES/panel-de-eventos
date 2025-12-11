import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";

export default function Loader() {
  const { loading } = useContext(LoadingContext);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full"></div>
    </div>
  );
}
