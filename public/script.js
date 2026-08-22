(function () {
  var prefixText = "We build";
  var phrases = ["brands.", "products.", "experience."];

  var prefixEl = document.getElementById("typewriter-prefix");
  var dynamicEl = document.getElementById("typewriter");
  var caret = document.getElementById("caret");
  var body = document.body;
  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  var phraseIndex = 0;
  var charIndex = 0;
  var prefixIndex = 0;

  var typingSpeed = 50;
  var deletingSpeed = 30;
  var pauseAfterType = 450;
  var pauseAfterDelete = 120;

  function revealRest() {
    body.classList.add("revealed");
    if (caret) {
      caret.classList.add("done");
    }
    enableScroll();
  }

  function disableScroll() {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  function enableScroll() {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }

  disableScroll();

  // Support for users who prefer reduced motion
  if (reduceMotion) {
    if (prefixEl) prefixEl.textContent = prefixText;
    if (dynamicEl) dynamicEl.textContent = phrases[phrases.length - 1];
    revealRest();
    return;
  }

  // 1. Type the static prefix first ("We build")
  function typePrefix() {
    if (!prefixEl) {
      // Fallback if element is not found
      setTimeout(tick, 80);
      return;
    }

    if (prefixIndex < prefixText.length) {
      prefixEl.textContent += prefixText.charAt(prefixIndex);
      prefixIndex++;
      setTimeout(typePrefix, typingSpeed);
    } else {
      // Prefix typing done, pause briefly then start cycling dynamic phrases
      setTimeout(tick, 100);
    }
  }

  // 2. Type dynamic suffixes ("experiences.", "products.", etc.)
  function tick() {
    if (!dynamicEl) {
      revealRest();
      return;
    }

    var current = phrases[phraseIndex];
    var isLastPhrase = phraseIndex === phrases.length - 1;

    if (charIndex <= current.length) {
      dynamicEl.textContent = current.slice(0, charIndex);
      charIndex++;
      setTimeout(tick, typingSpeed);
      return;
    }

    // Finished typing the last phrase, proceed to reveal the rest of the page
    if (isLastPhrase) {
      setTimeout(revealRest, 80);
      return;
    }

    // Wait and erase the current phrase
    setTimeout(function () {
      eraseTick(current);
    }, pauseAfterType);
  }

  // 3. Erase the current dynamic phrase
  function eraseTick(current) {
    if (charIndex > 0) {
      charIndex--;
      dynamicEl.textContent = current.slice(0, charIndex);
      setTimeout(function () {
        eraseTick(current);
      }, deletingSpeed);
      return;
    }
    // Proceed to next phrase
    phraseIndex++;
    setTimeout(tick, pauseAfterDelete);
  }

  // Kick off the sequence on page load
  document.addEventListener("DOMContentLoaded", function () {
    if (!prefixEl || !dynamicEl) {
      revealRest();
    } else {
      typePrefix();
    }

    // React Bits DriftWall adapted for this static JavaScript site.
    (function initDriftWall() {
      var mount = document.getElementById("hero-drift-wall");
      if (!mount) return;
      // Define each tile's image, title, and exact direct link
      var items = [
        { image: "assets/projects/herosection1-1.png", title: "Cognita AI", href: "project.html#herosection-yourride" },
        { image: "assets/projects/project1-1.png", title: "Magnify Vision Media", href: "project.html#magnify" },
        { image: "assets/projects/herosection2-1.png", title: "Sonix Audio", href: "project.html#herosection-devialet" },
        { image: "assets/projects/project2-1.png", title: "Bun & Bite", href: "project.html#bunbite" },
        { image: "assets/projects/herosection3-1.png", title: "Workli", href: "project.html#herosection-herosection3" },
        { image: "assets/projects/project3-1.png", title: "NewDay Child Coaching", href: "project.html#newday" },
        { image: "assets/projects/herosection4-1.png", title: "Aerix", href: "project.html#herosection-herosection4" },
        { image: "assets/projects/project04-1.png", title: "Inventory System", href: "project.html#inventory" },
        { image: "assets/projects/herosection5-1.png", title: "Velor", href: "project.html#herosection-herosection5" },
        { image: "assets/projects/webdesign1-1.png", title: "Where to Know", href: "project.html#webdesign-wheretoknow" },
        { image: "assets/projects/herosection6.png", title: "Outride", href: "project.html#herosection-herosection6" },
        { image: "assets/projects/website6-1.png", title: "e-Sweets", href: "project.html#e-Sweets" },
        { image: "assets/projects/herosection7.png", title: "Payora", href: "project.html#herosection-herosection7" },
        { image: "assets/projects/herosection8.png", title: "Nexride", href: "project.html#herosection-herosection8" },
        { image: "assets/projects/herosection9.png", title: "Industera", href: "project.html#herosection-herosection9" },
        { image: "assets/projects/herosection10.png", title: "Signet", href: "project.html#herosection-herosection10" }
      ];
      var config = { columns: 3, tileWidth: 200, tileHeight: 132, gap: 18, tilt: 16, turn: -14, perspective: 1200, depth: 120, speed: 42, variance: 0.45, parallax: 0.6, lift: 64, fade: 0.6, dim: 0.55, overlayColor: "#060010" };
      var wall = document.createElement("div"), plane = document.createElement("div"), tracks = [], offsets = [], pointer = { x: 0, y: 0 }, damped = { x: 0, y: 0 }, hoveredColumn = -1, activeTile = null, lastTime = null;
      wall.className = "drift-wall";
      wall.setAttribute("role", "group");
      wall.setAttribute("aria-label", "Drifting wall of project tiles");
      [["--dw-tile-w", config.tileWidth + "px"], ["--dw-tile-h", config.tileHeight + "px"], ["--dw-gap", config.gap + "px"], ["--dw-perspective", config.perspective + "px"], ["--dw-lift", config.lift + "px"], ["--dw-dim", config.dim], ["--dw-overlay", config.overlayColor], ["--dw-edge", Math.max(0, (1 - config.fade) * 100) + "%"]].forEach(function (entry) { wall.style.setProperty(entry[0], entry[1]); });
      plane.className = "drift-wall__plane";
      function factor(index) { return 1 + config.variance * ((((index * 0.6180339887 + 0.35) % 1) * 2) - 1); }
      for (var columnIndex = 0; columnIndex < config.columns; columnIndex++) {
        var column = document.createElement("div"), track = document.createElement("div");
        column.className = "drift-wall__col";
        track.className = "drift-wall__track";
        for (var copy = 0; copy < 3; copy++) items.forEach(function (item) {
          var tile = document.createElement("a"), inner = document.createElement("span"), image = document.createElement("img"), overlay = document.createElement("span");
          tile.className = "drift-wall__tile";
          tile.href = item.href;
          tile.dataset.column = columnIndex;
          inner.className = "drift-wall__inner";
          image.src = item.image;
          image.alt = item.title;
          image.loading = "lazy";
          overlay.className = "drift-wall__overlay";
          inner.append(image, overlay);
          tile.appendChild(inner);
          track.appendChild(tile);
        });
        column.appendChild(track);
        plane.appendChild(column);
        tracks.push(track);
        offsets.push((config.tileHeight + config.gap) * items.length * ((columnIndex * 0.37) % 1));
      }
      wall.appendChild(plane);
      mount.appendChild(wall);
      function activate(tile) {
        if (activeTile === tile) return;
        if (activeTile) activeTile.classList.remove("is-active");
        activeTile = tile;
        hoveredColumn = tile ? Number(tile.dataset.column) : -1;
        if (activeTile) activeTile.classList.add("is-active");
      }
      wall.addEventListener("pointermove", function (event) {
        var rect = wall.getBoundingClientRect();
        pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
        pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
        activate(event.target.closest(".drift-wall__tile"));
      });
      wall.addEventListener("pointerleave", function () { pointer = { x: 0, y: 0 }; activate(null); });
      function animate(timestamp) {
        if (lastTime === null) lastTime = timestamp;
        var delta = Math.min(0.05, (timestamp - lastTime) / 1000);
        lastTime = timestamp;
        var ease = 1 - Math.exp(-delta / 0.12);
        damped.x += (pointer.x * config.parallax * 8 - damped.x) * ease;
        damped.y += (-pointer.y * config.parallax * 8 - damped.y) * ease;
        plane.style.transform = "translate(-50%, -50%) scale(1.18) rotateX(" + (config.tilt + damped.y) + "deg) rotateY(" + (config.turn + damped.x) + "deg) translateZ(" + (-config.depth) + "px)";
        tracks.forEach(function (track, index) {
          var cycle = (config.tileHeight + config.gap) * items.length;
          var velocity = hoveredColumn === index ? 0 : config.speed * factor(index) * (index % 2 === 0 ? 1 : -1);
          offsets[index] = (offsets[index] + velocity * delta + cycle) % cycle;
          track.style.transform = "translate3d(0, " + (-offsets[index]) + "px, 0)";
        });
        window.requestAnimationFrame(animate);
      }
      if (!reduceMotion) window.requestAnimationFrame(animate);
    })();

    // 1. Infinite marquee track logic with smooth hover deceleration
    var marqueeTrack = document.querySelector(".marquee-track");
    if (marqueeTrack) {
      var targetSpeed = 0.4;
      var speed = 0.4;
      var currentX = 0;

      marqueeTrack.addEventListener("mouseenter", function () {
        targetSpeed = 0.1; // Smoothly decelerate to 0.1 on hover
      });

      marqueeTrack.addEventListener("mouseleave", function () {
        targetSpeed = 0.4; // Smoothly accelerate back to 0.4
      });

      function animateMarquee() {
        // Interpolate speed for buttery transitions
        speed += (targetSpeed - speed) * 0.05;
        currentX -= speed;
        var firstBlock = marqueeTrack.children[0];
        if (firstBlock) {
          if (Math.abs(currentX) >= firstBlock.offsetWidth) {
            currentX += firstBlock.offsetWidth;
          }
        }
        marqueeTrack.style.transform = "translateX(" + currentX + "px)";
        requestAnimationFrame(animateMarquee);
      }

      animateMarquee();
    }

    // 2. Scroll listener to toggle scrolled-nav class (smooth CSS transition)
    var navbar = document.querySelector(".navbar");
    if (navbar) {
      window.addEventListener(
        "scroll",
        function () {
          if (window.scrollY > 50) {
            navbar.classList.add("scrolled-nav");
          } else {
            navbar.classList.remove("scrolled-nav");
          }
        },
        { passive: true },
      );
    }

    // 2b. About section now reveals via the standard .reveal fade-in (no carpet animation)

    // 3. iOS-inspired snapping custom cursor
    var cursor = document.querySelector(".custom-cursor");
    if (cursor) {
      var isAimCursor = document.body.classList.contains("aim-cursor");
      var mouseX = 0,
        mouseY = 0;
      var currentXCursor = 0,
        currentYCursor = 0;
      var isHovering = false;

      // Track raw mouse position
      window.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      // Show cursor only when mouse moves onto window
      document.addEventListener("mouseenter", function () {
        cursor.style.opacity = "1";
      });
      document.addEventListener("mouseleave", function () {
        cursor.style.opacity = "0";
      });
    }

    // 4. Page transition curtain controls
    document.querySelectorAll("a").forEach(function (link) {
      var href = link.getAttribute("href");
      if (
        href &&
        !href.startsWith("#") &&
        !href.startsWith("mailto:") &&
        !href.startsWith("tel:")
      ) {
        // Robust relative link detection (works perfectly locally under file:// or servers)
        var isInternal =
          !href.startsWith("http://") &&
          !href.startsWith("https://") &&
          !href.startsWith("//");
        if (isInternal) {
          link.addEventListener("click", function (e) {
            e.preventDefault();

            // Prevent double clicks
            document.body.style.pointerEvents = "none";

            var curtain = document.querySelector(".curtain-wipe");
            if (curtain) {
              // Disable the entrance CSS animation
              curtain.style.animation = "none";
              // Reset curtain to the right side instantly without transition
              curtain.style.transition = "none";
              curtain.style.transform = "translateX(100%) skewX(-12deg)";
              curtain.getBoundingClientRect(); // force layout reflow

              // Slide in to center (snappy 450ms transition)
              curtain.style.transition =
                "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
              curtain.style.transform = "translateX(0%) skewX(-12deg)";
            }

            setTimeout(function () {
              window.location.href = href;
            }, 450); // 0.45s matches the transition duration
          });
        }
      }
    });

    // 5. Dark/Light Theme Toggle Control
    var toggleBtn = document.querySelector(".theme-toggle");
    if (toggleBtn) {
      toggleBtn.setAttribute(
        "aria-pressed",
        String(document.documentElement.classList.contains("dark-mode")),
      );
      toggleBtn.addEventListener("click", function () {
        var isDark = document.documentElement.classList.toggle("dark-mode");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        toggleBtn.setAttribute("aria-pressed", String(isDark));
      });
      toggleBtn.dataset.themeBound = "true";
    }

    // 5a. Homepage team rotator with synced animated names
    var homeRotator = document.querySelector("[data-home-rotator]");
    if (homeRotator) {
      var rotatorImages = Array.prototype.slice.call(
        homeRotator.querySelectorAll(".rotator-img"),
      );
      var rotatorName = document.getElementById("home-rotator-name");
      var rotatorRole = document.getElementById("home-rotator-role");
      var activeRotatorIndex = 0;
      var nameTypingTimer = null;

      function setRotatorText(name, role, animate) {
        if (!rotatorName) return;

        if (nameTypingTimer) {
          window.clearTimeout(nameTypingTimer);
          nameTypingTimer = null;
        }

        if (rotatorRole) {
          rotatorRole.textContent = role || "";
        }

        if (!animate || reduceMotion) {
          rotatorName.textContent = name;
          rotatorName.classList.remove("is-glitching");
          return;
        }

        rotatorName.textContent = "";
        rotatorName.classList.remove("is-glitching");
        rotatorName.offsetWidth;
        rotatorName.classList.add("is-glitching");

        var letterIndex = 0;

        function typeNextLetter() {
          letterIndex++;
          rotatorName.textContent = name.slice(0, letterIndex);
          if (letterIndex < name.length) {
            nameTypingTimer = window.setTimeout(typeNextLetter, 36);
            return;
          }

          nameTypingTimer = window.setTimeout(function () {
            rotatorName.classList.remove("is-glitching");
          }, 260);
        }

        typeNextLetter();
      }

      function setActiveRotatorImage(index, animate) {
        var activeImage = rotatorImages[index];
        if (!activeImage) return;

        rotatorImages.forEach(function (image, imageIndex) {
          image.classList.toggle("is-active", imageIndex === index);
        });

        setRotatorText(
          activeImage.dataset.rotatorName || "",
          activeImage.dataset.rotatorRole || "",
          animate,
        );
      }

      if (rotatorImages.length) {
        setActiveRotatorImage(activeRotatorIndex, false);

        if (!reduceMotion && rotatorImages.length > 1) {
          window.setInterval(function () {
            activeRotatorIndex =
              (activeRotatorIndex + 1) % rotatorImages.length;
            setActiveRotatorImage(activeRotatorIndex, true);
          }, 3200);
        }
      }
    }

    // 5b. Resume Panel Overlay Toggle & Detail Expanders
    var viewResumeBtn = document.querySelector(".view-resume-trigger");
    var resumePanel = document.getElementById("resume-panel");
    var closePanelBtn = document.querySelector(".resume-panel-close");
    var panelBackdrop = document.querySelector(".resume-panel-backdrop");

    var pocketContainer = document.querySelector(".resume-pocket-container");
    var detailedViewer = document.getElementById("detailed-resume-viewer");
    var resumePanelContent = document.querySelector(".resume-panel-content");
    var backBtn = document.querySelector(".back-to-pocket-btn");
    var modalHeading = document.querySelector("#resume-panel h2");
    var modalSub = document.querySelector("#resume-panel p.mono");
    var printBtn = document.querySelector(".print-resume-action");

    if (viewResumeBtn && resumePanel) {
      viewResumeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        resumePanel.classList.add("active");
        document.body.style.overflow = "hidden"; // disable body scroll while panel is open
        resumePanel.scrollTop = 0;
        resetToPocket();
      });
    }

    function resetActiveResumeScroll() {
      var scrollContainers = document.querySelectorAll(".detail-resume-image");
      scrollContainers.forEach(function (container) {
        container.scrollTop = 0;
      });
    }

    function closeResumePanel() {
      if (resumePanel) {
        resumePanel.classList.remove("active");
        document.body.style.overflow = ""; // restore body scroll
      }
    }

    if (closePanelBtn) {
      closePanelBtn.addEventListener("click", closeResumePanel);
    }
    if (panelBackdrop) {
      panelBackdrop.addEventListener("click", closeResumePanel);
    }

    // Stacked card clicks inside the pocket
    var cards = document.querySelectorAll(".resume-card-wrapper");
    cards.forEach(function (card) {
      card.addEventListener("click", function () {
        var person = card.getAttribute("data-person");
        if (person) {
          showDetailedResume(person);
        }
      });
    });

    if (backBtn) {
      backBtn.addEventListener("click", resetToPocket);
    }

    function showDetailedResume(person) {
      // Hide pocket elements
      if (pocketContainer) pocketContainer.classList.add("hidden");
      if (modalSub) modalSub.style.display = "none";
      if (modalHeading)
        modalHeading.textContent =
          person.charAt(0).toUpperCase() + person.slice(1) + "'s Resume";
      if (printBtn) {
        printBtn.style.display = "inline-block";
        printBtn.setAttribute("onclick", "window.print()");
      }
      // Contain the tall resume viewer inside the card instead of letting it
      // spill past the rounded edges (the pocket needs overflow:visible for
      // its fan-out effect, but the resume viewer needs to be clipped/scrollable)
      if (resumePanelContent)
        resumePanelContent.classList.add("viewing-detail");

      resetActiveResumeScroll();
      if (resumePanel) resumePanel.scrollTop = 0;

      // Show viewer and specific resume
      if (detailedViewer) {
        detailedViewer.classList.add("active");
        var details = detailedViewer.querySelectorAll(
          ".detailed-resume-content",
        );
        details.forEach(function (d) {
          d.classList.remove("active");
        });
        var targetDetail = document.getElementById("detail-" + person);
        if (targetDetail) {
          targetDetail.classList.add("active");
          var targetScroller = targetDetail.querySelector(
            ".detail-resume-image",
          );
          if (targetScroller) targetScroller.scrollTop = 0;
        }
      }
    }

    function resetToPocket() {
      // Show pocket elements
      if (pocketContainer) pocketContainer.classList.remove("hidden");
      if (modalSub) modalSub.style.display = "block";
      if (modalHeading) modalHeading.textContent = "Our Team Resumes";
      if (printBtn) printBtn.style.display = "none";
      if (resumePanelContent)
        resumePanelContent.classList.remove("viewing-detail");
      resetActiveResumeScroll();
      if (resumePanel) resumePanel.scrollTop = 0;

      // Hide viewer and detail contents
      if (detailedViewer) {
        detailedViewer.classList.remove("active");
        var details = detailedViewer.querySelectorAll(
          ".detailed-resume-content",
        );
        details.forEach(function (d) {
          d.classList.remove("active");
        });
      }
    }
    // 5c. Project browser: sidebar-driven panel switching
    var projectPanels = document.querySelectorAll("[data-panel]");
    var projectSidebarItems = document.querySelectorAll(
      ".project-sidebar-item",
    );

    // 5c-i. Carousel setup: auto-cycling images inside the active panel
    function initProjectCarousel(node) {
      var root = node.querySelector("[data-carousel]");
      if (!root || root.dataset.carouselInit) return null;
      root.dataset.carouselInit = "true";

      var track = root.querySelector(".project-media-track");
      var slides = root.querySelectorAll(".project-media-slide");
      var dots = root.querySelectorAll(".project-media-dots button");
      var prevBtn = root.querySelector(".project-media-nav.prev");
      var nextBtn = root.querySelector(".project-media-nav.next");
      var index = 0;
      var timer = null;
      var AUTO_MS = 3200;

      function render() {
        track.style.transform = "translateX(-" + index * 100 + "%)";
        dots.forEach(function (dot, i) {
          dot.classList.toggle("is-active", i === index);
        });
      }

      function goTo(i) {
        index = (i + slides.length) % slides.length;
        render();
      }

      function next() {
        goTo(index + 1);
      }

      function prev() {
        goTo(index - 1);
      }

      function startAuto() {
        stopAuto();
        if (slides.length > 1) {
          timer = window.setInterval(next, AUTO_MS);
        }
      }

      function stopAuto() {
        if (timer) {
          window.clearInterval(timer);
          timer = null;
        }
      }

      dots.forEach(function (dot, i) {
        dot.addEventListener("click", function () {
          goTo(i);
          startAuto();
        });
      });

      if (nextBtn) {
        nextBtn.addEventListener("click", function () {
          next();
          startAuto();
        });
      }
      if (prevBtn) {
        prevBtn.addEventListener("click", function () {
          prev();
          startAuto();
        });
      }

      root.addEventListener("mouseenter", stopAuto);
      root.addEventListener("mouseleave", startAuto);

      render();

      return { start: startAuto, stop: stopAuto };
    }

    var projectCarousels = new Map();

    // 5c-ii. Generic "browse grid" widget: any project panel can contain a
    // grid of tiles that expand into a detail view with its own carousel.
    // Used by Hero Section, Web Design, and Mobile App Design.
    var gridWidgets = new Map(); // panelId -> { reset, showDetail }

    function initGridWidget(panel) {
      var gridView = panel.querySelector("[data-grid-view]");
      var gridItems = panel.querySelectorAll("[data-grid-target]");
      var detailViews = panel.querySelectorAll("[data-detail-view]");
      var backBtns = panel.querySelectorAll("[data-grid-back]");
      var carousels = new Map();

      function reset() {
        if (gridView) gridView.classList.add("is-active");
        detailViews.forEach(function (view) {
          if (view.classList.contains("is-active")) {
            if (view.classList.contains("detail-view-image-only")) {
              view.classList.add("is-closing");
              setTimeout(function () {
                view.classList.remove("is-active");
                view.classList.remove("is-closing");
              }, 400); // 400ms match the new CSS exit animation
            } else {
              view.classList.remove("is-active");
            }
          }
          var existing = carousels.get(view);
          if (existing) existing.stop();
        });
      }

      function showDetail(id) {
        if (gridView) gridView.classList.remove("is-active");
        detailViews.forEach(function (view) {
          var isMatch = view.dataset.detailView === id;
          view.classList.toggle("is-active", isMatch);

          if (isMatch) {
            if (!carousels.has(view)) {
              carousels.set(view, initProjectCarousel(view));
            }
            var carousel = carousels.get(view);
            if (carousel) carousel.start();
          } else {
            var existing = carousels.get(view);
            if (existing) existing.stop();
          }
        });
      }

      gridItems.forEach(function (item) {
        item.addEventListener("click", function () {
          showDetail(item.dataset.gridTarget);
        });
      });

      backBtns.forEach(function (btn) {
        btn.addEventListener("click", reset);
      });

      return { reset: reset, showDetail: showDetail };
    }

    projectPanels.forEach(function (panel) {
      if (panel.querySelector("[data-grid-view]")) {
        gridWidgets.set(panel.dataset.panel, initGridWidget(panel));
      }
    });

    function showProjectPanel(id) {
      // Whenever the sidebar drives a panel change, reset every grid widget
      // (Hero Section, Web Design, Mobile App Design, etc.) back to its
      // grid view and stop any running detail carousel.
      gridWidgets.forEach(function (widget) {
        widget.reset();
      });

      projectPanels.forEach(function (panel) {
        var isMatch = panel.dataset.panel === id;
        panel.classList.toggle("is-active", isMatch);

        // Panels that contain a grid widget manage their own internal
        // carousels (one per detail view), so they're excluded from the
        // generic single-carousel-per-panel logic below.
        if (gridWidgets.has(panel.dataset.panel)) return;

        if (isMatch) {
          if (!projectCarousels.has(panel)) {
            projectCarousels.set(panel, initProjectCarousel(panel));
          }
          var carousel = projectCarousels.get(panel);
          if (carousel) carousel.start();
        } else {
          var existing = projectCarousels.get(panel);
          if (existing) existing.stop();
        }
      });

      projectSidebarItems.forEach(function (item) {
        item.classList.toggle("is-active", item.dataset.project === id);
      });
    }

    projectSidebarItems.forEach(function (item) {
      item.addEventListener("click", function () {
        showProjectPanel(item.dataset.project);
        if (item.dataset.project) {
          window.location.hash = item.dataset.project;
        }
      });
    });

    // Initialize the carousel for whichever panel starts active.
    // Supports two hash formats:
    //   #<panelId>              -> opens that project panel
    //   #<panelId>-<detailId>   -> opens that panel's grid widget and jumps
    //                              straight to the matching detail view
    function getProjectFromHash() {
      var hash = window.location.hash.replace("#", "").trim();
      if (!hash) return { panelId: "", detailId: "" };

      if (document.querySelector('[data-panel="' + hash + '"]')) {
        return { panelId: hash, detailId: "" };
      }

      var dashIndex = hash.indexOf("-");
      if (dashIndex > -1) {
        var panelId = hash.slice(0, dashIndex);
        var detailId = hash.slice(dashIndex + 1);
        var matchingDetail = document.querySelector(
          '[data-panel="' + panelId + '"] [data-detail-view="' + detailId + '"]',
        );
        if (matchingDetail) {
          return { panelId: panelId, detailId: detailId };
        }
      }

      return { panelId: "", detailId: "" };
    }

    function openFromHashResult(result) {
      if (!result.panelId) return;
      showProjectPanel(result.panelId);
      if (result.detailId && gridWidgets.has(result.panelId)) {
        gridWidgets.get(result.panelId).showDetail(result.detailId);
      }
    }

    var initialHashResult = getProjectFromHash();
    
    // If there is no specific project hash in the URL, find a default to load
    if (!initialHashResult.panelId) {
      var initialPanel = document.querySelector(".project-viewer-panel.is-active");
      
      if (initialPanel && initialPanel.dataset.panel) {
        // Load the panel explicitly marked 'is-active' in HTML
        initialHashResult = { panelId: initialPanel.dataset.panel, detailId: "" };
      } else {
        // Fallback: Automatically load the very first project in the sidebar list
        var firstItem = document.querySelector(".project-sidebar-item");
        if (firstItem && firstItem.dataset.project) {
          initialHashResult = { panelId: firstItem.dataset.project, detailId: "" };
        }
      }
    }
    
    if (initialHashResult.panelId) {
      openFromHashResult(initialHashResult);
    }

    window.addEventListener("hashchange", function () {
      openFromHashResult(getProjectFromHash());
    });

    // 5c. Center-Outward Scramble Text Animation
    function scrambleText(element, originalText, duration) {
      if (element.classList.contains("scrambling")) return;
      element.classList.add("scrambling");

      var N = originalText.length;
      var glyphs = "!@#$%^&*()_+[]{}<>?1234567890ABCDEF";

      // Generate reveal order (center-outward)
      var indices = [];
      var mid = Math.floor(N / 2);
      var left = mid - 1;
      var right = mid;
      while (left >= 0 || right < N) {
        if (right < N) {
          indices.push(right);
          right++;
        }
        if (left >= 0) {
          indices.push(left);
          left--;
        }
      }

      var start = null;
      var revealMap = {};
      for (var j = 0; j < N; j++) {
        var charIndex = indices[j];
        revealMap[charIndex] = (j / N) * (duration - 400);
      }

      function animate(timestamp) {
        if (!start) start = timestamp;
        var elapsed = timestamp - start;

        var currentString = "";
        for (var i = 0; i < N; i++) {
          var origChar = originalText[i];
          if (origChar === " ") {
            currentString += " ";
          } else if (elapsed >= revealMap[i]) {
            currentString += origChar;
          } else {
            currentString += glyphs[Math.floor(Math.random() * glyphs.length)];
          }
        }

        element.textContent = currentString;

        if (elapsed < duration + 100) {
          requestAnimationFrame(animate);
        } else {
          element.textContent = originalText;
          element.classList.remove("scrambling");
        }
      }

      requestAnimationFrame(animate);
    }

    var scrambleTriggers = document.querySelectorAll(".scramble-trigger");
    scrambleTriggers.forEach(function (el) {
      var origText = el.textContent.trim();

      // On load (runs once slowly, no hover repeating)
      setTimeout(function () {
        scrambleText(el, origText, 1800);
      }, 500);
    });

    if (cursor) {
      // Smooth custom cursor positioning (lerping) when floating freely
      function updateCursor() {
        if (!isHovering) {
          currentXCursor += (mouseX - currentXCursor) * 0.18;
          currentYCursor += (mouseY - currentYCursor) * 0.18;

          cursor.style.left = currentXCursor + "px";
          cursor.style.top = currentYCursor + "px";
          if (isAimCursor) {
            cursor.style.width = "22px";
            cursor.style.height = "22px";
          } else {
            cursor.style.width = "8px";
            cursor.style.height = "8px";
            cursor.style.borderRadius = "50%";
          }
          cursor.style.transform = "translate(-50%, -50%)";
        }
        requestAnimationFrame(updateCursor);
      }
      updateCursor();



      // snap to interactive elements
      var interactives = document.querySelectorAll(
        "a:not(.drift-wall__tile), button, .work-card, nav a, .nav-cta, .skill-badge",
      );
      interactives.forEach(function (el) {
        el.addEventListener("mouseenter", function () {
          isHovering = true;
          cursor.classList.add("hovering");

          var rect = el.getBoundingClientRect();
          // Snap custom cursor precisely to the center of the hovered element
          cursor.style.left = rect.left + rect.width / 2 + "px";
          cursor.style.top = rect.top + rect.height / 2 + "px";
          var padding = isAimCursor ? 14 : 10;
          cursor.style.width = rect.width + padding + "px";
          cursor.style.height = rect.height + padding + "px";

          if (!isAimCursor) {
            var style = window.getComputedStyle(el);
            cursor.style.borderRadius = style.borderRadius || "8px";
          }
        });

        el.addEventListener("mouseleave", function () {
          isHovering = false;
          cursor.classList.remove("hovering");
          // Instantly align lerped coordinates to current mouse position to prevent cursor jump back
          currentXCursor = mouseX;
          currentYCursor = mouseY;
        });
      });
    }

    var teamCards = Array.prototype.slice.call(
      document.querySelectorAll("[data-team-member]"),
    );
    var teamDetailModal = document.getElementById("team-detail-modal");
    if (teamCards.length && teamDetailModal) {
      var teamDetailPhoto = document.getElementById("team-detail-photo");
      var teamDetailName = document.getElementById("team-detail-name");
      var teamDetailRole = document.getElementById("team-detail-role");
      var teamDetailSummary = document.getElementById("team-detail-summary");
      var teamDetailKicker = document.getElementById("team-detail-kicker");
      var teamDetailServices = document.getElementById("team-detail-services");
      var teamModalClosers = teamDetailModal.querySelectorAll(
        "[data-team-modal-close]",
      );
      var lastTeamTrigger = null;
      var teamMembers = {
        kenneth: {
          name: "Kenneth Cyrus Bianzon",
          role: "Team Leader · Fullstack Developer",
          kicker: "Strategy, systems, and delivery",
          photo: "assets/kenneth.png",
          summary:
            "Kenneth leads how we scope, structure, and ship digital work, connecting product thinking with hands-on fullstack execution.",
          services: [
            "We plan product direction, technical scope, and launch priorities.",
            "We build end-to-end web experiences from interface to backend logic.",
            "We keep projects moving with clear decisions, reviews, and implementation support.",
          ],
        },
        jenz: {
          name: "Jenz Patrick Reguyal",
          role: "Design Lead · UI/UX",
          kicker: "Visual direction and product design",
          photo: "assets/jenz.png",
          summary:
            "Jenz shapes the visual language behind each project, from brand direction and layout systems to polished UI decisions that feel consistent everywhere.",
          services: [
            "We create wireframes, user flows, and high-fidelity interface concepts.",
            "We build brand systems that keep products visually clear and memorable.",
            "We refine design details so the final experience feels intentional on every screen.",
          ],
        },
        jamil: {
          name: "Jamil Kharim Abinal",
          role: "Frontend Developer",
          kicker: "Responsive builds and interface polish",
          photo: "assets/jamil.png",
          summary:
            "Jamil turns approved concepts into responsive frontend experiences, making sure interactions, layout behavior, and visual polish hold up in the browser.",
          services: [
            "We develop responsive pages and reusable UI components.",
            "We translate design systems into smooth, production-ready interfaces.",
            "We improve page behavior with animation, accessibility, and visual consistency.",
          ],
        },
        pacay: {
          name: "Chirsjohn Pacay",
          role: "Backend Developer",
          kicker: "Data flow, APIs, and reliability",
          photo: "assets/pacay.png",
          summary:
            "Chirsjohn supports the backend side of delivery, helping the team build dependable APIs, structured data flows, and features that stay stable after launch.",
          services: [
            "We design backend logic that supports real product workflows.",
            "We connect interfaces to APIs, databases, and core application behavior.",
            "We help keep systems organized, maintainable, and ready to scale.",
          ],
        },
      };

      function closeTeamModal() {
        teamDetailModal.classList.remove("active");
        teamDetailModal.setAttribute("aria-hidden", "true");
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";

        if (lastTeamTrigger) {
          lastTeamTrigger.focus();
        }
      }

      function openTeamModal(memberId, trigger) {
        var member = teamMembers[memberId];
        if (!member) return;

        lastTeamTrigger = trigger || null;
        if (teamDetailPhoto) {
          teamDetailPhoto.src = member.photo;
          teamDetailPhoto.alt = member.name;
        }
        if (teamDetailName) {
          teamDetailName.textContent = member.name;
        }
        if (teamDetailRole) {
          teamDetailRole.textContent = member.role;
        }
        if (teamDetailSummary) {
          teamDetailSummary.textContent = member.summary;
        }
        if (teamDetailKicker) {
          teamDetailKicker.textContent = member.kicker;
        }
        if (teamDetailServices) {
          teamDetailServices.innerHTML = member.services
            .map(function (service) {
              return "<li>" + service + "</li>";
            })
            .join("");
        }

        teamDetailModal.classList.add("active");
        teamDetailModal.setAttribute("aria-hidden", "false");
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
      }

      teamCards.forEach(function (card) {
        card.addEventListener("click", function () {
          openTeamModal(card.dataset.teamMember, card);
        });
      });

      teamModalClosers.forEach(function (closer) {
        closer.addEventListener("click", closeTeamModal);
      });

      document.addEventListener("keydown", function (event) {
        if (
          event.key === "Escape" &&
          teamDetailModal.classList.contains("active")
        ) {
          closeTeamModal();
        }
      });
    }
    
    // Sidebar Accordion Toggle
    var sidebarToggles = document.querySelectorAll('.project-sidebar-subgroup-toggle');
    sidebarToggles.forEach(function (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        // Toggle the active class for the arrow rotation
        this.classList.toggle('is-active');
        
        // Find the wrapper right after the button and toggle its open class
        var listWrapper = this.nextElementSibling;
        if (listWrapper && listWrapper.classList.contains('project-sidebar-list-wrapper')) {
          listWrapper.classList.toggle('is-open');
        }
      });
    });

    // 5d. Contact form — builds and opens a pre-filled email to kcbianzon@gmail.com
    var contactForm = document.getElementById("contact-form");
    if (contactForm) {
      var formStatus = document.getElementById("form-status");
      var CONTACT_EMAIL = "kcbianzon@gmail.com";

      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        var name = contactForm.querySelector("#name").value.trim();
        var email = contactForm.querySelector("#email").value.trim();
        var projectType = contactForm.querySelector("#project-type").value;
        var message = contactForm.querySelector("#message").value.trim();

        if (!name || !email || !message) {
          if (formStatus) {
            formStatus.textContent =
              "Please fill in your name, email, and message.";
            formStatus.classList.remove("is-success");
            formStatus.classList.add("is-error");
          }
          return;
        }

        var subject =
          "New project inquiry from " + name + " (" + projectType + ")";
        var body =
          "Name: " +
          name +
          "\n" +
          "Email: " +
          email +
          "\n" +
          "Project type: " +
          projectType +
          "\n\n" +
          message;

        var mailtoLink =
          "mailto:" +
          CONTACT_EMAIL +
          "?subject=" +
          encodeURIComponent(subject) +
          "&body=" +
          encodeURIComponent(body);

        window.location.href = mailtoLink;

        if (formStatus) {
          formStatus.textContent =
            "Opening your email app to send this to " + CONTACT_EMAIL + "…";
          formStatus.classList.remove("is-error");
          formStatus.classList.add("is-success");
        }
      });
    }
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  var mobileDockQuery = window.matchMedia("(max-width: 860px)");
  var mobileDock = null;

  function dockIcon(path) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + "</svg>";
  }

  function syncMobileDock(matches) {
    if (matches && !mobileDock) {
      var currentPage = window.location.pathname.split("/").pop() || "index.html";
      var items = [
        ["index.html", "Home", '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/>'],
        ["project.html", "Work", '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5Z"/><path d="M3 10h18"/>'],
        ["teams.html", "Team", '<circle cx="9" cy="8" r="3"/><path d="M3 20c.6-3.1 2.7-5 6-5s5.4 1.9 6 5M16 5.5a3 3 0 0 1 0 5M18 15c1.7.5 2.7 1.8 3 3.8"/>'],
        ["services.html", "Services", '<path d="M4 7h16M4 12h16M4 17h10"/><circle cx="17" cy="17" r="3"/>'],
        ["contact.html", "Contact", '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'],
        ["#theme", "Theme", '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>'],
      ];

      mobileDock = document.createElement("nav");
      mobileDock.className = "mobile-dock";
      mobileDock.setAttribute("aria-label", "Mobile navigation");
      var panel = document.createElement("div");
      panel.className = "mobile-dock__panel";
      var strip = document.createElement("div");
      strip.className = "mobile-dock__strip";
      items.forEach(function (item) {
        var itemIndex = items.indexOf(item);
        var control = document.createElement(item[0] === "#theme" ? "button" : "a");
        control.className = "mobile-dock__item";
        if (item[0] === "#theme") {
          control.type = "button";
          control.setAttribute("aria-pressed", String(document.documentElement.classList.contains("dark-mode")));
          control.addEventListener("click", function () {
            var isDark = document.documentElement.classList.toggle("dark-mode");
            localStorage.setItem("theme", isDark ? "dark" : "light");
            control.setAttribute("aria-pressed", String(isDark));
          });
        } else {
          control.href = item[0];
          if (currentPage === item[0]) control.setAttribute("aria-current", "page");
          control.addEventListener("click", function (event) {
            event.preventDefault();
            if (mobileDock.classList.contains("is-navigating")) return;
            mobileDock.classList.add("is-navigating");
            control.classList.add("is-selected");

            for (var particleIndex = 0; particleIndex < 6; particleIndex++) {
              var particle = document.createElement("span");
              particle.className = "mobile-dock__particle";
              particle.style.setProperty("--particle-angle", particleIndex * 60 + "deg");
              control.appendChild(particle);
              particle.addEventListener("animationend", function () {
                this.remove();
              });
            }

            window.setTimeout(function () {
              window.location.href = control.href;
            }, 360);
          });
        }
        control.setAttribute("aria-label", item[1]);
        control.setAttribute("data-label", item[1]);
        control.style.setProperty("--dock-item-delay", itemIndex * 55 + "ms");
        control.innerHTML = dockIcon(item[2]);
        strip.appendChild(control);
      });

      var launcher = document.createElement("button");
      launcher.type = "button";
      launcher.className = "mobile-dock__launcher";
      launcher.setAttribute("aria-label", "Open navigation");
      launcher.setAttribute("aria-expanded", "false");
      launcher.setAttribute("data-label", "Menu");
      launcher.innerHTML = dockIcon('<path d="M12 5v14M5 12h14"/>');
      launcher.addEventListener("click", function () {
        var isOpen = mobileDock.classList.toggle("is-open");
        mobileDock.classList.remove("is-opening");
        if (isOpen) {
          void strip.offsetWidth;
          mobileDock.classList.add("is-opening");
          window.setTimeout(function () {
            mobileDock.classList.remove("is-opening");
          }, 700);
        }
        launcher.setAttribute("aria-expanded", String(isOpen));
        launcher.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
        launcher.setAttribute("data-label", isOpen ? "Close" : "Menu");
      });
      panel.append(strip, launcher);
      mobileDock.appendChild(panel);
      document.body.appendChild(mobileDock);
    } else if (!matches && mobileDock) {
      mobileDock.remove();
      mobileDock = null;
    }
  }

  syncMobileDock(mobileDockQuery.matches);
  mobileDockQuery.addEventListener("change", function (event) {
    syncMobileDock(event.matches);
  });

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  var lightboxScrollY = 0;

  function isImageOnlyLightboxOpen() {
    return Boolean(
      document.querySelector(".detail-view-image-only.is-active"),
    );
  }

  function syncImageOnlyLightbox() {
    var isOpen = isImageOnlyLightboxOpen();
    var wasOpen = document.body.classList.contains("lightbox-open");

    if (isOpen && !wasOpen) {
      lightboxScrollY = window.scrollY;
      document.body.classList.add("lightbox-open");
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth",
      });
      return;
    }

    if (!isOpen && wasOpen) {
      document.body.classList.remove("lightbox-open");
      window.scrollTo({
        top: lightboxScrollY,
        behavior: "auto",
      });
    }
  }

  document.querySelectorAll(".detail-view-image-only").forEach(function (view) {
    view.addEventListener("click", function () {
      var backBtn = view.querySelector("[data-grid-back]");
      if (backBtn) backBtn.click();
    });
  });

  document
    .querySelectorAll(".project-sidebar-item, .browse-grid-item")
    .forEach(function (item) {
      item.addEventListener("click", function () {
        window.requestAnimationFrame(function () {
          if (isImageOnlyLightboxOpen()) {
            syncImageOnlyLightbox();
            return;
          }

          var workSection = document.getElementById("work");
          if (workSection) {
            workSection.scrollIntoView({
              behavior: reduceMotion ? "auto" : "smooth",
              block: "start",
            });
          }
        });
      });
    });

  new MutationObserver(syncImageOnlyLightbox).observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true,
    attributeFilter: ["class"],
  });

  syncImageOnlyLightbox();
});
