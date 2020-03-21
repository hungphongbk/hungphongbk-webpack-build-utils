import incstr from 'incstr';
import process from 'process';
import fs from 'fs'

const files = {};

function sortObj(obj,fn){
    const entries = Object.entries(obj)
    for(let i=0;i<entries.length-1;i++) {
        for (let j = i + 1; j < entries.length; j++) {
            if (!fn(entries[i][1], entries[j][1])) {
                let tmp = entries[i][1];
                entries[i][1] = entries[j][1]
                entries[j][1] = tmp;
            }
        }
    }
        return Object.fromEntries(entries)
}
function sortFiles(){
    const fn = (a,b)=>a.c>b.c
    for(let f in files)
        files[f]=sortObj(files[f],fn)
}

// process.on('exit',()=>{
//     sortFiles()
//     console.log(files)
// })

const generateFn = ()=>incstr.idGenerator({
    // Removed "d" letter to avoid accidental "ad" construct.
    // @see https://medium.com/@mbrevda/just-make-sure-ad-isnt-being-used-as-a-class-name-prefix-or-you-might-suffer-the-wrath-of-the-558d65502793
    // NOTE: allow "d" letter due to combination of UPPERCASES-lowercases
    alphabet: 'abcefghijklmnopqrstuvwxyz0123456789_-'
});

//region CSS Scope Minify
const createUniqueIdGenerator = (id) => {
    const index = {};
    // files[id]={}

    const generateNextId = generateFn()

    return (name,scope=null) => {
        let store=index,generate=generateNextId
        if(scope!==null){
            index[scope]=index[scope]||{__generate:generateFn()}
            store=index[scope]
            generate = index[scope].__generate
        }
        if (store[name]) {
            // files[id][index[name]].c++;
            return store[name];
        }

        let nextId;

        do {
            // Class name cannot start with a number.
            nextId = generate();
        } while (/^[0-9_-]/.test(nextId));

        store[name] = nextId;
        // console.log(`${name} has id = ${index[name]}`);
        // files[id][index[name]]={
        //     i:name,
        //     c:1
        // };

        return store[name];
    };
};

const idLocal = createUniqueIdGenerator('local'), idComponent = createUniqueIdGenerator('component');
const components = {};
const generateScopedName = (localName, resourcePath) => {
    const componentName = resourcePath.split('/').slice(-2).join('/');
    if (!components[componentName]) {
        components[componentName] = true;
        // console.log(componentName[0]+' '+resourcePath);
    }
    if (/^col-/.test(localName))
        return 'col-' + idLocal(localName);
    return idComponent(componentName).toUpperCase() + idLocal(localName,componentName);
};

const getLocalIdent = (context, localIdentName, localName) => generateScopedName(localName, context.resourcePath);
//endregion

const cssLoaders = (before = [], options = {}) => {
    const {modules, clean} = Object.assign({}, {
        modules: false,
        clean: false
    }, options);
    const loaders = [
        {
            loader: "css-loader",
            options: {
                autoprefixer: true,
                minimize: true,
                // localIdentName: isProduction ? '[hash:base64:7]' : '[name]__[local]___[hash:base64:5]',
                getLocalIdent,
                importLoaders: before.length,
                camelCase: 'only',
                modules
            }
        }
    ];
    if (clean) {
        const ieOff = true;

        loaders.push({
            loader: "clean-css-loader",
            options: {
                level: 2,
                inline: false,
                compatibility: {
                    properties: {
                        iePrefixHack: ieOff,
                        ieSuffixHack: ieOff
                    }
                }
            }
        });
        loaders[0].options.importLoaders++;
    }
    loaders.push(...before);
    return loaders;
};

export default {
    getLocalIdent,
    cssLoaders
};
