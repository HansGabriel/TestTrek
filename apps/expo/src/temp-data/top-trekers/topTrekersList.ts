/* eslint-disable @typescript-eslint/no-var-requires */
import type { ImageSourcePropType } from "react-native";

const image1 = require("./top-trekers-image/image1.png");
const userImage1 = require("./top-trekers-image/user-image1.png");

interface Card {
  imageSource: ImageSourcePropType;
  name: string;
}

const topTrekersList: Card[] = [
  {
    imageSource: image1,
    name: "Mang",
  },
  {
    imageSource: image1,
    name: "Kim Il Legal",
  },
  {
    imageSource: userImage1,
    name: "John Ark",
  },
  {
    imageSource: userImage1,
    name: "John Ark",
  },
  {
    imageSource: userImage1,
    name: "John Arkdgdfg",
  },
  {
    imageSource: userImage1,
    name: "Johndfgdfg Ark",
  },
  {
    imageSource: userImage1,
    name: "Johdfgdn Ardfgdk",
  },
];

export default topTrekersList;
