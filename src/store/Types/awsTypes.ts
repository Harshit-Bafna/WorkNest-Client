export interface UploadFilePayload {
    fileDetails: FormData
    // eslint-disable-next-line no-unused-vars
    setLoading: (value: boolean) => void
}

export interface GetSignedUrlPayload {
    key: string
    // eslint-disable-next-line no-unused-vars
    setLoading: (value: boolean) => void
}

export interface DeleteFilePayload {
    key: string
    // eslint-disable-next-line no-unused-vars
    setLoading: (value: boolean) => void
}