import {
    Tree,
    filter, Rule,
} from '@angular-devkit/schematics';

export function overwriteFilter(host: Tree, overwrite: boolean = false): Rule {
    return filter(path => {
        //console.log(path);
        //console.log(host.exists(path));
        if (overwrite && host.exists(path)) {
            //console.log(`deleting: ${path}`);
            host.delete(path);
            return true;
        } else if (!overwrite && host.exists(path)) {
            //console.log(`filtering: ${path}`);
            return false;
        }
        //console.log(`norming: ${path}`);
        return true;
    })
}

export function deleteFile(host: Tree, path: string) {
    if (host.exists(path)) {
        host.delete(path);
    }
}