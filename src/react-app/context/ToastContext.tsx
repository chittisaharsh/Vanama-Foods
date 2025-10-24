import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

type ToastType = "success" | "error" | "info" | "warning";

export type Toast = {
  id: number;
  message: string;
  type?: ToastType;
};

type ToastContextValue = {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => void;
  removeToast: (id: number) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((ts) => ts.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type?: ToastType) => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setToasts((ts) => [...ts, { id, message, type }]);
      setTimeout(() => removeToast(id), 3000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="px-4 py-2 rounded shadow text-white"
            style={{
              background:
                t.type === "success"
                  ? "#16a34a"
                  : t.type === "error"
                  ? "#dc2626"
                  : t.type === "warning"
                  ? "#f59e0b"
                  : "#111827",
            }}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside a ToastProvider");
  return ctx;
};
