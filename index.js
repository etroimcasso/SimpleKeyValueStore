const KeyValueStore = (maxSize) => {
    const __store = new Map([]);
    let __keyHistory = [];
    const __removeOldestKeyFromHistory = (array) => array.slice(1);
    const storeActions = {
        getStore: () => __store,
        addItem: (key, value) => {
            __keyHistory = [
                ...__keyHistory,
                key
            ];
            if (typeof (maxSize) !== 'undefined') {
                if (__store.size + 1 > maxSize) {
                    const deleteKey = __keyHistory[0];
                    __store.delete(deleteKey);
                    __keyHistory = __removeOldestKeyFromHistory(__keyHistory);
                }
            }
            __store.set(key, value);
        },
        removeItem: (key) => {
            __keyHistory = __keyHistory.filter(item => item !== key);
            __store.delete(key);
        },
        getItem: (key) => __store.get(key),
        clearAllItems: () => {
            __store.clear();
            __keyHistory = [];
        }
    };
    return storeActions;
};
module.exports = KeyValueStore