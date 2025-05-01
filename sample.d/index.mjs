import { response2json } from "./zcat2json2parsed.mjs";

import { handleSimpleRequest, offset2request } from "./rgreq.mjs";

/**
 * @import { SimpleRangeRequest, SimpleRangeResponse } from "./rgreq.mjs"
 */

/**
 * @import { IO } from "./io.mjs"
 */

const j0 = { offset: 0, size: 98 };
const j1 = { offset: 98, size: 98 };

/** @type string */
const url = "jall.json.gz";

/** @type SimpleRangeRequest */
const r0 = offset2request(url, j0.offset, j0.size);

/** @type SimpleRangeRequest */
const r1 = offset2request(url, j1.offset, j1.size);

/**
 * Creates a div element from the text.
 * @param {string} text
 * @returns {HTMLElement}
 */
function text2div(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div;
}

/** @type IO<Void> */
const main = () => {
  /** @type IO<SimpleRangeResponse> */
  const ires0 = handleSimpleRequest(r0);

  /** @type IO<SimpleRangeResponse> */
  const ires1 = handleSimpleRequest(r1);

  /** @type Promise<[SimpleRangeResponse, SimpleRangeResponse]> */
  const pres01 = Promise.all([
    ires0(),
    ires1(),
  ]);

  return pres01
    .then((res01) => {
      /** @type SimpleRangeResponse */
      const res0 = res01[0];

      /** @type SimpleRangeResponse */
      const res1 = res01[1];

      /** @type number */
      const o0 = res0.start;

      /** @type number */
      const o1 = res1.start;

      /** @type boolean */
      const b0 = o0 == j0.offset;

      /** @type boolean */
      const b1 = o1 == j1.offset;

      /** @type boolean */
      const ok = b0 && b1;

      if (!ok) {
        return Promise.reject(`unexpected offset. o0=${o0}, o1=${o1}`);
      }

      /** @type IO<object> */
      const io0 = response2json(res0.response);

      /** @type IO<object> */
      const io1 = response2json(res1.response);

      /** @type Promise<[object, object]> */
      const pobjs = Promise.all([
        io0(),
        io1(),
      ]);

      return pobjs;
    })
    .then((objs) => {
      /** @type object */
      const o0 = objs[0];

      /** @type object */
      const o1 = objs[1];

      /** @type DocumentFragment */
      const frag = new DocumentFragment();

      const d0 = text2div(JSON.stringify(o0));
      const d1 = text2div(JSON.stringify(o1));

      frag.append(d0);
      frag.append(d1);

      /** @type {HTMLElement?} */
      const ordiv = document.getElementById("rt");

      if (!ordiv) {
        return Promise.reject("div not found");
      }

      ordiv.append(frag);

      return Promise.resolve();
    });
};

main()
  .catch(console.error);
