/**
 * Main JavaScript File
 * Handles navigation, menu toggles, and general interactivity
 *
 * Separation of Concerns:
 * - Navigation: Mobile menu toggle and active link management
 * - Portfolio: Filter functionality for work items
 * - Utilities: Helper functions for common tasks
 */

// ============================================
// NAVIGATION MODULE
// ============================================

const Navigation = (() => {
  const menuToggle = document.getElementById("menuToggle")
  const navLinks = document.getElementById("navLinks")
  const navItems = document.querySelectorAll(".nav-links a")

  /**
   * Initialize navigation event listeners
   */
  const init = () => {
    if (menuToggle) {
      menuToggle.addEventListener("click", toggleMenu)
    }

    navItems.forEach((item) => {
      item.addEventListener("click", handleNavClick)
    })

    // Close menu on window resize
    window.addEventListener("resize", handleResize)
  }

  /**
   * Toggle mobile menu visibility
   */
  const toggleMenu = () => {
    navLinks.classList.toggle("active")
    menuToggle.classList.toggle("active")
  }

  /**
   * Handle navigation item click
   */
  const handleNavClick = () => {
    navLinks.classList.remove("active")
    menuToggle.classList.remove("active")
  }

  /**
   * Close menu on window resize if screen is large
   */
  const handleResize = () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("active")
      menuToggle.classList.remove("active")
    }
  }

  return { init }
})()

// ============================================
// PORTFOLIO FILTER MODULE
// ============================================

const PortfolioFilter = (() => {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const portfolioItems = document.querySelectorAll(".portfolio-item")

  /**
   * Initialize portfolio filter event listeners
   */
  const init = () => {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", handleFilterClick)
    })
  }

  /**
   * Handle filter button click
   */
  const handleFilterClick = (e) => {
    const filterValue = e.target.getAttribute("data-filter")

    // Update active button
    filterBtns.forEach((btn) => btn.classList.remove("active"))
    e.target.classList.add("active")

    // Filter portfolio items
    portfolioItems.forEach((item) => {
      if (filterValue === "all") {
        item.style.display = "block"
        setTimeout(() => (item.style.opacity = "1"), 10)
      } else {
        const categories = item.getAttribute("data-category").split(" ")
        if (categories.includes(filterValue)) {
          item.style.display = "block"
          setTimeout(() => (item.style.opacity = "1"), 10)
        } else {
          item.style.opacity = "0"
          setTimeout(() => (item.style.display = "none"), 300)
        }
      }
    })
  }

  return { init }
})()

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  Navigation.init()
  PortfolioFilter.init()
})
