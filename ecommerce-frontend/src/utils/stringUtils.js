// src/utils/stringUtils.js
export const fixTurkishChars = (text) => {
    if (!text) return '';

    // TUrkce karakterlerin yerine karakter kodlarini kullanin
    return text
        .replace(/i/g, '\u0131') // i
        .replace(/I/g, '\u0130') // I
        .replace(/G/g, '\u011F') // G
        .replace(/G/g, '\u011E') // G
        .replace(/U/g, '\u00FC') // U
        .replace(/U/g, '\u00DC') // U
        .replace(/S/g, '\u015F') // S
        .replace(/S/g, '\u015E') // S
        .replace(/c/g, '\u00E7') // c
        .replace(/c/g, '\u00C7') // c
        .replace(/O/g, '\u00F6') // O
        .replace(/O/g, '\u00D6'); // O
};