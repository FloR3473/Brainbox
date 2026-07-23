function extractTags(chaineDeCaractere) {

    const stopWords = [
        "comment",
        "pour",
        "avec",
        "dans",
        "sur",
        "les",
        "des",
        "une",
        "un",
        "le",
        "la",
        "de",
        "du",
        "et",
        "en",
        "est",
        "faire",
        "faire",
        "moi",
        "quel",
        "quels",
        "quelle",
        "quelles"
    ];


    return chaineDeCaractere
        .toLowerCase()   // Permet de tout mettre en minuscule
        .normalize("NFD")   //  <--- permet de transformer les lettres avec accents en une lettre sans accent + une marque d'accentuation Unicode
        .replace(/[\u0300-\u036f]/g, "")   // <--- permet de remplacer une marque d'accentuation par rien
        .replace(/[^\w\s-]/g, "")    // <--- permet de remplacer un caractère spécial par rien
        .split(/\s+/)      // Découpe les chaines de caractère là ou il y a des espaces
        .filter(word => word.length > 2)
        .filter(word => !stopWords.includes(word));

}



module.exports = extractTags;