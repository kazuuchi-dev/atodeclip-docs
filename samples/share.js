// チュートリアルで「別のアプリから共有して保存する」を試すための共有ボタン。
// 共有シートを開けない環境では、URL をコピーする。
(function () {
  var button = document.getElementById('share-button');
  if (!button) return;
  var label = button.textContent;

  function showCopied(message) {
    button.textContent = message;
    setTimeout(function () {
      button.textContent = label;
    }, 2000);
  }

  function copyUrl() {
    if (!navigator.clipboard) {
      showCopied('コピーできませんでした');
      return;
    }
    navigator.clipboard.writeText(location.href).then(
      function () {
        showCopied('URL をコピーしました');
      },
      function () {
        showCopied('コピーできませんでした');
      },
    );
  }

  button.addEventListener('click', function () {
    if (!navigator.share) {
      copyUrl();
      return;
    }
    navigator.share({ title: document.title, url: location.href }).catch(function (error) {
      // 共有シートを閉じただけのときは何もしない
      if (error && error.name !== 'AbortError') copyUrl();
    });
  });
})();
