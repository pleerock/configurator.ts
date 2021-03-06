
export class ConfiguratorUtils {

    static unflatten(data: any): any {
        if (Object(data) !== data || Array.isArray(data))
            return data;
        let regex = /\.?([^::\[\]]+)|\[(\d+)\]/g,
            resultholder: any = {};
        for (let p in data) {
            let cur = resultholder,
                prop = "",
                m: any;
            while (m = regex.exec(p)) {
                cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
                prop = m[2] || m[1];
            }
            cur[prop] = data[p];
        }
        return resultholder[""] || resultholder;
    }

    static flatten(data: any): any {
        let result: any = {};
        function recurse (cur: any, prop: any) {
            if (Object(cur) !== cur || (Array.isArray(cur) && cur.every((i: any) => !(i instanceof Object) ))) {
                result[prop] = cur;
            } else if (Array.isArray(cur)) {
                result[prop] = cur;
                let l: number;
                for (let i = 0, l = cur.length; i < l; i++)
                    recurse(cur[i], prop + "[" + i + "]");
                if (l === 0)
                    result[prop] = [];
            } else {
                let isEmpty = true;
                result[prop] = cur;
                for (let p in cur) {
                    isEmpty = false;
                    recurse(cur[p], prop ? prop + "::" + p : p);
                }
                if (isEmpty && prop)
                    result[prop] = {};
            }
        }
        recurse(data, "");
        return result;
    }

    static deepClone(obj: any): any {
        let newObj: any = (obj instanceof Array) ? [] : {};
        for (let i in obj) {
            if (obj[i] && typeof obj[i] === "object") {
                newObj[i] = this.deepClone(obj[i]);
            } else {
                newObj[i] = obj[i];
            }
        }
        return newObj;
    }

}
