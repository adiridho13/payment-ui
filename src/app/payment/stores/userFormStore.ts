// stores/useFormStore.ts
import { create } from 'zustand';

type FormData = {
    username: string;
    email: string;
    phone: string;
    notes: string;
};

type FormStore = FormData & {
    setFormData: (data: FormData) => void;
};

export const useFormStore = create<FormStore>((set) => ({
    username: '',
    email: '',
    phone: '',
    notes: '',
    setFormData: (data) => set(data),
}));
