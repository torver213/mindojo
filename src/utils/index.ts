export const getErrorMessage = (error: any) => {
    let message = error?.message;
    if (error?.response?.data) {
      message = error.response.data;
    }
    return message;
  };