// IE doesn't support Proxy, therefore must be proxy constants replaced with string
// lastPathMember, classPath, translationPath = these functions are in /config/webpack.config.js and are replace with "string-replace-loader"
// if is need to add another function for proxy constants, msut be added into /config/webpack.config.js
// DON'T USE PROXY CONSTANTS WITHOUT THESE FUNCTIONS!

// tslint:disable
export type ObjPathProxy<TRoot, T> = {
	[P in keyof T]: ObjPathProxy<TRoot, T[P]>;
};

export type ObjProxyArg<TRoot, T> =
	| ObjPathProxy<TRoot, T>
	| ((p: ObjPathProxy<TRoot, TRoot>) => ObjPathProxy<TRoot, T>);

const pathSymbol = Symbol("Object path");

export function createProxy<T>(path: PropertyKey[] = []): ObjPathProxy<T, T> {
	const proxy = new Proxy(
		{ [pathSymbol]: path },
		{
			get(target, key) {
				if (key === pathSymbol) {
					return target[pathSymbol];
				}
				if (typeof key === "string") {
					const intKey = parseInt(key, 10);
					if (key === intKey.toString()) {
						key = intKey as any;
					}
				}
				return createProxy([...(path || []), key]);
			},
		}
	);
	return (proxy as any) as ObjPathProxy<T, T>;
}

export function getPath<TRoot, T>(
	proxy: ObjProxyArg<TRoot, T> | any
): PropertyKey[] {
	if (proxy == null) return [];
	if (typeof proxy === "function") {
		proxy = proxy(createProxy<TRoot>());
	}
	return (proxy as any)[pathSymbol];
}

export function lastPathMember<TRoot, T>(
	proxy: ObjProxyArg<TRoot, T> | any
): ProxyProperty {
	const path = getPath(proxy);

	if (!path || path.length === 0) return { path: "" };
	return { path: path[path.length - 1] as string };
}

export function classPath<TRoot, T>(
	proxy: ObjProxyArg<TRoot, T> | any
): ProxyProperty {
	const path = getPath(proxy);

	if (!path || path.length === 0) return { path: "" };
	if (path.length === 1) return { path: path[0].toString() };
	return { path: path.join(".") };
}

export function translationPath<TRoot, T>(
	proxy: ObjProxyArg<TRoot, T> | any
): ProxyProperty {
	const path = getPath(proxy);

	if (!path || path.length === 0) return { path: "" };
	if (path.length === 1) return { path: path[0].toString() };
	return { path: `${path[0].toString()}:${path.slice(1).join(".")}` };
}

export type ProxyProperty = Readonly<{
	path: string;
}>;
