export const getDigitsFromValue = (value = '') => value.replace(/(-(?!\d))|[^0-9|-]/g, '') || ''

export const toCurrency = (value: string) => {
    const digits = getDigitsFromValue(value)

    const isNegative = digits?.[0] === '-'

    // Agregar puntos cada tres dígitos en la parte entera
    let longitud = digits.length;
    let indice = longitud % 3 === 0 ? 3 : longitud % 3;
    let numeroFormateadoFinal = digits.slice(0, indice);

    while (indice < longitud) {
        numeroFormateadoFinal += '.' + digits.slice(indice, indice + 3);
        indice += 3;
    }

    if (isNegative) {
        numeroFormateadoFinal = numeroFormateadoFinal.slice(1)
    }

    return `${isNegative ? '- ' : ''}$${numeroFormateadoFinal}`
}
