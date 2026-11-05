interface AlertProps {
  type: "success" | "error";
  message: string;
}

export const Alert: React.FC<AlertProps> = ({ type, message }: AlertProps) => {
  const alertClass =
    type === "success"
      ? "bg-green-100 border-green-400 text-green-700"
      : "bg-red-100 border-red-400 text-red-700";
  return (
    <div className={`px-4 py-3 rounded relative ${alertClass}`}>{message}</div>
  );
};
