/**
 * Form Validation Module
 * Handles client-side validation for the contact form
 *
 * Features:
 * - Real-time validation feedback
 * - Error message display
 * - Success message handling
 * - Accessible error reporting
 */

const FormValidation = (() => {
  const form = document.getElementById("contactForm")
  const successMessage = document.getElementById("successMessage")

  // Validation rules
  const rules = {
    name: {
      required: true,
      minLength: 2,
      pattern: /^[a-zA-Z\s'-]+$/,
      messages: {
        required: "Name is required",
        minLength: "Name must be at least 2 characters",
        pattern: "Name can only contain letters, spaces, hyphens, and apostrophes",
      },
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      messages: {
        required: "Email is required",
        pattern: "Please enter a valid email address",
      },
    },
    subject: {
      required: true,
      minLength: 3,
      messages: {
        required: "Subject is required",
        minLength: "Subject must be at least 3 characters",
      },
    },
    message: {
      required: true,
      minLength: 10,
      messages: {
        required: "Message is required",
        minLength: "Message must be at least 10 characters",
      },
    },
  }

  /**
   * Initialize form validation
   */
  const init = () => {
    if (!form) return

    form.addEventListener("submit", handleSubmit)

    // Real-time validation on blur
    const inputs = form.querySelectorAll("input, textarea")
    inputs.forEach((input) => {
      input.addEventListener("blur", () => validateField(input))
    })
  }

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate all fields
    const inputs = form.querySelectorAll("input, textarea")
    let isValid = true

    inputs.forEach((input) => {
      if (!validateField(input)) {
        isValid = false
      }
    })

    if (isValid) {
      submitForm()
    }
  }

  /**
   * Validate individual field
   */
  const validateField = (field) => {
    const fieldName = field.name
    const fieldValue = field.value.trim()
    const fieldRules = rules[fieldName]
    const errorElement = document.getElementById(`${fieldName}Error`)

    if (!fieldRules) return true

    // Check required
    if (fieldRules.required && !fieldValue) {
      showError(field, errorElement, fieldRules.messages.required)
      return false
    }

    // Check minimum length
    if (fieldRules.minLength && fieldValue.length < fieldRules.minLength) {
      showError(field, errorElement, fieldRules.messages.minLength)
      return false
    }

    // Check pattern
    if (fieldRules.pattern && !fieldRules.pattern.test(fieldValue)) {
      showError(field, errorElement, fieldRules.messages.pattern)
      return false
    }

    // Clear error if validation passes
    clearError(field, errorElement)
    return true
  }

  /**
   * Display error message
   */
  const showError = (field, errorElement, message) => {
    field.classList.add("error")
    errorElement.textContent = message
    errorElement.classList.add("show")
  }

  /**
   * Clear error message
   */
  const clearError = (field, errorElement) => {
    field.classList.remove("error")
    errorElement.textContent = ""
    errorElement.classList.remove("show")
  }

  /**
   * Submit form (simulated)
   */
  const submitForm = () => {
    // In a real application, this would send data to a server
    console.log("Form submitted successfully")

    // Show success message
    form.style.display = "none"
    successMessage.style.display = "block"

    // Reset form after 3 seconds
    setTimeout(() => {
      form.reset()
      form.style.display = "block"
      successMessage.style.display = "none"

      // Clear all error states
      const inputs = form.querySelectorAll("input, textarea")
      inputs.forEach((input) => {
        input.classList.remove("error")
      })
    }, 3000)
  }

  return { init }
})()

// Initialize form validation when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  FormValidation.init()
})
