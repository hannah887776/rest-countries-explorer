
export type Country = {
  names: {
    common: string;
    official?: string;

    // Native names are stored by language code,
    // such as "fas" for Persian.
    native?: Record<
      string,
      {
        common: string;
        official: string;
      }
    >;
  };

  codes: {
    alpha_3: string;
  };

  flag: {
    url_png: string;
  };

  population: number;

  region: string;
  subregion?: string;

  capitals?: {
    name: string;
  }[];

  borders?: string[];

  tlds?: string[];

  currencies?: {
    code: string;
    name: string;
    symbol: string;
  }[];

  languages?: {
    name: string;
    native_name: string;
  }[];
};

