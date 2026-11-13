document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('[data-filter]');
  var cards = document.querySelectorAll('[data-category]');
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var category = button.dataset.filter;
      var count = 0;
      cards.forEach(function (card) {
        card.hidden = !!category && card.dataset.category !== category;
        if (!card.hidden) count++;
      });
      buttons.forEach(function (item) {
        item.classList.toggle('is-active', item === button);
        item.setAttribute('aria-pressed', String(item === button));
      });
      document.querySelector('.work-grid-head h2').textContent = category || '全部作品';
      document.getElementById('work-count').textContent = count + ' 个项目';
    });
  });
});
