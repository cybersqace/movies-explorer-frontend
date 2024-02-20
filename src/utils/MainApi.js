class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }
    }).then(this._checkResponse);
  }

  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._checkResponse);
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addMovies(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  deleteMovies(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }
    }).then(this._checkResponse);
  }

  register({ name, email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    }).then(this._checkResponse);
  }

  login({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  }

  getToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  updateToken() {
    this._headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.moviesexpo.nomoredomainsmonster.ru',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json',
  },
});

export default mainApi;
