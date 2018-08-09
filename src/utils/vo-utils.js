"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const ts = require("typescript");
function getVoProperties(host, path, name) {
    const modulePath = path + '/' + name + '.ts';
    const buffer = host.read(modulePath);
    if (buffer === null) {
        throw new schematics_1.SchematicsException(`Cound not read file: ${modulePath}`);
    }
    const sourceText = buffer.toString('utf-8');
    const source = ts.createSourceFile(modulePath, sourceText, ts.ScriptTarget.Latest, true);
    return getParametersBySourceFile(source).map(nameType => {
        return nameType.name;
    });
}
exports.getVoProperties = getVoProperties;
function getParametersBySourceFile(sf) {
    const result = sf.getNamedDeclarations();
    const parameters = [];
    for (let [key, value] of result) {
        for (let i = 0, n = value.length; i < n; i++) {
            key = String(key);
            let node = value[i];
            if (node.kind === ts.SyntaxKind.PropertyDeclaration) {
                if (node.type.kind === ts.SyntaxKind.AnyKeyword) {
                    parameters.push({
                        name: node.name.text,
                        type: 'any'
                    });
                }
                else if (node.type.kind === ts.SyntaxKind.NumberKeyword) {
                    parameters.push({
                        name: node.name.text,
                        type: 'number'
                    });
                }
                else if (node.type.kind === ts.SyntaxKind.StringKeyword) {
                    parameters.push({
                        name: node.name.text,
                        type: 'string'
                    });
                }
                else if (node.type.kind === ts.SyntaxKind.BooleanKeyword) {
                    parameters.push({
                        name: node.name.text,
                        type: 'boolean'
                    });
                }
                else if (node.type.kind === ts.SyntaxKind.SymbolKeyword) {
                    parameters.push({
                        name: node.name.text,
                        type: 'symbol'
                    });
                }
                else if (node.type.kind === ts.SyntaxKind.UndefinedKeyword) {
                    parameters.push({
                        name: node.name.text,
                        type: 'undefined'
                    });
                }
                else if (node.type.kind === ts.SyntaxKind.NeverKeyword) {
                    parameters.push({
                        name: node.name.text,
                        type: 'never'
                    });
                }
            }
        }
    }
    return parameters;
}
//# sourceMappingURL=vo-utils.js.map