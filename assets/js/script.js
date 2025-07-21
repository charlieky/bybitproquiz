

// menuPanel start
document.querySelector(".toggleBtn").onclick = function () {
  document.querySelector(".menuPanel").style.display = "block";
}
document.querySelector(".menuPanelClose").onclick = function () {
  document.querySelector(".menuPanel").style.display = "none";
}
// menu panel close




// chart js start
const ctx = document.getElementById('tradingChart').getContext('2d');
const tradingChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Now', 'Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Trading Skill Level',
      data: [10, 15, 40, 75, 100], // Adjusted for smooth curve
      fill: false,
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 4,
      tension: 0.65, // Higher tension for smooth curve
      pointRadius: 6,
      pointBackgroundColor: ['red', 'orange', 'yellow', 'green'],
      pointBorderColor: 'black', // Updated to match black text
      pointBorderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            enabled: true,
            callbacks: {
                label: function (context) {
                    const labels = ["Now", "Week 1", "Week 2", "Week 3", "After 4 Weeks"];
                    return labels[context.dataIndex];
                }
            },
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleColor: 'black',
            bodyColor: 'black',
            borderWidth: 1,
            borderColor: 'black'
        }
    },
    scales: {
        y: {
            display: true, // Keeps horizontal lines
            grid: {
                color: 'rgba(200, 200, 200, 0.5)', // Light gray horizontal lines
                lineWidth: 1.5,
                drawBorder: false // Hides Y-axis border
            },
            ticks: {
                display: false // Removes Y-axis labels (numbers)
            }
        },
        x: {
            grid: {
                drawOnChartArea: false // **Hides vertical grid lines**
            },
            ticks: {
                color: 'black', // Ensures week names are visible
                font: {
                    weight: 'bold' // Makes text clearer
                }
            }
        }
    }
}
});


// email step validation start
document.getElementById("emailInput").addEventListener("input", function () {
  let emailInput = document.getElementById("emailInput");
  let messageText = document.getElementById("messageText");
  let warningIcon = document.getElementById("warningIcon");
  let successIcon = document.getElementById("successIcon");
  let continueBtn = document.getElementById("continueBtnNewsLetter");

  // Reset visibility
  messageText.classList.add("hidden");
  warningIcon.classList.add("hidden");
  continueBtn.disabled = true; // Initially disable the button

  if (emailInput.value.trim() === "") {
    messageText.textContent = "Hmm... something's wrong, try to enter another email";
    messageText.className = "noticeText text-start error";
    messageText.classList.remove("hidden");
    warningIcon.classList.remove("hidden");
  } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    messageText.textContent = "Well done!";
    messageText.className = "noticeText text-start success";
    messageText.classList.remove("hidden");
    successIcon.classList.remove("hidden");
    continueBtn.disabled = false; // Enable button when valid email
  } else {
    messageText.textContent = "Hmm... something's wrong, try to enter another email";
    messageText.className = "noticeText text-start error";
    messageText.classList.remove("hidden");
    warningIcon.classList.remove("hidden");
    successIcon.classList.add("hidden");
  }
});

document.getElementById("continueBtn").addEventListener("click", function () {
  if (!document.getElementById("continueBtn").disabled) {
    nextStepMain(4);
  }
});
// email step validation close

// form start
let mainStep = 1, totalMainSteps = 5;
let nestedStep = 1, totalNestedSteps = 3;

// Main Form Navigation (No Progress Bar)
function nextStepMain(step) {
  document.getElementById(`step${step}`).classList.remove("active");
  document.getElementById(`step${step + 1}`).classList.add("active");
  mainStep++;
}

function prevStepMain(step) {
  document.getElementById(`step${step}`).classList.remove("active");
  document.getElementById(`step${step - 1}`).classList.add("active");
  mainStep--;
}

// Nested Form Navigation (With Progress Bar)
function updateNestedProgress(nestedStep) {
  let totalNestedSteps = document.querySelectorAll(".nestedStep").length;
  let progress = (nestedStep / totalNestedSteps) * 100;

  document.querySelectorAll(".progress").forEach(bar => {
    bar.style.transition = "width 0.3s ease-in-out"; // Ensure transition is applied
    bar.style.width = progress + "%";
  });
}

// Ensure the progress bar starts filled for the first step on load
document.addEventListener("DOMContentLoaded", () => {
  updateNestedProgress(1); // Start at step 1
});

function nextStepNested(step) {
  let currentStep = document.getElementById(`nestedStep${step}`);
  let nextStep = document.getElementById(`nestedStep${step + 1}`);

  if (nextStep) {
    currentStep.classList.remove("active");
    nextStep.classList.add("active");
    updateNestedProgress(step + 1); // Update progress bar
  }
}

function prevStepNested(step, stepsToGoBack = 1) {
  let currentStep = document.getElementById(`nestedStep${step}`);
  let targetStep = document.getElementById(`nestedStep${step - stepsToGoBack}`);

  if (targetStep) {
    // Hide the current step and intermediate steps if moving multiple steps back
    for (let i = 0; i < stepsToGoBack; i++) {
      let intermediateStep = document.getElementById(`nestedStep${step - i}`);
      if (intermediateStep) {
        intermediateStep.classList.remove("active");
      }
    }

    // Show the correct target step
    targetStep.classList.add("active");

    // Update progress bar correctly
    updateNestedProgress(step - stepsToGoBack);
  }
}

// companySelectArea start
document.querySelectorAll('.company-option').forEach(option => {
  option.addEventListener('click', () => {
    option.classList.toggle('selected');
  });
});

document.getElementById('quizForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const selectedOptions = Array.from(document.querySelectorAll('.company-option.selected'))
    .map(option => option.getAttribute('data-value'));
  console.log('Selected companies:', selectedOptions);
});
// companySelectArea close

// selling page start
// pricing plan
function updateText(plan, price, dailyRate) {
  document.getElementById('subscriptionValid').innerText = plan;
  document.getElementById('subscriptionPrice').innerText = price;

  document.querySelectorAll(".plan input").forEach(input => {
    input.addEventListener("change", function() {
        // Reset all plans to 50% opacity
        document.querySelectorAll(".plan").forEach(plan => {
            plan.style.opacity = "0.7";
            plan.style.borderColor = "#c4c7cc";
            plan.style.boxShadow = "0 0 0px 0px #c4c7cc";
        });
  
        // Increase opacity for the selected plan
        this.closest(".plan").style.opacity = "1";
        this.closest(".plan").style.borderColor = "#58BBEA";
        this.closest(".plan").style.boxShadow = "0 0 6px 3px #c4c7cc";
    });
  });
  
}






// Ensure default selection on page load
window.onload = function() {
  const defaultPlan = document.querySelector('input[value="4-WEEK PLAN"]');
  defaultPlan.checked = true;
  defaultPlan.closest(".plan").style.opacity = "1"; // Ensure default plan is fully visible
  updateText('4-WEEK PLAN', '$39.99', '$1.43/day');
};


