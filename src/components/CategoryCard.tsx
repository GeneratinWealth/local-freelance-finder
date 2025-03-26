
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  count: number;
  onClick?: () => void;
}

export const CategoryCard = ({ icon: Icon, title, count, onClick }: CategoryCardProps) => {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="bg-white rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-gray-100">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{count} jobs available</p>
        </div>
      </div>
    </div>
  );
};
