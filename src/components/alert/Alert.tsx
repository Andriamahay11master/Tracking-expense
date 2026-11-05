interface AlertProps {
  appearAlert: boolean;
  type: "success" | "error";
  message: string;
}

export const Alert: React.FC<AlertProps> = ({
  appearAlert,
  type,
  message,
}: AlertProps) => {
  const alertClass =
    type === "success"
      ? "bg-green-100 border-green-400 text-green-700"
      : "bg-red-100 border-red-400 text-red-700";

  const showAlert = appearAlert
    ? "transform translate-x-0"
    : "transform translate-x-full";
  return (
    <div
      className={`px-4 py-3 rounded fixed bottom-4 right-4 z-50 transform translate-x-full transition-transform duration-300 ease-in-out ${alertClass} ${showAlert}`}
    >
      {message}
    </div>
  );
};
