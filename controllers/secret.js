module.exports.encode = function(password) {
    var encryptedPassword = "",
        original =  "abcdefghijklmnopqrstuvwxyz",
        encrypted = process.env.SECRET || "mhtfgkbpjwerqslniuoxzyvdca",
        i, character;

    for (i = 0; i < password.length; i++) {
        character = encrypted[original.indexOf(password[i].toLowerCase())] || password[i];
        if (password[i] === password[i].toUpperCase()) {
            character = character.toUpperCase();
        }
        encryptedPassword += character;
    }
    return encryptedPassword;
}

module.exports.decode = function(password) {
    var decryptedPassword = "",
        original = process.env.SECRET || "mhtfgkbpjwerqslniuoxzyvdca",
        decrypted =  "abcdefghijklmnopqrstuvwxyz",
        i, character;

    for (i = 0; i < password.length; i++) {
        character = decrypted[original.indexOf(password[i].toLowerCase())] || password[i];
        if (password[i] === password[i].toUpperCase()) {
            character = character.toUpperCase();
        }
        decryptedPassword += character;
    }
    return decryptedPassword;
}