"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
function overwriteFilter(host, overwrite = false) {
    return schematics_1.filter(path => {
        //console.log(path);
        //console.log(host.exists(path));
        if (overwrite && host.exists(path)) {
            //console.log(`deleting: ${path}`);
            host.delete(path);
            return true;
        }
        else if (!overwrite && host.exists(path)) {
            //console.log(`filtering: ${path}`);
            return false;
        }
        //console.log(`norming: ${path}`);
        return true;
    });
}
exports.overwriteFilter = overwriteFilter;
function deleteFile(host, path) {
    if (host.exists(path)) {
        host.delete(path);
    }
}
exports.deleteFile = deleteFile;
//# sourceMappingURL=overwrite-filter.js.map