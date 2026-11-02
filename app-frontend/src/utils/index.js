export const createApiErrorObj = (errorResponse) => {
    const { status, data, statusText } = errorResponse || {};
    return {
        error: { status, message : data?.error?.message, statusText}
    }
}