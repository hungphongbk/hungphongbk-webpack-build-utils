declare module "hungphongbk-webpack-build-utils" {
    export function getLocalIdent(localName: string, resourcePath: string): void

    export function cssLoaders(before: Array<any>, options: { modules: boolean, clean: boolean }): Array<any>
}