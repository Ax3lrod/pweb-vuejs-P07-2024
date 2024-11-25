export type Book = {
  _id: string;
  title: string;
  author: string;
  publishedDate: string;
  publisher: string;
  description: string;
  coverImage: string;
  rating: {
    average: number;
    count: number;
  };
  tags: string[];
  initialQty: number;
  qty: number;
};
