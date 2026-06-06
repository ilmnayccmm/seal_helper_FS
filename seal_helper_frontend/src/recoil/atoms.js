import { atom } from 'recoil';

export const userState = atom({
    key: 'userState',
    default: null,
});

export const authState = atom({
    key: 'authState',
    default: {
        isAuthenticated: !!localStorage.getItem('token'),
        token: localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user')) || null,
    },
});