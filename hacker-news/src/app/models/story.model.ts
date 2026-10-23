export interface Story {
  id: number;
  by: string;
  descendants: string;
  score: number;
  time: number;
  kids: Array<number>;
  title: string;
  type: string;
  url: string;
}
