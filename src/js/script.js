// 遅延処理
document.addEventListener('DOMContentLoaded', function () {
  const lazyElements = document.querySelectorAll('.lazyload');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('lazyloaded');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  lazyElements.forEach(element => {
    observer.observe(element);
  });
});

// kv 文字列の遅延表示
document.addEventListener('DOMContentLoaded', function () {
  const spans = document.querySelectorAll('.p-kv__text span');
  let delay = 0;
  spans.forEach(span => {
    setTimeout(() => {
      span.classList.add('show');
    }, delay);
    delay += 500; // 500ms ごとに文字を表示
  });
});

$(function () {
  // 読み込まれるまでのローディング処理
  $(window).on('load', function () {
    $("#loading").delay(2000).fadeOut('slow');
    $("#loading-img").delay(1500).fadeOut('slow');
  });

  // ヘッダー箇所スクロールすると背景と文字の色が変わる処理
  $(document).ready(function () {
    var aboutOffset = $('#about').offset().top;

    //   $(window).scroll(function () {
    //     var scroll = $(window).scrollTop();

    //     if (scroll >= aboutOffset) {
    //       $('.l-header').css({
    //         'background-color': '#000'
    //       }).find('a').css({
    //         'color': '#fff'
    //       });
    //       $('.l-header__hamburger-sp').find('span').css({
    //         'background-color': '#fff'
    //       });
    //       $('.l-header__menu-sp li').find('a').css({
    //         'color': '#fff'
    //       });
    //       if ($('.l-header__hamburger-sp').hasClass('is-active')) {
    //         $('.l-header__hamburger-sp').find('span').css({
    //           'background-color': '#fff'
    //         });
    //       }
    //     } else {
    //       $('.l-header').css({
    //         'background-color': '#fff'
    //       }).find('a').css({
    //         'color': '#000'
    //       });
    //       $('.l-header__hamburger-sp').find('span').css({
    //         'background-color': '#000'
    //       });
    //       $('.l-header__menu-sp li').find('a').css({
    //         'color': '#000'
    //       });
    //       if ($('.l-header__hamburger-sp').hasClass('is-active')) {
    //         $('.l-header__hamburger-sp').find('span').css({
    //           'background-color': '#fff'
    //         });
    //       }
    //     }
    //   });
    // });

    $(document).on('click', '.l-header__hamburger-sp', function () {
      $(this).toggleClass('is-active');
      $('.l-header__menu-sp').toggleClass('is-active');
    });
    $(document).ready(function() {
      if ($('.l-header__menu-sp').hasClass('is-active')) {
        $('.l-header__menu-sp li a').css('color', '#fff');
      }
    });
    $(document).ready(function() {
      $('.l-header__menu-sp li a').on('click', function() {
        $('.l-header__menu-sp').removeClass('is-active');
        $('.l-header__hamburger-sp').removeClass('is-active');
      });
    });
  });

  // コピーライト年号処理
  if ($('.js-copyright-year').length) {
    var date = new Date();
    $('.js-copyright-year').text(date.getFullYear());
  }

  // ヘッダークリックで各セクションに遷移
  $('.l-header__item a[href^="#"]').on('click', function (event) {
    event.preventDefault();
    const speed = 600;
    const href = $(this).attr("href");
    const target = (href === "#" || href === "" ? $("html") : $(href));
    const position = target.offset().top;

    $("html, body").animate({ scrollTop: position }, speed, "swing");
  });
});

// スキル箇所のswiperの処理
document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1, // デフォルトでスライド1枚表示（PC用）
    spaceBetween: 2, // スライド間の余白
    loop: true,
    autoplay: {
      delay: 5000, // 5秒ごとにスライド
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 3, // スライド3枚表示
        spaceBetween: 0, // スライド間の余白
      }
    }
  });
});



// 住所検索ボタンの処理
let button = document.getElementById('btn-search');
if (button) {
  button.addEventListener('click', function () {
    // 住所APIのURL
    let url = "https://zipcloud.ibsnet.co.jp/api/search?zipcode=";
    
    // 入力された郵便番号を取得
    let number = document.getElementById("postal-code").value;
    
    // URLに郵便番号を追加
    url += number;
    
    // 入力するinputタグのidを取得
    let element_address = document.getElementById("address");
    
    // fetchでAPIを呼び出す
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // JSON形式でデータを取得
      })
      .then(data => {
        // データが正しく取得できたか確認
        console.log(data);

        // 取得したデータを処理
        if (data.results) {
          let address = ""; // 住所の連結

          for (let result of data.results) {
            // 住所の情報を連結
            address += (result.address1 || '') + (result.address2 || '') + (result.address3 || '');
          }

          // テキストボックスに住所をセット
          element_address.value = address;
        } else {
          // エラー処理
          element_address.value = "住所が見つかりません";
        }
      })
      .catch(error => {
        console.error('Error:', error);
        element_address.value = "エラーが発生しました";
      });
  });
}
