import { User } from "../users/User";
import { Article } from "../articles/Article";

export type Cart = {
      id: string;
      user: {
            id: string,
            username: string,
            email: string
      };
      articleList: Array<Article>;
    };