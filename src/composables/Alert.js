import { reactive } from 'vue';

export function Alert() {
  const alertState = reactive({
    isVisible: false,
    message: '',
    type: '',
  });

  const showAlert = (message, type) => {
    alertState.message = message;
    alertState.type = type;
    alertState.isVisible = true;

    setTimeout(() => {
      alertState.isVisible = false;
    }, 3000);
  };

  return {
    alertState,
    showAlert
  };
}