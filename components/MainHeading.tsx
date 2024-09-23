import { LucideIcon} from "lucide-react";
import { TextGenerateEffect } from "./ui/text-generate-effect";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon; // Corrected type for icon to accept a component type
  iconColor?: string; // This prop might not be directly usable due to how icons are styled in Lucide
  bgColor?: string;
}

export const MainHeading = ({
  title,
  description,
  icon: Icon,
  iconColor = 'black', // This might need to be handled differently, depending on how Lucide icons accept color
  bgColor = 'transparent',
}: HeadingProps) => {
  return (
    <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
      <div className={`p-2 w-fit rounded-md ${bgColor}`}> {/* Assuming bgColor is a class name */}
        <Icon className={`w-10 h-10 ${iconColor} `} /> {/* iconColor might need to be applied differently */}
      </div>
      <div>
        <h2 className="text-3xl font-bold">
            <TextGenerateEffect words={title} />
         
        </h2>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
};