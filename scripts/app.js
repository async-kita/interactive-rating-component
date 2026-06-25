document.addEventListener("DOMContentLoaded", () => {
  const ratingCard = document.getElementById("ratingCard");
  const thankyCard = document.getElementById("thankyouCard");
  const ratingButtons = document.querySelectorAll(".rating-btn");
  const submitButton = document.getElementById("submitBtn");
  const ratingBadge = document.getElementById("ratingBadge");
  const thankyouHeading = document.getElementById("thankyouHeading");

  let selectedRating = null;

  const showThankYou = (rating) => {
    ratingBadge.textContent = `You selected ${rating} out of 5`;
    ratingCard.setAttribute("hidden", "");
    thankyCard.removeAttribute("hidden");
    thankyouHeading.setAttribute("tabindex", "-1");
    thankyouHeading.focus();
    thankyouHeading.addEventListener("blur", () => {
      thankyouHeading.removeAttribute("tabindex");
    }, {once: true})
  }

  const resetRating = () => {
    selectedRating = null;
    ratingButtons.forEach(btn => {
      btn.setAttribute("aria-pressed", "false");
    })
    submitButton.disabled = true;
  }

  const handleRatingSelect = (button) => {
    const rating = parseInt(button.dataset.rating, 10);
    if(selectedRating === rating) {
      resetRating();
      return;
    }
    ratingButtons.forEach(btn => btn.setAttribute("aria-pressed", "false"));
    button.setAttribute("aria-pressed", "true");
    selectedRating = rating;
    submitButton.disabled = false;
  }

  const handleSubmit = () => {
    if(selectedRating !== null) {
      showThankYou(selectedRating);
    }
  }

  ratingButtons.forEach(btn => {
    btn.addEventListener("click", () => handleRatingSelect(btn));
  })
  submitButton.addEventListener("click", handleSubmit);
  resetRating();
})