import { Clock, Star } from "lucide-react";

type ServiceCardProps = {
  title: string;
  description: string;
  price: number;
  duration: string;
  isNegotiable: boolean;
};

export default function ServiceCard({
  title,
  description,
  price,
  duration,
  isNegotiable,
}: ServiceCardProps) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex justify-between">
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {duration}
        </span>
        {isNegotiable ? (
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
            Negociável
          </span>
        ) : (
          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
            Não negociável
          </span>
        )}
      </div>

      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

      <div className="flex justify-between items-center">
        <span className="font-bold">R$ {price.toFixed(2)}</span>
        <button className="text-sm text-primary hover:underline">Ver</button>
      </div>
    </div>
  );
}