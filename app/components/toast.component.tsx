import Toast from 'react-native-toast-message';

interface ToastProps {
    type: string;
    title: string;
    message: string;
}

export default function showToast({ type, title, message }: ToastProps) {
    return (
        Toast.show({
            type: type,
            text1: title,
            text2: message,
            visibilityTime: 3000,
            autoHide: true,
            position: 'bottom',
        })
    );
}