
const pesoArgentino = Intl.NumberFormat('es-AR', {
    style: "currency",
    currency: "ARS",
});

const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
}

const formatDate = (date) => {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/');
}

const formatStores = (arrayOfStores) => (
    arrayOfStores.map((store) => {
        store.active = store.active ? 'Sí' : 'No'
        store.currentBalance = pesoArgentino.format(store.currentBalance)
        store.lastSale = formatDate(new Date(store.lastSale))

        return store
    })
)


module.exports = formatStores;