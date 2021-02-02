// tslint:disable
export const makeFormData = (data: { [key: string]: any }) => {
    const formData = new FormData();
    Object.keys(data).map(key => {
      appendKeyValue(formData, data[key], key);
    });
    return formData;
  };
  
  const appendKeyValue = (formData: FormData, data: any, key1: string) => {
    if (data === null) return;
    if (Array.isArray(data)) {
      let index = 0;
      (data as Array<any>).map(value => {
        if (value instanceof File || typeof value !== "object") {
          formData.append(`${key1}[${index}]`, value);
        } else if (Array.isArray(value)) {
          let index2 = 0;
          Object.keys(value).map(key2 => {
            appendKeyValue(formData, value[key2], `${key1}[${index}][${index2}]`);
            index2++;
          });
        } else {
          Object.keys(value).map(key2 => {
            appendKeyValue(formData, value[key2], `${key1}[${index}].${key2}`);
          });
        }
        index++;
      });
    } else if (data instanceof Date) {
      formData.append(key1, data.toUTCString());
    } else if (typeof data === "object" && data) {
      Object.keys(data).map(key2 => {
        appendKeyValue(formData, data[key2], `${key1}.${key2}`);
      });
    } else {
      formData.append(key1, `${data}`);
    }
  };
  