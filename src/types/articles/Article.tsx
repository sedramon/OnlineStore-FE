export type Article = {
      id: string;
      title: string;
      description: string;
      price: number;
      category : {
        id : number;
        name : string;
      };
    };