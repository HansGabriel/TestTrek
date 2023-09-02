/* eslint-disable @typescript-eslint/no-var-requires */
import type { ImageSourcePropType } from "react-native";

const image1 = require("./discover-images/image-source/image1.png");
const userImage1 = require("./discover-images/user-image/user-image1.png");

interface Card {
  imageSource: ImageSourcePropType;
  title: string;
  q: number;
  date: Date;
  plays: number;
  userImageSource: ImageSourcePropType;
  userName: string;
}

const discoverCardList: Card[] = [
  {
    imageSource: image1,
    title: "Loooooggg",
    q: 1,
    date: new Date("2022-12-11"),
    plays: 5600,
    userImageSource: userImage1,
    userName: "user 1",
  },
  {
    imageSource: image1,
    title: "Newwwww wwwwwwwwww",
    q: 2,
    date: new Date("2022-10-11"),
    plays: 5600,
    userImageSource: userImage1,
    userName: "user 22222",
  },
  {
    imageSource: image1,
    title: "Newers",
    q: 12,
    date: new Date("2022-1-11"),
    plays: 5600,
    userImageSource: userImage1,
    userName: "user 3",
  },
  {
    imageSource: image1,
    title: "Legit Test",
    q: 15,
    date: new Date("2022-2-11"),
    plays: 5600,
    userImageSource: userImage1,
    userName: "user 4",
  },
  {
    imageSource: image1,
    title: "Random Stuff",
    q: 11,
    date: new Date("2022-12-11"),
    plays: 5600,
    userImageSource: userImage1,
    userName: "user 5",
  },
  {
    imageSource: image1,
    title: "Random Stuff",
    q: 1,
    date: new Date("2022-12-11"),
    plays: 5600,
    userImageSource: userImage1,
    userName: "user 5",
  },
];

export default discoverCardList;
