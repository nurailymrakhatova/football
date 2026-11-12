// Classroom simulation only: use sample details and a disposable password.
// localStorage is readable in this browser; this is not real authentication.
const fanAccount = {
  getUsers: function () {
    const users = JSON.parse(localStorage.getItem('madrid-users') || '[]');
    if (!Array.isArray(users) || !users.every(function (user) {
      return user && typeof user.email === 'string' && typeof user.password === 'string' &&
        typeof user.firstName === 'string' && typeof user.lastName === 'string';
    })) {
      throw new Error('Invalid saved demo accounts');
    }
    return users;
  },
  register: function (user) {
    const users = this.getUsers();
    if (users.some(function (saved) { return saved.email === user.email; })) return false;
    users.push(user);
    localStorage.setItem('madrid-users', JSON.stringify(users));
    return true;
  },
  login: function (email, password) {
    const user = this.getUsers().find(function (saved) {
      return saved.email === email && saved.password === password;
    });
    if (!user) return false;
    localStorage.setItem('madrid-session', user.email);
    return true;
  },
  current: function () {
    const email = localStorage.getItem('madrid-session');
    return this.getUsers().find(function (user) { return user.email === email; });
  }
};

document.addEventListener('DOMContentLoaded', function () {
  const profile = document.querySelector('#profile-details');
  if (!profile) return;

  function displayProfile() {
    try {
      const user = fanAccount.current();
      if (!user) {
        window.location.replace('login.html');
        return;
      }
      // textContent displays saved names as text, never as HTML.
      document.querySelector('#profile-name').textContent = user.firstName + ' ' + user.lastName;
      document.querySelector('#profile-email').textContent = user.email;
      document.querySelector('#profile-phone').textContent = user.phone || 'Not provided';
      document.querySelector('#profile-country').textContent = user.country || 'Not provided';
      document.querySelector('#profile-interests').textContent = Array.isArray(user.interests) && user.interests.length ? user.interests.join(', ') : 'Not selected';
      document.querySelector('#profile-gender').textContent = user.gender || 'Not selected';
      profile.hidden = false;
      document.querySelector('#profile-unavailable').hidden = true;
    } catch (error) {
      profile.hidden = true;
      document.querySelector('#profile-unavailable').hidden = false;
      document.querySelector('#profile-error').textContent = 'Your practice profile could not be read. Check that this browser allows site storage, then try logging in again.';
    }
  }

  document.querySelector('#logout-button').addEventListener('click', function () {
    try {
      localStorage.removeItem('madrid-session');
      window.location.replace('login.html');
    } catch (error) {
      document.querySelector('#logout-error').textContent = 'Log out could not be saved. Check your browser storage settings and try again.';
    }
  });
  window.addEventListener('storage', function (event) {
    if (event.key === 'madrid-users' || event.key === 'madrid-session' || event.key === null) displayProfile();
  });
  // Recheck the session when Back restores a page from the browser cache.
  window.addEventListener('pageshow', displayProfile);
  displayProfile();
});
