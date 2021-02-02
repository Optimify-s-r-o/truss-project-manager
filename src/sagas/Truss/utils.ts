export const trussFileExist = (file: string) => {
	var fs = window.require("fs"),
		path = window.require("path");
	if (!fs.existsSync(file) || path.extname(file) != ".exe") {
		return false;
	}

	return true;
};
