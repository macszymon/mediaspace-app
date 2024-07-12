export type UserProfileToken = {
  userName: string;
  email: string;
  token: string;
};

export type UserProfile = {
  userName: string;
  email: string;
};

export type Title = {
  id: number;
  name: string;
  summary: string;
  image: string;
  releaseDate: string;
  isbn: string;
  numberOfSeasons: number;
  movieLength: number;
  type: string;
  author: string;
  developer: string;
  publisher: string;
  creator: string;
  productionCompany: string;
  director: string;
  writer: string;
  platforms: string;
  categories: [];
  reviews: ReviewType[];
};

export type ReviewType = {
  id: number;
  score: number;
  content: string;
  titleId: number;
  createdBy: string;
  createdOn: string;
};
