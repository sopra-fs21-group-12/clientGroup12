import { isProduction } from './isProduction';

/**
 * This helper function returns the current domain of the API.
 * If the environment is production, the production Heroku URL will be returned.
 * Otherwise, the link localhost:8080 will be returned (Spring server default port).
 * @returns {string}
 */
export const getDomain = () => {
  const prodUrl = 'http://sopra-fs21-group-12-server.herokuapp.com';
  const devUrl =  "http://sopra-fs21-group-12-server.herokuapp.com";


  return isProduction() ? prodUrl : devUrl;
};
