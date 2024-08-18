import {Button} from "@/components/ui/button";

interface EmptyStateProp {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

export default function EmptyState(
  { title, description, buttonText = 'Add', onButtonClick}: EmptyStateProp,
) {
  return (
    <div className="mt-[50px] md:mt-[100px]">
      <div className="flex flex-col items-center gap-1 text-center h-full"><h3
        className="text-2xl font-bold tracking-tight">{title}</h3><p
        className="text-sm text-muted-foreground">{description}</p>
        <Button className="mt-4" onClick={onButtonClick}>{buttonText}</Button>
      </div>
    </div>
  )
}
