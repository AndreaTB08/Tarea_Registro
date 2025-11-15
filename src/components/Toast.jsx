export default function Toast({ type, message, onClose }) {
  const styles =
    type === "success"
      ? "bg-green-100 text-green-800 border border-green-300"
      : "bg-red-100 text-red-800 border border-red-300";

  return (
    <div className={`mb-4 p-3 rounded-xl flex justify-between items-center ${styles} shadow-sm`}>
      <span className="font-semibold">{message}</span>
      <button onClick={onClose} className="ml-4 text-sm font-semibold text-blue-600 underline">
        Cerrar
      </button>
    </div>
  );
}
