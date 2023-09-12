/* eslint-disable @typescript-eslint/no-var-requires */
import type { ImageSourcePropType } from "react-native";

const image1 = require("./top-trekers-image/image1.png");
const userImage1 = require("./top-trekers-image/user-image1.png");

interface Card {
  id: number;
  imageSource: ImageSourcePropType;
  name: string;
}

const topTrekersList: Card[] = [
  {
    id: 1,
    imageSource: image1,
    name: "Mang",
  },
  {
    id: 2,
    imageSource: image1,
    name: "Kim Il Legal",
  },
  {
    id: 3,
    imageSource: userImage1,
    name: "John Ark",
  },
  { id: 4, imageSource: userImage1, name: "John Ark" },
  {
    id: 5,
    imageSource: userImage1,
    name: "John Arkdgdfg",
  },
  {
    id: 6,
    imageSource: userImage1,
    name: "Johndfgdfg Ark",
  },
  {
    id: 7,
    imageSource: userImage1,
    name: "Johdfgdn Ardfgdk",
  },
];

export default topTrekersList;
