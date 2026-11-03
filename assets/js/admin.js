/**
 * Photography & Motion Portfolio - Content Management Engine (Frontend Integration)
 * Clean, lightweight, reliable data binding and admin navigation
 */

const STORAGE_KEY = "alex_portfolio_custom_data";
const AUTH_KEY = "alex_portfolio_admin_auth";
const DEFAULT_PIN = "8888";

// Global data store
window.PortfolioData = null;

// ==========================================================================
// 1. Data Loader & Synchronizer
// ==========================================================================

async function loadPortfolioData() {
  // 1. Fetch from server first to get the authoritative latest disk data
  try {
    const url = (window.location.protocol.startsWith('http') && (window.location.port === '8765' || !window.location.port))
      ? 'assets/data/portfolio_data.json?t=' + Date.now()
      : 'http://127.0.0.1:8765/assets/data/portfolio_data.json?t=' + Date.now();
    const resp = await fetch(url);
    if (resp.ok) {
      const serverData = await resp.json();
      window.PortfolioData = serverData;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(serverData));
      } catch (e) {}
      return window.PortfolioData;
    }
  } catch (err) {
    console.warn("Could not fetch server JSON file, falling back to localStorage", err);
  }

  // 2. Fallback to localStorage if offline
  const local = localStorage.getItem(STORAGE_KEY);
  if (local) {
    try {
      window.PortfolioData = JSON.parse(local);
    } catch (e) {
      console.error("Failed to parse localStorage data", e);
    }
  }

  return window.PortfolioData;
}

// ==========================================================================
// 2. Apply Custom Texts & Dynamic Media to DOM
// ==========================================================================

function renderDynamicPhotographyDOM(photographyList, customTexts) {
  const editorialStream = document.getElementById('editorialStream');
  if (!editorialStream || !Array.isArray(photographyList)) return;

  const ct = customTexts || {};

  // Build Editorial Stream
  editorialStream.innerHTML = photographyList.map((item, idx) => {
    if (!item) return '';
    const isReversed = idx % 2 === 1 ? ' reversed' : '';
    const num = item.num || String(idx + 1).padStart(2, '0');
    const title = ct[`photo_${idx}_title`] || item.title || '';
    const titleEn = ct[`photo_${idx}_title_en`] || item.titleEn || '';
    const desc = ct[`photo_${idx}_desc`] || item.desc || '';
    const spec1 = ct[`photo_${idx}_spec1`] || item.spec1 || '';
    const spec2 = ct[`photo_${idx}_spec2`] || item.spec2 || '';
    const spec3 = ct[`photo_${idx}_spec3`] || item.spec3 || '';
    const viewPill = ct[`photo_${idx}_view_pill`] || item.viewPill || 'VIEW · 全屏观赏';
    const imgSrc = item.image || `assets/images/web/0${idx + 1}.jpg`;

    return `
      <article class="editorial-item${isReversed}">
        <div class="editorial-media image-replace-wrap" data-gallery-index="${idx}" data-img-key="photography[${idx}].image" title="点击展开全屏赏析">
          <img id="photoImg_${idx}" src="${imgSrc}" alt="${title || '作品'}" loading="lazy" draggable="false">
          <div class="media-hover-overlay">
            <span class="view-pill" data-text-id="photo_${idx}_view_pill">${viewPill}</span>
          </div>
        </div>
        <div class="editorial-info">
          <span class="item-index" data-text-id="photo_${idx}_index">${num}</span>
          <h2 class="item-title">
            <span data-text-id="photo_${idx}_title">${title}</span>
            <span class="item-title-en" data-text-id="photo_${idx}_title_en">${titleEn}</span>
          </h2>
          <p class="item-desc" data-text-id="photo_${idx}_desc">${desc}</p>
          <div class="item-specs">
            <span data-text-id="photo_${idx}_spec1">${spec1}</span>
            <span>·</span>
            <span data-text-id="photo_${idx}_spec2">${spec2}</span>
            <span>·</span>
            <span data-text-id="photo_${idx}_spec3">${spec3}</span>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function renderDynamicVideoDOM(videoList, customTexts) {
  const videoGrid = document.querySelector('.video-grid, .video-horizontal-stream');
  if (!videoGrid || !Array.isArray(videoList)) return;

  const totalNum = document.getElementById('videoHorizTotalNum');
  if (totalNum) {
    totalNum.textContent = String(videoList.length).padStart(2, '0');
  }

  const ct = customTexts || {};

  videoGrid.innerHTML = videoList.map((item, idx) => {
    if (!item) return '';
    const num = item.num || String(idx + 1).padStart(2, '0');
    const title = ct[`video_${idx}_title`] || item.title || '';
    const titleEn = ct[`video_${idx}_title_en`] || item.titleEn || '';
    const cat = ct[`video_${idx}_cat`] || item.category || '';
    const badge = ct[`video_${idx}_badge`] || item.badge || 'RED · 小红书';
    const duration = ct[`video_${idx}_duration`] || item.duration || '0:30';
    const btnHint = ct[`video_${idx}_btn_hint`] || item.btnHint || 'PREVIEW · 预览视频';
    const btnPreview = ct[`video_${idx}_btn_preview`] || item.btnPreview || '▶ 在线预览';
    const coverSrc = item.cover || `assets/images/thumbs/0${idx + 1}.jpg`;
    const xhsUrl = item.xhsUrl || 'https://www.xiaohongshu.com/explore';

    return `
      <article class="video-card">
        <div class="video-poster-box image-replace-wrap" data-video-index="${idx}" data-img-key="videoReels[${idx}].cover" title="点击预览视频">
          <img id="videoCover_${idx}" src="${coverSrc}" alt="剪辑作品 ${num} 封面" loading="lazy">
          <div class="video-play-overlay">
            <div class="play-circle-btn">
              <svg viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>
            </div>
            <span class="play-hint-text" data-text-id="video_${idx}_btn_hint">${btnHint}</span>
          </div>
          <div class="video-platform-badge">
            <span class="dot"></span>
            <span class="txt" data-text-id="video_${idx}_badge">${badge}</span>
          </div>
          <span class="video-duration-badge" data-text-id="video_${idx}_duration">${duration}</span>
        </div>
        <div class="video-card-info">
          <div class="video-card-top-row">
            <span class="video-card-num" data-text-id="video_${idx}_num">${num}</span>
            <span class="video-card-cat" data-text-id="video_${idx}_cat">${cat}</span>
          </div>
          <h3 class="video-card-title">
            <span data-text-id="video_${idx}_title">${title}</span>
            <span class="video-card-title-en" data-text-id="video_${idx}_title_en">${titleEn}</span>
          </h3>
          <div class="video-card-actions">
            <button class="btn-video-preview" data-video-index="${idx}">
              <span data-text-id="video_${idx}_btn_preview">${btnPreview}</span>
            </button>
            <a id="videoLinkBtn_${idx}" class="btn-video-link" href="${xhsUrl}" target="_blank" rel="noopener" title="在小红书查看原帖">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function applyCustomTextsToDOM(data) {
  if (!data) return;

  // 1. Render Dynamic Photography items
  if (Array.isArray(data.photography) && data.photography.length > 0) {
    renderDynamicPhotographyDOM(data.photography, data.customTexts);
  }

  // 2. Render Dynamic Video Reels
  if (Array.isArray(data.videoReels) && data.videoReels.length > 0) {
    renderDynamicVideoDOM(data.videoReels, data.customTexts);
  }

  // 3. Apply all 149+ customTexts
  if (data.customTexts) {
    document.querySelectorAll('[data-text-id]').forEach(el => {
      const tid = el.getAttribute('data-text-id');
      if (data.customTexts[tid] !== undefined && data.customTexts[tid] !== '') {
        el.innerHTML = data.customTexts[tid];
      }
    });
  }

  // 4. Apply About portrait image
  if (data.about && data.about.portraitImg) {
    const meImg = document.getElementById('aboutPortraitImg');
    if (meImg) meImg.src = data.about.portraitImg;
  }

  // 5. Apply Contact links & copy attributes
  const emailVal = (data.contact && data.contact.email) || (data.customTexts && data.customTexts.contact_email);
  if (emailVal) {
    const emailBox = document.getElementById('emailBox');
    if (emailBox) emailBox.setAttribute('data-email', emailVal);
    const emailText = document.getElementById('contactEmailText');
    if (emailText) emailText.textContent = emailVal;
  }
  const wechatVal = (data.contact && data.contact.wechat) || (data.customTexts && data.customTexts.contact_wechat);
  if (wechatVal) {
    const wechatText = document.getElementById('wechatText');
    if (wechatText) wechatText.textContent = wechatVal;
  }
  if (data.contact && data.contact.bilibili) {
    setDomHref('contactBiliLink', data.contact.bilibili);
  }

  // 6. Apply Custom Font Sizes
  if (data.fontSizes) {
    applyCustomFontSizesToDOM(data.fontSizes);
  }

  // 7. Rebind interactions (clicks, lightbox, video modal, drag track)
  if (typeof window.refreshGalleryInteractions === 'function') {
    window.refreshGalleryInteractions();
  }
}

// Global typography selector mapping
const FONT_SIZE_SELECTORS = {
  brand_title: '.brand-title',
  brand_subtitle: '.brand-subtitle',
  nav_links: '.nav-link',
  status_badge: '.status-badge, .status-badge span',
  hero_eyebrow: '.hero-eyebrow .mono-tag, #heroEyebrow',
  hero_title: '.hero-title',
  hero_statement: '.hero-statement',
  hero_meta_label: '.hero-meta-label',
  hero_meta_val: '.hero-meta-val',
  
  // Section 01: Photography Works Header
  series_title: '[data-text-id="series_title"]',

  photo_index: '.item-index',
  photo_title: '.item-title',
  photo_title_en: '.item-title-en',
  photo_desc: '.item-desc',
  photo_specs: '.item-specs, .item-specs span',

  // Section 02: Motion & Editing Header
  video_title: '[data-text-id="video_title"]',

  video_card_title: '.video-card-title',
  video_card_cat: '.video-card-top-row, .video-card-num, .video-card-cat',
  about_eyebrow: '.about-text-col .mono-tag',
  about_title: '.about-title',
  about_title_en: '.about-title span',
  about_philosophy: '.about-philosophy',
  about_philosophy_sub: '.about-philosophy-sub',
  about_spec_label: '.spec-label',
  about_spec_val: '.spec-value',
  contact_eyebrow: '.contact-header .mono-tag',
  contact_title: '.contact-title',
  contact_email: '.contact-card-val, .email-text',
  footer_text: '.site-footer'
};

function applyCustomFontSizesToDOM(fontSizes) {
  if (!fontSizes || typeof fontSizes !== 'object') return;
  let styleEl = document.getElementById('customFontSizesStyle');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'customFontSizesStyle';
    document.head.appendChild(styleEl);
  }

  const cssRules = [];
  for (const [key, selector] of Object.entries(FONT_SIZE_SELECTORS)) {
    if (fontSizes[key]) {
      const val = typeof fontSizes[key] === 'number' ? `${fontSizes[key]}px` : fontSizes[key];
      cssRules.push(`${selector} { font-size: ${val} !important; }`);
    }
  }
  styleEl.textContent = cssRules.join('\n');
}

function setDomHref(id, href) {
  if (!href) return;
  const el = document.getElementById(id);
  if (el) el.href = href;
}

// ==========================================================================
// 3. Admin Trigger Entry on index.html
// ==========================================================================

function initAdminTrigger() {
  const triggerPill = document.getElementById('adminTriggerPill');
  if (triggerPill) {
    triggerPill.addEventListener('click', (e) => {
      e.preventDefault();
      // Directly open dedicated full-screen Admin Management Dashboard
      window.location.href = 'admin.html';
    });
  }
}

// Auto-run on document ready
document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadPortfolioData();
  if (data) {
    applyCustomTextsToDOM(data);
  }
  initAdminTrigger();
});
