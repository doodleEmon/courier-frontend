interface ImportMetaEnv {
  readonly NEXT_PUBLIC_API_URL: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export const BASE_URL = `${import.meta.env.NEXT_PUBLIC_API_URL}`
export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
export const phoneRegex = /^(\+88)?01[3-9]\d{8}$/