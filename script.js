/* WŁOSKI WÓŁ — interakcje bez bibliotek */
(() => {
  "use strict";

  const doc = document;
  const body = doc.body;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const $ = (selector, scope = doc) => scope.querySelector(selector);
  const $$ = (selector, scope = doc) => Array.from(scope.querySelectorAll(selector));
  // Dane menu pochodzą z aktualnej karty w menu-data.js.
  const MENU_ITEMS = window.WLOSKI_WOL_MENU_ITEMS || [];
  const MENU_CATEGORY_META = window.WLOSKI_WOL_MENU_CATEGORY_META || {};

  const safeSlug = (value) => String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const normalizeSearch = (value) => String(value || "")
    .toLocaleLowerCase("pl")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l");

  const MENU_SEARCH_ALIASES = {
    salami: ["pepperoni"]
  };

  const getFocusable = (scope) => $$([
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])"
  ].join(","), scope).filter((element) => !element.hidden && element.offsetParent !== null);

  /* Preloader */
  const preloader = $("[data-preloader]");
  if (preloader) {
    let preloaderClosed = false;
    const closePreloader = () => {
      if (preloaderClosed || !preloader.isConnected) return;
      preloaderClosed = true;
      preloader.classList.add("is-leaving");
      const remove = () => preloader.remove();
      preloader.addEventListener("transitionend", remove, { once: true });
      window.setTimeout(remove, reducedMotion.matches ? 40 : 240);
    };
    window.setTimeout(closePreloader, reducedMotion.matches ? 20 : 520);
    window.setTimeout(closePreloader, reducedMotion.matches ? 100 : 950);
  }

  /* Header, scroll progress and light parallax */
  const header = $("[data-header]");
  const progress = $("[data-scroll-progress]");
  const parallaxLayers = $$('[data-parallax]');
  let scrollFrame = 0;

  const updateScrollEffects = () => {
    scrollFrame = 0;
    const y = window.scrollY || doc.documentElement.scrollTop;
    if (header) header.classList.toggle("is-scrolled", y > 24);
    if (progress) {
      const total = Math.max(1, doc.documentElement.scrollHeight - window.innerHeight);
      progress.style.transform = `scaleX(${Math.min(1, y / total)})`;
    }

    if (!reducedMotion.matches && finePointer.matches && window.innerWidth > 880) {
      parallaxLayers.forEach((layer) => {
        const rect = layer.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
        const speed = Number(layer.dataset.parallax || 0.08);
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
        layer.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      });
    }
  };

  const requestScrollUpdate = () => {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollEffects);
  };
  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  window.addEventListener("resize", requestScrollUpdate, { passive: true });
  updateScrollEffects();

  /* Mobile navigation */
  const menuToggle = $("[data-menu-toggle]");
  const siteNav = $("[data-site-nav]");
  const navBackdrop = $("[data-nav-backdrop]");
  let navReturnFocus = null;

  const setMenu = (open, returnFocus = true) => {
    if (!menuToggle || !siteNav || !navBackdrop) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
    siteNav.classList.toggle("is-open", open);
    navBackdrop.classList.toggle("is-visible", open);
    navBackdrop.hidden = !open;
    body.classList.toggle("menu-open", open);

    if (open) {
      navReturnFocus = doc.activeElement;
      window.setTimeout(() => getFocusable(siteNav)[0]?.focus(), reducedMotion.matches ? 0 : 180);
    } else if (returnFocus && navReturnFocus instanceof HTMLElement) {
      navReturnFocus.focus();
    }
  };

  menuToggle?.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    setMenu(open);
  });
  navBackdrop?.addEventListener("click", () => setMenu(false));
  $$('a', siteNav || doc.createElement("nav")).forEach((link) => link.addEventListener("click", () => setMenu(false, false)));

  doc.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
      event.preventDefault();
      setMenu(false);
      return;
    }
    if (event.key === "Tab" && menuToggle?.getAttribute("aria-expanded") === "true" && siteNav) {
      const focusable = getFocusable(siteNav);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && doc.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && doc.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 880 && menuToggle?.getAttribute("aria-expanded") === "true") setMenu(false, false);
  }, { passive: true });

  /* Reveal on scroll */
  const revealItems = $$('[data-reveal], .image-reveal');
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -7%" });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  /* Magnetic buttons */
  if (finePointer.matches && !reducedMotion.matches) {
    $$('[data-magnetic]').forEach((button) => {
      button.addEventListener("pointermove", (event) => {
        const rect = button.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.16;
        button.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
      button.addEventListener("pointerleave", () => { button.style.transform = ""; });
    });

    $$('[data-tilt]').forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

  /* Subtle custom cursor; the native cursor remains available. */
  const cursor = $("[data-cursor]");
  if (cursor && finePointer.matches && !reducedMotion.matches) {
    let targetX = -50;
    let targetY = -50;
    let currentX = -50;
    let currentY = -50;
    let cursorFrame = 0;

    const drawCursor = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate3d(-50%, -50%, 0)`;
      cursorFrame = window.requestAnimationFrame(drawCursor);
    };
    const startCursor = () => { if (!cursorFrame) cursorFrame = window.requestAnimationFrame(drawCursor); };
    const stopCursor = () => { window.cancelAnimationFrame(cursorFrame); cursorFrame = 0; };

    doc.addEventListener("pointermove", (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.classList.add("is-visible");
    }, { passive: true });
    doc.addEventListener("pointerover", (event) => {
      if (event.target instanceof Element && event.target.closest("a, button, input, [data-tilt]")) cursor.classList.add("is-active");
    });
    doc.addEventListener("pointerout", (event) => {
      if (event.target instanceof Element && event.target.closest("a, button, input, [data-tilt]")) cursor.classList.remove("is-active");
    });
    doc.addEventListener("visibilitychange", () => doc.hidden ? stopCursor() : startCursor());
    startCursor();
  } else {
    cursor?.remove();
  }


  /* Menu renderer */
  const menuRoot = $("[data-menu-root]");
  const menuToolbar = $("[data-menu-toolbar]");
  const menuCategoryNav = $("[data-menu-categories]");
  const menuCategoryPrev = $("[data-menu-category-prev]");
  const menuCategoryNext = $("[data-menu-category-next]");
  const menuSearch = $("[data-menu-search]");
  const menuEmpty = $("[data-menu-empty]");
  const showMenuError = () => {
    if (menuEmpty) menuEmpty.hidden = false;
    menuToolbar?.classList.remove("is-ready");
  };

  if (menuRoot && MENU_ITEMS.length > 0) {
    try {
      menuEmpty?.remove();
    menuToolbar?.classList.add("is-ready");
    const categories = [...new Set(MENU_ITEMS.map((item) => item.category).filter(Boolean))];
    const sections = [];

    categories.forEach((category, categoryIndex) => {
      const categoryMeta = MENU_CATEGORY_META[category] || {};
      const id = `menu-${safeSlug(category)}`;
      const section = doc.createElement("section");
      section.className = "menu-category";
      section.id = id;
      section.dataset.menuSection = category;

      const heading = doc.createElement("div");
      heading.className = "menu-category__head";
      const title = doc.createElement("h2");
      title.textContent = category;
      const number = doc.createElement("span");
      number.textContent = categoryMeta.label || String(categoryIndex + 1).padStart(2, "0");
      heading.append(title, number);

      const list = doc.createElement("div");
      list.className = "menu-items";
      MENU_ITEMS.filter((item) => item.category === category).forEach((item) => {
        const article = doc.createElement("article");
        article.className = "menu-item";
        article.dataset.menuItem = "";
        article.dataset.menuName = normalizeSearch(item.name || "");
        article.dataset.search = normalizeSearch(`${item.name || ""} ${item.description || ""} ${item.category || ""}`);

        const name = doc.createElement("h3");
        name.textContent = item.name || "";
        const price = doc.createElement("div");
        price.className = "menu-item__price";
        price.textContent = item.price || (Array.isArray(item.prices) ? item.prices.join(" · ") : "");
        article.append(name, price);
        if (item.description) {
          const description = doc.createElement("p");
          description.className = "menu-item__description";
          description.textContent = item.description;
          article.append(description);
        }
        list.append(article);
      });
      section.append(heading, list);
      if (categoryMeta.note) {
        const note = doc.createElement("p");
        note.className = "menu-category__note";
        note.textContent = categoryMeta.note;
        section.append(note);
      }
      menuRoot.append(section);
      sections.push(section);

      if (menuCategoryNav) {
        const button = doc.createElement("button");
        button.className = "menu-category-link";
        button.type = "button";
        button.dataset.menuTarget = id;
        button.textContent = category;
        button.addEventListener("click", () => {
          const top = section.getBoundingClientRect().top + window.scrollY - (window.innerWidth <= 600 ? 138 : 150);
          window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion.matches ? "auto" : "smooth" });
        });
        menuCategoryNav.append(button);
      }
    });

    const categoryButtons = $$('[data-menu-target]', menuCategoryNav || doc);
    const requestedMenuSection = window.location.hash ? doc.getElementById(window.location.hash.slice(1)) : null;
    if (requestedMenuSection) {
      window.requestAnimationFrame(() => requestedMenuSection.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" }));
    }
    if (categoryButtons[0]) categoryButtons[0].classList.add("is-active");

    const updateMenuCategoryScroll = () => {
      if (!menuCategoryNav) return;
      const maxScroll = Math.max(0, menuCategoryNav.scrollWidth - menuCategoryNav.clientWidth);
      if (menuCategoryPrev) menuCategoryPrev.disabled = menuCategoryNav.scrollLeft <= 4;
      if (menuCategoryNext) menuCategoryNext.disabled = menuCategoryNav.scrollLeft >= maxScroll - 4;
    };
    const moveMenuCategories = (direction) => {
      if (!menuCategoryNav) return;
      const distance = Math.max(240, menuCategoryNav.clientWidth * 0.78);
      menuCategoryNav.scrollBy({ left: distance * direction, behavior: reducedMotion.matches ? "auto" : "smooth" });
      window.setTimeout(updateMenuCategoryScroll, reducedMotion.matches ? 0 : 420);
    };
    menuCategoryPrev?.addEventListener("click", () => moveMenuCategories(-1));
    menuCategoryNext?.addEventListener("click", () => moveMenuCategories(1));
    menuCategoryNav?.addEventListener("scroll", updateMenuCategoryScroll, { passive: true });
    window.addEventListener("resize", updateMenuCategoryScroll, { passive: true });
    window.requestAnimationFrame(updateMenuCategoryScroll);
    if ("IntersectionObserver" in window) {
      const menuObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          categoryButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.menuTarget === entry.target.id));
          const activeButton = categoryButtons.find((button) => button.dataset.menuTarget === entry.target.id);
          if (activeButton && menuCategoryNav) {
            const left = activeButton.offsetLeft - (menuCategoryNav.clientWidth - activeButton.offsetWidth) / 2;
            menuCategoryNav.scrollTo({ left: Math.max(0, left), behavior: reducedMotion.matches ? "auto" : "smooth" });
          }
        });
      }, { rootMargin: "-32% 0px -58%", threshold: 0 });
      sections.forEach((section) => menuObserver.observe(section));
    }

    const menuNoResults = doc.createElement("p");
    menuNoResults.className = "menu-no-results";
    menuNoResults.hidden = true;
    menuNoResults.setAttribute("role", "status");
    menuNoResults.setAttribute("aria-live", "polite");
    menuNoResults.textContent = "Nie znaleziono dania pasującego do wyszukiwania.";
    menuRoot.append(menuNoResults);

    menuSearch?.addEventListener("input", () => {
      const query = normalizeSearch(menuSearch.value.trim());
      let visibleCount = 0;
      const aliasTargets = MENU_SEARCH_ALIASES[query] || null;

      $$('[data-menu-item]', menuRoot).forEach((item) => {
        const matchesQuery = aliasTargets
          ? aliasTargets.includes(item.dataset.menuName)
          : item.dataset.search.includes(query);
        item.hidden = Boolean(query) && !matchesQuery;
        if (!item.hidden) visibleCount += 1;
      });

      sections.forEach((section) => {
        const hasVisibleItem = $$('[data-menu-item]', section).some((item) => !item.hidden);
        section.hidden = Boolean(query) && !hasVisibleItem;
      });

      categoryButtons.forEach((button) => {
        const section = doc.getElementById(button.dataset.menuTarget);
        button.hidden = Boolean(query) && Boolean(section?.hidden);
      });

      menuNoResults.hidden = !query || visibleCount > 0;
      window.requestAnimationFrame(updateMenuCategoryScroll);
    });
    } catch {
      menuRoot.replaceChildren();
      showMenuError();
    }
  } else if (menuRoot) {
    showMenuError();
  }

  /* Mobile action bar — hides when the footer enters the viewport. */
  const mobileActions = $("[data-mobile-actions]");
  const siteFooter = $(".site-footer");
  if (mobileActions && siteFooter && "IntersectionObserver" in window) {
    const footerObserver = new IntersectionObserver(([entry]) => {
      mobileActions.classList.toggle("is-footer-visible", entry.isIntersecting);
    }, { threshold: 0.04 });
    footerObserver.observe(siteFooter);
  }

  /* Current year */
  $$('[data-current-year]').forEach((node) => { node.textContent = String(new Date().getFullYear()); });
})();
