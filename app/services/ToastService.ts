
import { toast,type ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: "bottom-center",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: false,
  closeButton:false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark"
};

export const ToastService = {
  success: (message: string, options?: ToastOptions) => {
    toast.success(message, { ...defaultOptions, ...options });
  },
  error: (message: string, options?: ToastOptions) => {
    toast.error(message, { ...defaultOptions, ...options });
  },
  info: (message: string, options?: ToastOptions) => {
    toast.info(message, { ...defaultOptions, ...options });
  },
  warn: (message: string, options?: ToastOptions) => {
    toast.warn(message, { ...defaultOptions, ...options });
  },

  default: (message: string, options?: ToastOptions) => {
    toast(message, { ...defaultOptions, ...options });
  },
};
export default ToastService;