import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-2 text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}