"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeStateForClient = exports.initializeServerStore = void 0;
const store_1 = require("@store/store");
const authSlice_1 = require("@store/authSlice");
const isSerializable = (value) => {
    if (value === null || value === undefined) {
        return true;
    }
    const type = typeof value;
    if (type === 'string' || type === 'number' || type === 'boolean') {
        return true;
    }
    if (Array.isArray(value)) {
        return value.every(isSerializable);
    }
    if (type === 'object') {
        if (value instanceof Function ||
            value instanceof Symbol ||
            value instanceof BigInt ||
            value instanceof Date ||
            (typeof HTMLElement !== 'undefined' && value instanceof HTMLElement)) {
            return false;
        }
        return Object.keys(value).every(key => isSerializable(value[key]));
    }
    return false;
};
const cleanStateForSerialization = (state) => {
    if (state === null || state === undefined) {
        return state;
    }
    const type = typeof state;
    if (type === 'string' || type === 'number' || type === 'boolean') {
        return state;
    }
    if (Array.isArray(state)) {
        return state.map(cleanStateForSerialization);
    }
    if (type === 'object') {
        if (state instanceof Date) {
            return state.toISOString();
        }
        const cleaned = {};
        for (const [key, value] of Object.entries(state)) {
            if (isSerializable(value)) {
                cleaned[key] = cleanStateForSerialization(value);
            }
            else {
                console.warn(`Фильтруем несериализуемое свойство "${key}":`, value);
                cleaned[key] = null;
            }
        }
        return cleaned;
    }
    console.warn(`Фильтруем несериализуемое значение:`, state);
    return null;
};
const validateSerializedState = (state) => {
    if (state === null || state === undefined) {
        console.warn('Состояние пустое');
        return false;
    }
    if (typeof state !== 'object') {
        console.warn('Состояние не является объектом:', typeof state);
        return false;
    }
    if (state.auth) {
        const { auth } = state;
        if (typeof auth !== 'object') {
            console.warn('auth не является объектом:', typeof auth);
            return false;
        }
    }
    return true;
};
const initializeServerStore = async (req) => {
    var _a;
    console.log('🔄 Инициализация серверного Redux store...');
    const serverStore = store_1.store;
    try {
        const hasAuthCookie = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.includes('authCookie');
        if (hasAuthCookie) {
            console.log('📥 Обнаружена авторизационная cookie, загружаем данные пользователя...');
            await serverStore.dispatch((0, authSlice_1.fetchUser)());
            console.log('✅ Данные пользователя загружены');
        }
        else {
            console.log('🔓 Пользователь не авторизован');
        }
    }
    catch (error) {
        console.warn('⚠️ Ошибка при предзагрузке данных:', error);
    }
    const initialState = serverStore.getState();
    if (!initialState || typeof initialState !== 'object') {
        console.error('❌ Некорректное состояние store:', initialState);
        throw new Error('Некорректное состояние Redux store');
    }
    console.log('🏁 Серверный store инициализирован');
    console.log('📊 Структура состояния:', Object.keys(initialState));
    if (initialState.auth) {
        console.log('👤 Auth state:', {
            isAuthenticated: initialState.auth.isAuthenticated,
            isLoading: initialState.auth.isLoading,
            hasUser: !!initialState.auth.user
        });
    }
    return {
        store: serverStore,
        initialState
    };
};
exports.initializeServerStore = initializeServerStore;
const serializeStateForClient = (state) => {
    console.log('🔄 Начинаем сериализацию состояния...');
    try {
        if (!validateSerializedState(state)) {
            console.warn('⚠️ Состояние невалидно, используем fallback');
            return JSON.stringify({ auth: { user: null, isLoading: false, isAuthenticated: false } });
        }
        console.log('🧹 Очищаем состояние от несериализуемых данных...');
        const cleanState = cleanStateForSerialization(state);
        if (!validateSerializedState(cleanState)) {
            console.warn('⚠️ Очищенное состояние невалидно, используем fallback');
            return JSON.stringify({ auth: { user: null, isLoading: false, isAuthenticated: false } });
        }
        const serializedState = JSON.stringify(cleanState);
        console.log('✅ Состояние успешно сериализовано');
        console.log('📊 Размер сериализованного состояния:', serializedState.length, 'символов');
        return serializedState;
    }
    catch (error) {
        console.error('❌ Ошибка при сериализации состояния:', error);
        const fallbackState = {
            auth: {
                user: null,
                isLoading: false,
                isAuthenticated: false
            }
        };
        console.log('🔄 Используем fallback состояние');
        return JSON.stringify(fallbackState);
    }
};
exports.serializeStateForClient = serializeStateForClient;
//# sourceMappingURL=renderer.js.map