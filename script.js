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
  var homeIntroKey = "temport_home_intro_seen";
  var hasSeenHomeIntro = false;

  if (prefixEl && dynamicEl) {
    try {
      hasSeenHomeIntro = sessionStorage.getItem(homeIntroKey) === "true";
    } catch (error) {
      hasSeenHomeIntro = false;
    }
  }

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
    } else if (hasSeenHomeIntro) {
      prefixEl.textContent = prefixText;
      dynamicEl.textContent = phrases[phrases.length - 1];
      revealRest();
    } else {
      try {
        sessionStorage.setItem(homeIntroKey, "true");
      } catch (error) {
        // If storage is unavailable, keep the existing intro behavior.
      }
      typePrefix();
    }

    // React Bits DriftWall adapted for this static JavaScript site.
    (function initDriftWall() {
      var mount = document.getElementById("hero-drift-wall");
      if (!mount) return;
      // Define each tile's image, title, and exact direct link
      var items = [
        {
          image: "assets/projects/herosection1-1.png",
          title: "Cognita AI",
          href: "#project",
        },
        {
          image: "assets/projects/project1-1.png",
          title: "Magnify Vision Media",
          href: "#project",
        },
        {
          image: "assets/projects/herosection2-1.png",
          title: "Sonix Audio",
          href: "#project",
        },
        {
          image: "assets/projects/project2-1.png",
          title: "Bun & Bite",
          href: "#project",
        },
        {
          image: "assets/projects/herosection3-1.png",
          title: "Workli",
          href: "#project",
        },
        {
          image: "assets/projects/project3-1.png",
          title: "NewDay Child Coaching",
          href: "#project",
        },
        {
          image: "assets/projects/herosection4-1.png",
          title: "Aerix",
          href: "#project",
        },
        {
          image: "assets/projects/herosection5-1.png",
          title: "Velor",
          href: "#project",
        },
        {
          image: "assets/projects/webdesign1-1.png",
          title: "Where to Know",
          href: "#project",
        },
        {
          image: "assets/projects/herosection6.png",
          title: "Outride",
          href: "#project",
        },
        {
          image: "assets/projects/website6-1.png",
          title: "e-Sweets",
          href: "#project",
        },
        {
          image: "assets/projects/herosection7.png",
          title: "Payora",
          href: "#project",
        },
        {
          image: "assets/projects/herosection8.png",
          title: "Nexride",
          href: "#project",
        },
        {
          image: "assets/projects/herosection9.png",
          title: "Industera",
          href: "#project",
        },
        {
          image: "assets/projects/herosection10.png",
          title: "Signet",
          href: "#project",
        },
      ];
      var config = {
        columns: 3,
        tileWidth: 200,
        tileHeight: 132,
        gap: 18,
        tilt: 16,
        turn: -14,
        perspective: 1200,
        depth: 120,
        speed: 42,
        variance: 0.45,
        parallax: 0.6,
        lift: 64,
        fade: 0.6,
        dim: 0.55,
        overlayColor: "#060010",
      };
      var wall = document.createElement("div"),
        plane = document.createElement("div"),
        tracks = [],
        offsets = [],
        pointer = { x: 0, y: 0 },
        damped = { x: 0, y: 0 },
        hoveredColumn = -1,
        activeTile = null,
        lastTime = null;
      wall.className = "drift-wall";
      wall.setAttribute("role", "group");
      wall.setAttribute("aria-label", "Drifting wall of project tiles");
      [
        ["--dw-tile-w", config.tileWidth + "px"],
        ["--dw-tile-h", config.tileHeight + "px"],
        ["--dw-gap", config.gap + "px"],
        ["--dw-perspective", config.perspective + "px"],
        ["--dw-lift", config.lift + "px"],
        ["--dw-dim", config.dim],
        ["--dw-overlay", config.overlayColor],
        ["--dw-edge", Math.max(0, (1 - config.fade) * 100) + "%"],
      ].forEach(function (entry) {
        wall.style.setProperty(entry[0], entry[1]);
      });
      plane.className = "drift-wall__plane";
      function factor(index) {
        return (
          1 + config.variance * (((index * 0.6180339887 + 0.35) % 1) * 2 - 1)
        );
      }
      for (var columnIndex = 0; columnIndex < config.columns; columnIndex++) {
        var column = document.createElement("div"),
          track = document.createElement("div");
        column.className = "drift-wall__col";
        track.className = "drift-wall__track";
        for (var copy = 0; copy < 3; copy++)
          items.forEach(function (item) {
            var tile = document.createElement("a"),
              inner = document.createElement("span"),
              image = document.createElement("img"),
              overlay = document.createElement("span");
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
        offsets.push(
          (config.tileHeight + config.gap) *
            items.length *
            ((columnIndex * 0.37) % 1),
        );
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
      wall.addEventListener("pointerleave", function () {
        pointer = { x: 0, y: 0 };
        activate(null);
      });
      function animate(timestamp) {
        if (lastTime === null) lastTime = timestamp;
        var delta = Math.min(0.05, (timestamp - lastTime) / 1000);
        lastTime = timestamp;
        var ease = 1 - Math.exp(-delta / 0.12);
        damped.x += (pointer.x * config.parallax * 8 - damped.x) * ease;
        damped.y += (-pointer.y * config.parallax * 8 - damped.y) * ease;
        plane.style.transform =
          "translate(-50%, -50%) scale(1.18) rotateX(" +
          (config.tilt + damped.y) +
          "deg) rotateY(" +
          (config.turn + damped.x) +
          "deg) translateZ(" +
          -config.depth +
          "px)";
        tracks.forEach(function (track, index) {
          var cycle = (config.tileHeight + config.gap) * items.length;
          var velocity =
            hoveredColumn === index
              ? 0
              : config.speed * factor(index) * (index % 2 === 0 ? 1 : -1);
          offsets[index] = (offsets[index] + velocity * delta + cycle) % cycle;
          track.style.transform =
            "translate3d(0, " + -offsets[index] + "px, 0)";
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
    var cursor = null; // Native cursor restored
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
        !href.startsWith("tel:") &&
        !href.startsWith("javascript:")
      ) {
        // Robust relative link detection (works perfectly locally under file:// or servers)
        var isInternal =
          !href.startsWith("http://") &&
          !href.startsWith("https://") &&
          !href.startsWith("//");
        if (isInternal) {
          link.addEventListener("click", function (e) {
            // Check if link points to current page (with or without hash)
            var currentPath = window.location.pathname.split("/").pop() || "index.html";
            var urlParts = href.split("#");
            var targetPath = urlParts[0].split("/").pop();
            var targetHash = urlParts[1];

            if (targetPath === "" || targetPath === currentPath) {
              if (targetHash) {
                e.preventDefault();
                window.location.hash = targetHash;
              }
              return;
            }

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

              // Ultra-crisp, snappy transition (220ms instead of sluggish 450ms)
              curtain.style.transition =
                "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)";
              curtain.style.transform = "translateX(0%) skewX(-12deg)";
            }

            setTimeout(function () {
              window.location.href = href;
            }, 220); // 220ms matches the snappy transition
          });
        }
      }
    });

    // 5. Enhanced Day/Night Theme Management (Radial View Transition + Smooth Fallback)
    function updateThemeUI(isDark) {
      var allThemeBtns = document.querySelectorAll(
        ".theme-toggle, .mobile-dock__item[aria-label*='Theme'], button[title*='theme']",
      );
      allThemeBtns.forEach(function (btn) {
        btn.setAttribute("aria-pressed", String(isDark));
        btn.removeAttribute("title");
});
    }

    var themeTransitionTimer = null;
    function triggerThemeToggle(sourceBtn, event) {
      var isDark = document.documentElement.classList.contains("dark-mode");
      var nextIsDark = !isDark;

      if (sourceBtn) {
        sourceBtn.classList.remove("is-pulsing");
        void sourceBtn.offsetWidth;
        sourceBtn.classList.add("is-pulsing");
        setTimeout(function () {
          sourceBtn.classList.remove("is-pulsing");
        }, 650);
      }

      function applyThemeChange() {
        if (nextIsDark) {
          document.documentElement.classList.add("dark-mode");
        } else {
          document.documentElement.classList.remove("dark-mode");
        }
        try {
          localStorage.setItem("theme", nextIsDark ? "dark" : "light");
          localStorage.setItem("temport_theme", nextIsDark ? "dark" : "light");
        } catch (e) {}
        updateThemeUI(nextIsDark);
      }

      var canUseViewTransition =
        typeof document.startViewTransition === "function" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (canUseViewTransition) {
        var x = window.innerWidth - 50;
        var y = 50;
        if (sourceBtn) {
          var rect = sourceBtn.getBoundingClientRect();
          x = rect.left + rect.width / 2;
          y = rect.top + rect.height / 2;
        } else if (event && typeof event.clientX === "number") {
          x = event.clientX;
          y = event.clientY;
        }

        var endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y),
        );

        try {
          var transition = document.startViewTransition(function () {
            applyThemeChange();
          });
          transition.ready.then(function () {
            document.documentElement.animate(
              {
                clipPath: [
                  "circle(0px at " + x + "px " + y + "px)",
                  "circle(" + endRadius + "px at " + x + "px " + y + "px)",
                ],
              },
              {
                duration: 620,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                pseudoElement: "::view-transition-new(root)",
              },
            );
          }).catch(function () {});
          return;
        } catch (err) {}
      }

      // Fallback: smooth cross-fade class across all elements
      document.documentElement.classList.add("theme-transitioning");
      applyThemeChange();
      clearTimeout(themeTransitionTimer);
      themeTransitionTimer = setTimeout(function () {
        document.documentElement.classList.remove("theme-transitioning");
      }, 550);
    }

    var toggleBtns = document.querySelectorAll(".theme-toggle");
    toggleBtns.forEach(function (btn) {
      if (btn.dataset.themeBound) return;
      btn.dataset.themeBound = "true";
      btn.addEventListener("click", function (e) {
        triggerThemeToggle(btn, e);
      });
    });

    var initialThemeIsDark = document.documentElement.classList.contains("dark-mode");
    updateThemeUI(initialThemeIsDark);

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
    var downloadBtn = document.querySelector(".download-resume-action");
    var activeResumePdf = "";

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
    var resumePocket = document.querySelector(".resume-pocket");

    function isMobileResumeFolder() {
      return (
        window.matchMedia && window.matchMedia("(max-width: 640px)").matches
      );
    }

    function toggleResumeFolder() {
      if (!resumePocket) return;
      resumePocket.classList.toggle("is-open");
      resumePocket.setAttribute(
        "aria-expanded",
        resumePocket.classList.contains("is-open") ? "true" : "false",
      );
    }

    if (resumePocket) {
      resumePocket.addEventListener("click", function (event) {
        if (
          isMobileResumeFolder() &&
          !event.target.closest(".resume-card-wrapper")
        )
          toggleResumeFolder();
      });
      resumePocket.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (isMobileResumeFolder()) toggleResumeFolder();
        }
      });
    }

    cards.forEach(function (card) {
      card.addEventListener("click", function (event) {
        event.stopPropagation();
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
      activeResumePdf =
        ["kenneth", "jenz", "jamil"].indexOf(person) !== -1
          ? "resumes/" + person + ".pdf"
          : "";
      if (downloadBtn) {
        downloadBtn.style.display = activeResumePdf ? "inline-block" : "none";
      }
      if (backBtn) backBtn.style.display = "inline-flex";
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
        detailedViewer.classList.toggle(
          "mobile-carousel",
          isMobileResumeFolder(),
        );
        var details = detailedViewer.querySelectorAll(
          ".detailed-resume-content",
        );
        details.forEach(function (d) {
          d.classList.toggle("active", isMobileResumeFolder());
        });
        var targetDetail = document.getElementById("detail-" + person);
        if (targetDetail) {
          targetDetail.classList.add("active");
          if (isMobileResumeFolder()) {
            window.setTimeout(function () {
              detailedViewer.scrollTo({
                left: targetDetail.offsetLeft,
                behavior: "smooth",
              });
            }, 0);
          }
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
      if (downloadBtn) downloadBtn.style.display = "none";
      if (backBtn) backBtn.style.display = "none";
      activeResumePdf = "";
      if (resumePanelContent)
        resumePanelContent.classList.remove("viewing-detail");
      resetActiveResumeScroll();
      if (resumePanel) resumePanel.scrollTop = 0;

      // Hide viewer and detail contents
      if (detailedViewer) {
        detailedViewer.classList.remove("active");
        detailedViewer.classList.remove("mobile-carousel");
        var details = detailedViewer.querySelectorAll(
          ".detailed-resume-content",
        );
        details.forEach(function (d) {
          d.classList.remove("active");
        });
      }
    }

    if (downloadBtn) {
      downloadBtn.addEventListener("click", function () {
        if (!activeResumePdf) return;
        var link = document.createElement("a");
        link.href = activeResumePdf;
        link.download = activeResumePdf.split("/").pop();
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
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
      // Lazy-load live preview iframe for this panel on demand
      var targetPanelEl = document.querySelector('.project-viewer-panel[data-panel="' + id + '"]');
      if (targetPanelEl) {
        var frame = targetPanelEl.querySelector("iframe[data-src]");
        if (frame && !frame.getAttribute("src")) {
          frame.setAttribute("src", frame.getAttribute("data-src"));
        }
      }

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
        if (item.dataset.project && window.history && window.history.replaceState) {
          window.history.replaceState(null, "", "#" + item.dataset.project);
        }
        // Smoothly scroll to the stage on mobile when choosing a project
        if (window.innerWidth <= 860) {
          var stage = document.getElementById("cr-workstation-stage");
          if (stage) {
            stage.scrollIntoView({ behavior: "smooth", block: "start" });
          }
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
          '[data-panel="' +
            panelId +
            '"] [data-detail-view="' +
            detailId +
            '"]',
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
      var initialPanel = document.querySelector(
        ".project-viewer-panel.is-active",
      );

      if (initialPanel && initialPanel.dataset.panel) {
        // Load the panel explicitly marked 'is-active' in HTML
        initialHashResult = {
          panelId: initialPanel.dataset.panel,
          detailId: "",
        };
      } else {
        // Fallback: Automatically load the very first project in the sidebar list
        var firstItem = document.querySelector(".project-sidebar-item");
        if (firstItem && firstItem.dataset.project) {
          initialHashResult = {
            panelId: firstItem.dataset.project,
            detailId: "",
          };
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
      var teamDetailResume = document.getElementById("team-detail-resume");
      var teamResumePreview = teamDetailModal.querySelector(
        "[data-team-resume-expand]",
      );
      var teamResumeModal = document.getElementById("team-resume-modal");
      var teamResumeModalImage = document.getElementById(
        "team-resume-modal-image",
      );
      var teamResumeClosers = teamResumeModal
        ? teamResumeModal.querySelectorAll("[data-team-resume-close]")
        : [];
      var teamModalClosers = teamDetailModal.querySelectorAll(
        "[data-team-modal-close]",
      );
      var lastTeamTrigger = null;
      var teamMembers = {
        kenneth: {
          name: "Kenneth Cyrus Bianzon",
          role: "Fullstack Developer",
          kicker: "Profile 01 · Fullstack development",
          photo: "assets/kenneth.png",
          resume: "resumes/kenneth.png",
          summary:
            "Fullstack developer who combines user-focused frontend work with dependable backend integrations, turning product ideas into responsive, production-ready web experiences.",
          services: [
            "Web development: HTML5, CSS3, JavaScript, React, Shopify, MongoDB, Firebase, and API integration.",
            "Experience: Freelance Web Developer at Magnify Vision Media, March-April 2026.",
            "Builds reusable interface components, authentication flows, database-backed features, and deployment-ready pages.",
            "Collaborates on requirements, translates brand direction into functional web products, and supports testing through launch.",
            "Additional foundation in computer troubleshooting and mechatronics systems.",
          ],
        },
        jenz: {
          name: "Jenz Patrick Reguyal",
          role: "Web Design & Development",
          kicker: "Profile 02 · Design & technology",
          photo: "assets/jenz.png",
          resume: "resumes/jenz.png",
          summary:
            "Design-focused technologist who brings visual direction, interface thinking, and practical web implementation together for clear, engaging digital experiences.",
          services: [
            "Web and UI/UX: HTML5, CSS3, JavaScript, and Figma.",
            "Multimedia: Canva, CapCut, image quality evaluation, and data annotation.",
            "Education: Diploma in Computer Engineering, 2024-present; Mechatronics Servicing NC II trainee.",
            "Shapes page hierarchy, mood boards, visual systems, and responsive interface treatments from early concept to refinement.",
            "Works closely with development to keep design decisions practical, consistent, and ready for implementation.",
          ],
        },
        jamil: {
          name: "Jamil Kharim Abinal",
          role: "Computer Engineering Technologist",
          kicker: "Profile 03 · Engineering & support",
          photo: "assets/jamil.png",
          resume: "resumes/jamil.png",
          summary:
            "Computer Engineering Technology student with a hands-on approach to software development, systems support, circuit logic, mechatronics, and technical documentation.",
          services: [
            "Technical skills: Java, Python, HTML, CSS, AutoCAD, circuit logic, and system troubleshooting.",
            "Credentials: Mechatronics Servicing NC II and Cisco Networking Academy certificates.",
            "Experience: Administrative Associate and Notary Assistant, with records and document-processing responsibilities.",
            "Supports dependable project delivery through structured troubleshooting, careful documentation, and detail-oriented testing.",
            "Comfortable bridging technical hardware concepts with browser-based tools and practical team workflows.",
          ],
        },
        pacay: {
          name: "ChrisJohn Pacay",
          role: "Backend Developer",
          kicker: "Profile 04 · Backend development",
          photo: "assets/pacay.png",
          resume: "resumes/pacay.png",
          summary:
            "Backend developer focused on the services, data models, and integrations that make the team’s web applications dependable behind the scenes.",
          services: [
            "Builds backend logic for real product workflows and integrations.",
            "Connects interfaces with APIs, databases, and application behavior.",
            "Keeps data flows structured, maintainable, and ready to scale.",
            "Supports authentication, validation, error handling, and reliable communication between frontend and server-side services.",
            "Collaborates with the team to turn product requirements into secure, maintainable technical foundations.",
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
        if (teamDetailResume && teamResumePreview) {
          teamDetailResume.src = member.resume || "";
          teamDetailResume.alt = member.resume
            ? member.name + " resume preview"
            : "";
          teamResumePreview.hidden = !member.resume;
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

      if (teamResumePreview) {
        teamResumePreview.addEventListener("click", function () {
          if (
            !teamDetailResume ||
            !teamDetailResume.src ||
            !teamResumeModal ||
            !teamResumeModalImage
          )
            return;
          teamResumeModalImage.src = teamDetailResume.src;
          teamResumeModalImage.alt = teamDetailResume.alt;
          teamResumeModal.classList.add("active");
          teamResumeModal.setAttribute("aria-hidden", "false");
        });
      }

      teamResumeClosers.forEach(function (closer) {
        closer.addEventListener("click", function () {
          teamResumeModal.classList.remove("active");
          teamResumeModal.setAttribute("aria-hidden", "true");
        });
      });

      document.addEventListener("keydown", function (event) {
        if (
          event.key === "Escape" &&
          teamResumeModal &&
          teamResumeModal.classList.contains("active")
        ) {
          teamResumeModal.classList.remove("active");
          teamResumeModal.setAttribute("aria-hidden", "true");
        } else if (
          event.key === "Escape" &&
          teamDetailModal.classList.contains("active")
        ) {
          closeTeamModal();
        }
      });
    }

    // Sidebar Accordion Toggle
    var sidebarToggles = document.querySelectorAll(
      ".project-sidebar-subgroup-toggle",
    );
    sidebarToggles.forEach(function (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        // Toggle the active class for the arrow rotation
        this.classList.toggle("is-active");

        // Find the wrapper right after the button and toggle its open class
        var listWrapper = this.nextElementSibling;
        if (
          listWrapper &&
          listWrapper.classList.contains("project-sidebar-list-wrapper")
        ) {
          listWrapper.classList.toggle("is-open");
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
  (function initLiveSiteStats() {
    var totalCount = document.getElementById("total-view-count");
    if (!totalCount) return;

    var firebaseConfig = {
      apiKey: "AIzaSyAq-4bK2MLw0q7a3IKsqjzUrD5_Le_hka8",
      authDomain: "temport-b2930.firebaseapp.com",
      databaseURL:
        "https://temport-b2930-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "temport-b2930",
      appId: "1:194958710524:web:60565cbd5527f130736979",
    };

    function formatCount(value) {
      return new Intl.NumberFormat().format(Number(value) || 0);
    }

    Promise.all([
      import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js"),
    ])
      .then(function (modules) {
        var appModule = modules[0];
        var databaseModule = modules[1];
        var app = appModule.initializeApp(firebaseConfig, "temport-live-stats");
        var database = databaseModule.getDatabase(app);
        var totalViewsRef = databaseModule.ref(database, "stats/totalViews");

        databaseModule.onValue(totalViewsRef, function (snapshot) {
          totalCount.textContent = formatCount(snapshot.val());
        });

        if (!localStorage.getItem("temport_counted_visitor")) {
          databaseModule
            .runTransaction(totalViewsRef, function (currentValue) {
              return (Number(currentValue) || 0) + 1;
            })
            .then(function () {
              localStorage.setItem("temport_counted_visitor", "true");
            });
        }
      })
      .catch(function () {
        totalCount.textContent = "—";
      });
  })();

  var mobileDockQuery = window.matchMedia("(max-width: 860px)");
  var mobileDock = null;

  function dockIcon(path) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      path +
      "</svg>"
    );
  }

  function syncMobileDock(matches) {
    if (document.querySelector(".cr-apple-dock")) return;
    if (matches && !mobileDock) {
      var currentPage =
        window.location.pathname.split("/").pop() || "index.html";
      var items = [
        [
          "#hero",
          "Home",
          '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/>',
        ],
        [
          "#project",
          "Work",
          '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5Z"/><path d="M3 10h18"/>',
        ],
        [
          "#reviews",
          "Team",
          '<circle cx="9" cy="8" r="3"/><path d="M3 20c.6-3.1 2.7-5 6-5s5.4 1.9 6 5M16 5.5a3 3 0 0 1 0 5M18 15c1.7.5 2.7 1.8 3 3.8"/>',
        ],
        [
          "#services",
          "Services",
          '<path d="M4 7h16M4 12h16M4 17h10"/><circle cx="17" cy="17" r="3"/>',
        ],
        [
          "#footer",
          "Contact",
          '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
        ],
        ["#theme", "Theme", '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>'],
      ];

      mobileDock = document.createElement("nav");
      mobileDock.className = "mobile-dock";
      mobileDock.setAttribute("aria-label", "Mobile navigation");
      var filters = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg",
      );
      filters.setAttribute("aria-hidden", "true");
      filters.classList.add("mobile-dock__filters");
      filters.innerHTML =
        '<defs><filter id="mobile-gooey-filter"><feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"/></filter></defs>';
      var panel = document.createElement("div");
      panel.className = "mobile-dock__panel";
      var strip = document.createElement("div");
      strip.className = "mobile-dock__strip";
      var menuControls = [];

      function makeGooeyAppearance(control) {
        var effect = control.querySelector(".mobile-dock__gooey");
        if (!effect) return;
        effect.replaceChildren();
        effect.classList.remove("is-active");
        void effect.offsetWidth;
        effect.classList.add("is-active");

        for (var particleIndex = 0; particleIndex < 12; particleIndex++) {
          var angle =
            (Math.PI * 2 * particleIndex) / 12 + (Math.random() - 0.5) * 0.25;
          var distance = 24 + Math.random() * 16;
          var particle = document.createElement("span");
          particle.className = "mobile-dock__gooey-particle";
          particle.style.setProperty(
            "--goo-start-x",
            Math.cos(angle) * distance + "px",
          );
          particle.style.setProperty(
            "--goo-start-y",
            Math.sin(angle) * distance + "px",
          );
          particle.style.setProperty(
            "--goo-end-x",
            Math.cos(angle) * (4 + Math.random() * 7) + "px",
          );
          particle.style.setProperty(
            "--goo-end-y",
            Math.sin(angle) * (4 + Math.random() * 7) + "px",
          );
          particle.style.setProperty("--goo-delay", Math.random() * 90 + "ms");
          effect.appendChild(particle);
        }
      }

      items.forEach(function (item) {
        var itemIndex = items.indexOf(item);
        var control = document.createElement(
          item[0] === "#theme" ? "button" : "a",
        );
        control.className = "mobile-dock__item";
        if (item[0] === "#theme") {
          control.type = "button";
          control.setAttribute(
            "aria-pressed",
            String(document.documentElement.classList.contains("dark-mode")),
          );
          control.addEventListener("click", function (e) {
            triggerThemeToggle(control, e);
          });
        } else {
          control.href = item[0];
          if (currentPage === item[0])
            control.setAttribute("aria-current", "page");
          control.addEventListener("click", function (event) {
            event.preventDefault();
            if (mobileDock.classList.contains("is-navigating")) return;
            mobileDock.classList.add("is-navigating");
            control.classList.add("is-selected");

            for (var particleIndex = 0; particleIndex < 6; particleIndex++) {
              var particle = document.createElement("span");
              particle.className = "mobile-dock__particle";
              particle.style.setProperty(
                "--particle-angle",
                particleIndex * 60 + "deg",
              );
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
        var gooeyEffect = document.createElement("span");
        gooeyEffect.className = "mobile-dock__gooey";
        gooeyEffect.setAttribute("aria-hidden", "true");
        control.appendChild(gooeyEffect);
        menuControls.push(control);
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
          mobileDock.classList.add("is-gooey-opening");
          menuControls.forEach(function (control, index) {
            window.setTimeout(function () {
              makeGooeyAppearance(control);
            }, index * 55);
          });
          window.setTimeout(function () {
            mobileDock.classList.remove("is-opening");
            mobileDock.classList.remove("is-gooey-opening");
          }, 1050);
        }
        launcher.setAttribute("aria-expanded", String(isOpen));
        launcher.setAttribute(
          "aria-label",
          isOpen ? "Close navigation" : "Open navigation",
        );
        launcher.setAttribute("data-label", isOpen ? "Close" : "Menu");
      });
      panel.append(strip, launcher);
      mobileDock.appendChild(filters);
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
    return Boolean(document.querySelector(".detail-view-image-only.is-active"));
  }

  function syncImageOnlyLightbox() {
    var isOpen = isImageOnlyLightboxOpen();
    var wasOpen = document.body.classList.contains("lightbox-open");

    if (isOpen && !wasOpen) {
      document.body.classList.add("lightbox-open");
      return;
    }

    if (!isOpen && wasOpen) {
      document.body.classList.remove("lightbox-open");
    }
  }

  document.querySelectorAll(".detail-view-image-only").forEach(function (view) {
    view.addEventListener("click", function (e) {
      if (e.target === view || e.target.closest(".detail-os-close-btn") || e.target.closest("[data-grid-back]")) {
        var backBtn = view.querySelector("[data-grid-back]");
        if (backBtn) backBtn.click();
      }
    });
  });

  // ESC key to close active image viewer
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      var activeView = document.querySelector(".detail-view-image-only.is-active");
      if (activeView) {
        var backBtn = activeView.querySelector("[data-grid-back]");
        if (backBtn) backBtn.click();
      }
    }
  });

  document
    .querySelectorAll(".project-sidebar-item, .browse-grid-item")
    .forEach(function (item) {
      item.addEventListener("click", function () {
        // Do not scroll anywhere when clicking a grid item or opening an image
        if (item.classList.contains("browse-grid-item")) {
          return;
        }

        window.requestAnimationFrame(function () {
          if (isImageOnlyLightboxOpen()) {
            syncImageOnlyLightbox();
            return;
          }
        });
      });
    });

  new MutationObserver(syncImageOnlyLightbox).observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true,
  });

  syncImageOnlyLightbox();
});


/* ==========================================================================
   CREATIE® FRAMER UI/UX INTERACTIVE ANIMATIONS ENGINE
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function () {
  // 1. Interactive Mouse-Tracking & Blinking Googly Eyes (#cr-googly-eyes)
  var googlyEyes = document.getElementById("cr-googly-eyes");
  if (googlyEyes) {
    var googlyPupils = googlyEyes.querySelectorAll(".cr-googly-pupil");
    var targetMouseX = window.innerWidth / 2;
    var targetMouseY = window.innerHeight / 3;
    var pupilPositions = Array.from(googlyPupils).map(function () {
      return { x: 0, y: 0 };
    });

    window.addEventListener("pointermove", function (e) {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    });

    function animateGooglyEyes() {
      googlyPupils.forEach(function (pupil, idx) {
        var eye = pupil.parentElement;
        if (!eye) return;
        var rect = eye.getBoundingClientRect();
        var centerX = rect.left + rect.width / 2;
        var centerY = rect.top + rect.height / 2;
        var dx = targetMouseX - centerX;
        var dy = targetMouseY - centerY;
        var angle = Math.atan2(dy, dx);
        var maxDist = 11;
        var dist = Math.min(maxDist, Math.hypot(dx, dy) * 0.06);
        var desiredX = Math.cos(angle) * dist;
        var desiredY = Math.sin(angle) * dist;

        pupilPositions[idx].x += (desiredX - pupilPositions[idx].x) * 0.18;
        pupilPositions[idx].y += (desiredY - pupilPositions[idx].y) * 0.18;
        pupil.style.transform =
          "translate3d(" +
          pupilPositions[idx].x.toFixed(2) +
          "px, " +
          pupilPositions[idx].y.toFixed(2) +
          "px, 0)";
      });
      requestAnimationFrame(animateGooglyEyes);
    }
    requestAnimationFrame(animateGooglyEyes);

    // Blink every 3000ms (matching Framer blinkInterval: 3e3)
    setInterval(function () {
      googlyEyes.classList.add("is-blinking");
      setTimeout(function () {
        googlyEyes.classList.remove("is-blinking");
      }, 160);
    }, 3000);
  }

  // 2. Interactive 3D Draggable & Tilting Stickers ([data-draggable-sticker])
  var stickers = document.querySelectorAll("[data-draggable-sticker]");
  stickers.forEach(function (sticker) {
    var isDragging = false;
    var startX = 0;
    var startY = 0;
    var offsetX = 0;
    var offsetY = 0;
    var currentX = 0;
    var currentY = 0;
    var baseRotate = (Math.random() * 18 - 9).toFixed(1);

    sticker.addEventListener("pointerdown", function (e) {
      isDragging = true;
      sticker.classList.add("is-dragging");
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;
      if (sticker.setPointerCapture) {
        sticker.setPointerCapture(e.pointerId);
      }
    });

    sticker.addEventListener("pointermove", function (e) {
      if (isDragging) {
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
        sticker.style.transform =
          "translate3d(" +
          currentX +
          "px, " +
          currentY +
          "px, 0) scale(1.08) rotate(" +
          baseRotate +
          "deg)";
        return;
      }
      // Subtle 3D tilt on hover
      var rect = sticker.getBoundingClientRect();
      var relX = (e.clientX - rect.left) / rect.width - 0.5;
      var relY = (e.clientY - rect.top) / rect.height - 0.5;
      var tiltX = (-relY * 18).toFixed(1);
      var tiltY = (relX * 18).toFixed(1);
      sticker.style.transform =
        "translate3d(" +
        currentX +
        "px, " +
        currentY +
        "px, 0) perspective(500px) rotateX(" +
        tiltX +
        "deg) rotateY(" +
        tiltY +
        "deg) scale(1.05)";
    });

    function endStickerDrag(e) {
      if (!isDragging) return;
      isDragging = false;
      sticker.classList.remove("is-dragging");
      sticker.style.transform =
        "translate3d(" +
        currentX +
        "px, " +
        currentY +
        "px, 0) rotate(" +
        baseRotate +
        "deg)";
    }

    sticker.addEventListener("pointerup", endStickerDrag);
    sticker.addEventListener("pointercancel", endStickerDrag);
    sticker.addEventListener("pointerleave", function () {
      if (!isDragging) {
        sticker.style.transform =
          "translate3d(" +
          currentX +
          "px, " +
          currentY +
          "px, 0) rotate(" +
          baseRotate +
          "deg)";
      }
    });
  });

  // 3. Expandable Glassmorphic Profile Card & 4-Member Message-Transition Rotator (#cr-profile-card)
  var profileCard = document.getElementById("cr-profile-card");
  var rotatorAvatar = document.getElementById("hero-rotator-avatar");
  var rotatorFname = document.getElementById("hero-rotator-fname");
  var rotatorRole = document.getElementById("hero-rotator-role");
  var rotatorStatus = document.getElementById("hero-rotator-status");
  var rotatorTime = document.getElementById("hero-rotator-time");
  var rotatorBio = document.getElementById("hero-rotator-bio");
  var rotatorSkills = document.getElementById("hero-rotator-skills");
  var rotatorResumeBtn = document.getElementById("hero-open-chat-btn") || document.getElementById("hero-rotator-resume-btn");
  var rotatorNameMsg = document.getElementById("hero-rotator-name-msg");
  var rotatorMsgBubble = document.getElementById("hero-rotator-msg-bubble");
  var segmentBars = document.querySelectorAll(".cr-segment-bar[data-member-seg]");

  if (profileCard) {
    profileCard.addEventListener("click", function (e) {
      // Don't open when clicking segment bars or anchor links
      if (e.target.closest("a, .cr-segment-bar")) return;
      var activeKey = (teamMembers[currentMemberIdx] && teamMembers[currentMemberIdx].resume) || "kenneth";
      openMessengerModal(activeKey);
    });

    var teamMembers = [
      {
        firstName: "KENNETH",
        role: "TEAM LEAD & FULL-STACK",
        avatar: "assets/kenneth.png",
        status: "Available for work",
        time: "Active now",
        bio: "\"Engineering clean system architecture, full-stack web applications, and leading the team to launch.\"",
        skills: "Full-Stack · Architecture · Lead",
        resume: "kenneth",
      },
      {
        firstName: "JENZ",
        role: "DESIGN LEAD & UI/UX",
        avatar: "assets/jenz.png",
        status: "Designing new UI",
        time: "Just now",
        bio: "\"Crafting emotional interfaces, bespoke design systems, typography, and interactive brand experiences.\"",
        skills: "UI/UX Design · Motion · Brand",
        resume: "jenz",
      },
      {
        firstName: "JAMIL",
        role: "FRONTEND ENGINEER",
        avatar: "assets/jamil.png",
        status: "Coding interactions",
        time: "1m ago",
        bio: "\"Turning high-fidelity concepts into buttery-smooth frontend web experiences and creative micro-interactions.\"",
        skills: "Frontend · Micro-interactions · Web",
        resume: "jamil",
      },
      {
        firstName: "CHRISJOHN",
        role: "BACKEND DEVELOPER",
        avatar: "assets/pacay.png",
        status: "Optimizing databases",
        time: "Just now",
        bio: "\"Building robust backend infrastructure, secure REST APIs, database schemas, and performance optimizations.\"",
        skills: "Backend · APIs · Databases · Security",
        resume: "pacay",
      },
    ];

    var currentMemberIdx = 0;
    var isSwitching = false;
    var rotationTimer = null;

    function applyMember(idx, animate) {
      if (!teamMembers[idx]) return;
      var member = teamMembers[idx];
      currentMemberIdx = idx;

      // Update segment indicators immediately
      segmentBars.forEach(function (bar, bIdx) {
        bar.classList.toggle("is-active", bIdx === idx);
      });

      if (!animate) {
        if (rotatorAvatar) rotatorAvatar.src = member.avatar;
        if (rotatorFname) rotatorFname.textContent = member.firstName;
        if (rotatorRole) rotatorRole.textContent = member.role;
        if (rotatorStatus) rotatorStatus.textContent = member.status;
        if (rotatorTime) rotatorTime.textContent = member.time;
        if (rotatorBio) rotatorBio.textContent = member.bio;
        if (rotatorSkills) rotatorSkills.textContent = member.skills;
        if (rotatorResumeBtn) {
          rotatorResumeBtn.setAttribute("data-person-resume", member.resume);
          rotatorResumeBtn.setAttribute("title", "Open " + member.firstName + "'s Resume");
        }
        return;
      }

      if (isSwitching) return;
      isSwitching = true;

      // Step 1: Slide & fade out current message and pulse avatar
      var avatarWrap = rotatorAvatar ? rotatorAvatar.closest(".cr-profile-avatar") : null;
      if (rotatorNameMsg) rotatorNameMsg.classList.add("is-transitioning");
      if (rotatorMsgBubble) rotatorMsgBubble.classList.add("is-transitioning");
      if (avatarWrap) avatarWrap.classList.add("is-changing");

      setTimeout(function () {
        // Step 2: Swap content while hidden
        if (rotatorAvatar) rotatorAvatar.src = member.avatar;
        if (rotatorFname) rotatorFname.textContent = member.firstName;
        if (rotatorRole) rotatorRole.textContent = member.role;
        if (rotatorStatus) rotatorStatus.textContent = member.status;
        if (rotatorTime) rotatorTime.textContent = member.time;
        if (rotatorBio) rotatorBio.textContent = member.bio;
        if (rotatorSkills) rotatorSkills.textContent = member.skills;
        if (rotatorResumeBtn) {
          rotatorResumeBtn.setAttribute("data-person-resume", member.resume);
          rotatorResumeBtn.setAttribute("title", "Open " + member.firstName + "'s Resume");
        }

        // Prepare incoming position (below)
        if (rotatorNameMsg) {
          rotatorNameMsg.classList.remove("is-transitioning");
          rotatorNameMsg.classList.add("is-incoming");
        }
        if (rotatorMsgBubble) {
          rotatorMsgBubble.classList.remove("is-transitioning");
          rotatorMsgBubble.classList.add("is-incoming");
        }

        // Force browser layout reflow
        if (rotatorNameMsg) void rotatorNameMsg.offsetWidth;

        // Step 3: Animate in smoothly (like an incoming message)
        requestAnimationFrame(function () {
          if (rotatorNameMsg) rotatorNameMsg.classList.remove("is-incoming");
          if (rotatorMsgBubble) rotatorMsgBubble.classList.remove("is-incoming");
          if (avatarWrap) avatarWrap.classList.remove("is-changing");
          setTimeout(function () {
            isSwitching = false;
          }, 360);
        });
      }, 260);
    }

    function startAutoRotation() {
      stopAutoRotation();
      rotationTimer = setInterval(function () {
        var nextIdx = (currentMemberIdx + 1) % teamMembers.length;
        applyMember(nextIdx, true);
      }, 4200);
    }

    function stopAutoRotation() {
      if (rotationTimer) {
        clearInterval(rotationTimer);
        rotationTimer = null;
      }
    }

    // Segment bar manual clicks
    segmentBars.forEach(function (bar) {
      bar.addEventListener("click", function (e) {
        e.stopPropagation();
        var targetIdx = parseInt(bar.getAttribute("data-member-seg"), 10);
        if (!isNaN(targetIdx) && targetIdx !== currentMemberIdx) {
          applyMember(targetIdx, true);
          startAutoRotation(); // restart timer
        }
      });
    });

    // Pause on hover so the user can comfortably read or click
    profileCard.addEventListener("pointerenter", stopAutoRotation);
    profileCard.addEventListener("pointerleave", startAutoRotation);

    // Direct chat pill button click: opens that specific member's messenger chat
    if (rotatorResumeBtn) {
      rotatorResumeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var person =
          rotatorResumeBtn.getAttribute("data-person-resume") ||
          (teamMembers[currentMemberIdx] && teamMembers[currentMemberIdx].resume) ||
          "kenneth";
        openMessengerModal(person);
      });
    }

    // Start auto rotation
    applyMember(0, false);
    startAutoRotation();
  }

  // 4. Hero Project-Card Stack Fan-Out (#cr-project-stack)
  var projectStack = document.getElementById("cr-project-stack");
  if (projectStack) {
    projectStack.addEventListener("mouseenter", function () {
      projectStack.classList.add("is-open");
    });
    projectStack.addEventListener("mouseleave", function () {
      projectStack.classList.remove("is-open");
    });
  }

  // 5. OS-Window Project Category Filter ([data-cr-filter])
  var filterButtons = document.querySelectorAll("[data-cr-filter]");
  var osCards = document.querySelectorAll(".cr-os-card[data-cr-cat]");
  var osGrid = document.querySelector(".cr-os-projects-grid");
  if (filterButtons.length && osCards.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var cat = btn.getAttribute("data-cr-filter");
        if (osGrid) {
          osGrid.classList.toggle("is-filtered", cat !== "all");
        }
        filterButtons.forEach(function (b) {
          b.classList.toggle("active", b === btn);
        });
        osCards.forEach(function (card) {
          var cardCat = card.getAttribute("data-cr-cat");
          var match = cat === "all" || cardCat === cat;
          card.classList.toggle("is-hidden", !match);
        });
      });
    });
  }

  // 5b. Creatie® Aesthetic Case Study Showcase Modal
  var showcaseProjectsData = {
    magnify: {
      title: "Magnify Vision",
      address: "magnifyvisionmedia.com",
      heroImg: "assets/projects/project1-1.png",
      gallery: [
        "assets/projects/project1-2.png",
        "assets/projects/project1-3.png"
      ],
      previewLink: "https://mvm-website-624e7.web.app/",
      desc: "Developed a premium corporate website for Magnify Vision Media, a digital marketing agency specializing in social media strategy, paid advertising, and brand growth. The website emphasizes modern branding, responsive layout, and interactive frontend experiences.",
      client: "Digital Marketing Agency",
      years: "2026",
      type: "Website Design",
      tools: "HTML5, CSS3, JavaScript"
    },
    bunbite: {
      title: "Bun & Bite",
      address: "bunandbite.co",
      heroImg: "assets/projects/project2-1.png",
      gallery: [
        "assets/projects/project2-2.png",
        "assets/projects/project2-3.png",
        "assets/projects/project2-4.png"
      ],
      previewLink: "assets/projects/project2-1.png",
      desc: "An artisanal gourmet burger online ordering and menu experience featuring dynamic ingredient customization, mouthwatering hero presentations, and lightning-fast checkout flow.",
      client: "Gourmet Food & Beverage",
      years: "2026",
      type: "Web Application",
      tools: "HTML5, CSS3, JavaScript, UI/UX"
    },
    newday: {
      title: "NewDay Coaching",
      address: "newdaychildcoaching.com",
      heroImg: "assets/projects/project3-1.png",
      gallery: [
        "assets/projects/project3-2.png",
        "assets/projects/project3-3.png"
      ],
      previewLink: "assets/projects/project3-1.png",
      desc: "A compassionate, family-centered wellness and coaching platform designed to guide parents and children through developmental milestones with clear scheduling, curated resources, and an approachable brand identity.",
      client: "Family Wellness & Coaching",
      years: "2026",
      type: "Branding & Platform",
      tools: "WordPress, Figma, PHP"
    },
    vibetix: {
      title: "Vibe//Tix Live",
      address: "vibetix.live",
      heroImg: "assets/projects/vibetix-1.png",
      gallery: [
        "assets/projects/vibetix-2.png",
        "assets/projects/vibetix-3.png"
      ],
      previewLink: "https://vibetix-c74f0.web.app/",
      desc: "A premier live music & electronic festival ticketing ecosystem featuring real-time seat reservation, dynamic artist showcases, and frictionless mobile checkouts.",
      client: "Entertainment & Events",
      years: "2026",
      type: "Event Web Platform",
      tools: "React, Node.js, Web Audio API"
    },
    airedigital: {
      title: "AIRE Digital",
      address: "airedigital.agency",
      heroImg: "assets/projects/airedigital-1.png",
      gallery: [
        "assets/projects/airedigital-2.png",
        "assets/projects/airedigital-3.png"
      ],
      previewLink: "https://airedigitalservices.co/",
      desc: "A bespoke outbound lead generation and digital business development website built for AIRE Digital, featuring verified prospect research, clear conversion paths, and an international B2B aesthetic.",
      client: "AIRE Digital Services",
      years: "2026",
      type: "B2B Lead Generation & Web Design",
      tools: "Webflow, Custom CSS, JavaScript"
    }
  };

  var showcaseBackdrop = document.getElementById("cr-showcase-backdrop");
  var showcaseCloseBtn = document.getElementById("cr-showcase-close-btn");
  var showcaseTitle = document.getElementById("cr-showcase-title");
  var showcaseAddressText = document.getElementById("cr-showcase-address-text");
  var showcaseHeroImg = document.getElementById("cr-showcase-hero-img");
  var showcasePreviewLink = document.getElementById("cr-showcase-preview-link");
  var showcaseDesc = document.getElementById("cr-showcase-desc");
  var showcaseClient = document.getElementById("cr-showcase-client");
  var showcaseYears = document.getElementById("cr-showcase-years");
  var showcaseType = document.getElementById("cr-showcase-type");
  var showcaseTools = document.getElementById("cr-showcase-tools");
  var showcaseGallery = document.getElementById("cr-showcase-gallery");

  function openShowcaseModal(projectId) {
    if (!showcaseBackdrop) return;
    var data = showcaseProjectsData[projectId] || showcaseProjectsData.magnify;
    if (showcaseTitle) showcaseTitle.textContent = data.title;
    if (showcaseAddressText) showcaseAddressText.textContent = "Portfolio / " + data.title;
    if (showcaseHeroImg) {
      showcaseHeroImg.src = data.heroImg;
      showcaseHeroImg.alt = data.title + " Hero Showcase";
    }
    if (showcasePreviewLink) {
      showcasePreviewLink.href = data.previewLink;
    }
    if (showcaseDesc) showcaseDesc.textContent = data.desc;
    if (showcaseClient) showcaseClient.textContent = data.client;
    if (showcaseYears) showcaseYears.textContent = data.years;
    if (showcaseType) showcaseType.textContent = data.type;
    if (showcaseTools) showcaseTools.textContent = data.tools;

    if (showcaseGallery) {
      showcaseGallery.innerHTML = "";
      if (Array.isArray(data.gallery)) {
        data.gallery.forEach(function (imgSrc) {
          var img = document.createElement("img");
          img.className = "cr-showcase-gallery-img";
          img.src = imgSrc;
          img.alt = data.title + " Additional Screen";
          img.loading = "lazy";
          showcaseGallery.appendChild(img);
        });
      }
    }

    showcaseBackdrop.classList.add("active");
    showcaseBackdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeShowcaseModal() {
    if (!showcaseBackdrop) return;
    showcaseBackdrop.classList.remove("active");
    showcaseBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  var showcaseTriggers = document.querySelectorAll("[data-showcase-id]");
  if (showcaseTriggers.length) {
    showcaseTriggers.forEach(function (trigger) {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        var id = trigger.getAttribute("data-showcase-id");
        openShowcaseModal(id);
      });
      trigger.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          var id = trigger.getAttribute("data-showcase-id");
          openShowcaseModal(id);
        }
      });
    });
  }

  if (showcaseCloseBtn) {
    showcaseCloseBtn.addEventListener("click", closeShowcaseModal);
  }

  if (showcaseBackdrop) {
    showcaseBackdrop.addEventListener("click", function (e) {
      if (e.target === showcaseBackdrop) {
        closeShowcaseModal();
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && showcaseBackdrop && showcaseBackdrop.classList.contains("active")) {
      closeShowcaseModal();
    }
  });

  // 6. Interactive OS Team Messenger Modal ([data-open-messenger], #resume-panel)
  var messengerTeamData = {
    kenneth: {
      name: "Kenneth Cyrus Bianzon",
      role: "TEAM LEAD",
      avatar: "assets/kenneth.png",
      status: "Active now",
      addressSlug: "creatie://team-messenger.chat/kenneth.bianzon",
      intro: "Hey there! 👋 Welcome to our portfolio. I'm Kenneth, Team Lead & Full-Stack Developer at TEMport.",
      specialty: "I specialize in clean full-stack architecture, relational database modeling, and shipping high-performance web applications that scale effortlessly.",
      fileName: "Kenneth_Bianzon_Resume_2026.pdf",
      subTitle: "Verified Vector PDF · High-DPI Crystal Clear Document",
      pdfUrl: "resumes/kenneth.pdf",
      thumbImg: "resumes/kenneth.png?v=2",
      sheetId: "cr-sheet-image-kenneth",
      roleBg: "#e8f2fe",
      roleColor: "#1668c7",
      replies: [
        "Thanks for reaching out! We can connect on your project goals or schedule a call via the contact section.",
        "I'd be glad to review the technical specifications and system architecture with you!",
        "Feel free to check out my verified vector resume sheet attached above for full project history."
      ],
      presetReplies: {
        hire: "We'd love to partner with you! Our team is currently taking on new projects for Q2/Q3. You can drop your project scope right into the contact section below, or click 'Schedule a Call' in the header so we can review your timeline, tech requirements, and deliverables directly.",
        stack: "Glad you asked! My core stack focuses on full-stack web applications: React, Node.js, Express, PostgreSQL, and scalable cloud deployments with Docker. I handle end-to-end architecture, API contracts, and team code reviews. You can open my verified PDF sheet above to view my complete experience and production milestones!",
        timeline: "Our turnaround typically ranges from 1 to 3 weeks for high-impact landing pages and portfolio sites, and 4 to 8 weeks for complex web applications with authentication and database integrations. Pricing is milestone-based and tailored to your scope and speed requirements. Send us a message below and we'll prepare a custom proposal!",
        hello: "Thank you so much! That really means a lot to our entire team. We spent a ton of time refining the retro OS aesthetics, glassmorphism details, and responsive layout. Feel free to explore our projects archive and poke around!"
      }
    },
    jenz: {
      name: "Jenz Patrick Reguyal",
      role: "DESIGN LEAD",
      avatar: "assets/jenz.png",
      status: "Active now",
      addressSlug: "creatie://team-messenger.chat/jenz.reguyal",
      intro: "Hi! ✨ I'm Jenz, Design Lead & UI/UX Designer at TEMport. Nice to meet you!",
      specialty: "I craft bespoke visual identities, emotional web interfaces, and high-fidelity interaction prototypes in Figma.",
      fileName: "Jenz_Reguyal_Resume_2026.pdf",
      subTitle: "Verified Vector PDF · High-DPI Crystal Clear Document",
      pdfUrl: "resumes/jenz.pdf",
      thumbImg: "resumes/jenz.png?v=2",
      sheetId: "cr-sheet-image-jenz",
      roleBg: "#fceefb",
      roleColor: "#ab1ea8",
      replies: [
        "Thanks for the message! I'm always excited to discuss art direction, brand systems, and Figma UI layouts.",
        "We can tailor a bespoke visual experience that sets your brand apart. Let's make something iconic!",
        "Check out my verified sheet above to see past design systems and typography treatments."
      ],
      presetReplies: {
        hire: "That's awesome! We'd be thrilled to help design and build your project. Whether you need a fresh brand identity, a complete UI/UX overhaul, or high-fidelity prototypes, you can reach out via the contact form or schedule a call so we can review the moodboards and wireframes together!",
        stack: "Happy to share! I lead product design specializing in Figma design systems, wireframing, high-fidelity UI, user research, and responsive prototyping. I ensure every component has cohesive typography, accessible contrast, and micro-interactions. Check out my verified PDF sheet above to view my case studies and design specs!",
        timeline: "For design sprints, brand kits and high-fidelity Figma prototypes typically take 1 to 2 weeks, with full product UI systems taking 3 to 4 weeks including user journey maps and developer handoff specs. We offer transparent, milestone-based packages. Feel free to ping us via the contact form for a personalized estimate!",
        hello: "Thank you for the kind words! ✨ Designing this interface with the playful retro OS vibe, tactile badges, and paper grid textures was a labor of love. So glad you enjoyed the aesthetics!"
      }
    },
    jamil: {
      name: "Jamil Kharim Abinal",
      role: "FRONTEND DEV",
      avatar: "assets/jamil.png",
      status: "Active now",
      addressSlug: "creatie://team-messenger.chat/jamil.abinal",
      intro: "Hello! 🚀 I'm Jamil, Frontend Engineer at TEMport. Glad you stopped by!",
      specialty: "I build responsive, accessible web interfaces and fluid micro-interactions with high attention to detail and modern JavaScript.",
      fileName: "Jamil_Abinal_Resume_2026.pdf",
      subTitle: "Verified Vector PDF · High-DPI Crystal Clear Document",
      pdfUrl: "resumes/jamil.pdf",
      thumbImg: "resumes/jamil.png?v=2",
      sheetId: "cr-sheet-image-jamil",
      roleBg: "#eaf8ed",
      roleColor: "#137a2a",
      replies: [
        "Hey! Thanks for pinging me. I love bringing smooth animations and accessible web layouts to life.",
        "If you want to build high-performance web experiences with smooth micro-interactions, we're ready!",
        "My full technical resume is attached above if you'd like to inspect my frontend toolkit."
      ],
      presetReplies: {
        hire: "Fantastic! We're excited to collaborate. We specialize in turning design concepts into fast, responsive, and animated web applications. Feel free to send over your project specs through the contact form below or book a quick intro call with the team!",
        stack: "Sure thing! My frontend toolkit centers on modern JavaScript (ES6+), semantic HTML5, advanced CSS3/Sass, and responsive animations with GSAP and Tailwind. I focus on sub-second load times, smooth scrolling interactions, and strict accessibility. Take a look at my verified PDF sheet attached above to see my work and technical credentials!",
        timeline: "For frontend builds, clean interactive websites are usually shipped in 1 to 2 weeks, while rich multi-page web applications take 3 to 5 weeks with thorough cross-browser and mobile testing. We keep our development agile with weekly demos. Let us know your timeline goals in the contact section!",
        hello: "Thanks a ton! 🎉 We poured a lot of heart into the fluid animations, interactive messenger, and dark mode transitions. Feel free to browse around and test out all the interactive widgets!"
      }
    },
    pacay: {
      name: "ChrisJohn Pacay",
      role: "BACKEND DEV",
      avatar: "assets/pacay.png",
      status: "Active now",
      addressSlug: "creatie://team-messenger.chat/chrisjohn.pacay",
      intro: "Hey! 🛡️ I'm ChrisJohn, Backend Developer at TEMport. Ready to build something solid?",
      specialty: "I build resilient cloud APIs, authentication systems, and database schemas that keep applications secure and fast.",
      fileName: "ChrisJohn_Pacay_Resume_2026.pdf",
      subTitle: "Verified Vector PDF · High-DPI Crystal Clear Document",
      pdfUrl: "resumes/pacay.pdf",
      thumbImg: "assets/pacay.png",
      sheetId: "cr-sheet-image-pacay",
      roleBg: "#f2efff",
      roleColor: "#5c3cfa",
      replies: [
        "Got your message! I'm available to architect scalable backends and secure database models.",
        "Drop your project details in our contact form or let's hop on a call to plan the infrastructure.",
        "Take a look at my verified PDF sheet attached above for database schemas and backend tech stack."
      ],
      presetReplies: {
        hire: "Awesome to hear! We're ready to engineer scalable systems and robust infrastructure for your product. Share your project requirements and target stack through the contact form below or schedule a discovery call with us!",
        stack: "Certainly! I specialize in backend architecture: Node.js, Python, REST/GraphQL APIs, relational database design (PostgreSQL/MySQL), Redis caching, and JWT authentication security. I focus on throughput, data integrity, and secure server environments. You can inspect my verified PDF sheet above for full stack credentials and system diagrams!",
        timeline: "Backend API architecture and database schema setups usually take 2 to 4 weeks depending on the number of endpoints, third-party integrations, and security requirements. We provide upfront fixed-milestone pricing with no surprises. Drop your scope in the contact section and we'll calculate a turnaround estimate!",
        hello: "Appreciate the love! 🙌 We built this portfolio to showcase both our visual creativity and engineering craft. Thanks for checking out our work and stopping by to say hi!"
      }
    }
  };

  var messengerPanel = document.getElementById("resume-panel");
  var messengerBackdrop = document.querySelector(".cr-messenger-backdrop");
  var messengerCloseBtn = document.querySelector(".cr-messenger-close-btn");
  var chatFeed = document.getElementById("cr-chat-feed");
  var chatInput = document.getElementById("cr-chat-input");
  var chatForm = document.getElementById("cr-chat-form");
  var sheetOverlay = document.getElementById("cr-sheet-overlay");
  var toggleResumeSheetBtn = document.getElementById("cr-chat-toggle-resume-btn");
  var openSheetFromChatBtn = document.getElementById("cr-open-sheet-from-chat");
  var sheetBackBtn = document.getElementById("cr-sheet-back-btn");
  var currentActiveMessengerPerson = "kenneth";

  function openMessengerModal(personKey) {
    switchMessengerThread(personKey);
    if (messengerPanel) {
      messengerPanel.classList.add("active");
      document.body.style.overflow = "hidden";
      document.body.classList.add("messenger-open");
    }
  }

  function closeMessengerModal() {
    if (messengerPanel) {
      messengerPanel.classList.remove("active");
      document.body.style.overflow = "";
      document.body.classList.remove("messenger-open");
    }
    if (sheetOverlay) {
      sheetOverlay.classList.remove("is-active");
    }
  }

  function switchMessengerThread(personKey) {
    var key = (personKey || "").toLowerCase();
    if (!messengerTeamData[key]) key = "kenneth";
    currentActiveMessengerPerson = key;
    var data = messengerTeamData[key];

    // Sidebar thread items
    var threadItems = document.querySelectorAll(".cr-thread-item[data-chat-person]");
    threadItems.forEach(function (btn) {
      var isCurrent = btn.getAttribute("data-chat-person") === key;
      btn.classList.toggle("is-active", isCurrent);
      btn.setAttribute("aria-selected", isCurrent ? "true" : "false");
    });

    // Address bar
    var addressEl = document.getElementById("cr-messenger-address");
    if (addressEl) addressEl.textContent = data.addressSlug;

    // Header info
    var headerAvatar = document.getElementById("cr-chat-header-avatar");
    var headerName = document.getElementById("cr-chat-header-name");
    var headerBadge = document.getElementById("cr-chat-header-badge");
    var headerStatus = document.getElementById("cr-chat-header-status");

    if (headerAvatar) headerAvatar.src = data.avatar;
    if (headerName) headerName.textContent = data.name;
    if (headerBadge) {
      headerBadge.textContent = data.role;
      if (data.roleBg) headerBadge.style.background = data.roleBg;
      if (data.roleColor) {
        headerBadge.style.color = data.roleColor;
        headerBadge.style.borderColor = data.roleColor + "40";
      }
    }
    if (headerStatus) headerStatus.textContent = data.status;

    // Chat intro & specialty
    var msgIntro = document.getElementById("cr-msg-intro");
    var msgSpecialty = document.getElementById("cr-msg-specialty");
    if (msgIntro) msgIntro.textContent = data.intro;
    if (msgSpecialty) msgSpecialty.textContent = data.specialty;

    // Attachment card
    var thumbImg = document.getElementById("cr-attachment-thumb-img");
    var attachTitle = document.getElementById("cr-attachment-title");
    var attachSub = document.getElementById("cr-attachment-sub");
    var attachDl = document.getElementById("cr-attachment-download-link");
    var attachTab = document.getElementById("cr-attachment-open-tab");
    if (thumbImg) thumbImg.src = data.thumbImg;
    if (attachTitle) attachTitle.textContent = data.fileName;
    if (attachSub) attachSub.textContent = data.subTitle;
    if (attachDl) attachDl.href = data.pdfUrl;
    if (attachTab) attachTab.href = data.pdfUrl;

    // Sheet overlay content
    var sheetDl = document.getElementById("cr-sheet-download-btn");
    var sheetTab = document.getElementById("cr-sheet-open-tab-btn");
    var sheetPdfFrame = document.getElementById("cr-sheet-pdf-frame");
    if (sheetDl) sheetDl.href = data.pdfUrl;
    if (sheetTab) sheetTab.href = data.pdfUrl;
    if (sheetPdfFrame) {
      sheetPdfFrame.src = data.pdfUrl + "#toolbar=1&navpanes=0&scrollbar=1&view=FitH";
    }
    var allSheets = document.querySelectorAll(".cr-sheet-image-container");
    allSheets.forEach(function (sheet) {
      sheet.style.display = sheet.id === data.sheetId ? "block" : "none";
    });

    // Reset slide sheet overlay
    if (sheetOverlay) sheetOverlay.classList.remove("is-active");
    var sheetScrollBodyEl = document.getElementById("cr-sheet-scroll-body");
    if (sheetScrollBodyEl) sheetScrollBodyEl.classList.remove("is-image-mode");

    // Clear dynamic messages on thread switch
    var dynMessages = document.getElementById("cr-chat-dynamic-messages");
    if (dynMessages) dynMessages.innerHTML = "";

    // Input placeholder
    if (chatInput) {
      chatInput.placeholder = "Message " + data.name.split(" ")[0] + "...";
    }

    if (chatFeed) chatFeed.scrollTop = 0;
  }

  // Resume Sheet Mode Switcher (Vector PDF vs HD Image)
  var modePdfBtn = document.getElementById("cr-sheet-mode-pdf");
  var modeImgBtn = document.getElementById("cr-sheet-mode-img");
  var sheetPdfPane = document.getElementById("cr-sheet-pdf-pane");
  var sheetImagesPane = document.getElementById("cr-sheet-images-pane");
  var sheetScrollBody = document.getElementById("cr-sheet-scroll-body");

  if (modePdfBtn && modeImgBtn && sheetPdfPane && sheetImagesPane) {
    modePdfBtn.addEventListener("click", function () {
      modePdfBtn.classList.add("is-active");
      modeImgBtn.classList.remove("is-active");
      sheetPdfPane.style.display = "flex";
      sheetImagesPane.style.display = "none";
      if (sheetScrollBody) sheetScrollBody.classList.remove("is-image-mode");
    });
    modeImgBtn.addEventListener("click", function () {
      modeImgBtn.classList.add("is-active");
      modePdfBtn.classList.remove("is-active");
      sheetPdfPane.style.display = "none";
      sheetImagesPane.style.display = "block";
      if (sheetScrollBody) sheetScrollBody.classList.add("is-image-mode");
    });
  }

  // Bind thread switcher in sidebar
  var threadButtons = document.querySelectorAll(".cr-thread-item[data-chat-person]");
  threadButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var person = btn.getAttribute("data-chat-person");
      switchMessengerThread(person);
    });
  });

  // Bind all triggers to open messenger across the site
  var messengerTriggers = document.querySelectorAll(
    "[data-open-messenger], [data-open-resume], [data-open-resume-modal], .view-resume-trigger"
  );
  messengerTriggers.forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var person =
        el.getAttribute("data-open-messenger") ||
        el.getAttribute("data-open-resume") ||
        "kenneth";
      openMessengerModal(person);
    });
  });

  // Close triggers
  if (messengerCloseBtn) {
    messengerCloseBtn.addEventListener("click", closeMessengerModal);
  }
  if (messengerBackdrop) {
    messengerBackdrop.addEventListener("click", closeMessengerModal);
  }
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && messengerPanel && messengerPanel.classList.contains("active")) {
      closeMessengerModal();
    }
  });

  // Toggle resume sheet view inside chat window
  if (toggleResumeSheetBtn) {
    toggleResumeSheetBtn.addEventListener("click", function () {
      if (sheetOverlay) sheetOverlay.classList.add("is-active");
      var sheetPdf = document.getElementById("cr-sheet-pdf-frame");
      if (sheetPdf && !sheetPdf.getAttribute("src") && sheetPdf.getAttribute("data-src")) {
        sheetPdf.setAttribute("src", sheetPdf.getAttribute("data-src"));
      }
    });
  }
  if (openSheetFromChatBtn) {
    openSheetFromChatBtn.addEventListener("click", function () {
      if (sheetOverlay) sheetOverlay.classList.add("is-active");
      var sheetPdf = document.getElementById("cr-sheet-pdf-frame");
      if (sheetPdf && !sheetPdf.getAttribute("src") && sheetPdf.getAttribute("data-src")) {
        sheetPdf.setAttribute("src", sheetPdf.getAttribute("data-src"));
      }
    });
  }
  if (sheetBackBtn) {
    sheetBackBtn.addEventListener("click", function () {
      if (sheetOverlay) sheetOverlay.classList.remove("is-active");
    });
  }

  // Interactive message sending & simulated reply
  function handleSendMessage(text) {
    var trimmed = (text || "").trim();
    if (!trimmed) return;

    var dynContainer = document.getElementById("cr-chat-dynamic-messages");
    if (!dynContainer) return;

    // Append outgoing user message
    var outgoingRow = document.createElement("div");
    outgoingRow.className = "cr-chat-row outgoing";
    var outgoingBubble = document.createElement("div");
    outgoingBubble.className = "cr-chat-bubble outgoing";
    outgoingBubble.textContent = trimmed;
    outgoingRow.appendChild(outgoingBubble);
    dynContainer.appendChild(outgoingRow);

    if (chatInput) chatInput.value = "";
    if (chatFeed) chatFeed.scrollTop = chatFeed.scrollHeight;

    // Show typing indicator
    var typingRow = document.createElement("div");
    typingRow.className = "cr-chat-row incoming";
    typingRow.id = "cr-typing-indicator";
    typingRow.innerHTML =
      '<div class="cr-chat-bubble typing"><span class="cr-typing-dot"></span><span class="cr-typing-dot"></span><span class="cr-typing-dot"></span></div>';
    dynContainer.appendChild(typingRow);
    if (chatFeed) chatFeed.scrollTop = chatFeed.scrollHeight;

    // Pick contextual simulated reply for current member based on prompt/content
    var currentMember = messengerTeamData[currentActiveMessengerPerson] || messengerTeamData.kenneth;
    var lower = trimmed.toLowerCase();
    var chosenReply = "";

    if (
      lower.indexOf("hire") !== -1 ||
      lower.indexOf("start a project") !== -1 ||
      (lower.indexOf("project") !== -1 && (lower.indexOf("want") !== -1 || lower.indexOf("hire") !== -1 || lower.indexOf("build") !== -1 || lower.indexOf("team") !== -1))
    ) {
      chosenReply = (currentMember.presetReplies && currentMember.presetReplies.hire) || currentMember.replies[0];
    } else if (
      lower.indexOf("stack") !== -1 ||
      lower.indexOf("experience") !== -1 ||
      lower.indexOf("skills") !== -1 ||
      lower.indexOf("technical") !== -1 ||
      lower.indexOf("resume") !== -1 ||
      lower.indexOf("walk me through") !== -1
    ) {
      chosenReply = (currentMember.presetReplies && currentMember.presetReplies.stack) || currentMember.replies[1];
    } else if (
      lower.indexOf("turnaround") !== -1 ||
      lower.indexOf("pricing") !== -1 ||
      lower.indexOf("timeline") !== -1 ||
      lower.indexOf("cost") !== -1 ||
      lower.indexOf("price") !== -1 ||
      lower.indexOf("rate") !== -1 ||
      lower.indexOf("how much") !== -1 ||
      lower.indexOf("how long") !== -1
    ) {
      chosenReply = (currentMember.presetReplies && currentMember.presetReplies.timeline) || currentMember.replies[0];
    } else if (
      lower.indexOf("amazing") !== -1 ||
      lower.indexOf("say hello") !== -1 ||
      lower.indexOf("portfolio design") !== -1 ||
      lower.indexOf("looks amazing") !== -1 ||
      lower.indexOf("love your") !== -1 ||
      lower.indexOf("awesome") !== -1 ||
      lower === "hello" ||
      lower === "hey" ||
      lower === "hi" ||
      lower.startsWith("hi ") ||
      lower.startsWith("hey ") ||
      lower.startsWith("hello ")
    ) {
      chosenReply = (currentMember.presetReplies && currentMember.presetReplies.hello) || currentMember.replies[0];
    } else {
      var replyOptions = currentMember.replies || [
        "Thanks for reaching out! We can connect on your project goals or schedule a call via the contact section."
      ];
      chosenReply = replyOptions[Math.floor(Math.random() * replyOptions.length)];
    }

    setTimeout(function () {
      var indicator = document.getElementById("cr-typing-indicator");
      if (indicator && indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
      }
      var incomingRow = document.createElement("div");
      incomingRow.className = "cr-chat-row incoming";
      var incomingBubble = document.createElement("div");
      incomingBubble.className = "cr-chat-bubble";
      incomingBubble.textContent = chosenReply;
      incomingRow.appendChild(incomingBubble);
      dynContainer.appendChild(incomingRow);

      if (chatFeed) {
        chatFeed.scrollTop = chatFeed.scrollHeight;
        setTimeout(function () {
          chatFeed.scrollTop = chatFeed.scrollHeight;
        }, 60);
      }
    }, 650);
  }

  if (chatForm) {
    chatForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (chatInput) {
        handleSendMessage(chatInput.value);
      }
    });
  }

  // Quick suggestion chips
  var promptChips = document.querySelectorAll(".cr-chat-chip[data-chat-prompt]");
  promptChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var prompt = chip.getAttribute("data-chat-prompt");
      handleSendMessage(prompt);
    });
  });

  // 6b. Interactive Project Archive Suite (Category Filters, Real-Time Search, Viewport Switcher, Dossier Tabs & Pagination)
  function initInteractiveProjectArchive() {
    var projectViewer = document.querySelector(".project-viewer");
    var viewerSlugEl = document.getElementById("cr-viewer-os-slug");
    var liveCtaEl = document.getElementById("cr-viewer-live-cta");
    var searchInput = document.getElementById("cr-project-search");
    var searchClearBtn = document.getElementById("cr-search-clear");
    var categoryPills = document.querySelectorAll(".cr-category-pill");
    var sidebarItems = document.querySelectorAll(".project-sidebar-item[data-project]");
    var sidebarGroups = document.querySelectorAll(".project-sidebar-group");
    var emptyStateEl = document.querySelector(".cr-sidebar-empty-state");
    var deviceBtns = document.querySelectorAll(".cr-device-btn");
    var panels = document.querySelectorAll(".project-viewer-panel[data-panel]");

    if (!projectViewer || !sidebarItems.length) return;

    var projectIds = Array.from(sidebarItems).map(function(item) {
      return item.getAttribute("data-project");
    });

    var activeCat = "websites";
    var currentQuery = "";

    // 1. Sync OS Viewer Header (Slug & Live CTA Link)
    function syncViewerHeader(projId) {
      if (viewerSlugEl) {
        viewerSlugEl.textContent = projId.toLowerCase() + ".case";
      }
      if (liveCtaEl) {
        var activePanel = document.querySelector('.project-viewer-panel[data-panel="' + projId + '"]');
        var iframe = activePanel ? activePanel.querySelector("iframe[src]") : null;
        if (iframe && iframe.src) {
          liveCtaEl.href = iframe.src;
          liveCtaEl.classList.remove("is-hidden");
          liveCtaEl.classList.add("is-visible");
        } else {
          liveCtaEl.classList.remove("is-visible");
          liveCtaEl.classList.add("is-hidden");
        }
      }
      updatePagination(projId);
    }

    // 2. Filter Sidebar Items by Category & Search Query
    function applySidebarFilters() {
      var visibleCount = 0;
      var q = currentQuery.toLowerCase().trim();

      sidebarGroups.forEach(function(group) {
        var groupItems = group.querySelectorAll(".project-sidebar-item");
        var groupVisibleCount = 0;

        groupItems.forEach(function(item) {
          var itemCat = item.getAttribute("data-category") || "";
          var itemNameEl = item.querySelector(".project-sidebar-name");
          var itemName = itemNameEl ? itemNameEl.textContent.toLowerCase() : "";
          var itemIdxEl = item.querySelector(".project-sidebar-index");
          var itemIdx = itemIdxEl ? itemIdxEl.textContent.toLowerCase() : "";
          var itemBadgeEl = item.querySelector(".project-sidebar-badge");
          var itemBadge = itemBadgeEl ? itemBadgeEl.textContent.toLowerCase() : "";

          var matchesCat = (activeCat === "all" || itemCat === activeCat);
          var matchesQuery = !q || itemName.includes(q) || itemIdx.includes(q) || itemBadge.includes(q) || itemCat.includes(q);

          if (matchesCat && matchesQuery) {
            item.style.display = "flex";
            groupVisibleCount++;
            visibleCount++;
          } else {
            item.style.display = "none";
          }
        });

        // Hide group heading if all its items are filtered out
        group.style.display = groupVisibleCount > 0 ? "block" : "none";
      });

      if (emptyStateEl) {
        emptyStateEl.style.display = visibleCount === 0 ? "block" : "none";
      }

      // Filter Gallery Grid cards if gallery exists
      var galleryCards = document.querySelectorAll(".cr-gallery-card");
      galleryCards.forEach(function(card) {
        var cardCat = card.getAttribute("data-category") || "";
        var cardTitle = (card.querySelector(".cr-gallery-card-title") || {}).textContent || "";
        var cardDesc = (card.querySelector(".cr-gallery-card-desc") || {}).textContent || "";
        var cardTags = (card.querySelector(".cr-gallery-card-tags") || {}).textContent || "";
        var text = (cardTitle + " " + cardDesc + " " + cardTags + " " + cardCat).toLowerCase();

        var matchesCat = (activeCat === "all" || cardCat === activeCat);
        var matchesQuery = !q || text.includes(q);

        card.style.display = matchesCat && matchesQuery ? "flex" : "none";
      });

      // If active project is hidden, switch to the first visible one
      var activeItem = document.querySelector(".project-sidebar-item.is-active");
      if (activeItem && activeItem.style.display === "none" && visibleCount > 0) {
        var firstVisible = document.querySelector('.project-sidebar-item[style*="display: flex"]');
        if (firstVisible) {
          firstVisible.click();
        }
      }
    }

    // Group and position project status badges into header meta row
    function groupStatusBadges() {
      panels.forEach(function(panel) {
        var body = panel.querySelector(".project-viewer-body");
        if (!body) return;
        var eyebrow = body.querySelector(".project-viewer-eyebrow");
        var badge = body.querySelector(".project-status-badge");
        if (eyebrow && badge && !body.querySelector(".project-header-meta-row")) {
          var metaRow = document.createElement("div");
          metaRow.className = "project-header-meta-row";
          eyebrow.parentNode.insertBefore(metaRow, eyebrow);
          metaRow.appendChild(eyebrow);
          metaRow.appendChild(badge);
        }
      });
      document.querySelectorAll(".project-status-badge .status-dot").forEach(function(dot) {
        if (dot.style.background === "rgb(16, 185, 129)" || dot.style.background === "#10b981") {
          dot.style.background = "";
        }
      });
    }
    groupStatusBadges();

    // Category Pills Click: switch active category
    categoryPills.forEach(function(pill) {
      pill.addEventListener("click", function() {
        var clickedCat = this.getAttribute("data-cat-filter") || "websites";
        categoryPills.forEach(function(p) { p.classList.remove("is-active"); });
        this.classList.add("is-active");
        activeCat = clickedCat;
        applySidebarFilters();
      });
    });

    // Initial filter by default category (Websites)
    applySidebarFilters();

    // 3. Device Viewport Switcher
    deviceBtns.forEach(function(btn) {
      btn.addEventListener("click", function() {
        var dev = this.getAttribute("data-device") || "desktop";
        deviceBtns.forEach(function(b) { b.classList.remove("is-active"); });
        this.classList.add("is-active");

        projectViewer.classList.remove("device-desktop", "device-tablet", "device-mobile");
        projectViewer.classList.add("device-" + dev);
      });
    });

    // 4. OS Controls (Pink, Blue, Yellow)
    var pinkControl = document.getElementById("cr-os-control-pink");
    var blueControl = document.getElementById("cr-os-control-blue");
    var yellowControl = document.getElementById("cr-os-control-yellow");

    if (pinkControl) {
      pinkControl.addEventListener("click", function() {
        if (sidebarItems[0]) sidebarItems[0].click();
        var desktopBtn = document.querySelector('.cr-device-btn[data-device="desktop"]');
        if (desktopBtn) desktopBtn.click();
      });
    }

    if (blueControl) {
      blueControl.addEventListener("click", function() {
        var curDevice = projectViewer.classList.contains("device-mobile") ? "mobile" :
                        projectViewer.classList.contains("device-tablet") ? "tablet" : "desktop";
        var nextDev = curDevice === "desktop" ? "tablet" : curDevice === "tablet" ? "mobile" : "desktop";
        var targetBtn = document.querySelector('.cr-device-btn[data-device="' + nextDev + '"]');
        if (targetBtn) targetBtn.click();
      });
    }

    if (yellowControl) {
      yellowControl.addEventListener("click", function() {
        navigateProject(1);
      });
    }

    // 5. Enhance Project Panels with Dossier Tabs
    panels.forEach(function(panel) {
      var panelId = panel.getAttribute("data-panel");
      // Skip the 3 gallery-grid panels that already have custom sub-views
      if (panelId === "webdesign" || panelId === "mobileappdesign" || panelId === "herosection") {
        return;
      }

      var body = panel.querySelector(".project-viewer-body");
      if (!body || body.dataset.tabsInit) return;
      body.dataset.tabsInit = "true";

      var desc = body.querySelector("p");
      var allFeatures = Array.from(body.querySelectorAll(".project-features"));
      var statusCols = body.querySelector(".status-columns");

      var highlightFeatures = allFeatures.filter(function(f) {
        return f.querySelector(".project-features-list");
      });
      var specFeatures = allFeatures.filter(function(f) {
        return f.querySelector(".tag-pills");
      });

      // Build Tab Navigation
      var tabBar = document.createElement("div");
      tabBar.className = "cr-dossier-tab-bar";
      tabBar.setAttribute("role", "tablist");
      tabBar.innerHTML = 
        '<button type="button" class="cr-dossier-tab is-active" data-tab-target="overview">' +
          '<svg class="cr-tab-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>' +
          '<span>Highlights &amp; Story</span>' +
        '</button>' +
        '<button type="button" class="cr-dossier-tab" data-tab-target="specs">' +
          '<svg class="cr-tab-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>' +
          '<span>Tech Stack &amp; Specs</span>' +
        '</button>' +
        '<button type="button" class="cr-dossier-tab" data-tab-target="roadmap">' +
          '<svg class="cr-tab-icon" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>' +
          '<span>Roadmap &amp; Delivery</span>' +
        '</button>';

      // Pane 1: Overview
      var paneOverview = document.createElement("div");
      paneOverview.className = "cr-dossier-pane is-active";
      paneOverview.dataset.pane = "overview";
      if (desc) paneOverview.appendChild(desc);
      if (highlightFeatures.length) {
        var card = document.createElement("div");
        card.className = "cr-highlights-card";
        highlightFeatures.forEach(function(hf) { card.appendChild(hf); });
        paneOverview.appendChild(card);
      }

      // Pane 2: Specs
      var paneSpecs = document.createElement("div");
      paneSpecs.className = "cr-dossier-pane";
      paneSpecs.dataset.pane = "specs";
      if (specFeatures.length) {
        var specsGrid = document.createElement("div");
        specsGrid.className = "cr-specs-grid";
        specFeatures.forEach(function(sf) {
          var specCard = document.createElement("div");
          specCard.className = "cr-spec-card";
          specCard.appendChild(sf);
          specsGrid.appendChild(specCard);
        });
        paneSpecs.appendChild(specsGrid);
      }

      // Pane 3: Roadmap
      var paneRoadmap = document.createElement("div");
      paneRoadmap.className = "cr-dossier-pane";
      paneRoadmap.dataset.pane = "roadmap";
      if (statusCols) paneRoadmap.appendChild(statusCols);

      // Assemble
      body.appendChild(tabBar);
      body.appendChild(paneOverview);
      body.appendChild(paneSpecs);
      body.appendChild(paneRoadmap);

      // Tab Switching
      var tabs = tabBar.querySelectorAll(".cr-dossier-tab");
      var panes = [paneOverview, paneSpecs, paneRoadmap];
      tabs.forEach(function(tab) {
        tab.addEventListener("click", function() {
          var targetPane = this.getAttribute("data-tab-target");
          tabs.forEach(function(t) { t.classList.remove("is-active"); });
          this.classList.add("is-active");
          panes.forEach(function(p) {
            p.classList.toggle("is-active", p.dataset.pane === targetPane);
          });
        });
      });
    });

    // 6. Append Previous / Next Pagination to Every Panel
    panels.forEach(function(panel) {
      if (panel.querySelector(".cr-dossier-pagination")) return;
      var pag = document.createElement("div");
      pag.className = "cr-dossier-pagination";
      pag.innerHTML = 
        '<button type="button" class="cr-pag-btn prev-btn" data-nav-dir="-1">' +
          '<span>← Prev Dossier</span>' +
        '</button>' +
        '<div class="cr-pag-counter mono">' +
          '<span class="cr-cur-num">01</span> / <span class="cr-total-num">15</span>' +
        '</div>' +
        '<button type="button" class="cr-pag-btn next-btn" data-nav-dir="1">' +
          '<span>Next Dossier →</span>' +
        '</button>';
      
      panel.appendChild(pag);

      pag.querySelectorAll(".cr-pag-btn").forEach(function(btn) {
        btn.addEventListener("click", function() {
          var dir = parseInt(this.getAttribute("data-nav-dir"), 10);
          navigateProject(dir);
        });
      });
    });

    function updatePagination(curProjId) {
      var curIdx = projectIds.indexOf(curProjId);
      if (curIdx === -1) return;
      var total = projectIds.length;
      document.querySelectorAll(".cr-dossier-pagination").forEach(function(pag) {
        var curNumEl = pag.querySelector(".cr-cur-num");
        var totalNumEl = pag.querySelector(".cr-total-num");
        if (curNumEl) curNumEl.textContent = (curIdx + 1 < 10 ? "0" : "") + (curIdx + 1);
        if (totalNumEl) totalNumEl.textContent = (total < 10 ? "0" : "") + total;
      });
    }

    function navigateProject(direction) {
      var activeItem = document.querySelector(".project-sidebar-item.is-active");
      if (!activeItem) return;
      var curProjId = activeItem.getAttribute("data-project");
      var curIdx = projectIds.indexOf(curProjId);
      if (curIdx === -1) return;
      var nextIdx = (curIdx + direction + projectIds.length) % projectIds.length;
      var nextProjId = projectIds[nextIdx];
      var nextItem = document.querySelector('.project-sidebar-item[data-project="' + nextProjId + '"]');
      if (nextItem) {
        nextItem.click();
        var sidebarScroll = document.querySelector(".cr-sidebar-items-scroll");
        if (sidebarScroll) {
          var itemOffset = nextItem.offsetTop - sidebarScroll.offsetTop;
          sidebarScroll.scrollTo({ top: Math.max(0, itemOffset - 40), behavior: "smooth" });
        }
      }
    }

    // Keyboard Arrow Navigation when viewing projects
    window.addEventListener("keydown", function(e) {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key === "ArrowLeft") {
        navigateProject(-1);
      } else if (e.key === "ArrowRight") {
        navigateProject(1);
      }
    });

    // Listen to sidebar clicks to sync header
    sidebarItems.forEach(function(btn) {
      btn.addEventListener("click", function() {
        var projId = this.getAttribute("data-project") || "";
        syncViewerHeader(projId);
      });
    });

    // Initial sync
    var activeItem = document.querySelector(".project-sidebar-item.is-active") || sidebarItems[0];
    if (activeItem) {
      syncViewerHeader(activeItem.getAttribute("data-project"));
    }

    // Open Messenger from Dock or Header buttons
    var dockMsgBtn = document.getElementById("open-messenger-btn");
    var messengerModal = document.getElementById("resume-panel");
    if (dockMsgBtn && messengerModal) {
      dockMsgBtn.addEventListener("click", function() {
        messengerModal.classList.add("active");
        document.body.classList.add("messenger-open");
      });
    }
  }

  initInteractiveProjectArchive();

  // 7. Scattered Pastel FAQ Accordions ([data-faq-card]) - independent toggle, can leave all open
  var faqCards = document.querySelectorAll("[data-faq-card]");
  faqCards.forEach(function (card) {
    card.addEventListener("click", function () {
      card.classList.toggle("is-open");
    });
  });

  // 8. Custom Creatie® Eyes Cursor (#cr-eyes-cursor) & Services Image Cursor (#cr-image-cursor)
  var eyesCursor = document.getElementById("cr-eyes-cursor");
  var imageCursor = document.getElementById("cr-image-cursor");
  var imageCursorImg = document.getElementById("cr-image-cursor-img");
  var cursorPupils = eyesCursor
    ? eyesCursor.querySelectorAll(".cr-cursor-pupil")
    : [];

  var cursorX = -200;
  var cursorY = -200;
  var smoothX = -200;
  var smoothY = -200;

  if (eyesCursor || imageCursor) {
    var lastPointerTarget = null;
    var pointerInside = true;
    var hoverEl = null; // button/link under the pointer (eyes look at it)
    var hoverKind = "";
    var eyeScale = 1;
    var lastMoveAt = performance.now();
    var pupilScale = 1;
    var onImage = false; // pointer is over a services row (floating image)
    var perch = 0; // 0 = beside pointer, 1 = perched on the image card
    var lastServiceItem = null;
    var lastServiceTop = 0;
    // nav-click journey (dock / top nav links)
    var navActive = false;
    var navDir = 1;
    var navStart = 0;
    var navLabel = "";
    var navTarget = null;
    var lastSY = window.scrollY || 0;
    var scrollVel = 0;
    var lastScrollAt = 0;
    var hopY = 0;
    var hopVy = 0;
    var bubbleTimer = null;
    var typeTimer = null;
    var bubbleEl = null;
    var bubbleKick = null;
    var bubbleText = null;
    var bubbleSub = null;
    var hoveredSayEl = null;
    var forceSleepyUntil = 0;
    var draggingSticker = false;
    var navInfo = null;

    // what each nav button is, in the site's voice (+ its sticky-note colour)
    function pick(list) {
      return list[Math.floor(Math.random() * list.length)];
    }
    var NAV_INFO = {
      "#about": { k: "About", tone: "purple", go: "Heading to the story", done: "Say hi to the maker",
        hover: [["Meet the maker", "The face behind the pixels"], ["Curious who's behind this?", "Warning: contains puns"]] },
      "#project": { k: "Projects", tone: "pink", go: "Fetching the good stuff", done: "Fresh work. Look twice!",
        hover: [["See the work", "Spoiler: it's good"], ["The good stuff lives here", "Pixels with personality"]] },
      "#services": { k: "Services", tone: "yellow", go: "Let me show you", done: "Here's what I do",
        hover: [["What I make", "Pixels, code & brand love"], ["Need something built?", "You've come to the right place"]] },
      "#reviews": { k: "Teams", tone: "green", go: "Finding the crew", done: "The crew's all here",
        hover: [["Meet the crew", "Small team, big ideas"], ["The humans behind it", "Coffee-powered, mostly"]] },
      "#faqs": { k: "FAQs", tone: "green", go: "Digging up answers", done: "Ask away",
        hover: [["Got questions?", "Probably answered below"], ["Wondering something?", "Curiosity is welcome here"]] },
      "#contact": { k: "Contact", tone: "pink", go: "Opening contact", done: "Say hello",
        hover: [["Let's make something", "Bring your wildest idea"], ["Got a project in mind?", "I'm all ears. And eyes."]] },
      "#messages": { k: "Messages", tone: "purple", go: "Opening chat", done: "Hello!",
        hover: [["Say hi \u2014 chat with the team", "Our inbox loves company"], ["Slide into the chat", "No awkward small talk"]] },
      "#hero": { k: "Home", tone: "yellow", go: "Taking you home", done: "Home sweet home",
        hover: [["Back to the top", "Express elevator, going up"], ["Take me home", "Wheee!"]] },
    };
    var TONE_COLOR = { purple: "#8168fd", pink: "#ec68fd", yellow: "#ffde05", green: "#93ba06" };

    function navInfoFor(link) {
      var h = link.getAttribute("href") || "";
      var info = NAV_INFO[h];
      if (!info) {
        var tip = link.querySelector(".cr-dock-tooltip");
        var name = tip ? tip.textContent.trim() : (link.textContent || "").trim();
        info = { k: name || "Go", tone: "purple", hover: [[name || "Go", "Take me there"]], go: "On my way", done: "Here!" };
      }
      return info;
    }

    if (eyesCursor) {
      bubbleEl = document.createElement("span");
      bubbleEl.className = "cr-eyes-bubble";
      bubbleEl.setAttribute("aria-hidden", "true");
      bubbleKick = document.createElement("b");
      bubbleKick.className = "cr-eyes-bubble-k";
      bubbleText = document.createElement("span");
      bubbleText.className = "cr-eyes-bubble-t";
      bubbleEl.appendChild(bubbleKick);
      bubbleSub = document.createElement("span");
      bubbleSub.className = "cr-eyes-bubble-s";
      bubbleEl.appendChild(bubbleText);
      bubbleEl.appendChild(bubbleSub);
      eyesCursor.appendChild(bubbleEl);
      // the eyes' bubble replaces the dock's own tooltip on desktop
      if (window.matchMedia && window.matchMedia("(min-width: 901px) and (hover: hover)").matches) {
        document.documentElement.classList.add("eyes-bubbles-on");
      }
    }

    // opts: { k: small label, t: text, tone, ms (0 = stay), type }
    function showBubble(opts) {
      if (!bubbleEl || !eyesCursor) return;
      clearTimeout(bubbleTimer);
      clearInterval(typeTimer);
      bubbleEl.setAttribute("data-tone", opts.tone || "yellow");
      bubbleKick.textContent = opts.k || "";
      bubbleText.textContent = "";
      bubbleSub.textContent = "";
      eyesCursor.classList.remove("has-bubble");
      void eyesCursor.offsetWidth;
      eyesCursor.classList.add("has-bubble");
      // typewriter: main line, then the smaller line underneath
      var main = opts.t || "";
      var sub = opts.s || "";
      var i = 0;
      // the not-yet-typed rest stays invisible but still takes up space,
      // so the bubble never jumps around while typing
      function setTyped(el, full, n) {
        el.textContent = "";
        if (!full) return; // keep empty so the CSS can hide it
        var shown = document.createElement("span");
        shown.textContent = full.slice(0, n);
        var rest = document.createElement("span");
        rest.className = "cr-eyes-bubble-rest";
        rest.textContent = full.slice(n);
        el.appendChild(shown);
        el.appendChild(rest);
      }
      setTyped(bubbleText, main, 0);
      setTyped(bubbleSub, sub, 0);
      typeTimer = setInterval(function () {
        i++;
        setTyped(bubbleText, main, Math.min(i, main.length));
        if (i > main.length) setTyped(bubbleSub, sub, Math.min(i - main.length, sub.length));
        if (i >= main.length + sub.length) clearInterval(typeTimer);
      }, 20);
      if (opts.ms) {
        bubbleTimer = setTimeout(hideBubble, opts.ms);
      }
    }
    function hideBubble() {
      clearTimeout(bubbleTimer);
      clearInterval(typeTimer);
      if (eyesCursor) eyesCursor.classList.remove("has-bubble");
    }

    // Case studies: lines with personality (not just the printed name)
    var PROJECT_SAYS = {
      magnify: {
        hover: [["Zoom in. Details are my love language.", "Click for the full picture"], ["Big picture, tiny pixels, zero blur", "Media this good deserves a front-row site"]],
        click: [["Focusing in\u2026", "Say cheese!"], ["Lens cap off\u2026", "Here comes the close-up"]],
      },
      bunbite: {
        hover: [["Smells like a really good order flow", "Hungry for the case study?"], ["Order up! Full-stack, extra crispy", "No soggy UX here"]],
        click: [["Fresh out of the kitchen\u2026", "Careful, it's hot"], ["Plating it up\u2026", "Bon app\u00e9tit"]],
      },
      newday: {
        hover: [["A fresh start with a friendlier brand", "Peek at the glow-up"], ["Warm colours, calm site, big hugs", "Tap for the story"]],
        click: [["Sunrise loading\u2026", "Good morning, case study"], ["Opening gently\u2026", "No sudden moves"]],
      },
      vibetix: {
        hover: [["Front row, no queue. Promise.", "Grab your seat"], ["Tickets in, tension out", "The show must go on"]],
        click: [["Scanning your ticket\u2026", "Beep. You're in!"], ["Lights down\u2026", "Curtain going up"]],
      },
      airedigital: {
        hover: [["An agency site with some fresh air", "React, minus the stress"], ["Breathes easy, loads fast", "Take a look inside"]],
        click: [["Deep breath\u2026", "Opening up"], ["Taking off\u2026", "Fasten your seatbelt"]],
      },
    };
    var GENERIC_PROJECT = {
      hover: [["Peek behind the curtain", "Case study inside"], ["I worked hard on this one", "Tap to see how"]],
      click: [["Opening the case study\u2026", "Good choice"]],
    };
    var SERVICE_SAYS = [
      { k: "Websites", tone: "pink", hover: [["Sites that convert, not just look pretty", "Webflow, WordPress, your call"], ["Landing pages with a story to tell", "Visitors in, customers out"]] },
      { k: "Web apps", tone: "purple", hover: [["Frontend, backend & everything backstage", "Production-ready, caffeine included"], ["Where the clever stuff happens", "Under the hood, it's tidy"]] },
      { k: "Design systems", tone: "yellow", hover: [["Research first, pixels second", "Every component in its place"], ["Tidy tokens, happy teams", "Design that scales"]] },
      { k: "Mobile", tone: "green", hover: [["Thumb-friendly, delight-approved", "Apps people come back to"], ["Pocket-sized, big personality", "Taps that feel good"]] },
      { k: "Branding", tone: "pink", hover: [["Make 'em remember you", "Logo, type, colour \u2014 the full vibe"], ["A look people point at", "Identity with attitude"]] },
    ];

    var NAV_SEL = "a.cr-dock-item, .cr-top-nav a, .cr-footer-links a, .cr-footer-nav-bar a.cr-logo, #cr-back-to-home, .cr-back-to-home";
    var SERVICE_TONES = ["pink", "purple", "yellow", "green", "pink"];

    function pageIsDark() {
      return document.documentElement.classList.contains("dark-mode");
    }

    // What should the eyes say about this element? (hover + click lines)
    // Add data-eyes-say="Label|Hover text|tone|Click text" to any element to customise.
    function sayFor(el) {
      if (!el || !el.closest) return null;

      var custom = el.closest("[data-eyes-say]");
      if (custom) {
        var p = custom.getAttribute("data-eyes-say").split("|");
        return { k: p[0], t: p[1] || p[0], s: p[4] || "", tone: p[2] || "purple", click: p[3] || null };
      }

      // Workstation controls on project.html
      if (el.closest("#cr-back-to-home, .cr-back-to-home")) {
        return {
          k: "Home",
          t: pick(["Return to Home?", "Back to the studio"]),
          s: "Take me back to the main stage",
          tone: "yellow",
          click: ["Heading home…", "Bye for now!"]
        };
      }
      var dossierTab = el.closest(".cr-dossier-tab, .project-dossier-tab-btn");
      if (dossierTab) {
        var tName = dossierTab.textContent.replace(/[\r\n\t]+/g, " ").trim();
        return {
          k: "Dossier",
          t: "View " + tName,
          s: "Project specifications & breakdown",
          tone: "purple",
          click: ["Switching to " + tName + "…", "Specs loaded"]
        };
      }
      var pSidebarItem = el.closest(".project-sidebar-item");
      if (pSidebarItem) {
        var pTitleEl = pSidebarItem.querySelector("h4, .project-sidebar-title, .project-item-title");
        var pTitle = pTitleEl ? pTitleEl.textContent.trim() : pSidebarItem.textContent.trim();
        return {
          k: "Case Study",
          t: "Inspect " + pTitle,
          s: "Load full dossier & live site preview",
          tone: "pink",
          click: ["Opening " + pTitle + "…", "Here it is!"]
        };
      }
      var catPill = el.closest(".cr-category-pill, .cr-folder-tab, [data-cat-filter], .project-cat-pill, .project-cat-link");
      if (catPill) {
        var cName = catPill.textContent.trim();
        return {
          k: "Filter",
          t: "Filter: " + cName,
          s: "Show projects in this category",
          tone: "green",
          click: ["Filtering by " + cName + "…", "Updated!"]
        };
      }
      var devBtn = el.closest("[data-device-btn], .project-device-btn");
      if (devBtn) {
        var dev = devBtn.getAttribute("data-device-btn") || devBtn.textContent.trim();
        return {
          k: "Device",
          t: "Switch to " + dev,
          s: "Test responsive viewport live",
          tone: "yellow",
          click: ["Resizing to " + dev + "…", dev + " view active"]
        };
      }
      if (el.closest("#project-live-btn, .project-live-cta, .project-live-btn")) {
        return {
          k: "Live Site",
          t: "Launch live website ↗",
          s: "Opens in a new browser tab",
          tone: "green",
          click: ["Launching live site ↗", "Have fun exploring!"]
        };
      }
      var pNavBtn = el.closest(".project-viewer-nav-btn");
      if (pNavBtn) {
        var isNxt = pNavBtn.classList.contains("next") || pNavBtn.textContent.includes("Next");
        return {
          k: isNxt ? "Next" : "Prev",
          t: isNxt ? "Next Project →" : "← Previous Project",
          s: "Browse through the archive",
          tone: "purple",
          click: [isNxt ? "Next project incoming…" : "Previous project incoming…", "Loaded!"]
        };
      }

      var nav = el.closest(NAV_SEL);
      if (nav && (nav.getAttribute("href") || "").indexOf("#") !== -1) {
        var ni = navInfoFor(nav);
        var np = pick(ni.hover);
        return { k: ni.k, t: np[0], s: np[1] || "", tone: ni.tone, nav: true, click: ni.go + "\u2026" };
      }

      if (el.closest("#theme-toggle")) {
        var dk = pageIsDark();
        return {
          k: "Theme",
          t: dk ? pick(["Sun's up?", "Bring back the sun"]) : pick(["Lights out?", "Ready for night mode?"]),
          s: dk ? "Daylight looks good on me" : "Night mode suits me",
          tone: "yellow",
          theme: true,
          click: function () { return pageIsDark() ? ["Night mode on", "Shhh\u2026 night shift"] : ["Good morning!", "Rise and shine"]; },
        };
      }
      if (el.closest(".cr-segment-bar"))
        return { k: "Team", t: pick(["Next teammate, please!", "Who's up next?"]), s: "Four humans, one studio", tone: "purple", click: ["Next up!", "Say hi to them"] };
      if (el.closest("#hero-open-chat-btn, .cr-profile-chat-pill"))
        return { k: "Chat", t: pick(["Slide into the DMs", "Don't be shy, say hi"]), s: "Nobody bites. Promise.", tone: "purple", click: ["Opening chat\u2026", "Type something nice"] };

      var osc = el.closest(".cr-os-card");
      var stack = el.closest(".cr-stack-card");
      if (osc || stack) {
        var pid = osc
          ? osc.getAttribute("data-showcase-id")
          : ((stack.getAttribute("href") || "").split("#")[1] || "");
        var ps = PROJECT_SAYS[pid] || GENERIC_PROJECT;
        var hp = pick(ps.hover);
        return { k: osc ? "Case study" : "Project", t: hp[0], s: hp[1] || "", tone: "pink", click: pick(ps.click) };
      }
      var wave = el.closest(".cr-wave-btn");
      if (wave) {
        var wh = wave.getAttribute("href") || "";
        return wh.indexOf("project.html") === 0
          ? { k: "Portfolio", t: pick(["Want the whole collection?", "There's even more"]), s: "Every project, one click", tone: "pink", click: ["Here we go!", "Hold on tight"] }
          : { k: "Say hi", t: pick(["Let's talk", "Got an idea?"]), s: "I'm all ears. And eyes.", tone: "pink", click: ["Let's go!", "Idea time"] };
      }
      if (el.closest("[data-draggable-sticker]"))
        return { k: "Sticker", t: pick(["Drag me around!", "Pick me up!"]), s: "I'm very sticky, very stylish", tone: "yellow", click: null, sticker: true };
      var faq = el.closest("[data-faq-card]");
      if (faq) {
        var open = faq.classList.contains("is-open");
        return {
          k: "FAQ",
          t: open ? "Tap to close" : pick(["Tap to peek inside", "Curious? Tap me"]),
          s: open ? "Secrets stay safe with me" : "Curiosity is welcome here",
          tone: "green",
          click: function () { return faq.classList.contains("is-open") ? ["Here's the answer", "Told you it was good"] : ["All tucked away", "Secrets safe again"]; },
        };
      }
      var soc = el.closest(".cr-footer-social-icon");
      if (soc) {
        var sl = (soc.getAttribute("aria-label") || "Link").trim();
        var SOC = {
          Instagram: ["Follow along", "Behind-the-scenes & pixel crimes"],
          X: ["Say hi on X", "Hot takes, mostly design"],
          Phone: ["Give me a ring", "Old school. Still works."],
          Email: ["Drop me a line", "I actually read these"],
        };
        var sp = SOC[sl] || ["Say hello", "Come on over"];
        return { k: sl, t: sp[0], s: sp[1], tone: sl === "Email" || sl === "Phone" ? "green" : "purple", click: ["Opening " + sl + " \u2197", "See you there"] };
      }
      if (el.closest(".cr-footer-chat-btn, [data-open-contact]"))
        return { k: "Contact", t: pick(["Let's make something", "Got a wild idea?"]), s: "Bring snacks. And ideas.", tone: "pink", click: ["Opening contact\u2026", "Spill the idea"] };
      if (el.closest(".cr-showcase-close-btn, .resume-panel-close, .cr-contact-chat-icon-btn"))
        return { k: "Close", t: "Back to the page", s: "Come back soon!", tone: "yellow", click: ["See you around!", "Bye for now"] };
      if (el.closest(".cr-contact-submit-btn"))
        return { k: "Send", t: "Fire it off!", s: "No take-backs. Be bold.", tone: "green", click: ["Sent with love", "Talk soon!"] };
      if (el.closest("a[target='_blank']"))
        return { k: "Link", t: "Opens in a new tab \u2197", s: "Don't worry, I'll wait here", tone: "purple", click: ["Off you go \u2197", "Come back soon"] };

      var ctl = el.closest(CONTROL_SEL);
      var label = ctl ? (ctl.getAttribute("aria-label") || ctl.textContent || "").replace(/\s+/g, " ").trim() : "";
      if (label.length >= 2 && label.length <= 28) return { k: "Click", t: label, s: "", tone: "purple", click: null };
      return null;
    }

    // confetti-ish sparkles around the eyes
    function sparkBurst(tone, count) {
      if (!eyesCursor) return;
      var color = TONE_COLOR[tone] || "#8168fd";
      var palette = [color, "#ffde05", "#ec68fd", "#ffffff"];
      var total = count || 9;
      for (var n = 0; n < total; n++) {
        var sp = document.createElement("i");
        sp.className = "cr-eyes-spark";
        var ang = (n / total) * Math.PI * 2 + Math.random() * 0.5;
        var dist = 34 + Math.random() * 26;
        sp.style.setProperty("--dx", Math.cos(ang) * dist * 1.3 + "px");
        sp.style.setProperty("--dy", Math.sin(ang) * dist + "px");
        sp.style.setProperty("--sz", 6 + Math.random() * 6 + "px");
        sp.style.background = palette[n % palette.length];
        eyesCursor.appendChild(sp);
        (function (el) {
          setTimeout(function () {
            if (el.parentNode) el.parentNode.removeChild(el);
          }, 800);
        })(sp);
      }
    }
    var imgRX = 0; // 3D tilt of the image card
    var imgRY = 0;
    var imgPress = 0; // click squash of the image card
    var imgPressT = 0;
    var offX = 24;
    var ex = -200;
    var ey = -200;
    var idleLook = { x: 0, y: 0 };
    var nextIdleAt = 0;
    var tilt = 0;
    // springy ("googly") pupils, one per eye, each slightly different
    var springs = [
      { x: 0, y: 0, vx: 0, vy: 0, k: 0.16, d: 0.72 },
      { x: 0, y: 0, vx: 0, vy: 0, k: 0.12, d: 0.78 },
    ];
    var CONTROL_SEL =
      "a, button, [role='button'], input, textarea, select, summary, label, [data-draggable-sticker], [data-faq-card], .cr-dossier-tab, .project-sidebar-item, .cr-category-pill, .cr-folder-tab, .project-cat-pill, .project-device-btn, .project-viewer-nav-btn, .cr-back-to-home";

    // One place decides what the cursor looks like, so it behaves the same
    // everywhere: eyes are the default; only the messenger (system cursor)
    // and the services rows (floating image) replace them.
    function updateCursorState(target) {
      if (!target || !(target instanceof Element)) return;

      if (
        document.body.classList.contains("messenger-open") ||
        (messengerPanel && messengerPanel.classList.contains("active")) ||
        target.closest("#resume-panel, .cr-messenger-modal, .resume-panel")
      ) {
        if (eyesCursor) eyesCursor.classList.remove("is-visible", "is-on-control", "is-pressed", "kind-image");
        if (imageCursor) imageCursor.classList.remove("is-visible");
        hoverEl = null;
        hoveredSayEl = null;
        hideBubble();
        onImage = false;
        lastServiceItem = null;
        return;
      }

      // Services row -> floating image cursor
      var serviceItem = target.closest("[data-cursor-img]");
      if (serviceItem && imageCursor && imageCursorImg) {
        var imgSrc = serviceItem.getAttribute("data-cursor-img");
        if (imgSrc && imageCursorImg.getAttribute("src") !== imgSrc) {
          imageCursorImg.setAttribute("src", imgSrc);
        }
        imageCursor.classList.add("is-visible");
        onImage = true;
        hoverEl = null;
        hoverKind = "";
        if (eyesCursor) {
          // the eyes stay and perch on the image card, looking at it
          eyesCursor.classList.add("is-visible", "kind-image");
          eyesCursor.classList.remove("variant-cream", "is-on-control", "is-pressed", "kind-text", "kind-sticker");
        }
        if (serviceItem !== lastServiceItem) {
          // tint the card with the row's badge colour; slide in from the
          // direction you came from (down the list = from below)
          var badge = serviceItem.querySelector(".cr-service-badge");
          var accent = badge && badge.style.background ? badge.style.background : "";
          if (accent) imageCursor.style.setProperty("--card-accent", accent);
          var rowTop = serviceItem.getBoundingClientRect().top;
          var dirY = lastServiceItem ? (rowTop >= lastServiceTop ? 1 : -1) : 0;
          lastServiceTop = rowTop;
          var rows = Array.prototype.slice.call(serviceItem.parentNode.children);
          var si = Math.max(0, rows.indexOf(serviceItem));
          var sv = SERVICE_SAYS[si % SERVICE_SAYS.length];
          var sl = pick(sv.hover);
          showBubble({ k: sv.k, t: sl[0], s: sl[1], tone: sv.tone, ms: 0 });
          imageCursorImg.style.setProperty("--pop-y", dirY * 22 + "px");
          lastServiceItem = serviceItem;
          // new row -> image pops in, eyes do a quick "ooh!"
          imageCursorImg.classList.remove("is-pop");
          void imageCursorImg.offsetWidth;
          imageCursorImg.classList.add("is-pop");
          if (eyesCursor) {
            eyesCursor.classList.remove("is-surprised");
            void eyesCursor.offsetWidth;
            eyesCursor.classList.add("is-surprised");
            setTimeout(function () {
              eyesCursor.classList.remove("is-surprised");
            }, 420);
          }
        }
        return;
      }
      if (onImage) hideBubble();
      onImage = false;
      lastServiceItem = null;
      if (eyesCursor) eyesCursor.classList.remove("kind-image");
      if (imageCursor) imageCursor.classList.remove("is-visible");

      // Everywhere else -> eyes (links, buttons, inputs, stickers included)
      if (eyesCursor) {
        var eyesZone = target.closest("[data-eyes-cursor]");
        var variant = eyesZone ? eyesZone.getAttribute("data-eyes-cursor") : "default";
        eyesCursor.classList.toggle("variant-cream", variant === "cream");
        eyesCursor.classList.toggle("is-visible", pointerInside);
        hoverEl = target.closest(CONTROL_SEL);
        eyesCursor.classList.toggle("is-on-control", !!hoverEl);
        // every interactive thing: the eyes tell you what it is
        if (hoverEl !== hoveredSayEl) {
          hoveredSayEl = hoverEl;
          if (!navActive && !draggingSticker) {
            var say = hoverEl ? sayFor(hoverEl) : null;
            if (say) showBubble({ k: say.k, t: say.t, s: say.s, tone: say.tone, ms: 0 });
            else hideBubble();
          }
        }
        var isText = !!(hoverEl && hoverEl.matches("input, textarea, select"));
        var isSticker = !!(hoverEl && hoverEl.matches("[data-draggable-sticker]"));
        eyesCursor.classList.toggle("kind-text", isText);
        eyesCursor.classList.toggle("kind-sticker", isSticker);
        hoverKind = isText ? "text" : isSticker ? "sticker" : hoverEl ? "link" : "";
      }
    }

    window.addEventListener(
      "pointermove",
      function (e) {
        cursorX = e.clientX;
        cursorY = e.clientY;
        pointerInside = true;
        lastMoveAt = performance.now();
        lastPointerTarget = e.target;
        updateCursorState(e.target);
      },
      { passive: true },
    );

    // Click = the eyes squint, release = they open again
    window.addEventListener("pointerdown", function () {
      if (eyesCursor && (hoverEl || onImage)) eyesCursor.classList.add("is-pressed");
      if (onImage) imgPressT = 1;
      if (hoverEl && hoverEl.closest("[data-draggable-sticker]")) {
        draggingSticker = true;
        showBubble({ k: "Sticker", t: "Wheee!", tone: "yellow", ms: 0 });
        sparkBurst("yellow", 5);
      }
    });
    window.addEventListener("pointerup", function () {
      if (eyesCursor) eyesCursor.classList.remove("is-pressed");
      imgPressT = 0;
      if (draggingSticker) {
        draggingSticker = false;
        hopVy = -6;
        showBubble({ k: "Sticker", t: "Plop! Nice spot", tone: "yellow", ms: 1100 });
      }
    });

    // ---- Nav click: eyes launch with the page, then celebrate on arrival ----
    function navArrive() {
      if (!navActive) return;
      navActive = false;
      eyesCursor.classList.remove("is-zooming");
      eyesCursor.classList.remove("is-happy");
      void eyesCursor.offsetWidth;
      eyesCursor.classList.add("is-happy");
      setTimeout(function () {
        eyesCursor.classList.remove("is-happy");
      }, 950);
      hopVy = -9; // little jump of joy
      var inf = navInfo || { k: navLabel, tone: "purple", done: "Here!" };
      showBubble({ k: inf.k, t: inf.done, tone: inf.tone, ms: 1900 });
      sparkBurst(inf.tone);
      if (navTarget) {
        var head = navTarget.querySelector("h1, h2, .cr-title-chip");
        if (head) {
          head.classList.remove("cr-nav-landed");
          void head.offsetWidth;
          head.classList.add("cr-nav-landed");
          setTimeout(function () {
            head.classList.remove("cr-nav-landed");
          }, 900);
        }
      }
    }

    document.addEventListener("click", function (e) {
      if (!eyesCursor || !e.target || !e.target.closest) return;
      var link = e.target.closest(NAV_SEL);
      if (!link || link.hasAttribute("data-open-messenger")) return;
      var h = link.getAttribute("href") || "";
      if (h.charAt(0) !== "#" || h.length < 2) return;
      if (h === "#footer" || h === "#contact" || h === "#messages") return;
      var t = null;
      try {
        t = document.querySelector(h);
      } catch (err) {
        return;
      }
      if (!t) return;

      navInfo = navInfoFor(link);
      navLabel = navInfo.k;
      navTarget = t;
      navDir = t.getBoundingClientRect().top > 2 ? 1 : -1;
      navActive = true;
      navStart = performance.now();
      lastScrollAt = navStart;

      // dock icon bounces like macOS
      link.classList.remove("is-launching");
      void link.offsetWidth;
      link.classList.add("is-launching");
      setTimeout(function () {
        link.classList.remove("is-launching");
      }, 800);

      // eyes: anticipation squat -> "whoosh"
      hopY = 6;
      hopVy = 0;
      eyesCursor.classList.remove("is-happy");
      showBubble({
        k: navInfo.k + (navDir > 0 ? " \u2193" : " \u2191"),
        t: navInfo.go + "\u2026",
        tone: navInfo.tone,
        ms: 0,
      });
    });

    // ---- Every other click: little celebration + a themed line ----
    document.addEventListener("click", function (e) {
      if (!eyesCursor || !e.target || !e.target.closest) return;
      var ctl = e.target.closest(CONTROL_SEL);
      if (!ctl) return;
      var say = sayFor(ctl);
      if (!say || say.sticker) return;
      if (say.nav && navActive) return; // the nav journey already handled it

      var tone = say.tone;
      var delay = typeof say.click === "function" ? 80 : 0; // let the page update first
      setTimeout(function () {
        var line = typeof say.click === "function" ? say.click() : say.click;
        if (line) {
          var lm = Array.isArray(line) ? line[0] : line;
          var ls = Array.isArray(line) ? line[1] : "";
          showBubble({ k: say.k, t: lm, s: ls, tone: tone, ms: 1700 });
        }
        sparkBurst(tone, 7);
        hopVy = -7;
        eyesCursor.classList.remove("is-happy");
        void eyesCursor.offsetWidth;
        eyesCursor.classList.add("is-happy");
        setTimeout(function () {
          eyesCursor.classList.remove("is-happy");
        }, 950);
        // theme switch: eyes fall asleep at night, perk up in the morning
        if (say.theme && pageIsDark()) forceSleepyUntil = performance.now() + 1800;
      }, delay);
    });

    // Page scrolls under a still mouse -> re-check what is under the pointer
    window.addEventListener(
      "scroll",
      function () {
        if (!pointerInside) return;
        var el = document.elementFromPoint(cursorX, cursorY);
        if (el) {
          lastPointerTarget = el;
          updateCursorState(el);
        }
      },
      { passive: true },
    );

    // Hide only when the mouse really leaves the window, show again on return
    document.documentElement.addEventListener("mouseleave", function () {
      pointerInside = false;
      onImage = false;
      lastServiceItem = null;
      if (eyesCursor) eyesCursor.classList.remove("is-visible", "kind-image");
      if (imageCursor) imageCursor.classList.remove("is-visible");
    });
    document.documentElement.addEventListener("mouseenter", function () {
      pointerInside = true;
      if (lastPointerTarget) updateCursorState(lastPointerTarget);
    });

    // Messenger opening/closing without a mouse move
    if (messengerPanel && window.MutationObserver) {
      new MutationObserver(function () {
        updateCursorState(lastPointerTarget || document.body);
      }).observe(messengerPanel, { attributes: true, attributeFilter: ["class"] });
    }

    // natural blinking (sometimes a double blink)
    function eyeBlink() {
      if (!eyesCursor) return;
      eyesCursor.classList.add("is-blink");
      setTimeout(function () {
        eyesCursor.classList.remove("is-blink");
      }, 120);
    }
    (function blinkLoop() {
      setTimeout(function () {
        eyeBlink();
        if (Math.random() < 0.25) setTimeout(eyeBlink, 260);
        blinkLoop();
      }, 2200 + Math.random() * 3200);
    })();

    function animateCustomCursors() {
      var vx = cursorX - smoothX;
      var vy = cursorY - smoothY;
      smoothX += vx * 0.22;
      smoothY += vy * 0.22;

      if (eyesCursor) {
        var now = performance.now();
        var kind = hoverEl ? hoverKind : "";

        // track page scroll speed (used while a nav click is travelling)
        var sy = window.scrollY || 0;
        var dsy = sy - lastSY;
        lastSY = sy;
        scrollVel += (dsy - scrollVel) * 0.25;
        if (dsy !== 0) lastScrollAt = now;
        if (navActive) {
          eyesCursor.classList.toggle("is-zooming", Math.abs(scrollVel) > 6);
          if (
            (now - navStart > 300 && now - lastScrollAt > 160) ||
            now - navStart > 4500
          ) {
            navArrive();
          }
        }
        var speed = Math.hypot(vx, vy);

        // size: bigger on buttons/links, a bit smaller on text fields,
        // pops wide when you whip the mouse around
        var wantScale =
          kind === "text" ? 1.1 : kind === "sticker" ? 1.25 : hoverEl ? 1.3 : 1;
        if (onImage) wantScale = 1.15;
        if (navActive) wantScale = 1.2;
        wantScale += Math.min(speed, 80) * 0.0012;
        eyeScale += (wantScale - eyeScale) * 0.2;

        // lean into the direction of travel
        var imgTiltNow = Math.max(-12, Math.min(12, vx * 0.25 - 5));
        var wantTilt = onImage ? imgTiltNow : Math.max(-10, Math.min(10, vx * 0.12));
        tilt += (wantTilt - tilt) * 0.2;

        // The pointer arrow / hand extends down-right from its tip, so the
        // eyes sit to the RIGHT of it, vertically centred on the tip. They
        // trail a little behind (pet-like) and swap to the left side near
        // the right edge of the window.
        ex += (cursorX - ex) * 0.16;
        ey += (cursorY - ey) * 0.16;
        var gapX = 24;
        var eyeW = 56 * eyeScale;
        var eyeH = 36 * eyeScale;
        var wantOffX = ex + gapX + eyeW > window.innerWidth - 8 ? -(gapX + eyeW - 6) : gapX;
        offX += (wantOffX - offX) * 0.18;
        var px = ex + offX;
        var py = ey - eyeH / 2 - 2;
        py = Math.max(8, Math.min(window.innerHeight - eyeH - 8, py));

        // over a services row: hop onto the top edge of the image card
        perch += ((onImage ? 1 : 0) - perch) * 0.2;
        var imgX = smoothX + 24;
        var imgY = smoothY - 75;
        if (perch > 0.002) {
          var perchX = imgX + 18;
          var perchY = Math.max(4, imgY - eyeH + 14);
          // gentle idle bob while sitting on the card
          perchY += Math.sin(now / 340) * 2 * (speed < 6 ? 1 : 0.3);
          px += (perchX - px) * perch;
          py += (perchY - py) * perch;
        }

        // keep the speech bubble on screen
        eyesCursor.classList.toggle("bubble-below", py < 96);
        eyesCursor.classList.toggle("bubble-left", px > window.innerWidth - 250);

        // jump physics (anticipation squat + hop of joy)
        hopVy += (0 - hopY) * 0.22;
        hopVy *= 0.72;
        hopY += hopVy;
        py += hopY;

        eyesCursor.style.transform =
          "translate3d(" +
          px.toFixed(1) +
          "px, " +
          py.toFixed(1) +
          "px, 0) rotate(" +
          tilt.toFixed(2) +
          "deg) scale(" +
          eyeScale.toFixed(3) +
          ")";

        // where the pupils want to look
        var tgtX = Math.max(-1, Math.min(1, vx * 0.05));
        var tgtY = Math.max(-1, Math.min(1, vy * 0.05));
        if (!hoverEl && now - lastMoveAt > 1400) {
          // mouse is resting: eyes wander around curiously
          if (now > nextIdleAt) {
            var ang = Math.random() * Math.PI * 2;
            var rad = 0.35 + Math.random() * 0.65;
            idleLook = { x: Math.cos(ang) * rad, y: Math.sin(ang) * rad };
            nextIdleAt = now + 700 + Math.random() * 1500;
          }
          tgtX = idleLook.x;
          tgtY = idleLook.y;
        }
        if (onImage) {
          // look down at the image card (with a lively wobble from the springs)
          var gx = imgX + 110 - (px + 28 * eyeScale);
          var gy = imgY + 75 - (py + 18 * eyeScale);
          var gd = Math.hypot(gx, gy) || 1;
          tgtX = (gx / gd) * 0.75 + Math.max(-0.4, Math.min(0.4, vx * 0.03));
          tgtY = (gy / gd) * 0.75 + Math.max(-0.3, Math.min(0.3, vy * 0.03));
        }
        if (hoverEl && hoverEl.isConnected) {
          var hr = hoverEl.getBoundingClientRect();
          var tx = hr.left + hr.width / 2 - smoothX;
          var ty = hr.top + hr.height / 2 - smoothY;
          var td = Math.hypot(tx, ty) || 1;
          var tk = Math.min(1, td / 40);
          tgtX = (tx / td) * tk;
          tgtY = (ty / td) * tk;
        }

        if (navActive) {
          // eyes follow the page: look up/down with the scroll
          var look = Math.abs(scrollVel) > 3 ? Math.sign(scrollVel) : navDir * 0.6;
          tgtX = 0;
          tgtY = Math.max(-1, Math.min(1, look));
        }

        // pupil size: dilate on hover, wide-eyed on stickers, tiny on press
        var wantPupil = eyesCursor.classList.contains("is-pressed")
          ? 0.6
          : onImage
            ? 0.88
            : kind === "sticker"
            ? 0.72
            : hoverEl
              ? 1.12
              : 1;
        pupilScale += (wantPupil - pupilScale) * 0.25;

        cursorPupils.forEach(function (p, i) {
          var sp = springs[i % springs.length];
          sp.vx = (sp.vx + (tgtX - sp.x) * sp.k) * sp.d;
          sp.vy = (sp.vy + (tgtY - sp.y) * sp.k) * sp.d;
          sp.x += sp.vx;
          sp.y += sp.vy;
          p.style.transform =
            "translate3d(" +
            (sp.x * 4).toFixed(2) +
            "px, " +
            (sp.y * 5).toFixed(2) +
            "px, 0) scale(" +
            pupilScale.toFixed(3) +
            ")";
        });

        // sleepy after a few seconds without moving
        eyesCursor.classList.toggle("is-sleepy", (now - lastMoveAt > 5000 && !hoverEl && !onImage) || now < forceSleepyUntil);
      }

      if (imageCursor) {
        var imgTilt = Math.max(-12, Math.min(12, vx * 0.25 - 5));
        // 3D lean + click squash + moving glare
        imgRX += (Math.max(-10, Math.min(10, -vy * 0.18)) - imgRX) * 0.18;
        imgRY += (Math.max(-12, Math.min(12, vx * 0.18)) - imgRY) * 0.18;
        imgPress += (imgPressT - imgPress) * 0.3;
        var imgS = 1 - imgPress * 0.07;
        imageCursor.style.setProperty("--glare", (50 + imgRY * 4).toFixed(1));
        imageCursor.style.transform =
          "translate3d(" +
          (smoothX + 24).toFixed(1) +
          "px, " +
          (smoothY - 75).toFixed(1) +
          "px, 0) perspective(700px) rotateX(" +
          imgRX.toFixed(2) +
          "deg) rotateY(" +
          imgRY.toFixed(2) +
          "deg) rotate(" +
          imgTilt.toFixed(1) +
          "deg) scale(" +
          imgS.toFixed(3) +
          ")";
      }

      requestAnimationFrame(animateCustomCursors);
    }
    requestAnimationFrame(animateCustomCursors);
  }

  // ==========================================================================
  // CREATIE® OS CONTACT MODAL WINDOW (REFERENCE DESIGN)
  // ==========================================================================
  function initContactModal() {
    var contactModal = document.getElementById("cr-contact-modal");
    var contactForm = document.getElementById("cr-contact-form");
    var contactFeedback = document.getElementById("cr-contact-feedback");
    var closeBtns = document.querySelectorAll(
      "#cr-contact-close-btn, #cr-contact-close-pink, #cr-contact-close-blue, #cr-contact-close-yellow"
    );
    var triggers = document.querySelectorAll(
      ".cr-footer-chat-btn, [data-open-contact], a[href='#contact'], a[href='#footer'].cr-dock-item, #dock-contact-btn"
    );

    if (!contactModal) return;

    function openModal() {
      contactModal.classList.add("is-active");
      contactModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      var firstInput = contactModal.querySelector("#cr-input-name");
      if (firstInput) {
        setTimeout(function () {
          firstInput.focus();
        }, 120);
      }
    }

    function closeModal() {
      contactModal.classList.remove("is-active");
      contactModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (contactFeedback) contactFeedback.style.display = "none";
    }

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        openModal();
      });
    });

    closeBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        closeModal();
      });
    });

    contactModal.addEventListener("click", function (e) {
      if (e.target === contactModal) {
        closeModal();
      }
    });

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && contactModal.classList.contains("is-active")) {
        closeModal();
      }
    });

    // Track cursor for contact modal googly eyes
    var modalEyes = document.getElementById("cr-contact-googly-eyes");
    if (modalEyes) {
      var pupils = modalEyes.querySelectorAll(".cr-googly-pupil");
      window.addEventListener("pointermove", function (e) {
        if (!contactModal.classList.contains("is-active")) return;
        pupils.forEach(function (pupil) {
          var eye = pupil.parentElement;
          if (!eye) return;
          var rect = eye.getBoundingClientRect();
          var eyeCenterX = rect.left + rect.width / 2;
          var eyeCenterY = rect.top + rect.height / 2;
          var dx = e.clientX - eyeCenterX;
          var dy = e.clientY - eyeCenterY;
          var angle = Math.atan2(dy, dx);
          var dist = Math.min(6, Math.hypot(dx, dy) / 12);
          var x = Math.cos(angle) * dist;
          var y = Math.sin(angle) * dist;
          pupil.style.transform =
            "translate(calc(-50% + " + x.toFixed(1) + "px), calc(-50% + " + y.toFixed(1) + "px))";
        });
      });
    }

    // Handle Contact Form Submit with live feedback
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var submitBtn = document.getElementById("cr-contact-submit-btn");
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = "<span>Sending...</span>";
        }
        setTimeout(function () {
          if (contactFeedback) {
            contactFeedback.textContent = "Thank you! Your message has been sent. We'll reply within 24 hours.";
            contactFeedback.style.display = "block";
          }
          contactForm.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = "<span>Submit</span>";
          }
          setTimeout(function () {
            closeModal();
          }, 2400);
        }, 650);
      });
    }
  }

  initContactModal();

  /* ==========================================================================
     SEAMLESS & SMOOTH LAZY LOADING OBSERVER (Zero Stutter / Layout Shift)
     Preloads and decodes images 800px ahead of the scrolling viewport so images
     are fully rendered into GPU memory before the user ever sees them.
     ========================================================================== */
  function initSeamlessLazyLoading() {
    if (!("IntersectionObserver" in window)) return;

    var lazyObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            if (el.tagName && el.tagName.toLowerCase() === "img") {
              el.loading = "eager";
              if ("decode" in el && !el.complete) {
                el.decode().catch(function () {});
              }
            }
            observer.unobserve(el);
          }
        });
      },
      {
        rootMargin: "800px 0px 800px 0px"
      }
    );

    function observeLazyImages(container) {
      var root = container || document;
      var images = root.querySelectorAll('img[loading="lazy"]');
      images.forEach(function (img) {
        lazyObserver.observe(img);
      });
    }

    observeLazyImages();

    if ("MutationObserver" in window) {
      var mutObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
          m.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) {
              if (node.tagName && node.tagName.toLowerCase() === "img" && node.getAttribute("loading") === "lazy") {
                lazyObserver.observe(node);
              } else if (node.querySelectorAll) {
                observeLazyImages(node);
              }
            }
          });
        });
      });
      mutObserver.observe(document.body, { childList: true, subtree: true });
    }
  }

  initSeamlessLazyLoading();

});

  // Mobile Hero Auto-Scaler (Fits exact desktop lockup proportionally & centered)
  function fitHeroLockup() {
    if (window.innerWidth <= 860) {
      var w = window.innerWidth || document.documentElement.clientWidth;
      var scale = Math.min(0.85, Math.max(0.48, (w - 24) / 635));
      document.documentElement.style.setProperty('--hero-scale', scale.toFixed(3));
    } else {
      document.documentElement.style.removeProperty('--hero-scale');
    }
  }
  fitHeroLockup();
  window.addEventListener('resize', fitHeroLockup, { passive: true });
