import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface StyledButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function StyledButton({
  children,
  onClick,
  className,
  disabled,
}: StyledButtonProps) {
  return (
    <Button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(
        "group relative overflow-hidden rounded-none px-4 py-2 font-mono text-xs font-semibold transition-colors duration-300",
        disabled
          ? "cursor-not-allowed bg-gray-400 text-gray-600 hover:bg-gray-400"
          : "cursor-pointer bg-[#FF6D01] text-white hover:bg-[#FF6D01]",
        className,
      )}
    >
      {!disabled && (
        <span className="absolute inset-0 translate-y-full bg-[#FF5101] transition-transform duration-300 ease-in-out group-hover:translate-y-0" />
      )}

      <span className="relative z-10 flex items-center gap-2 uppercase">
        {children}
      </span>

      {!disabled && (
        <>
          <span className="absolute top-1 left-1 z-10 aspect-square size-1 bg-white/30" />
          <span className="absolute top-1 right-1 z-10 aspect-square size-1 bg-white/30" />
          <span className="absolute bottom-1 left-1 z-10 aspect-square size-1 bg-white/30" />
          <span className="absolute right-1 bottom-1 z-10 aspect-square size-1 bg-white/30" />
        </>
      )}
    </Button>
  );
}
