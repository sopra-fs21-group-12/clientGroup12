import axios from 'axios';
import { getDomain } from './getDomain';

export const api = axios.create({
  baseURL: getDomain(),
  headers: { 'Content-Type': 'application/json' }
});

export const report = async (id, matchid) =>{
  try {
    const response = await api.post(`/items/${id}/report`);
    await unmatch(matchid)

  } catch (error) {
      alert(`Something went wrong during the Item creation: \n${handleError(error)}`);
  }
}

export const unmatch = async(id) =>{
  try {
    const response = await api.put(`/${id}/unmatch`);
    } catch (error) {
      alert(`Something went wrong during the Item creation: \n${handleError(error)}`);
    }
}

export const handleError = error => {
  const response = error.response;

  // catch 4xx and 5xx status codes
  if (response && !!`${response.status}`.match(/^[4|5]\d{2}$/)) {
    let info = `\nrequest to: ${response.request.responseURL}`;

    if (response.data.status) {
      info += `\nstatus code: ${response.data.status}`;
      info += `\nerror: ${response.data.error}`;
      info += `\nerror message: ${response.data.message}`;
    } else {
      info += `\nstatus code: ${response.status}`;
      info += `\nerror message:\n${response.data}`;
    }

    console.log('The request was made and answered but was unsuccessful.', error.response);
    return info;
  } else {
    if (error.message.match(/Network Error/)) {
      alert('The server cannot be reached.\nDid you start it?');
    }

    console.log('Something else happened.', error);
    return error.message;
  }
};
