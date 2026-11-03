/**
 * Photography & Motion Portfolio - Interaction & Gallery Engine
 * Minimalist, refined, editorial interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // Photography Gallery Dataset
  // ==========================================================================
  let galleryWorks = [
    {
      id: 1,
      num: '01',
      title: '泉水之音',
      titleEn: 'Morning Melody',
      category: '商业博主 · 阳光人像',
      specs: '50MM · F/1.8 · 自然光',
      webSrc: 'assets/images/web/01.jpg',
      thumbSrc: 'assets/images/thumbs/01.jpg',
      rawSrc: '博主封面摄影/01.jpg',
      aspect: '3/4'
    },
    {
      id: 2,
      num: '02',
      title: '展厅微风',
      titleEn: 'Echoes of Tea',
      category: '艺术空间 · 室内情绪',
      specs: '35MM · F/2.0 · 环境光',
      webSrc: 'assets/images/web/02.jpg',
      thumbSrc: 'assets/images/thumbs/02.jpg',
      rawSrc: '博主封面摄影/02.jpg',
      aspect: '3/4'
    },
    {
      id: 3,
      num: '03',
      title: '午后暖阳',
      titleEn: 'Golden Hour Transit',
      category: '城市街头 · 建筑与光',
      specs: '85MM · F/2.8 · 逆光',
      webSrc: 'assets/images/web/03.jpg',
      thumbSrc: 'assets/images/thumbs/03.jpg',
      rawSrc: '博主封面摄影/03.jpg',
      aspect: '2/3'
    },
    {
      id: 4,
      num: '04',
      title: '街角电车',
      titleEn: 'Urban Cadence',
      category: '街头纪实 · 色彩姿态',
      specs: '50MM · F/2.5 · 顺光',
      webSrc: 'assets/images/web/04.jpg',
      thumbSrc: 'assets/images/thumbs/04.jpg',
      rawSrc: '博主封面摄影/04.jpg',
      aspect: '3/4'
    },
    {
      id: 5,
      num: '05',
      title: '任意车站',
      titleEn: 'Station in the Meadow',
      category: '户外草坪 · 叙事写真',
      specs: '35MM · F/2.2 · 暮光',
      webSrc: 'assets/images/web/05.jpg',
      thumbSrc: 'assets/images/thumbs/05.jpg',
      rawSrc: '博主封面摄影/05.jpg',
      aspect: '3/4'
    },
    {
      id: 6,
      num: '06',
      title: '向阳盛放',
      titleEn: 'Bloom Against the Sky',
      category: '盛夏花间 · 明朗情绪',
      specs: '50MM · F/2.8 · 天光',
      webSrc: 'assets/images/web/06.jpg',
      thumbSrc: 'assets/images/thumbs/06.jpg',
      rawSrc: '博主封面摄影/06.jpg',
      aspect: '3/4'
    },
    {
      id: 7,
      num: '07',
      title: '腕间微光',
      titleEn: 'Gentle Gaze & Timeless Rhythm',
      category: '商业写真 · 柔和自然光',
      specs: '50MM · F/2.0 · 漫射光',
      webSrc: 'assets/images/web/07.jpg',
      thumbSrc: 'assets/images/thumbs/07.jpg',
      rawSrc: '博主封面摄影/07.jpg',
      aspect: '3/4'
    }
  ];

  // ==========================================================================
  // Video / Motion Editing Works Dataset (剪辑作品)
  // 【自定义配置指引】：在此替换为您的小红书链接或本地 mp4 视频路径
  // ==========================================================================
  let videoWorks = [
    {
      id: 1,
      num: '01',
      title: '商业博主 · 封面动态卡点',
      titleEn: 'Fashion & Lifestyle Reel',
      category: '小红书精选 / 节奏剪辑',
      duration: '0:30',
      cover: 'assets/images/thumbs/01.jpg',
      // 【小红书链接填入处 1】替换为您的小红书笔记网址（如 https://www.xiaohongshu.com/explore/...）
      xhsUrl: 'https://www.xiaohongshu.com/explore',
      // 可选：如果有直接播放的 mp4 视频文件，填入相对路径，例如 'assets/videos/demo1.mp4'，留空则自动加载小红书网页预览
      videoSrc: ''
    },
    {
      id: 2,
      num: '02',
      title: '胶片质感 · 城市情绪短片',
      titleEn: 'Cinematic Mood & Color Grading',
      category: '电影调色 / 情绪写真',
      duration: '0:45',
      cover: 'assets/images/thumbs/03.jpg',
      // 【小红书链接填入处 2】
      xhsUrl: 'https://www.xiaohongshu.com/explore',
      videoSrc: ''
    },
    {
      id: 3,
      num: '03',
      title: '夏日绿意 · 户外叙事微短片',
      titleEn: 'Summer Meadow Story',
      category: '自然光影 / 叙事微短片',
      duration: '0:38',
      cover: 'assets/images/thumbs/05.jpg',
      // 【小红书链接填入处 3】
      xhsUrl: 'https://www.xiaohongshu.com/explore',
      videoSrc: ''
    },
    {
      id: 4,
      num: '04',
      title: '向阳色彩 · 节奏卡点写真',
      titleEn: 'Sunlit Rhythm & Motion',
      category: '视觉卡点 / 明亮调色',
      duration: '0:28',
      cover: 'assets/images/thumbs/06.jpg',
      // 【小红书链接填入处 4】
      xhsUrl: 'https://www.xiaohongshu.com/explore',
      videoSrc: ''
    }
  ];

  // ==========================================================================
  // Horizontal Stream Presentation Bar
  // ==========================================================================
  try {
    localStorage.removeItem('portfolio_view');
  } catch (e) {}

  // ==========================================================================
  // Horizontal Draggable Gallery Engine (Ultra-Smooth Physics & Momentum Drag)
  // ==========================================================================
  let isDragMoved = false;

  function initHorizontalGallery() {
    const track = document.getElementById('editorialStream');
    if (!track) return;

    let isDown = false;
    let startX = 0;
    let scrollStartX = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let momentumRaf = null;

    // Disallow default browser image drag
    track.querySelectorAll('img').forEach(img => {
      img.setAttribute('draggable', 'false');
    });

    function cancelMomentum() {
      if (momentumRaf) {
        cancelAnimationFrame(momentumRaf);
        momentumRaf = null;
      }
    }

    // 1. Mouse Down
    track.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // Only left mouse button
      isDown = true;
      isDragMoved = false;
      cancelMomentum();
      
      track.classList.add('is-dragging');
      startX = e.pageX;
      scrollStartX = track.scrollLeft;
      lastX = e.pageX;
      lastTime = performance.now();
      velocity = 0;
    });

    // 2. Mouse Move
    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      
      const x = e.pageX;
      const dx = x - startX;

      if (Math.abs(dx) > 6) {
        isDragMoved = true;
      }

      track.scrollLeft = scrollStartX - dx;

      // Track instantaneous velocity
      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 8) {
        velocity = (x - lastX) / dt;
        lastX = x;
        lastTime = now;
      }

      updateHorizProgress();
    });

    // 3. Mouse Up / End Drag
    function onDragEnd() {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('is-dragging');

      // Launch silky exponential friction momentum
      if (Math.abs(velocity) > 0.12) {
        let speed = velocity * 18;
        const friction = 0.94;

        function inertiaStep() {
          if (Math.abs(speed) < 0.25) {
            cancelMomentum();
            updateHorizProgress();
            return;
          }
          track.scrollLeft -= speed;
          speed *= friction;
          updateHorizProgress();
          momentumRaf = requestAnimationFrame(inertiaStep);
        }

        cancelMomentum();
        momentumRaf = requestAnimationFrame(inertiaStep);
      }

      // Briefly keep isDragMoved true to prevent instant accidental click on release
      setTimeout(() => {
        isDragMoved = false;
      }, 80);
    }

    window.addEventListener('mouseup', onDragEnd);

    // 4. Mouse Wheel translation
    track.addEventListener('wheel', (e) => {
      // If user is doing horizontal swipe on trackpad, let browser handle natively
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const maxScroll = track.scrollWidth - track.clientWidth;
      const isAtStart = track.scrollLeft <= 5;
      const isAtEnd = track.scrollLeft >= maxScroll - 5;

      // Allow natural page vertical scroll when reaching either boundary
      if ((isAtStart && e.deltaY < 0) || (isAtEnd && e.deltaY > 0)) {
        return;
      }

      e.preventDefault();
      cancelMomentum();
      track.scrollLeft += e.deltaY * 0.9;
      updateHorizProgress();
    }, { passive: false });

    // 5. Track native scroll events (for touch devices, trackpads, etc.)
    track.addEventListener('scroll', updateHorizProgress, { passive: true });

    // 6. Update Progress and Slide Number
    function updateHorizProgress() {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const pBar = document.getElementById('horizProgressBar');
      const curNum = document.getElementById('horizCurrentNum');
      const totalNum = document.getElementById('horizTotalNum');

      const items = track.querySelectorAll('.editorial-item');
      const count = items.length || (window.PortfolioData && window.PortfolioData.photography && window.PortfolioData.photography.length) || 7;

      if (totalNum) {
        totalNum.textContent = String(count).padStart(2, '0');
      }

      if (maxScroll > 0) {
        const ratio = Math.min(1, Math.max(0, track.scrollLeft / maxScroll));
        if (pBar) {
          const stepPct = 100 / count;
          const pct = stepPct + ratio * (100 - stepPct);
          pBar.style.width = pct + '%';
        }
      }

      if (items.length > 0 && curNum) {
        const itemWidth = items[0].offsetWidth + 35; // width + gap
        const activeIdx = Math.min(items.length - 1, Math.max(0, Math.round(track.scrollLeft / itemWidth)));
        curNum.textContent = String(activeIdx + 1).padStart(2, '0');
      }
    }

    // 7. Arrow buttons smooth glide
    const prevBtn = document.getElementById('horizPrevBtn');
    const nextBtn = document.getElementById('horizNextBtn');
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cancelMomentum();
        const item = track.querySelector('.editorial-item');
        const step = item ? item.offsetWidth + 35 : 640;
        track.scrollBy({ left: -step, behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cancelMomentum();
        const item = track.querySelector('.editorial-item');
        const step = item ? item.offsetWidth + 35 : 640;
        track.scrollBy({ left: step, behavior: 'smooth' });
      });
    }

    // Initial calculation
    updateHorizProgress();
  }

  initHorizontalGallery();

  // ==========================================================================
  // Video Section Horizontal Draggable Stream (Centering, Physics & Blur Depth)
  // ==========================================================================
  let isVideoDragMoved = false;

  function initVideoHorizontalGallery() {
    const track = document.getElementById('videoStream');
    if (!track) return;

    let isDown = false;
    let startX = 0;
    let scrollStartX = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let momentumRaf = null;
    let wheelSnapTimeout = null;
    let currentActiveIdx = 0;

    track.querySelectorAll('img').forEach(img => {
      img.setAttribute('draggable', 'false');
    });

    function cancelMomentum() {
      if (momentumRaf) {
        cancelAnimationFrame(momentumRaf);
        momentumRaf = null;
      }
    }

    // Dynamic padding calculation ensures Card 0 is centered at scrollLeft = 0,
    // and the last card is centered when scrolled to max.
    function updateTrackPadding() {
      const firstCard = track.querySelector('.video-card');
      if (!firstCard) return;
      const cardW = firstCard.offsetWidth;
      const pad = Math.max(16, Math.floor((track.clientWidth - cardW) / 2));
      track.style.paddingLeft = pad + 'px';
      track.style.paddingRight = pad + 'px';
    }

    function getCardCenterScrollLeft(card) {
      if (!card) return 0;
      const trackRect = track.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const trackCenter = trackRect.left + trackRect.width / 2;
      const cardCenter = cardRect.left + cardRect.width / 2;
      const diff = cardCenter - trackCenter;
      const target = track.scrollLeft + diff;
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      return Math.min(maxScroll, Math.max(0, Math.round(target)));
    }

    function scrollToCardIndex(idx) {
      const cards = track.querySelectorAll('.video-card');
      if (!cards.length) return;
      const targetIdx = Math.max(0, Math.min(cards.length - 1, idx));
      const targetCard = cards[targetIdx];
      const targetLeft = getCardCenterScrollLeft(targetCard);
      cancelMomentum();
      track.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }

    function snapToClosestCard() {
      const cards = track.querySelectorAll('.video-card');
      if (!cards.length) return;
      const targetCard = cards[currentActiveIdx];
      if (!targetCard) return;
      const targetLeft = getCardCenterScrollLeft(targetCard);
      if (Math.abs(track.scrollLeft - targetLeft) > 3) {
        track.scrollTo({ left: targetLeft, behavior: 'smooth' });
      }
    }

    function updateVideoHorizProgress() {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const pBar = document.getElementById('videoHorizProgressBar');
      const curNum = document.getElementById('videoHorizCurrentNum');
      const totalNum = document.getElementById('videoHorizTotalNum');

      const cards = track.querySelectorAll('.video-card');
      const count = cards.length || (window.PortfolioData && window.PortfolioData.videoReels && window.PortfolioData.videoReels.length) || 4;

      if (totalNum) {
        totalNum.textContent = String(count).padStart(2, '0');
      }

      if (maxScroll > 0) {
        const ratio = Math.min(1, Math.max(0, track.scrollLeft / maxScroll));
        if (pBar) {
          const stepPct = 100 / count;
          const pct = stepPct + ratio * (100 - stepPct);
          pBar.style.width = pct + '%';
        }
      }

      if (cards.length > 0) {
        const trackRect = track.getBoundingClientRect();
        const trackCenter = trackRect.left + trackRect.width / 2;

        let activeIdx = 0;
        let minDiff = Infinity;

        cards.forEach((card, idx) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const diff = Math.abs(cardCenter - trackCenter);

          if (diff < minDiff) {
            minDiff = diff;
            activeIdx = idx;
          }
        });

        currentActiveIdx = activeIdx;

        // Apply focus to centered card, blur to left and right cards
        cards.forEach((card, idx) => {
          if (idx === activeIdx) {
            card.classList.add('is-active');
            card.classList.remove('is-blurred');
          } else {
            card.classList.add('is-blurred');
            card.classList.remove('is-active');
          }
        });

        if (curNum) {
          curNum.textContent = String(activeIdx + 1).padStart(2, '0');
        }
      }
    }

    track.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      if (e.target.closest('.btn-video-preview') || e.target.closest('.btn-video-link')) return;
      isDown = true;
      isVideoDragMoved = false;
      cancelMomentum();
      
      track.classList.add('is-dragging');
      startX = e.pageX;
      scrollStartX = track.scrollLeft;
      lastX = e.pageX;
      lastTime = performance.now();
      velocity = 0;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      const x = e.pageX;
      const dx = x - startX;
      if (Math.abs(dx) > 6) {
        isVideoDragMoved = true;
      }
      track.scrollLeft = scrollStartX - dx;

      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 8) {
        velocity = (x - lastX) / dt;
        lastX = x;
        lastTime = now;
      }
      updateVideoHorizProgress();
    });

    function onDragEnd() {
      if (!isDown) return;
      isDown = false;
      track.classList.remove('is-dragging');

      if (Math.abs(velocity) > 0.12) {
        let speed = velocity * 18;
        const friction = 0.94;

        function inertiaStep() {
          if (Math.abs(speed) < 0.25) {
            cancelMomentum();
            updateVideoHorizProgress();
            snapToClosestCard();
            return;
          }
          track.scrollLeft -= speed;
          speed *= friction;
          updateVideoHorizProgress();
          momentumRaf = requestAnimationFrame(inertiaStep);
        }

        cancelMomentum();
        momentumRaf = requestAnimationFrame(inertiaStep);
      } else {
        snapToClosestCard();
      }

      setTimeout(() => {
        isVideoDragMoved = false;
      }, 80);
    }

    window.addEventListener('mouseup', onDragEnd);

    track.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      const isAtStart = track.scrollLeft <= 5;
      const isAtEnd = track.scrollLeft >= maxScroll - 5;
      if ((isAtStart && e.deltaY < 0) || (isAtEnd && e.deltaY > 0)) {
        return;
      }
      e.preventDefault();
      cancelMomentum();
      if (wheelSnapTimeout) clearTimeout(wheelSnapTimeout);
      track.scrollLeft += e.deltaY * 0.9;
      updateVideoHorizProgress();
      wheelSnapTimeout = setTimeout(() => {
        snapToClosestCard();
      }, 140);
    }, { passive: false });

    track.addEventListener('scroll', updateVideoHorizProgress, { passive: true });

    // Click on adjacent blurred card to smoothly center it
    track.addEventListener('click', (e) => {
      if (isVideoDragMoved) return;
      const card = e.target.closest('.video-card');
      if (!card) return;
      if (card.classList.contains('is-blurred')) {
        e.preventDefault();
        e.stopPropagation();
        const cards = Array.from(track.querySelectorAll('.video-card'));
        const idx = cards.indexOf(card);
        if (idx !== -1) {
          scrollToCardIndex(idx);
        }
      }
    });

    const prevBtn = document.getElementById('videoHorizPrevBtn');
    const nextBtn = document.getElementById('videoHorizNextBtn');
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToCardIndex(currentActiveIdx - 1);
      });
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToCardIndex(currentActiveIdx + 1);
      });
    }

    window.addEventListener('resize', () => {
      updateTrackPadding();
      updateVideoHorizProgress();
    });

    updateTrackPadding();
    updateVideoHorizProgress();

    window.refreshVideoGalleryCentering = () => {
      updateTrackPadding();
      updateVideoHorizProgress();
    };
  }

  initVideoHorizontalGallery();

  // ==========================================================================
  // Theme Switcher (Light Exhibition default vs Dark Gallery)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  // Default to 'light' (Day mode)
  let savedTheme = localStorage.getItem('portfolio_theme_mode');
  if (!savedTheme) {
    // Clear old legacy 'dark' auto-save if present
    localStorage.removeItem('portfolio_theme');
    savedTheme = 'light';
  }

  function applyTheme(theme, save = false) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    if (save) {
      localStorage.setItem('portfolio_theme_mode', theme);
    }
  }

  applyTheme(savedTheme, false);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next, true);
      showToast(next === 'light' ? '白天模式 (Light Exhibition)' : '夜色画廊模式 (Dark Gallery)');
    });
  }

  // ==========================================================================
  // Photo Lightbox Implementation
  // ==========================================================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxSubtitle = document.getElementById('lightboxSubtitle');
  const lightboxRawLink = document.getElementById('lightboxRawLink');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxZoomBtn = document.getElementById('lightboxZoomBtn');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');
  const lightboxImgWrap = document.getElementById('lightboxImgWrap');

  let currentPhotoIndex = 0;
  let isZoomed = false;

  function openLightbox(index) {
    currentPhotoIndex = index;
    isZoomed = false;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    resetZoom();
  }

  function updateLightboxContent() {
    const item = galleryWorks[currentPhotoIndex];
    if (!item) return;

    resetZoom();
    // Check custom image and titles in PortfolioData
    const pCustom = (window.PortfolioData && window.PortfolioData.photography && window.PortfolioData.photography[currentPhotoIndex])
      ? window.PortfolioData.photography[currentPhotoIndex]
      : null;

    const customTitle = (window.PortfolioData && window.PortfolioData.customTexts && window.PortfolioData.customTexts[`photo_${currentPhotoIndex}_title`]);
    const customTitleEn = (window.PortfolioData && window.PortfolioData.customTexts && window.PortfolioData.customTexts[`photo_${currentPhotoIndex}_title_en`]);

    const imgSrc = (pCustom && pCustom.image) ? pCustom.image : item.webSrc;
    lightboxImg.src = imgSrc;
    lightboxImg.alt = `${item.title} - ${item.titleEn}`;
    const totalCountStr = String(galleryWorks.length).padStart(2, '0');
    lightboxCounter.textContent = `[ ${item.num || String(currentPhotoIndex + 1).padStart(2, '0')} / ${totalCountStr} ]`;
    lightboxTitle.textContent = (customTitle && customTitle.trim() !== '') ? customTitle : ((pCustom && pCustom.title) || item.title);
    lightboxSubtitle.textContent = (customTitleEn && customTitleEn.trim() !== '') ? customTitleEn : ((pCustom && pCustom.titleEn) || item.titleEn);
    lightboxRawLink.href = (pCustom && pCustom.image) || item.rawSrc;
  }

  function showNextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % galleryWorks.length;
    updateLightboxContent();
  }

  function showPrevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + galleryWorks.length) % galleryWorks.length;
    updateLightboxContent();
  }

  function toggleZoom() {
    isZoomed = !isZoomed;
    if (isZoomed) {
      lightboxImgWrap.style.transform = 'scale(1.5)';
      lightboxImgWrap.style.cursor = 'zoom-out';
      if (lightboxZoomBtn) lightboxZoomBtn.setAttribute('title', '缩小 / Reset Zoom');
    } else {
      resetZoom();
    }
  }

  function resetZoom() {
    isZoomed = false;
    if (lightboxImgWrap) {
      lightboxImgWrap.style.transform = 'scale(1)';
      lightboxImgWrap.style.cursor = 'zoom-in';
    }
    if (lightboxZoomBtn) lightboxZoomBtn.setAttribute('title', '放大 / Zoom 100%');
  }

  // Click triggers for photo gallery (Suppress if dragging was performed)
  document.querySelectorAll('[data-gallery-index]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      if (isDragMoved) return; // Prevent accidental click while dragging horizontally
      const index = parseInt(el.getAttribute('data-gallery-index'), 10);
      if (!isNaN(index)) {
        openLightbox(index);
      }
    });
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrevPhoto(); });
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNextPhoto(); });
  if (lightboxZoomBtn) lightboxZoomBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleZoom(); });
  if (lightboxImgWrap) lightboxImgWrap.addEventListener('click', (e) => {
    if (e.target === lightboxImg) {
      toggleZoom();
    }
  });

  // Close photo lightbox on backdrop click
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-body')) {
        closeLightbox();
      }
    });
  }

  // ==========================================================================
  // Video Preview Modal Implementation (小红书视频直接预览)
  // ==========================================================================
  const videoModal = document.getElementById('videoModal');
  const videoModalTitle = document.getElementById('videoModalTitle');
  const videoModalSub = document.getElementById('videoModalSub');
  const videoIframe = document.getElementById('videoIframe');
  const videoPlayer = document.getElementById('videoPlayer');
  const videoModalCloseBtn = document.getElementById('videoModalCloseBtn');
  const btnOpenXhs = document.getElementById('btnOpenXhs');
  const btnCopyVideoLink = document.getElementById('btnCopyVideoLink');

  let currentVideoIndex = 0;

  function openVideoModal(index) {
    const item = videoWorks[index];
    if (!item) return;

    currentVideoIndex = index;
    const vCustom = (window.PortfolioData && window.PortfolioData.videoReels && window.PortfolioData.videoReels[index])
      ? window.PortfolioData.videoReels[index]
      : null;

    const customTitle = (window.PortfolioData && window.PortfolioData.customTexts && window.PortfolioData.customTexts[`video_${index}_title`]);
    const customTitleEn = (window.PortfolioData && window.PortfolioData.customTexts && window.PortfolioData.customTexts[`video_${index}_title_en`]);
    const customCat = (window.PortfolioData && window.PortfolioData.customTexts && window.PortfolioData.customTexts[`video_${index}_cat`]);

    const displayTitle = (customTitle && customTitle.trim() !== '') ? customTitle : item.title;
    const displayTitleEn = (customTitleEn && customTitleEn.trim() !== '') ? customTitleEn : item.titleEn;
    const displayCat = (customCat && customCat.trim() !== '') ? customCat : item.category;

    videoModalTitle.textContent = displayTitle;
    videoModalSub.textContent = `${item.num} · ${displayTitleEn} · ${displayCat}`;

    const activeXhsUrl = (vCustom && vCustom.xhsUrl && vCustom.xhsUrl.trim() !== '') ? vCustom.xhsUrl : (item.xhsUrl || '#');
    const activeVideoSrc = (vCustom && vCustom.videoSrc && vCustom.videoSrc.trim() !== '') ? vCustom.videoSrc : (item.videoSrc || '');

    if (btnOpenXhs) {
      btnOpenXhs.href = activeXhsUrl;
    }

    // Check if user provided direct MP4 or Xiaohongshu web URL
    if (activeVideoSrc) {
      // Direct video playback
      if (videoIframe) videoIframe.style.display = 'none';
      if (videoPlayer) {
        videoPlayer.style.display = 'block';
        videoPlayer.src = activeVideoSrc;
        videoPlayer.play().catch(() => {});
      }
    } else {
      // In-site Xiaohongshu embedded iframe
      if (videoPlayer) {
        videoPlayer.pause();
        videoPlayer.style.display = 'none';
        videoPlayer.src = '';
      }
      if (videoIframe) {
        videoIframe.style.display = 'block';
        videoIframe.src = activeXhsUrl || 'about:blank';
      }
    }

    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    if (!videoModal) return;
    videoModal.classList.remove('active');
    document.body.style.overflow = '';

    // Stop playback immediately to conserve memory and audio
    if (videoPlayer) {
      videoPlayer.pause();
      videoPlayer.src = '';
    }
    if (videoIframe) {
      videoIframe.src = 'about:blank';
    }
  }

  // Video trigger buttons across the page
  document.querySelectorAll('[data-video-index]').forEach(el => {
    el.addEventListener('click', (e) => {
      // If user was dragging, don't open modal
      if (isVideoDragMoved) return;
      // If clicking external link button specifically, don't hijack
      if (e.target.closest('.btn-video-link')) return;

      e.preventDefault();
      const index = parseInt(el.getAttribute('data-video-index'), 10);
      if (!isNaN(index)) {
        openVideoModal(index);
      }
    });
  });

  if (videoModalCloseBtn) {
    videoModalCloseBtn.addEventListener('click', closeVideoModal);
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });
  }

  if (btnCopyVideoLink) {
    btnCopyVideoLink.addEventListener('click', () => {
      const item = videoWorks[currentVideoIndex];
      const link = (item && item.xhsUrl) ? item.xhsUrl : 'https://www.xiaohongshu.com';
      copyToClipboard(link, '已复制视频链接');
    });
  }

  // ==========================================================================
  // Global Keyboard Navigation
  // ==========================================================================
  window.addEventListener('keydown', (e) => {
    // Video Modal keys
    if (videoModal && videoModal.classList.contains('active')) {
      if (e.key === 'Escape') closeVideoModal();
      return;
    }

    // Photo Lightbox keys
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNextPhoto();
      if (e.key === 'ArrowLeft') showPrevPhoto();
      if (e.key.toLowerCase() === 'z' || e.key.toLowerCase() === 'f') toggleZoom();
    }
  });

  // Touch swipe support for photo lightbox
  let touchStartX = 0;
  let touchStartY = 0;
  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
        if (diffX > 0) {
          showPrevPhoto();
        } else {
          showNextPhoto();
        }
      }
    }, { passive: true });
  }

  // ==========================================================================
  // Dynamic Contact Copy & Social Interaction System
  // ==========================================================================

  function copyToClipboard(text, successMsg) {
    if (!text) return;
    const cleanText = text.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cleanText).then(() => {
        showToast(successMsg || `已复制: ${cleanText}`);
      }).catch(() => {
        fallbackCopy(cleanText, successMsg);
      });
    } else {
      fallbackCopy(cleanText, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.top = '-9999px';
    ta.style.left = '-9999px';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
      showToast(successMsg || `已复制: ${text}`);
    } catch (e) {
      showToast(`已选定: ${text}`);
    }
    document.body.removeChild(ta);
  }

  // 1. Email Box Copy Handler
  const emailBox = document.getElementById('emailBox');
  if (emailBox) {
    emailBox.addEventListener('click', () => {
      const emailTextEl = document.getElementById('contactEmailText');
      let email = (emailTextEl ? emailTextEl.innerText.trim() : '') ||
                  (window.PortfolioData && window.PortfolioData.customTexts && window.PortfolioData.customTexts.contact_email) ||
                  (window.PortfolioData && window.PortfolioData.contact && window.PortfolioData.contact.email) ||
                  (emailBox.getAttribute('data-email') || '').trim();
      if (!email) email = 'alex.lens@archive.com';
      copyToClipboard(email, `已复制邮箱: ${email}`);
    });
  }

  // 2. WeChat Button Copy Handler
  const wechatLink = document.getElementById('wechatLink');
  if (wechatLink) {
    wechatLink.addEventListener('click', (e) => {
      e.preventDefault();
      const wechatEl = document.getElementById('wechatText');
      let raw = (wechatEl ? wechatEl.innerText.trim() : '') ||
                (window.PortfolioData && window.PortfolioData.customTexts && window.PortfolioData.customTexts.contact_wechat) ||
                '';
      let wechatId = raw;
      if (raw.includes(':') || raw.includes('：')) {
        const parts = raw.split(/[:：]/);
        const candidate = parts[parts.length - 1].trim();
        if (candidate) wechatId = candidate;
      }
      if (!wechatId) wechatId = 'alex_photo';
      copyToClipboard(wechatId, `已复制微信号: ${wechatId}`);
    });
  }

  // 3. Bilibili Link: Native direct navigation to custom URL (target="_blank")

  // ==========================================================================
  // Toast Notification System
  // ==========================================================================
  const toast = document.getElementById('toastNotice');
  let toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // ==========================================================================
  // Mobile Navigation Menu
  // ==========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const siteHeader = document.querySelector('.site-header');

  if (mobileMenuBtn && siteHeader) {
    mobileMenuBtn.addEventListener('click', () => {
      siteHeader.classList.toggle('mobile-open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        siteHeader.classList.remove('mobile-open');
      });
    });
  }

  // ==========================================================================
  // Smooth Back to Top
  // ==========================================================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // Active Navigation Link on Scroll
  // ==========================================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // ==========================================================================
  // Global Refresh Interactions Hook (Called after dynamic items are rendered)
  // ==========================================================================
  window.refreshGalleryInteractions = function() {
    if (window.PortfolioData && Array.isArray(window.PortfolioData.photography)) {
      galleryWorks = window.PortfolioData.photography.map((item, idx) => ({
        id: idx + 1,
        num: item.num || String(idx + 1).padStart(2, '0'),
        title: item.title || '',
        titleEn: item.titleEn || '',
        category: (item.spec1 ? item.spec1 + ' · ' : '') + (item.spec2 || ''),
        specs: (item.spec1 || '') + ' · ' + (item.spec2 || '') + ' · ' + (item.spec3 || ''),
        webSrc: item.image || `assets/images/web/0${idx + 1}.jpg`,
        thumbSrc: item.thumb || item.image || `assets/images/thumbs/0${idx + 1}.jpg`,
        rawSrc: item.raw || item.image,
        aspect: '3/4'
      }));
    }

    if (window.PortfolioData && Array.isArray(window.PortfolioData.videoReels)) {
      videoWorks = window.PortfolioData.videoReels.map((item, idx) => ({
        id: idx + 1,
        num: item.num || String(idx + 1).padStart(2, '0'),
        title: item.title || '',
        titleEn: item.titleEn || '',
        category: item.category || '',
        duration: item.duration || '0:30',
        cover: item.cover || `assets/images/thumbs/0${idx + 1}.jpg`,
        xhsUrl: item.xhsUrl || '',
        videoSrc: item.videoSrc || ''
      }));
    }

    // Update Counter & Progress Elements
    const horizTotalNum = document.getElementById('horizTotalNum');
    if (horizTotalNum) {
      horizTotalNum.textContent = String(galleryWorks.length).padStart(2, '0');
    }
    const lightboxCounter = document.getElementById('lightboxCounter');
    if (lightboxCounter) {
      lightboxCounter.textContent = `[ 01 / ${String(galleryWorks.length).padStart(2, '0')} ]`;
    }

    // Rebind Photo click triggers
    document.querySelectorAll('[data-gallery-index]').forEach(el => {
      el.onclick = (e) => {
        e.preventDefault();
        if (isDragMoved) return;
        const index = parseInt(el.getAttribute('data-gallery-index'), 10);
        if (!isNaN(index)) openLightbox(index);
      };
    });

    // Rebind Video click triggers
    document.querySelectorAll('[data-video-index]').forEach(el => {
      el.onclick = (e) => {
        if (isVideoDragMoved) return;
        if (e.target.closest('.btn-video-link')) return;
        e.preventDefault();
        const index = parseInt(el.getAttribute('data-video-index'), 10);
        if (!isNaN(index)) openVideoModal(index);
      };
    });

    // Update Track calculations
    const track = document.getElementById('editorialStream');
    if (track) {
      track.querySelectorAll('img').forEach(img => img.setAttribute('draggable', 'false'));
      const maxScroll = track.scrollWidth - track.clientWidth;
      const pBar = document.getElementById('horizProgressBar');
      if (pBar && maxScroll > 0) {
        const ratio = Math.min(1, Math.max(0, track.scrollLeft / maxScroll));
        const stepPct = 100 / galleryWorks.length;
        const pct = stepPct + ratio * (100 - stepPct);
        pBar.style.width = pct + '%';
      }
    }

    const vTrack = document.getElementById('videoStream');
    if (vTrack) {
      vTrack.querySelectorAll('img').forEach(img => img.setAttribute('draggable', 'false'));
      if (window.refreshVideoGalleryCentering) {
        window.refreshVideoGalleryCentering();
      }
    }
  };

  // ==========================================================================
  // Ambient Dynamic Light & Shadow Subtle Mouse Parallax
  // ==========================================================================
  (function initAmbientLightParallax() {
    const bgContainer = document.getElementById('ambientLightBg');
    if (!bgContainer) return;

    const leavesDeep = document.getElementById('dappledLeavesDeep');
    const leavesFront = document.getElementById('dappledLeavesFront');
    const prismLayer = document.getElementById('prismCausticsLayer');

    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let ticking = false;

    window.addEventListener('mousemove', (e) => {
      // Normalized between -1 and 1
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;

      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });

    function updateParallax() {
      // Smooth dampening
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      if (leavesDeep) {
        leavesDeep.style.transform = `translate3d(${-currentX * 18}px, ${-currentY * 12}px, 0)`;
      }
      if (leavesFront) {
        leavesFront.style.transform = `translate3d(${-currentX * 28}px, ${-currentY * 18}px, 0)`;
      }
      if (prismLayer) {
        prismLayer.style.transform = `translate3d(${currentX * 22}px, ${currentY * 15}px, 0)`;
      }

      // Keep animating if not settled
      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        requestAnimationFrame(updateParallax);
      } else {
        ticking = false;
      }
    }
  })();

});