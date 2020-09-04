const cronExpression = {
  resolve: (jobRate: number | string) => ` */${jobRate} * * * * *`,
};

export { cronExpression };
