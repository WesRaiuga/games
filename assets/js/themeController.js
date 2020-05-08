let localTheme = localStorage.getItem('wesraiuga:games-tema');
let cssLink = document.querySelector('link[href=""]');
const themeButtons = document.querySelectorAll('.theme-btn');

if (localTheme) {
  cssLink.href = 'assets/themes/' + localTheme +'.css';
} else {
  cssLink.href = 'assets/themes/default.css';
  localTheme = 'default';
  localStorage.setItem('wesraiuga:games-tema', localTheme);
}

const changeTheme = () => {
  if (localTheme == 'default') {
    cssLink.href = 'assets/themes/dark-theme.css';
    localTheme = 'dark-theme';
    localStorage.setItem('wesraiuga:games-tema', localTheme);
  } else {
    cssLink.href = 'assets/themes/default.css';
    localTheme = 'default';
    localStorage.setItem('wesraiuga:games-tema', localTheme);
  }
}

for (let i = 0; i < themeButtons.length; i++) {
  themeButtons[i].addEventListener("click", function(e) {
      changeTheme();
  });
}




