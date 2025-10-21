export type TPayload = { email: string; id: number };
export type TUser = TPayload & Record<string, any>;
