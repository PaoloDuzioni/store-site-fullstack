/**
 * Convert numeral ratings values to stars icons
 *
 * @param {number} rating The numeric value to be converted
 * @param {number} max The maximum value of the taring
 */
export default function (rating, max) {
    const rounded = Math.round(rating);
    const empty = max - rounded;
    return '★'.repeat(rounded) + '☆'.repeat(empty);
}
