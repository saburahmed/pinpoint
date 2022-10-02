import { useToasts } from "react-toast-notifications";

const useToast = () => {
  const { addToast }: any = useToasts();

  const error = (message: any) => {
    addToast(message, { appearance: "error", autoDismiss: true });
  };

  const success = (message: any) => {
    addToast(message, { appearance: "success", autoDismiss: true });
  };

  return { error, success, addToast };
};

export default useToast;
