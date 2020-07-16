const newlineRe = /\r\n|\r|\n/;

/**
 *
 * @param {(string | Object)[]} input
 */
export function flatten(input, oldOutput) {
  /**
   * @type Array<Array<Object>>
   */
  const output = [[]];
  for (let thing of input) {
    flattenRec(output, undefined, thing);
  }
  if (oldOutput === undefined) return output;
  for (let i = 0; i < output.length; i++) {
    let newLineArray = [];
    let reusable = 0;
    let actualOutput = [];
    if (oldOutput.length > i) {
      for (let j = 0; j < output[i].length; j++) {
        let canBeReused = false;
        if (oldOutput[i].length > j) {
          const { content: newContent, type: newType } = output[i][j];
          const { content, type } = oldOutput[i][j];
          if (content === newContent && type === newType) {
            canBeReused = true;
          }
        }
        if (canBeReused) {
          reusable++;
          newLineArray.push(oldOutput[i][j]);
        } else {
          newLineArray.push(output[i][j]);
        }
      }
      if (reusable === oldOutput[i].length && reusable === output[i].length) {
        actualOutput.push(oldOutput[i]);
      } else {
        actualOutput.push(newLineArray);
      }
    } else {
      actualOutput.push(output[i]);
    }
  }
  return output;
}
/**
 *
 * @param {Array<Array<{content: string, type: string | undefined}>>} output
 * @param {string | undefined} type
 * @param {Object | string} input
 */
function flattenRec(output, type, input) {
  if (typeof input === "string") {
    const parts = input.split(newlineRe);
    let first = true;
    for (let part of parts) {
      if (first) {
        first = false;
      } else {
        output.push([]);
      }
      if (part.length === 0) continue;
      output[output.length - 1].push({ content: part, type });
    }
  } else {
    const { content, type: newType } = input;
    if (typeof content === "string") {
      flattenRec(output, newType, content);
    } else if (Array.isArray(content)) {
      for (let thing of content) {
        flattenRec(output, newType, thing);
      }
    } else {
      flattenRec(output, newType, content);
    }
  }
}
