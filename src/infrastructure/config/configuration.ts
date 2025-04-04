export default () => ({
  port: parseInt(process.env.PORT as string, 10) || 3000,
});
