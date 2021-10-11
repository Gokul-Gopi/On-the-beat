import { toast } from 'react-toastify';

const callToastify = (message, success) => {
    const toastStyle = {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
    };

    if (success) {
        return toast.success(message, toastStyle)
    }
    return toast.error(message, toastStyle)
}

export default callToastify