export type UserProfile = {
  userName: string;
  email: string;
  token: string;
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
  avgScore: number;
  categories: Category[];
  reviews: ReviewType[];
};

export type Category = {
  id: number;
  name: string;
}

export type Status = {
  id: number;
  name: string;
}

export type UserTitleStatus = {
  titleId: number 
  title: Title 
  statusId: number 
  statusName: string 
  startDate: string 
  endDate: string     
}

export type ReviewType = {
  id: number;
  score: number;
  content: string;
  titleId: number;
  createdBy: string;
  createdOn: string;
};
