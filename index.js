import fetch from "node-fetch";
import dean from "./dean.js";

const WAIT_BETWEEN_MS = 200;
const BASE = "http://aggiecanvas.com";
const UPDATE_PATH = "/api/update";
const PEOPLE = 4;
const PERSON = 0;

const TRANS_COLORS = ["#5bcefa", "#f5a9b8", "#ffffff", "#f5a9b8", "#5bcefa"];

const make_flag = ({ width, height }, colors) =>
  Array(height)
    .fill()
    .map((_, y) =>
      Array(width)
        .fill()
        .map((_, x) => colors[Math.floor(y / (height / colors.length))])
    );

const place = async (row, col, color) =>
  fetch(`${BASE}/${UPDATE_PATH}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ row, column: col, color }),
  });

const paint = async (
  color_arr,
  time_between,
  start_x,
  start_y,
  end_x,
  end_y,
  start_x_pos = 0,
  start_y_pos = 0
) => {
  for (let y = start_y; y < end_x; ++y)
    for (let x = start_x; x < end_y; ++x)
      await new Promise((res, rej) => {
        setTimeout(() => res(color_arr[y][x]), time_between);
        console.log(
          "Placing at ",
          y + start_y_pos,
          x + start_x_pos,
          color_arr[y][x]
        );
      }).then((color) => place(y + start_y, x + start_x, color));
};

const dy = dean.length / PEOPLE;
const X = 46;
const Y = 27;
paint(
  dean,
  WAIT_BETWEEN_MS,
  0,
  dy * PERSON,
  dean[0].length,
  dy * (PERSON + 1),
  X,
  Y
);
