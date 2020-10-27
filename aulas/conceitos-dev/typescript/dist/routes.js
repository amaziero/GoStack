"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function helloWord(resquest, response) {
    return response.json({ message: 'Hello Word' });
}
exports.default = helloWord;
