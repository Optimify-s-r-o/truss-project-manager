export const extractFirstText = (str: string) => {
  const matches = str.match(/"(.*?)"/);
  return matches ? matches[1] : str;
};

export const getExtension = (str: string) => {
  if (
    str.includes('image') ||
    str.includes('jpg') ||
    str.includes('jpeg') ||
    str.includes('png') ||
    str.includes('svg')
  ) {
    return [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }];
  } else if (str.includes('pdf')) {
    return [{ name: 'Pdf', extensions: ['pdf'] }];
  } else if (str.includes('dvg')) {
    return [{ name: 'Dwg', extensions: ['dvg'] }];
  } else if (str.includes('zip') || str.includes('rar')) {
    return [{ name: 'Compressed', extensions: ['zip', 'rar'] }];
  } else if (
    str.includes('docx') ||
    str.includes('txt') ||
    str.includes('xml') ||
    str.includes('csv') ||
    str.includes('json') ||
    str.includes('xls') ||
    str.includes('xlsx')
  ) {
    return [{ name: 'Documents', extensions: ['docs', 'xls, xlsx'] }];
  } else if (
    str.includes('mkv') ||
    str.includes('avi') ||
    str.includes('gif') ||
    str.includes('mp4')
  ) {
    return [{ name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] }];
  }

  return [
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ];
};
