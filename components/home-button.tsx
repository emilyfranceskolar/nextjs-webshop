import { Button } from "@/components/ui/button";

type HomeButtonProps = {
  children: React.ReactNode;
  className?: string;
};
export function HomeButton({children, className}: HomeButtonProps) {
  return (
    <Button variant="outline" className={`py-4 px-8 rounded-4xl ${className}`}>
       {children ?? "View All"}
    </Button>
  );
}
