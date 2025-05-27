import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-2 text-sm text-gray-500">加载房间列表...</p>
      </div>
    </div>
  );
}