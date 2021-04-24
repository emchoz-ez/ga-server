interface ParsedDatabaseOptions {
    protocol: string | undefined;
    host: string | undefined;
    username: string | undefined;
    password: string | undefined;
    database: string | undefined;
    dialect: string | undefined;
    ssl?: any;
    extra?: any;
    connectionString: string | undefined;
    dialectOptions?: any;
  }
  
  /**
   * @function
   *
   * Parses given database url and returns an object literal containing
   * database credentials.
   *
   * @param databaseUrl - Url to the database
   *
   * @return {ParsedDatabaseOptions}
   *
   * @see https://stackoverflow.com/questions/45073320/regex-for-a-url-connection-string
   */
  const parseDatabaseUrl = (
    databaseUrl: string | undefined,
  ): ParsedDatabaseOptions => {
    if (!databaseUrl)
      return {
        protocol: undefined,
        username: undefined,
        host: undefined,
        password: undefined,
        database: undefined,
        dialect: 'postgres',
        connectionString: databaseUrl,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      };
  
    const regex: RegExp = /^(?:([^:\/?#\s]+):\/{2})?(?:([^@\/?#\s]+)@)?([^\/?#\s]+)?(?:\/([^?#\s]*))?(?:[?]([^#\s]+))?\S*$/;
  
    const matches: RegExpMatchArray | null = databaseUrl.match(regex);
  
    if (!matches)
      return {
        protocol: undefined,
        username: undefined,
        host: undefined,
        password: undefined,
        database: undefined,
        dialect: 'postgres',
        connectionString: databaseUrl,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      };
  
    return {
      protocol: matches[1] || undefined,
      username: matches[2] !== undefined ? matches[2].split(':')[0] : undefined,
      host:
        matches[3] != undefined ? matches[3].split(/:(?=\d+$)/)[0] : undefined,
      database: matches[4] != undefined ? matches[4].split('/')[0] : undefined,
      password: matches[2] != undefined ? matches[2].split(':')[1] : undefined,
      dialect: 'postgres',
      connectionString: databaseUrl,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    };
  };
  
  export default parseDatabaseUrl;