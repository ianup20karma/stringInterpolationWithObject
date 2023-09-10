let someString = "In a {{achievement}} for {{country}}'s {{eventPosition}}, a {{initiative.details.moreDetails.outcomeBy}} and the {{initiative.details.eventName}} has been {{initiative.details.result}} {{initiative.details.moreDetails.place}}, {{initiative.post}} {{initiative.name}} announced {{initiative.details.moreDetails.day}}.";

let values = {
  achievement: 'big win',
  country: 'India',
  eventPosition: 'G20 Presidency',
  initiative: {
    details: {
      eventName: 'Delhi Declaration',
      moreDetails: {
        day: 'today',
        outcomeBy: 'consensus was reached',
        place: 'at the mega Summit'
      },
      result: 'adopted'
    },
    name: 'Narendra Modi',
    post: 'Prime Minister'
  }
};


function interpolation(str, obj) {
  let keyChain = '';
  
  function interpolateRecursive(valuesObj, parentKeys = []) {
    const keys = Object.keys(valuesObj);
    
    keys.forEach((key, i) => {
      if (parentKeys.length && !keyChain.endsWith('.')) keyChain = keyChain + '.';

      if (typeof valuesObj[key] === 'string') {
        str = str.replaceAll(`{{${keyChain.length ? keyChain + key : key}}}`, valuesObj[key]);
      } else if (typeof valuesObj[key] === 'object') {
        parentKeys.push(key);
        keyChain = keyChain + key + '.';
        interpolateRecursive(valuesObj[key], parentKeys);
      }

      if (i === keys.length - 1) {
      	parentKeys.pop();
        keyChain = parentKeys.length === 1 ? parentKeys[0] + '.' : parentKeys.join('.');
      }
    });

    return str;
  }

  return interpolateRecursive(obj);
}

const result = interpolation(someString, values);
console.log(result);