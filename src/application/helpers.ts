export interface ApiErrorResponse {
    status: string | number;
    data: { error: string };
}

export function isApiResponseError(error: unknown): error is ApiErrorResponse {
    return(
        typeof error === 'object' &&
        error != null &&
        'status' in error &&
        'data' in error &&
        typeof (error as any).data.error === 'string'
    )
}
