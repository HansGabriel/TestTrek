import type { Option, ChoiceStyle } from "./types";

export const TIME_LIMIT_OPTIONS: Option[] = [
  {
    id: "1",
    title: "5 sec",
    value: 5,
    isSelected: false,
  },
  {
    id: "2",
    title: "10 sec",
    value: 10,
    isSelected: false,
  },
  {
    id: "3",
    title: "20 sec",
    value: 20,
    isSelected: false,
  },
  {
    id: "4",
    title: "30 sec",
    value: 30,
    isSelected: false,
  },
  {
    id: "5",
    title: "45 sec",
    value: 45,
    isSelected: false,
  },
  {
    id: "6",
    title: "60 sec",
    value: 60,
    isSelected: false,
  },
  {
    id: "7",
    title: "90 sec",
    value: 90,
    isSelected: false,
  },
  {
    id: "8",
    title: "120 sec",
    value: 120,
    isSelected: false,
  },
];

export const POINT_OPTIONS: Option[] = [
  { id: "1", title: "50 pt", value: 50, isSelected: false },
  { id: "2", title: "100 pt", value: 100, isSelected: false },
  { id: "3", title: "200 pt", value: 200, isSelected: false },
  { id: "4", title: "250 pt", value: 250, isSelected: false },
  { id: "5", title: "500 pt", value: 500, isSelected: false },
  { id: "6", title: "750 pt", value: 750, isSelected: false },
  { id: "7", title: "1000 pt", value: 1000, isSelected: false },
  { id: "8", title: "2000 pt", value: 2000, isSelected: false },
];

export const choiceStyles: ChoiceStyle[] = [
  {
    styles: "border-blue-700 bg-blue-500",
  },
  {
    styles: "border-rose-500 bg-rose-600",
  },
  {
    styles: "border-orange-500 bg-amber-500",
  },
  {
    styles: "border-emerald-600 bg-emerald-500",
  },
];
