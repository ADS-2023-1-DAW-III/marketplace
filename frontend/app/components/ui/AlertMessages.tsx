import { toast } from "sonner";
import { CheckCircle2, AlertTriangle } from "lucide-react";

export function SuccessAlert(message: string) {
  toast.success(message, {
    icon: <CheckCircle2 className="text-green-500" />,
    duration: 4000,
  });
}

export function ErrorAlert(message: string) {
  toast.error(message, {
    icon: <AlertTriangle className="text-red-500" />,
    duration: 4000,
  });
}
