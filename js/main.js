
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".select-boxes").forEach(group => {
    const boxes = group.querySelectorAll(".select-box");
    const isCheckboxMode = group.classList.contains("select-box__check");

    boxes.forEach(box => {
      box.addEventListener("click", () => {

        if (isCheckboxMode) {
          box.classList.toggle("active");
          return;
        }

        boxes.forEach(b => b.classList.remove("active"));
        box.classList.add("active");
        group.dataset.selected = box.dataset.value;
      });
    });
  });

  // switch boxes
  try {
    document.querySelectorAll(".switches").forEach(container => {
      container.addEventListener("click", e => {
        const box = e.target.closest(".switch-box");
        if (!box) return;
        box.classList.toggle("active");
      });
    });

    document.getElementById("select-all-issue").addEventListener("click", e => {
      e.preventDefault();
      document
        .querySelectorAll(".switches .switch-box")
        .forEach(box => box.classList.add("active"));
    });

    const addBtn = document.querySelector(".switches .add-btn");
    const addNextBtn = document.querySelector(".add-next");
    const addIssueBox = document.querySelector(".add-issue__box");
    const removeIssueBtn = document.querySelector(".remove-issue");
    const customInput = document.querySelector(".add-issue__box input");

    addBtn.addEventListener("click", () => {
      addIssueBox.classList.add("active");
      addBtn.classList.add("hidden");
      addNextBtn.classList.remove("hidden");
      customInput.focus();
    });

    removeIssueBtn.addEventListener("click", () => {
      addIssueBox.classList.remove("active");
      addBtn.classList.remove("hidden");
      addNextBtn.classList.add("hidden");
      customInput.value = "";
    });

    addNextBtn.addEventListener("click", () => {
      const value = customInput.value.trim();

      if (!value) {
        customInput.focus();
        return;
      }

      const newBox = document.createElement("div");
      newBox.className = "switch-box active";
      newBox.innerHTML = `<span>${value}</span>`;

      addIssueBox.parentNode.insertBefore(newBox, addIssueBox);

      customInput.value = "";
      addIssueBox.classList.remove("active");
      addBtn.classList.remove("hidden");
      addNextBtn.classList.add("hidden");
    });

    // Enter tugmasi bilan ham qo'shish
    customInput.addEventListener("keypress", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        addNextBtn.click();
      }
    });

  } catch (error) {
    console.log(error, 'switch boxes error');
  }

  // upload img
  try {
    const uploadBtn = document.getElementById("upload-img__btn");
    const imageInput = document.getElementById("imageInput");
    const imagesContainer = document.getElementById("selectedImages");

    function updateButtonText() {
      const imgBoxes = imagesContainer.querySelectorAll(".img-box");
      const btnImg = uploadBtn.querySelector("img");
      const btnText = uploadBtn.childNodes[2]; // text node

      if (imgBoxes.length > 0) {
        btnImg.src = "images/icons/plus.svg";
        btnText.textContent = " Attach More Photos";
      } else {
        btnImg.src = "images/icons/images.svg";
        btnText.textContent = " Attach Photos";
      }
    }
    updateButtonText();

    imagesContainer.addEventListener("click", e => {
      const removeBtn = e.target.closest(".remove");
      if (!removeBtn) return;
      const imgBox = removeBtn.closest(".img-box");
      if (imgBox) {
        imgBox.remove();
        updateButtonText();
      }
    });

    uploadBtn.addEventListener("click", () => {
      imageInput.click();
    });

    imageInput.addEventListener("change", () => {
      const file = imageInput.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = e => {
        const imgBox = document.createElement("div");
        imgBox.className = "img-box";

        imgBox.innerHTML = `
        <button class="remove">
          <img src="images/icons/x.svg" alt="">
        </button>
        <img src="${e.target.result}" alt="">
      `;

        imagesContainer.appendChild(imgBox);
        updateButtonText();
      };

      reader.readAsDataURL(file);
      imageInput.value = "";
    });

  } catch (error) {
    console.log(error, 'upload img error');
  }

  // search box
  try {
    const searchBox = document.querySelector('.search-box');
    const input = searchBox.querySelector('input');
    const clearBtn = searchBox.querySelector('.clear');

    function toggleClear() {
      if (input.value.trim().length > 0) {
        clearBtn.classList.add('active');
      } else {
        clearBtn.classList.remove('active');
      }
    }

    input.addEventListener('input', toggleClear);

    clearBtn.addEventListener('click', () => {
      input.value = '';
      clearBtn.classList.remove('active');
      input.focus();
    });

  } catch (error) {
    console.log(error, 'search box error');
  }

  // sort boxes
  try {
    const sortBoxes = document.querySelectorAll('.sort-item');
    sortBoxes.forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    });

  } catch (error) {
    console.log(error, 'sort boxes error');
  }
});

