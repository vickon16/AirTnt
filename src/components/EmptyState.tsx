"use client";

import { useRouter } from "next/navigation";

import Button from "./ui/Button";
import Heading from "./Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  resetLabel? : string;
  showReload? : boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  resetLabel = "Remove all filters",
  showReset,
  showReload,
}) => {
  const router = useRouter();

  return (
    <div
      className="h-[60svh] flex flex-col gap-2 justify-center items-center"
    >
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button variant="outline" onClick={() => router.push("/")}>
            {resetLabel}
          </Button>
        )}
        {showReload && (
          <Button onClick={() => window.location.reload()}>
            Reload
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
