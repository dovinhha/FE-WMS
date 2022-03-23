export function toObjectName(obj) {
  let Obj = {};
  !!obj &&
    obj.map((index) => {
      if (index.name.indexOf("/") !== -1) {
        const arrString = index.name.split("/");
        const key = index.name.split("/")[0];
        if (Object.keys(Obj).indexOf(key) === -1) {
          Obj[key] = [];
          arrString.splice(0, 1);
          if (arrString.length === 1) {
            Obj[key].push(arrString[0] + "/" + index.code);
            return Obj;
          } else {
            Obj[key] = toLowerObject(Obj[key], arrString, index.code);
          }
        } else {
          arrString.splice(0, 1);
          if (arrString.length === 1) {
            Obj[key].push(arrString[0] + "/" + index.code);
            return Obj;
          } else {
            Obj[key] = toLowerObject(Obj[key], arrString, index.code);
          }
        }
      } else {
        const key = index.name;
        Obj[key] = { code: index.code };
      }
    });
  return Obj;
}

function toLowerObject(arr, arrStr, code) {
  const arrObj = arr;
  const arrString = arrStr;
  let bool = false;
  const key = arrString[0];
  Object.values(arrObj).map((index) => {
    if (typeof index === "object") {
      if (Object.keys(index).indexOf(arrString[0]) !== -1) {
        bool = true;
        arrString.splice(0, 1);
        if (arrString.length === 1) {
          index[key].push(arrString[0] + "/" + code);
        } else {
          index[key] = toLowerObject(index[key], arrString, code);
        }
      }
    }
  });
  if (!bool) {
    let objMiddle = {};
    arrString.splice(0, 1);
    objMiddle[key] = [];
    if (arrString.length === 1) {
      objMiddle[key].push(arrString[0] + "/" + code);
    } else {
      objMiddle[key] = toLowerObject(objMiddle[key], arrString, code);
    }
    arrObj.push(objMiddle);
  }
  return arrObj;
}
export default { toObjectName };
